/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Coffee, ChevronLeft, X, ShoppingBag, Plus, Minus, CheckSquare, ArrowLeft, Phone, CreditCard, Globe, Home, ConciergeBell, ArrowLeftRight, ChevronDown } from 'lucide-react';

type MenuItem = { id: number; name: string; price: string; images: string[] };

type TrayItem = {
  id: string;
  item: MenuItem;
  variant: 'single' | 'double';
  hasIceCream: boolean;
  quantity: number;
  totalPrice: number;
};

// Menu items list
const menuItems: MenuItem[] = [
  { id: 1, name: 'Cinnamon & Sugar', price: 'R10', images: ['/cinnamon-1.jpg', '/cinnamon-2.jpg'] },
  { id: 2, name: 'Banana', price: 'R15', images: ['/banana-1.jpg', '/banana-2.jpg'] },
  { id: 3, name: 'Milk Tart Filling', price: 'R15', images: ['/milktart-1.jpg', '/milktart-2.jpg'] },
  { id: 4, name: 'Caramel', price: 'R14', images: ['/caramel-1.jpg', '/caramel-2.jpg'] },
  { id: 5, name: 'Nutella', price: 'R20', images: ['/nutella-1.jpg', '/nutella-2.jpg'] },
  { id: 6, name: 'Caramel & Banana', price: 'R20', images: ['/caramelbanana-1.jpg', '/caramelbanana-2.jpg'] },
  { id: 7, name: 'Nutella & Banana', price: 'R25', images: ['/nutellabanana-1.jpg', '/nutellabanana-2.jpg'] },
];

