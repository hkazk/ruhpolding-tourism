import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, useCursor } from "@react-three/drei";
import { useAtom, atom } from "jotai";
import { easing } from "maath";
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

import NavigationBar from '../components/NavigationBar';
import coffeeImage from '../assets/coffee.jpg';
import coffee1Image from '../assets/coffee1.jpg'; 
import coffee2Image from '../assets/coffee2.jpg';
import coffee3Image from '../assets/coffee3.jpg';
import coffee4Image from '../assets/coffee4.jpg';
import './CuisinePage.css';

// 3D Menu Book System - Embedded Version

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

// Menu data
const menuData = [
  {
    title: "Traditional Mains",
    items: [
      { name: "Wiener Schnitzel", price: "€18.50", desc: "Tender veal cutlet, golden-fried" },
      { name: "Schweinshaxe", price: "€24.90", desc: "Roasted pork knuckle with sauerkraut" },
      { name: "Sauerbraten", price: "€21.80", desc: "Bavarian pot roast with red cabbage" },
      { name: "Rindergulasch", price: "€19.20", desc: "Hearty beef stew with spätzle" }
    ]
  },
  {
    title: "Sausages & Wursts", 
    items: [
      { name: "Weisswurst", price: "€12.80", desc: "White sausage with sweet mustard" },
      { name: "Bratwurst", price: "€14.50", desc: "Grilled Bavarian sausage" },
      { name: "Currywurst", price: "€13.20", desc: "Sliced sausage with curry sauce" },
      { name: "Nürnberger", price: "€15.90", desc: "Small grilled sausages, 6 pieces" }
    ]
  },
  {
    title: "Alpine Specialties",
    items: [
      { name: "Kaiserschmarrn", price: "€16.90", desc: "Shredded pancake with plums" },
      { name: "Leberkäse", price: "€15.40", desc: "Bavarian meatloaf with fried egg" },
      { name: "Obatzda", price: "€11.50", desc: "Bavarian cheese spread" },
      { name: "Brotzeit Platte", price: "€22.80", desc: "Traditional cold cuts platter" }
    ]
  },
  {
    title: "Beverages",
    items: [
      { name: "Augustiner Helles", price: "€4.80", desc: "Traditional Munich lager" },
      { name: "Weissbier", price: "€5.20", desc: "Wheat beer with lemon" },
      { name: "Glühwein", price: "€6.50", desc: "Mulled wine with spices" },
      { name: "Apfelschorle", price: "€3.90", desc: "Apple juice with sparkling water" }
    ]
  },
  {
    title: "Desserts",
    items: [
      { name: "Apple Strudel", price: "€8.90", desc: "Traditional with vanilla sauce" },
      { name: "Black Forest Cake", price: "€9.50", desc: "Chocolate cake with cherries" },
      { name: "Dampfnudel", price: "€7.80", desc: "Steamed dumpling with custard" },
      { name: "Bavarian Cream", price: "€6.70", desc: "Light vanilla cream with berries" }
    ]
  }
];

const pageAtom = atom(0);

const menuPages = [
  {
    isCover: true,
    title: "Menu Cover"
  },
  ...menuData
];

// Create page geometry
const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

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

const whiteColor = new Color("white");
const emissiveColor = new Color("#1abc9c"); // Changed to teal to match page theme

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#2980b9" }), // Changed to blue theme
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

// Function to create menu textures
const createMenuTexture = (menuData, isBack = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; // Doubled resolution for better text clarity
  canvas.height = 1364; // Doubled resolution for better text clarity
  const ctx = canvas.getContext('2d');

  if (isBack) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2980b9'); // Blue theme
    gradient.addColorStop(1, '#1a252f'); // Dark blue theme
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Changed to black border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    return new CanvasTexture(canvas);
  }

  if (menuData.isCover) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2980b9'); // Blue theme
    gradient.addColorStop(1, '#1a252f'); // Dark blue theme
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Changed to black for title
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 72px serif'; // Much larger font
    ctx.textAlign = 'center';
    ctx.fillText('🍽️ MENU', canvas.width / 2, 300);
    
    ctx.font = '40px serif'; // Larger subtitle
    ctx.fillText('Bavarian Cuisine', canvas.width / 2, 400);
    
    // Changed to black borders
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 500, canvas.width - 200, 200);
    
    ctx.font = '32px serif'; // Larger description text
    ctx.fillText('Traditional Alpine', canvas.width / 2, 580);
    ctx.fillText('Est. 1750', canvas.width / 2, 630);
    
    ctx.font = '24px serif'; // Larger instruction text
    ctx.fillStyle = '#000000'; // Changed from light teal to black
    ctx.fillText('Click to browse', canvas.width / 2, 1200);
  } else {
    // Pure white background for maximum contrast
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title with black color
    ctx.fillStyle = '#000000'; // Pure black for title
    ctx.font = 'bold 56px serif'; // Increased from 48px to 56px
    ctx.textAlign = 'center';
    ctx.fillText(menuData.title, canvas.width / 2, 120);
    
    // Changed decorative line to black
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 140);
    ctx.lineTo(canvas.width / 2 + 150, 140);
    ctx.stroke();
    
    let yPos = 220;
    ctx.textAlign = 'left';
    
    menuData.items.forEach((item, index) => {
      if (yPos > canvas.height - 120) return;
      
      // Light gray background for items
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(80, yPos - 30, canvas.width - 160, 110); // Slightly taller boxes
      
      // Changed border to black
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, yPos - 30, canvas.width - 160, 110);
      
      // Much larger and darker item names - changed to black
      ctx.fillStyle = '#000000'; // Pure black for item names
      ctx.font = 'bold 38px serif'; // Increased from 32px to 38px
      ctx.fillText(item.name, 120, yPos);
      
      // Larger and darker prices - changed to black
      ctx.fillStyle = '#000000'; // Changed from bright red/pink to black
      ctx.textAlign = 'right';
      ctx.font = 'bold 38px serif'; // Increased from 32px to 38px
      ctx.fillText(item.price, canvas.width - 120, yPos);
      
      // Larger descriptions - already black
      ctx.fillStyle = '#000000'; // Pure black for descriptions too
      ctx.font = '28px serif'; // Increased from 24px to 28px
      ctx.textAlign = 'left';
      ctx.fillText(item.desc, 120, yPos + 40); // Adjusted position
      
      // Darker line separator - already black
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(120, yPos + 65);
      ctx.lineTo(canvas.width - 120, yPos + 65);
      ctx.stroke();
      ctx.setLineDash([]);
      
      yPos += 130; // More space between items
    });
  }
  
  return new CanvasTexture(canvas);
};

