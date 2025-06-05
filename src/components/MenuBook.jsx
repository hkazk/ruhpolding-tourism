import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
  CanvasTexture,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, menuPages } from "./MenuUI";

// Animation parameters
const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

// Page dimensions
const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// Create page geometry with segments for realistic bending
const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

// Setup skinning for page bending animation
const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

// Colors
const whiteColor = new Color("white");
const emissiveColor = new Color("#d4af37");

// Base materials for page edges
const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#8b4513" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

// Function to create canvas texture from menu data
const createMenuTexture = (menuData, isBack = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1364;
  const ctx = canvas.getContext('2d');

  if (isBack) {
    // Back cover design
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#8b4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Decorative border - changed to black
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    return new CanvasTexture(canvas);
  }

  if (menuData.isCover) {
    // Front cover design
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#8b4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title - changed to black
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 80px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍽️ SPEISEKARTE', canvas.width / 2, 300);
    
    ctx.font = '40px serif';
    ctx.fillText('Bavarian Menu', canvas.width / 2, 400);
    
    // Decorative elements - changed to black
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 500, canvas.width - 200, 200);
    
    ctx.font = '32px serif';
    ctx.fillText('Traditional Alpine Cuisine', canvas.width / 2, 580);
    ctx.fillText('Est. 1750', canvas.width / 2, 630);
    
    ctx.font = '24px serif';
    ctx.fillStyle = '#000000'; // Changed from gold to black
    ctx.fillText('Click to open menu', canvas.width / 2, 1200);
  } else {
    // Menu page design
    ctx.fillStyle = '#d5edd5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title - changed to black
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText(menuData.title, canvas.width / 2, 120);
    
    // Decorative line - changed to black
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 140);
    ctx.lineTo(canvas.width / 2 + 150, 140);
    ctx.stroke();
    
    // Menu items
    let yPos = 220;
    ctx.textAlign = 'left';
    ctx.font = '28px serif';
    
    menuData.items.forEach((item, index) => {
      // Item background
      ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
      ctx.fillRect(80, yPos - 30, canvas.width - 160, 120);
      
      // Item border - changed to black
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, yPos - 30, canvas.width - 160, 120);
      
      // Item name - changed to black
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 32px serif';
      ctx.fillText(item.name, 120, yPos);
      
      // Price - changed to black
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'right';
      ctx.fillText(item.price, canvas.width - 120, yPos);
      
      // Description - changed to black
      ctx.fillStyle = '#000000';
      ctx.font = 'italic 24px serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.desc, 120, yPos + 35);
      
      // Dotted line - changed to black
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(120, yPos + 50);
      ctx.lineTo(canvas.width - 120, yPos + 50);
      ctx.stroke();
      ctx.setLineDash([]);
      
      yPos += 140;
    });
  }
  
  return new CanvasTexture(canvas);
};

const MenuPage = ({ number, pageData, page, opened, bookClosed, ...props }) => {
  const group = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef();

  // Create textures from menu data
  const frontTexture = useMemo(() => createMenuTexture(pageData), [pageData]);
  const backTexture = useMemo(() => {
    if (number === menuPages.length - 1) {
      return createMenuTexture({}, true); // Back cover
    }
    return createMenuTexture(menuPages[number + 1] || {});
  }, [number, pageData]);

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      let bone = new Bone();
      bones.push(bone);
      if (i === 0) {
        bone.position.x = 0;
      } else {
        bone.position.x = SEGMENT_WIDTH;
      }
      if (i > 0) {
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: frontTexture,
        roughness: 0.1,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: backTexture,
        roughness: 0.1,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [frontTexture, backTexture]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;

    const emissiveIntensity = highlighted ? 0.15 : 0;
    skinnedMeshRef.current.material[4].emissiveIntensity =
      skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
        skinnedMeshRef.current.material[4].emissiveIntensity,
        emissiveIntensity,
        0.1
      );

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, new Date() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      easing.dampAngle(target.rotation, "y", rotationAngle, easingFactor, delta);

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  const [_, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

export const MenuBook = ({ ...props }) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeout;
    const goToPage = () => {
      setDelayedPage((delayedPage) => {
        if (page === delayedPage) {
          return delayedPage;
        } else {
          timeout = setTimeout(
            () => {
              goToPage();
            },
            Math.abs(page - delayedPage) > 2 ? 50 : 150
          );
          if (page > delayedPage) {
            return delayedPage + 1;
          }
          if (page < delayedPage) {
            return delayedPage - 1;
          }
        }
      });
    };
    goToPage();
    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...menuPages].map((pageData, index) => (
        <MenuPage
          key={index}
          page={delayedPage}
          number={index}
          pageData={pageData}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === menuPages.length}
        />
      ))}
    </group>
  );
};