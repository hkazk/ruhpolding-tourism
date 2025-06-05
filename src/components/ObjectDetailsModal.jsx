import React, { useEffect, useState } from 'react';

const ObjectDetailsModal = ({ object, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (object) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [object]);

  if (!object) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const objectData = {
    wardrobe: {
      title: "Bavarian Farmhouse Wardrobe",
      period: "18th Century (1750-1780)",
      origin: "Oberammergau, Bavaria",
      catalogNumber: "RHM-2024-001",
      story: "This magnificent wardrobe belonged to the Huber family, renowned woodcarvers from Oberammergau. Crafted from local Alpine pine and hand-painted with traditional Bavarian motifs, it served as the family's prized possession for over two centuries. The intricate carvings tell the story of the seasons in the Bavarian Alps - spring flowers, summer harvests, autumn leaves, and winter snow. Each door panel was lovingly painted by Maria Huber, who learned the traditional Lüftlmalerei technique from her grandmother.",
      details: [
        { label: "Material", value: "Alpine Pine with hand-painted details" },
        { label: "Technique", value: "Traditional Bavarian Lüftlmalerei painting" },
        { label: "Dimensions", value: "180 × 120 × 60 cm" },
        { label: "Notable Features", value: "Hidden compartments for valuables" },
        { label: "Condition", value: "Excellent, fully restored" },
        { label: "Provenance", value: "Huber family collection, donated 1987" }
      ],
      category: "Furniture & Decorative Arts"
    },
    displayTable: {
      title: "Medieval Artifact Collection",
      period: "12th-15th Century",
      origin: "Ruhpolding Abbey",
      catalogNumber: "RHM-2024-002",
      story: "These precious artifacts were discovered during excavations near the old Ruhpolding Abbey in 1987. The collection includes medieval pilgrim badges, ancient coins, and religious reliquaries used by monks who traveled the salt trade routes through the Alps. The bronze cup was likely used in religious ceremonies, while the leather-bound manuscripts contain hymns written in Old Bavarian dialect. Each piece tells the story of medieval life in this remote Alpine valley.",
      details: [
        { label: "Discovery", value: "Ruhpolding Abbey excavation site" },
        { label: "Period", value: "High Medieval to Late Medieval" },
        { label: "Conservation", value: "Restored using traditional methods" },
        { label: "Significance", value: "Evidence of medieval pilgrimage routes" },
        { label: "Collection Size", value: "47 individual artifacts" },
        { label: "Research Status", value: "Ongoing archaeological study" }
      ],
      category: "Archaeological Finds"
    },
    oldCabinet: {
      title: "Apothecary Cabinet",
      period: "17th Century (1680)",
      origin: "Traunstein Monastery",
      catalogNumber: "RHM-2024-003",
      story: "This oak cabinet served the monastery's apothecary for over 200 years. Brother Benedict, the monastery's herbalist, used these drawers to store medicinal herbs gathered from the surrounding Alpine meadows. Each small drawer is labeled in Latin with the names of healing plants: Arnica montana for bruises, Gentiana for digestive ailments, and Hypericum for wounds. The cabinet still carries the faint aroma of centuries-old herbs and remedies that healed both pilgrims and local villagers.",
      details: [
        { label: "Material", value: "Bavarian Oak with iron fittings" },
        { label: "Compartments", value: "48 original herb storage drawers" },
        { label: "Usage", value: "Monastery apothecary and infirmary" },
        { label: "Labels", value: "Original Latin nomenclature intact" },
        { label: "Herb Residue", value: "Scientific analysis completed" },
        { label: "Cultural Value", value: "UNESCO consideration pending" }
      ],
      category: "Medical & Scientific Instruments"
    },
    displayCabinet: {
      title: "Precious Vessels Collection",
      period: "16th-18th Century",
      origin: "Various Bavarian Churches",
      catalogNumber: "RHM-2024-004",
      story: "This glass cabinet houses sacred vessels from various Bavarian churches that were closed during the Napoleonic suppression of monasteries. The silver chalice belonged to the Chapel of St. Wolfgang, while the ornate monstrance was crafted by Augsburg silversmiths for the pilgrimage church of Maria Hilf. These objects witnessed countless baptisms, weddings, and funeral masses in small Alpine communities, carrying the prayers and hopes of generations of faithful Bavarians.",
      details: [
        { label: "Contents", value: "Sacred vessels and liturgical objects" },
        { label: "Craftsmanship", value: "Augsburg and Munich silversmiths" },
        { label: "Style Period", value: "Baroque to Rococo" },
        { label: "Documentation", value: "Original church inventories preserved" },
        { label: "Silver Content", value: "925 sterling silver, hallmarked" },
        { label: "Religious Significance", value: "Blessed artifacts, deconsecrated" }
      ],
      category: "Religious Artifacts"
    },
    statues: {
      title: "Guardian Saints Portal",
      period: "Gothic Period (14th Century)",
      origin: "Church of St. Peter, Ruhpolding",
      catalogNumber: "RHM-2024-005",
      story: "This magnificent portal once graced the entrance to the original Church of St. Peter in Ruhpolding. The central arch features St. Peter holding the keys to heaven, flanked by St. Wolfgang and St. Leonard, patron saints of Bavaria. Local legend says that touching the worn stone hands of St. Wolfgang brings protection to travelers crossing the treacherous Alpine passes. The portal survived the great fire of 1641 and was carefully relocated when the church was rebuilt in Baroque style.",
      details: [
        { label: "Material", value: "Local limestone with polychromy traces" },
        { label: "Sculptor", value: "Master Wilhelm of Salzburg (attributed)" },
        { label: "Iconography", value: "St. Peter, St. Wolfgang, St. Leonard" },
        { label: "Historical Event", value: "Survived 1641 church fire" },
        { label: "Weight", value: "Approximately 2,400 kg" },
        { label: "Conservation", value: "Stone consolidation completed 2019" }
      ],
      category: "Architectural Elements"
    },
    carrier: {
      title: "Traditional Alpine Carrying Frame",
      period: "19th Century (1850-1900)",
      origin: "Berchtesgaden Region",
      catalogNumber: "RHM-2024-006",
      story: "This wooden carrying frame, called a 'Kraxe' in Bavarian dialect, was used by mountain folk to transport goods across the steep Alpine terrain. Hans Wintermantel, a salt carrier from Berchtesgaden, used this very frame to carry 50-kilogram salt blocks along the ancient trade routes to Austria. The carved decorations tell his family story - the edelweiss flowers represent his wife Anna, while the hunting scenes honor his father's tradition as a royal gamekeeper in the Bavarian Forest.",
      details: [
        { label: "Material", value: "Mountain ash wood with leather straps" },
        { label: "Load Capacity", value: "Up to 50 kilograms" },
        { label: "Trade Route", value: "Berchtesgaden-Austria salt road" },
        { label: "Family Motifs", value: "Personal heraldic decorations" },
        { label: "Usage Period", value: "Active use 1850-1910" },
        { label: "Ethnological Value", value: "Alpine work culture documentation" }
      ],
      category: "Folk Culture & Trade"
    },
    picture: {
      title: "The Last Hunt of King Ludwig",
      period: "Late 19th Century (1885)",
      origin: "Court Painter Anton Seitz",
      catalogNumber: "RHM-2024-007",
      story: "This romantic painting depicts King Ludwig II's final hunting expedition in the Bavarian Forest, just months before his mysterious death in Lake Starnberg. The artist, Anton Seitz, was commissioned by the King himself to capture the melancholy beauty of autumn in the Alps. Ludwig appears contemplative, perhaps sensing his fate. Local hunters claim they still hear ghostly hunting horns echoing through these same forests on foggy October nights, as if the 'Fairy Tale King' continues his eternal hunt through the Bavarian wilderness.",
      details: [
        { label: "Artist", value: "Anton Seitz (1829-1900)" },
        { label: "Medium", value: "Oil on canvas" },
        { label: "Dimensions", value: "120 × 180 cm" },
        { label: "Commission", value: "King Ludwig II personal collection" },
        { label: "Artistic Movement", value: "German Romanticism" },
        { label: "Insurance Value", value: "€2.4 million (2024 appraisal)" }
      ],
      category: "Fine Arts & Paintings"
    },
    golden: {
      title: "Abbey Chandelier of St. Zeno",
      period: "Baroque Period (1720)",
      origin: "Benedictine Abbey of St. Zeno",
      catalogNumber: "RHM-2024-008",
      story: "This magnificent chandelier once illuminated the high altar of the Benedictine Abbey of St. Zeno. Cast in bronze and gilded with Alpine gold from the Salzach River, it was commissioned by Abbot Rupert III to celebrate the abbey's 500th anniversary. During Napoleon's invasion, the monks buried it in the abbey gardens to save it from plunder. It remained hidden for nearly 20 years until Brother Matthias remembered its location on his deathbed. Each of the 24 candles represents one hour of prayer that the monks observed daily.",
      details: [
        { label: "Material", value: "Bronze with Salzach gold gilding" },
        { label: "Candle Points", value: "24 (representing daily prayer hours)" },
        { label: "Weight", value: "Approximately 150 kilograms" },
        { label: "Hidden Period", value: "1806-1826 during Napoleonic wars" },
        { label: "Gold Content", value: "18-karat Alpine gold leaf" },
        { label: "Restoration", value: "Master craftsman restoration 2020" }
      ],
      category: "Liturgical Arts & Metalwork"
    }
  };

  const data = objectData[object];
  if (!data) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `rgba(0, 0, 0, ${isVisible ? '0.92' : '0'})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem',
      backdropFilter: `blur(${isVisible ? '12px' : '0px'})`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isVisible ? 1 : 0
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: '12px',
        padding: '0',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'hidden',
        border: '1px solid #e9ecef',
        boxShadow: `
          0 25px 50px rgba(0, 0, 0, 0.25),
          0 10px 25px rgba(0, 0, 0, 0.15)
        `,
        position: 'relative',
        transform: `scale(${isVisible ? '1' : '0.95'}) translateY(${isVisible ? '0' : '10px'})`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
      }}>
        
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          color: 'white',
          padding: '2rem 2.5rem 1.5rem',
          position: 'relative'
        }}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: 'white',
              fontSize: '1.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontWeight: 'normal'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>

          {/* Catalog Number */}
          <div style={{
            fontSize: '0.8rem',
            opacity: 0.8,
            marginBottom: '0.5rem',
            letterSpacing: '0.5px',
            fontWeight: '500'
          }}>
            {data.catalogNumber}
          </div>

          {/* Title */}
          <h1 style={{
            margin: '0 0 1rem 0',
            fontSize: '2rem',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {data.title}
          </h1>

          {/* Category Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '500',
            letterSpacing: '0.3px'
          }}>
            {data.category}
          </div>

          {/* Basic Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
            fontSize: '0.9rem'
          }}>
            <div>
              <div style={{ opacity: 0.8, marginBottom: '0.2rem' }}>Period</div>
              <div style={{ fontWeight: '500' }}>{data.period}</div>
            </div>
            <div>
              <div style={{ opacity: 0.8, marginBottom: '0.2rem' }}>Origin</div>
              <div style={{ fontWeight: '500' }}>{data.origin}</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{
          padding: '2.5rem',
          maxHeight: 'calc(90vh - 200px)',
          overflowY: 'auto'
        }}>
          
          {/* Historical Narrative */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#e74c3c' }}>📜</span>
              Historical Narrative
            </h2>
            <p style={{
              color: '#495057',
              lineHeight: '1.7',
              fontSize: '1rem',
              margin: 0,
              textAlign: 'justify'
            }}>
              {data.story}
            </p>
          </section>

          {/* Technical Specifications */}
          <section>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#3498db' }}>🔍</span>
              Technical Specifications
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {data.details.map((detail, index) => (
                <div
                  key={index}
                  style={{
                    background: '#f8f9fa',
                    padding: '1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}
                >
                  <div style={{
                    color: '#6c757d',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem'
                  }}>
                    {detail.label}
                  </div>
                  <div style={{
                    color: '#343a40',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f8f9fa',
          padding: '1.5rem 2.5rem',
          borderTop: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: '#6c757d'
        }}>
          <div>
            Ruhpolding Heritage Museum Collection
          </div>
          <div>
            © 2024 Museum Documentation System
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetailsModal;