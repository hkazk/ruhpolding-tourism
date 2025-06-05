import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// Menu data structure
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

export const pageAtom = atom(0);

// Create pages array with cover and menu pages
export const menuPages = [
  {
    isCover: true,
    title: "Menu Cover"
  },
  ...menuData
];

export const MenuUI = ({ onClose }) => {
  const [page, setPage] = useAtom(pageAtom);

  // Page flip sound effect
  useEffect(() => {
    if (page > 0) {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dyvmk");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="pointer-events-auto mt-6 mr-6 self-end bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold transition-all duration-200 shadow-lg"
        >
          ×
        </button>

        {/* Page Navigation */}
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-3 max-w-full p-6">
            {[...menuPages].map((pageData, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-yellow-400 transition-all duration-300 px-4 py-2 rounded-full text-sm uppercase shrink-0 border-2 font-medium ${
                  index === page
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "bg-black/40 text-white hover:bg-black/60"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `${pageData.title}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-yellow-400 transition-all duration-300 px-4 py-2 rounded-full text-sm uppercase shrink-0 border-2 font-medium ${
                page === menuPages.length
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
              onClick={() => setPage(menuPages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* Background Text Animation */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none overflow-hidden">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white/20 text-8xl font-black">
              Bavarian
            </h1>
            <h2 className="shrink-0 text-white/15 text-6xl italic font-light">
              Traditional
            </h2>
            <h2 className="shrink-0 text-white/20 text-9xl font-bold">
              Cuisine
            </h2>
            <h2 className="shrink-0 text-transparent text-9xl font-bold italic outline-text">
              Alpine
            </h2>
            <h2 className="shrink-0 text-white/15 text-7xl font-medium">
              Menu
            </h2>
            <h2 className="shrink-0 text-white/15 text-7xl font-extralight italic">
              Speisekarte
            </h2>
            <h2 className="shrink-0 text-white/20 text-10xl font-bold">
              Ruhpolding
            </h2>
            <h2 className="shrink-0 text-transparent text-10xl font-bold outline-text italic">
              Heritage
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white/20 text-8xl font-black">
              Bavarian
            </h1>
            <h2 className="shrink-0 text-white/15 text-6xl italic font-light">
              Traditional
            </h2>
            <h2 className="shrink-0 text-white/20 text-9xl font-bold">
              Cuisine
            </h2>
            <h2 className="shrink-0 text-transparent text-9xl font-bold italic outline-text">
              Alpine
            </h2>
            <h2 className="shrink-0 text-white/15 text-7xl font-medium">
              Menu
            </h2>
            <h2 className="shrink-0 text-white/15 text-7xl font-extralight italic">
              Speisekarte
            </h2>
            <h2 className="shrink-0 text-white/20 text-10xl font-bold">
              Ruhpolding
            </h2>
            <h2 className="shrink-0 text-transparent text-10xl font-bold outline-text italic">
              Heritage
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};