// Menu Page Component
const MenuPage = ({ number, pageData, page, opened, bookClosed, ...props }) => {
  const group = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef();
  const [highlighted, setHighlighted] = useState(false);

  const frontTexture = useMemo(() => createMenuTexture(pageData), [pageData]);
  const backTexture = useMemo(() => {
    if (number === menuPages.length - 1) {
      return createMenuTexture({}, true);
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

    const emissiveIntensity = highlighted ? 0.1 : 0;
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

// Menu Book Component
const MenuBook = ({ ...props }) => {
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

// Menu Experience Component
const MenuExperience = () => {
  return (
    <>
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={0.4}
        speed={1}
        rotationIntensity={0.5}
      >
        <MenuBook />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.5}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, 0]}
        dampingFactor={0.05}
        enableDamping={true}
      />

      <Environment preset="dawn" intensity={0.000001} /> {/* Further reduced intensity */}

      <directionalLight
        position={[2, 5, 2]}
        intensity={0.00002} // Further reduced from 0.4 to 0.2
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      <pointLight position={[-2, 2, 20]} intensity={0.0005} color="#1abc9c" /> {/* Minimal accent lighting */}
      <pointLight position={[2, 2, -2]} intensity={0.0002} color="#3498db" /> {/* Minimal accent lighting */}
      <ambientLight intensity={0.00002} /> {/* Increased ambient for softer overall lighting */}

      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  );
};

// Embedded 3D Menu Window
const EmbeddedMenuWindow = ({ onClose }) => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    if (page > 0) {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dyvmk");
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  }, [page]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1200px', // 50% bigger (was 800px)
      height: '900px', // 50% bigger (was 600px)
      background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
      borderRadius: '20px',
      zIndex: 1000,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      border: '2px solid rgba(26, 188, 156, 0.3)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.8), rgba(52, 152, 219, 0.8))',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{
          color: 'white',
          margin: 0,
          fontSize: '18px',
          fontWeight: '600'
        }}>
          📖 Café Chiemgau Menu
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(231, 76, 60, 0.8)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(231, 76, 60, 1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(231, 76, 60, 0.8)'}
        >
          ×
        </button>
      </div>

      {/* 3D Canvas */}
      <div style={{ width: '100%', height: '760px' }}> {/* Increased from 460px to 760px */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          shadows
        >
          <MenuExperience />
        </Canvas>
      </div>

      {/* Page Navigation */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px', // Increased padding
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px', // Increased gap
        flexWrap: 'wrap'
      }}>
        {[...menuPages].map((pageData, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            style={{
              background: index === page ? '#1abc9c' : 'rgba(255, 255, 255, 0.1)',
              color: index === page ? 'white' : 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              padding: '10px 18px', // Increased padding
              borderRadius: '20px', // Increased border radius
              fontSize: '13px', // Slightly larger font
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: index === page ? '600' : '400'
            }}
          >
            {index === 0 ? 'Cover' : pageData.title}
          </button>
        ))}
        <button
          onClick={() => setPage(menuPages.length)}
          style={{
            background: page === menuPages.length ? '#1abc9c' : 'rgba(255, 255, 255, 0.1)',
            color: page === menuPages.length ? 'white' : 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            padding: '10px 18px', // Increased padding
            borderRadius: '20px', // Increased border radius
            fontSize: '13px', // Slightly larger font
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: page === menuPages.length ? '600' : '400'
          }}
        >
          Back
        </button>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '140px', // Adjusted position for larger window
        left: '30px', // Increased margin
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px', // Slightly larger font
        background: 'rgba(254, 254, 254, 0.5)',
        padding: '12px 18px', // Increased padding
        borderRadius: '12px', // Increased border radius
        pointerEvents: 'none'
      }}>
        🖱️ Click pages to turn • Drag to rotate
      </div>
    </div>
  );
};