// Cafe menu items list
const cafeMenuItems: MenuItem[] = [
  { id: 1, name: 'Cinnamon & Sugar', price: 'R15 - R25', images: ['/cinnamon-1.jpg', '/cinnamon-2.jpg'] },
  { id: 2, name: 'Banana', price: 'R15 - R28', images: ['/banana-1.jpg', '/banana-2.jpg'] },
  { id: 3, name: 'Caramel', price: 'R20 - R38', images: ['/caramel-1.jpg', '/caramel-2.jpg'] },
  { id: 4, name: 'Milk Tart Filling', price: 'R20 - R38', images: ['/milktart-1.jpg', '/milktart-2.jpg'] },
  { id: 5, name: 'Lemon Curd Filling', price: 'R20 - R38', images: ['/lemon-1.jpg', '/lemon-2.jpg'] },
  { id: 6, name: 'Nutella', price: 'R25 - R48', images: ['/nutella-1.jpg', '/nutella-2.jpg'] },
  { id: 7, name: 'Caramel & Banana', price: 'R25 - R48', images: ['/caramelbanana-1.jpg', '/caramelbanana-2.jpg'] },
  { id: 8, name: 'Nutella & Banana', price: 'R30 - R58', images: ['/nutellabanana-1.jpg', '/nutellabanana-2.jpg'] },
  { id: 9, name: 'Biscoff', price: 'R30 - R58', images: ['/biscoff-1.jpg', '/biscoff-2.jpg'] },
  { id: 10, name: 'Caramel & Strawberries', price: 'R35 - R65', images: ['/caramelstraw-1.jpg', '/caramelstraw-2.jpg'] },
  { id: 11, name: 'Nutella & Strawberries', price: 'R35 - R65', images: ['/nutellastraw-1.jpg', '/nutellastraw-2.jpg'] },
];

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: any) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: any) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-[#1c1c1f]" />;
  }

  return (
    <div className="relative w-full h-full group overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-300"
      />

      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
        >
          &lt;
        </button>
      )}

      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
        >
          &gt;
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#ff007f] scale-110' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'main' | 'landing' | 'trailer-menu' | 'cafe-menu' | 'checkout' | 'confirmation'>('landing');
  const [selectedPath, setSelectedPath] = useState<'trailer' | 'cafe' | null>(null);
  const [tray, setTray] = useState<TrayItem[]>([]);
  const trayCount = tray.reduce((acc, curr) => acc + curr.quantity, 0);
  const trayTotal = tray.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const [showEmptyTrayBanner, setShowEmptyTrayBanner] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [variant, setVariant] = useState<'single' | 'double'>('single');
  const [hasIceCream, setHasIceCream] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'cafe' | 'trailer'>('cafe');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'yoco'>('whatsapp');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'apple' | 'google' | 'card'>('google');

  // Background loader and global Z-index override
  useEffect(() => {
    if (view === 'checkout') {
      if (!document.getElementById('yoco-sdk-script')) {
        const script = document.createElement('script');
        script.id = 'yoco-sdk-script';
        script.src = 'https://js.yoco.com/v1/yocojs.js';
        script.async = true;
        document.head.appendChild(script);
      }
      
      // CSS Hotfix to guarantee Yoco's iframe sits absolutely above ALL Tailwind layout boxes
      if (!document.getElementById('yoco-css-override')) {
        const style = document.createElement('style');
        style.id = 'yoco-css-override';
        style.innerHTML = `
          iframe[src*="yoco"], div[style*="z-index: 9999"], div[style*="z-index:9999"] {
            z-index: 2147483647 !important;
            position: fixed !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [view]);

  const openCustomize = (item: MenuItem) => {
    setSelectedItem(item);
    setVariant('single');
    setHasIceCream(false);
    setQuantity(1);
  };

  const getCalculatedPrice = () => {
    if (!selectedItem) return 0;
    const basePrice = parseInt(selectedItem.price.replace('R', ''));
    const variantPrice = variant === 'double' ? basePrice + 10 : basePrice;
    const iceCreamPrice = hasIceCream ? 15 : 0;
    return (variantPrice + iceCreamPrice) * quantity;
  };

  const handleAddToTray = () => {
    if (!selectedItem) return;
    const newItem: TrayItem = {
      id: Math.random().toString(36).substr(2, 9),
      item: selectedItem,
      variant,
      hasIceCream,
      quantity,
      totalPrice: getCalculatedPrice()
    };
    setTray(prev => [...prev, newItem]);
    setSelectedItem(null);
  };

  const handleRemoveFromTray = (id: string) => {
    setTray(prev => prev.filter(item => item.id !== id));
  };

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#000000]/40 backdrop-blur-[15px] border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-20 px-2 max-w-md mx-auto">
        <button 
          onClick={() => setView('main')}
          className={`flex flex-col items-center justify-center w-full gap-1 p-2 transition-colors ${view === 'main' ? 'text-brand-pink' : 'text-[#a1a1aa] hover:text-white'}`}
        >
          <Home className="w-6 h-6" strokeWidth={view === 'main' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button 
          onClick={() => {
            if (selectedPath) {
              setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu');
            } else {
              setView('main');
            }
          }}
          className={`flex flex-col items-center justify-center w-full gap-1 p-2 transition-colors ${view === 'cafe-menu' || view === 'trailer-menu' ? 'text-brand-pink' : 'text-[#a1a1aa] hover:text-white'}`}
        >
          <ConciergeBell className="w-6 h-6" strokeWidth={view === 'cafe-menu' || view === 'trailer-menu' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Menu</span>
        </button>
        <button 
          onClick={() => {
            setTray([]);
            setSelectedPath(null);
            setView('landing');
          }}
          className={`flex flex-col items-center justify-center w-full gap-1 p-2 transition-colors text-[#a1a1aa] hover:text-white`}
        >
          <ArrowLeftRight className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-center">Switch Path</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center w-full font-sans selection:bg-brand-pink/30">
      <div className="w-full max-w-[430px] flex flex-col relative h-[100dvh]">
        
        {view === 'main' && (
          <div className="flex flex-col flex-1 h-full bg-[#000000] relative overflow-hidden">
            {/* Background Embers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="living-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 8 + 4}px`,
                    height: `${Math.random() * 8 + 4}px`,
                    animationDuration: `${Math.random() * 15 + 10}s`,
                    animationDelay: `${Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>

            {/* Top Header Lockup */}
            <div className="flex items-center justify-between p-5 z-30 absolute top-0 left-0 right-0 w-full pointer-events-none bg-[#000000]/40 backdrop-blur-[15px]">
              <div className="pointer-events-auto">
                <h1 className="text-[17px] font-black tracking-tighter uppercase leading-none text-flow-shine">
                  Pancake Passion
                </h1>
              </div>
              
              <button 
                onClick={() => {
                  if (trayCount === 0) {
                    setShowEmptyTrayBanner(true);
                    setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu');
                  } else {
                    setView('checkout');
                  }
                }}
                className="relative p-2 active:scale-95 transition-transform pointer-events-auto"
              >
                <ShoppingBag className="w-6 h-6 text-white" />
                {trayCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#000000]">
                    {trayCount}
                  </span>
                )}
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto z-10 flex flex-col pt-20">
              
              {/* Massive Hero Section */}
              <div className="min-h-[90vh] flex flex-col items-center justify-center relative p-8 text-center shrink-0 bg-[#000000]/20 backdrop-blur-[15px] mx-4 rounded-3xl mt-4 border border-white/5 shadow-2xl">
                <div className="z-10 flex flex-col items-center mt-[-5vh]">
                    <h2 className="text-[52px] md:text-6xl font-black text-white leading-[1.05] tracking-tighter mb-4 uppercase font-serif text-flow-shine">
                      A PASSION <br/>FOR <br/>PANCAKES
                    </h2>
                    <p className="text-[#facc15] font-cursive text-[32px] mt-4 max-w-[280px] leading-tight drop-shadow-md">Delicious, light and fluffy.</p>

                    {/* BOGO Badge */}
                    {selectedPath === 'cafe' && new Date().getDay() === 5 && (
                      <div className="mt-8 relative flex flex-col items-center justify-center bg-[#1a1300] border-2 border-[#facc15] rounded-full w-48 h-48 shadow-[0_0_30px_rgba(255,20,147,0.6)] p-4 text-center">
                        <div className="absolute inset-0 rounded-full border-[4px] border-[#ff1493] opacity-50 animate-pulse"></div>
                        <span className="text-[#facc15] font-black text-[10px] uppercase tracking-widest mb-1">Friday Special!</span>
                        <span className="text-white font-black text-3xl uppercase leading-none mb-1 shadow-[#ff1493]">BOGO!</span>
                        <span className="text-brand-pink font-bold text-[11px] uppercase leading-tight mb-2">Buy One Get<br/>One Free!</span>
                        <span className="text-[#a1a1aa] text-[8px] uppercase tracking-wider max-w-[120px]">Limit 1 per customer. On Fridays only.</span>
                      </div>
                    )}
                </div>
                
                {/* Scroll Indicator */}
                <button 
                  onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce cursor-pointer hover:opacity-100 transition-opacity"
                >
                  <span className="text-[10px] uppercase tracking-widest text-white font-bold">Scroll to order</span>
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Massive Vertical Spacer */}
              <div className="h-[40vh] shrink-0"></div>

              {/* Main CTA Section (Vertical Stack) */}
              <div id="cta-section" className="flex flex-col gap-3 p-6 shrink-0 bg-[#000000]/40 backdrop-blur-[15px] border-t border-white/5 rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <button 
                  onClick={() => setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu')}
                  className="w-full bg-[#1c1c1f]/80 backdrop-blur-md border border-brand-pink rounded-2xl py-4 font-black text-white text-[16px] tracking-wide hover:bg-[#27272a] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_15px_rgba(255,20,147,0.2)]"
                >
                  View Menu
                </button>
                
                <button 
                  onClick={() => {
                    if (trayCount === 0) {
                      setShowEmptyTrayBanner(true);
                      setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu');
                    } else {
                      setView('checkout');
                    }
                  }}
                  className="w-full bg-brand-pink rounded-2xl py-4 font-bold text-white text-[16px] tracking-wide hover:bg-brand-pink/90 active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,20,147,0.4)]"
                >
                  Checkout Online
                </button>
                
                <button 
                  onClick={() => {
                    if (trayCount === 0) {
                      setShowEmptyTrayBanner(true);
                      setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu');
                    } else {
                      setView('checkout');
                    }
                  }}
                  className="w-full bg-[#25D366] rounded-2xl py-4 font-bold text-white text-[16px] tracking-wide hover:bg-[#25D366]/90 active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.2)]"
                >
                  Order via WhatsApp
                </button>
                
                <a 
                  href="tel:0833224285"
                  className="w-full bg-white rounded-2xl py-4 font-bold text-black text-[16px] tracking-wide hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  Call To Book
                </a>
              </div>

              {/* Mobile-Optimized Three-Part Footer */}
              <div className="shrink-0 bg-[#000000]/40 backdrop-blur-[15px] px-6 pb-6">
                <div className="border border-[#27272a] rounded-[24px] p-6 flex flex-col gap-8 bg-[#0a0a0a]">
                  
                  {/* Block 1 (Brand Profile) */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white font-black text-[18px] tracking-tight uppercase">Pancake Passion</h3>
                    <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
                      Born from an uncompromising love for authentic, buttery South African pancakes. We serve the Eastern Cape with premium creations straight from our Vincent café counter and our mobile trailer.
                    </p>
                  </div>

                  {/* Block 2 (Location Info) */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-white font-bold text-[12px] uppercase tracking-wider">Visit the Cafe</h4>
                    <p className="text-[#a1a1aa] text-[13px] leading-relaxed mb-1">
                      The Batter &amp; Bean Cafe<br/>4 Donald Road, Vincent, East London
                    </p>
                    <button className="w-full border border-[#27272a] text-white rounded-full py-3 text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#18181b] active:scale-[0.98] transition-all">
                      <MapPin className="w-4 h-4 text-brand-pink" />
                      OPEN IN GOOGLE MAPS
                    </button>
                  </div>

                  {/* Block 3 (Contact Hub) */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-white font-bold text-[12px] uppercase tracking-wider">Connect with Renee</h4>
                    <a href="tel:+27833224285" className="w-full border border-[#27272a] text-white rounded-full py-3 text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#18181b] active:scale-[0.98] transition-all">
                      <Phone className="w-4 h-4 text-brand-pink" />
                      +27 83 322 4285
                    </a>
                    <button className="w-full border border-[#27272a] text-white rounded-full py-3 text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#18181b] active:scale-[0.98] transition-all">
                      <Globe className="w-4 h-4 text-brand-pink" />
                      FOLLOW ON FACEBOOK
                    </button>
                  </div>

                </div>
              </div>

              {/* Layout Buffer for Bottom Navigation Bar */}
              <div className="h-28 shrink-0 opacity-0 pointer-events-none"></div>

            </div>

            {renderBottomNav()}
          </div>
        )}

        {view === 'landing' && (
          <div className="flex flex-col flex-1 h-full bg-[#000000] relative overflow-hidden">
            {showEmptyTrayBanner && (
              <div className="bg-[#121214] text-brand-pink p-3 px-4 text-[13px] font-bold flex justify-between items-center border-b border-[#27272a] z-30">
                <p className="flex-1 text-center leading-snug mr-2">Your tray is empty! Add some pancakes to your tray before heading to checkout.</p>
                <button onClick={() => setShowEmptyTrayBanner(false)} className="p-1 active:scale-95"><X className="w-5 h-5" /></button>
              </div>
            )}
            
            <div className="p-6 flex flex-col items-center flex-1 overflow-y-auto pb-28 z-10">
              {/* Header Section */}
              <header className="mt-8 mb-8 flex flex-col items-center w-full text-center">
                <div className="mb-4 flex justify-center items-center w-full h-12">
                  <img 
                    src="/logo.png" 
                    alt="Pancake Passion Logo" 
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <h1 className="hidden text-3xl md:text-4xl font-black text-brand-pink tracking-tighter uppercase">
                    Pancake Passion
                  </h1>
                </div>
                
                <h2 className="text-[17px] font-semibold text-[#f4f4f5] tracking-tight">
                  Where are you ordering from today?
                </h2>
              </header>

              {/* Venue Options */}
              <div className="flex flex-col gap-4 w-full">
                
                {/* Card 1: Mobile Trailer */}
                <button 
                  onClick={() => {
                    setSelectedPath('trailer');
                    setView('main');
                  }}
                  className="bg-[#121214] border border-[#27272a] rounded-2xl p-8 flex flex-col items-center text-center hover:bg-[#18181b] hover:border-[#3f3f46] transition-all group active:scale-[0.98]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2a131c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-brand-pink" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-[15px] font-black uppercase text-white mb-2.5 flex items-center justify-center gap-2 tracking-wide">
                    <span className="text-brand-pink">📍</span> 
                    I am at the mobile trailer
                  </h3>
                  
                  <p className="text-[13px] text-[#a1a1aa] leading-relaxed max-w-[280px]">
                    Select this to browse our trailer's custom flat-rate menu
                  </p>
                </button>

                {/* Card 2: Cafe / Online */}
                <button 
                  onClick={() => {
                    setSelectedPath('cafe');
                    setView('main');
                  }}
                  className="bg-[#121214] border border-[#27272a] rounded-2xl p-8 flex flex-col items-center text-center hover:bg-[#18181b] hover:border-[#3f3f46] transition-all group active:scale-[0.98]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#201d1c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Coffee className="w-7 h-7 text-[#fde047]" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-[15px] font-black uppercase text-white mb-2.5 flex items-center justify-center gap-2 tracking-wide leading-snug">
                    <span>☕</span> 
                    I am at the batter & bean café
                    <br />
                    (or ordering online)
                  </h3>
                  
                  <p className="text-[13px] text-[#a1a1aa] leading-relaxed max-w-[280px]">
                    Select this to browse our full café dine-in and online menu with portion options
                  </p>
                </button>
                
              </div>
            </div>
            
          </div>
        )}
        
        {view === 'trailer-menu' && (
          <div className="flex flex-col flex-1 h-full bg-[#000000] relative overflow-hidden">
            <div className="breathing-glow"></div>
            
            {/* Sticky Header Group */}
            <div className="sticky top-0 z-30 bg-[#000000]/95 backdrop-blur-sm flex flex-col w-full border-b border-[#18181b]">
              {showEmptyTrayBanner && (
                <div className="bg-[#121214] text-brand-pink p-3 px-4 text-[13px] font-bold flex justify-between items-center border-b border-[#27272a]">
                  <p className="flex-1 text-center leading-snug mr-2">Your tray is empty! Add some pancakes to your tray before heading to checkout.</p>
                  <button onClick={() => setShowEmptyTrayBanner(false)} className="p-1 active:scale-95"><X className="w-5 h-5" /></button>
                </div>
              )}
              
              {/* Top Navigation */}
              <div className="flex items-center justify-between p-4">
                <button 
                  onClick={() => setView('main')} 
                  className="flex items-center gap-1 p-2 -ml-2 text-white hover:bg-[#18181b] rounded-full transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-[14px] font-bold">Back</span>
                </button>
                
                <div className="h-7 absolute left-1/2 -translate-x-1/2">
                  <img 
                    src="/logo.png" 
                    alt="Pancake Passion Logo" 
                    className="h-full object-contain" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }} 
                  />
                  <h1 className="hidden text-[17px] font-black text-brand-pink tracking-tighter uppercase">
                    Pancake Passion
                  </h1>
                </div>

                <button 
                  onClick={() => {
                    if (trayCount === 0) {
                      setShowEmptyTrayBanner(true);
                    } else {
                      setView('checkout');
                    }
                  }}
                  className="relative p-2 active:scale-95 transition-transform"
                >
                  <ShoppingBag className="w-6 h-6 text-white" />
                  <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#000000]">
                    {trayCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Menu List */}
            <div className="p-5 overflow-y-auto pb-28 z-10">
              <header className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Pancakes</h2>
                <p className="text-[14px] text-[#a1a1aa] leading-snug">
                  Select any pancake to customize its size variant and add-ons
                </p>
              </header>

              <div className="flex flex-col gap-5">
                {menuItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-[#121214] border border-[#27272a] rounded-[20px] overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full bg-[#1c1c1f] relative">
                      <ImageCarousel images={item.images} alt={item.name} />
                    </div>
                    
                    <div className="p-5 flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[20px] font-black text-white leading-tight tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-brand-pink font-bold text-[17px]">
                          {item.price}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => openCustomize(item)}
                        className="w-full py-3.5 rounded-xl bg-[#1c1c1f] border border-[#27272a] text-white text-[15px] font-bold flex items-center justify-center hover:bg-[#27272a] active:bg-[#121214] active:scale-[0.98] transition-all"
                      >
                        + Customize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderBottomNav()}
          </div>
        )}

        {view === 'cafe-menu' && (
          <div className="flex flex-col flex-1 h-full bg-[#000000] relative overflow-hidden">
            <div className="breathing-glow"></div>
            
            {/* Sticky Header Group */}
            <div className="sticky top-0 z-30 bg-[#000000]/95 backdrop-blur-sm flex flex-col w-full border-b border-[#18181b]">
              {showEmptyTrayBanner && (
                <div className="bg-[#121214] text-brand-pink p-3 px-4 text-[13px] font-bold flex justify-between items-center border-b border-[#27272a]">
                  <p className="flex-1 text-center leading-snug mr-2">Your tray is empty! Add some pancakes to your tray before heading to checkout.</p>
                  <button onClick={() => setShowEmptyTrayBanner(false)} className="p-1 active:scale-95"><X className="w-5 h-5" /></button>
                </div>
              )}
              
              {/* Top Navigation */}
              <div className="flex items-center justify-between p-4">
                <button 
                  onClick={() => setView('main')} 
                  className="flex items-center gap-1 p-2 -ml-2 text-white hover:bg-[#18181b] rounded-full transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-[14px] font-bold">Back</span>
                </button>
                
                <div className="h-7 absolute left-1/2 -translate-x-1/2">
                  <img 
                    src="/logo.png" 
                    alt="Pancake Passion Logo" 
                    className="h-full object-contain" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }} 
                  />
                  <h1 className="hidden text-[17px] font-black text-brand-pink tracking-tighter uppercase leading-none">
                    Pancake Passion
                  </h1>
                </div>

                <button 
                  onClick={() => {
                    if (trayCount === 0) {
                      setShowEmptyTrayBanner(true);
                    } else {
                      setView('checkout');
                    }
                  }}
                  className="relative p-2 active:scale-95 transition-transform"
                >
                  <ShoppingBag className="w-6 h-6 text-white" />
                  <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#000000]">
                    {trayCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Menu List */}
            <div className="p-5 overflow-y-auto pb-28 z-10">
              <header className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Pancakes</h2>
                <p className="text-[14px] text-[#a1a1aa] leading-snug">
                  Select any pancake to customize its size variant and add-ons
                </p>
              </header>

              <div className="flex flex-col gap-5">
                {cafeMenuItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-[#121214] border border-[#27272a] rounded-[20px] overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full bg-[#1c1c1f] relative">
                      <ImageCarousel images={item.images} alt={item.name} />
                    </div>
                    
                    <div className="p-5 flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[20px] font-black text-white leading-tight tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-brand-pink font-bold text-[17px]">
                          {item.price}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => openCustomize(item)}
                        className="w-full py-3.5 rounded-xl bg-transparent border-2 border-[#27272a] text-white text-[15px] font-bold flex items-center justify-center hover:bg-[#1c1c1f] hover:border-[#3f3f46] active:bg-[#121214] active:scale-[0.98] transition-all"
                      >
                        + Customize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderBottomNav()}
          </div>
        )}

        {/* CHECKOUT LAYOUT COMPLETELY FLATTENED TO AVOID Z-INDEX WARS */}
        {view === 'checkout' && (
          <div className="flex flex-col flex-1 h-full bg-[#000000] relative overflow-hidden">
            {/* Flattened Header Frame */}
            <div className="flex items-center justify-between p-5 sticky top-0 bg-[#000000]/95 backdrop-blur-[15px] border-b border-[#18181b] w-full pointer-events-auto">
              <h1 className="text-[17px] font-black tracking-tighter uppercase leading-none text-flow-shine">
                Pancake Passion
              </h1>
              
              <button 
                onClick={() => {
                  if (trayCount === 0) {
                    setShowEmptyTrayBanner(true);
                    setView(selectedPath === 'trailer' ? 'trailer-menu' : 'cafe-menu');
                  }
                }}
                className="relative p-2 active:scale-95 transition-transform"
              >
                <ShoppingBag className="w-6 h-6 text-white" />
                {trayCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#000000]">
                    {trayCount}
                  </span>
                )}
              </button>
            </div>

            {/* Content Container (z-10 removed completely to let Yoco overlap normally) */}
            <div className="flex-1 overflow-y-auto w-full p-4 pb-24 flex flex-col gap-6">
              
              {/* Top Navigation */}
              <button 
                onClick={() => setView('main')} 
                className="flex items-center gap-1 text-brand-pink font-bold text-[14px] w-fit active:opacity-70 transition-opacity mt-2"
              >
                &lt; Back to Homepage
              </button>

              {/* Order Management Stack */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-bold text-[18px]">Your Tray ({trayCount})</h2>
                  <button 
                    onClick={() => {
                      setTray([]);
                    }}
                    className="text-[#a1a1aa] text-[14px] underline active:text-white"
                  >
                    Clear Tray
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {tray.map(trayItem => (
                    <div key={trayItem.id} className="bg-[#121214] rounded-[16px] p-4 flex justify-between items-start">
                      <div className="flex flex-col gap-1 flex-1 pr-2">
                        <span className="text-white font-bold text-[15px]">{trayItem.quantity}x {trayItem.item.name}</span>
                        <span className="text-[#a1a1aa] text-[12px] leading-tight">
                          Size: {trayItem.variant === 'double' ? 'Double' : 'Single'} ({trayItem.quantity}x) @ {trayItem.item.price}
                          {trayItem.hasIceCream && ' + Ice-Cream'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-brand-pink font-bold text-[16px]">R{trayItem.totalPrice}</span>
                        <button 
                          onClick={() => handleRemoveFromTray(trayItem.id)}
                          className="w-7 h-7 rounded-full bg-[#1c1c1f] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-all active:scale-95"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {tray.length === 0 && (
                    <div className="bg-[#121214] rounded-[16px] p-6 text-center text-[#a1a1aa] text-[14px]">
                      Your tray is empty.
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#18181b]">
                  <span className="text-white font-bold text-[18px]">Total Due:</span>
                  <span className="text-brand-pink font-black text-[22px]">R{trayTotal}</span>
                </div>
              </div>

              {/* Right Column Layout (Pickup Details Form & CTAs) */}
              <div className="bg-[#121214] rounded-[20px] p-5 flex flex-col gap-5 mt-2 border border-[#27272a]">
                <div className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    placeholder="FIRST NAME *" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#000000] text-white placeholder:text-[#52525b] text-[14px] font-bold px-4 py-3.5 rounded-[12px] border border-transparent focus:border-brand-pink focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="LAST NAME *" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#000000] text-white placeholder:text-[#52525b] text-[14px] font-bold px-4 py-3.5 rounded-[12px] border border-transparent focus:border-brand-pink focus:outline-none"
                  />
                  <input 
                    type="tel" 
                    placeholder="WHATSAPP PHONE NUMBER *" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#000000] text-white placeholder:text-[#52525b] text-[14px] font-bold px-4 py-3.5 rounded-[12px] border border-transparent focus:border-brand-pink focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 mt-1">
                  <button 
                    onClick={() => setFulfillmentMethod('cafe')}
                    className={`flex-1 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1 border-2 transition-colors ${fulfillmentMethod === 'cafe' ? 'border-brand-pink bg-[#1a1015]' : 'border-[#27272a] bg-[#1c1c1f]'}`}
                  >
                    <span className={`text-[13px] font-bold