// Main Cuisine Page Component
const CuisinePage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const heroImage = coffeeImage; // Using the coffee.jpg image
  const schnitzelImage = "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const sausageImage = "https://images.unsplash.com/photo-1599921841143-678194e4b0d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const prezelImage = "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const restaurantImage = coffee1Image; // Using coffee1.jpg for restaurant section

  return (
    <div className="cuisine-page">
      <NavigationBar />

      {/* Hero Section */}
      <section className="cuisine-hero" style={{backgroundImage: `url(${heroImage})`}}>
        <div className="cuisine-hero-overlay">
          <div className="cuisine-hero-content">
            <h1>Traditional Bavarian Cuisine</h1>
            <p>Experience the authentic flavors of Bavaria through time-honored recipes, hearty dishes, and warm Alpine hospitality that has nourished generations.</p>
            
            <div className="cuisine-hero-stats">
              <div className="cuisine-hero-stat">
                <span className="number">300+</span>
                <span className="label">Traditional Recipes</span>
              </div>
              <div className="cuisine-hero-stat">
                <span className="number">15</span>
                <span className="label">Local Restaurants</span>
              </div>
              <div className="cuisine-hero-stat">
                <span className="number">500</span>
                <span className="label">Years of Tradition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>Café Chiemgau - A Culinary Tradition</h2>
          <p>Located in the heart of Ruhpolding, Café Chiemgau has been serving authentic Bavarian cuisine since 1952. Our family-run establishment combines traditional Alpine recipes with warm hospitality, creating an unforgettable dining experience that celebrates the rich culinary heritage of the Chiemgau region.</p>
          <p>From our famous homemade Apfelstrudel to hearty Schweinshaxe, every dish at Café Chiemgau tells the story of Bavaria. Our chefs use only the finest local ingredients, sourced from Alpine farms and traditional suppliers who have been part of our community for generations.</p>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="signature-dishes">
        <div className="container">
          <h2>Signature Bavarian Dishes</h2>
          <div className="dishes-grid">
            <div className="dish-card">
              <img src={coffee3Image} alt="Café Chiemgau Schnitzel" />
              <div className="dish-content">
                <div className="icon">🥩</div>
                <h3>Wiener Schnitzel</h3>
                <p>Tender veal cutlet, perfectly breaded and golden-fried, served with lingonberry sauce and crispy potatoes.</p>
                <div className="price">€18.50</div>
              </div>
            </div>
            <div className="dish-card">
              <img src={coffee4Image} alt="Café Chiemgau Sausages" />
              <div className="dish-content">
                <div className="icon">🌭</div>
                <h3>Weisswurst & Brezn</h3>
                <p>Traditional Bavarian white sausage served with sweet mustard, fresh pretzel, and a wheat beer.</p>
                <div className="price">€12.80</div>
              </div>
            </div>
            <div className="dish-card">
              <img src={coffee2Image} alt="Café Chiemgau Atmosphere" />
              <div className="dish-content">
                <div className="icon">🍖</div>
                <h3>Schweinshaxe</h3>
                <p>Roasted pork knuckle with crispy skin, served with sauerkraut, potato dumplings, and dark beer gravy.</p>
                <div className="price">€24.90</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Restaurants Section */}
      <section className="local-restaurants">
        <div className="container">
          <div className="restaurants-content">
            <div className="restaurants-text">
              <span className="badge">Est. 1952</span>
              <h2>Café Chiemgau Experience</h2>
              <p>Step into Café Chiemgau and discover why we've been Ruhpolding's favorite dining destination for over 70 years. Our traditional Bavarian restaurant offers an authentic taste of Alpine culture, where every meal is a celebration of local flavors and warm hospitality.</p>
              <div className="restaurant-features">
                <div className="restaurant-feature">
                  <span>🏠</span>
                  <span>Family-Owned Since 1952</span>
                </div>
                <div className="restaurant-feature">
                  <span>🥘</span>
                  <span>Grandmother's Original Recipes</span>
                </div>
                <div className="restaurant-feature">
                  <span>🍺</span>
                  <span>Local Chiemgau Brewery Partner</span>
                </div>
                <div className="restaurant-feature">
                  <span>🌿</span>
                  <span>Alpine Farm-Fresh Ingredients</span>
                </div>
              </div>
              
              {/* 3D Menu Window Button */}
              <button 
                className="menu-button"
                onClick={() => setShowMenu(true)}
              >
                📖 Browse Café Chiemgau Menu
              </button>
            </div>
            <div className="restaurants-image">
              <img src={coffee1Image} alt="Café Chiemgau Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Classes Section */}
      <section className="cooking-classes">
        <div className="container">
          <h2>Café Chiemgau Culinary Workshops</h2>
          <div className="classes-grid">
            <div className="class-card">
              <div className="class-icon">👨‍🍳</div>
              <h3>Chef Franz's Schnitzel Class</h3>
              <p>Learn the secrets of our famous Wiener Schnitzel with Chef Franz Huber himself.</p>
            </div>
            <div className="class-card">
              <div className="class-icon">🥨</div>
              <h3>Traditional Pretzel Workshop</h3>
              <p>Master the art of hand-twisting authentic Bavarian Brezn in our kitchen.</p>
            </div>
            <div className="class-card">
              <div className="class-icon">🍺</div>
              <h3>Chiemgau Beer & Food Pairing</h3>
              <p>Discover perfect pairings with local Chiemgau brewery selections.</p>
            </div>
            <div className="class-card">
              <div className="class-icon">🥧</div>
              <h3>Oma's Apfelstrudel Secret</h3>
              <p>Create our legendary apple strudel using Grandmother Huber's 1952 recipe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded 3D Menu Window */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '200vw',
              height: '200vh',
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 999,
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setShowMenu(false)}
          />
          {/* Menu Window */}
          <EmbeddedMenuWindow onClose={() => setShowMenu(false)} />
        </>
      )}
    </div>
  );
};

export default CuisinePage;