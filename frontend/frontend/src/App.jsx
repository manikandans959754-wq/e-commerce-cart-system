import React, { useState, useMemo } from "react";
import { 
  ShoppingBag, Search, Trash2, Plus, Minus, X, Star, 
  ChevronRight, Zap, Truck, ShieldCheck, CreditCard 
} from "lucide-react";

// --- 30 Verified HD Products ---
const CATEGORIES = ["All", "Electronics", "Home", "Fashion", "Beauty"];

const PRODUCT_LIST = [
  // Electronics
  { id: 1, name: "Studio Headphones", price: 15999, category: "Electronics", rating: 4.8, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, name: "Mechanical Keyboard", price: 7500, category: "Electronics", rating: 4.9, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80" },
  { id: 3, name: "Smart Watch S8", price: 24500, category: "Electronics", rating: 4.7, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 4, name: "4K Action Camera", price: 12500, category: "Electronics", rating: 4.6, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80" },
  { id: 5, name: "Gaming Mouse RGB", price: 4200, category: "Electronics", rating: 4.8, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
  { id: 6, name: "Power Bank 20k", price: 3800, category: "Electronics", rating: 4.3, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80" },
  { id: 7, name: "Bluetooth Soundbar", price: 15999, category: "Electronics", rating: 4.4, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80" },
  { id: 8, name: "Smart Home assistant", price: 6500, category: "Electronics", rating: 4.2, img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&q=80" },
  // Home
  { id: 9, name: "Minimalist Wall Clock", price: 2100, category: "Home", rating: 4.1, img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80" },
  { id: 10, name: "Ceramic Vase Set", price: 3400, category: "Home", rating: 4.6, img: "https://images.unsplash.com/photo-1581781870027-04212e231e96?w=400&q=80" },
  { id: 11, name: "Aroma Diffuser", price: 2800, category: "Home", rating: 4.7, img: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&q=80" },
  { id: 12, name: "Luxury Velvet Pillow", price: 1200, category: "Home", rating: 4.0, img: "https://images.unsplash.com/photo-1579656333226-d10f9244498b?w=400&q=80" },
  { id: 13, name: "Industrial Desk Lamp", price: 4200, category: "Home", rating: 4.4, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { id: 14, name: "Automatic Coffee Maker", price: 18500, category: "Home", rating: 4.9, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80" },
  { id: 15, name: "Glass Water Carafe", price: 1500, category: "Home", rating: 4.3, img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=400&q=80" },
  { id: 16, name: "Indoor Succulent Set", price: 900, category: "Home", rating: 4.5, img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e0f?w=400&q=80" },
  // Fashion
  { id: 17, name: "Premium Leather Boots", price: 8900, category: "Fashion", rating: 4.8, img: "https://images.unsplash.com/photo-1520639889313-7272170b1ca0?w=400&q=80" },
  { id: 18, name: "Aviator Sunglasses", price: 3200, category: "Fashion", rating: 4.2, img: "https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=400&q=80" },
  { id: 19, name: "Classic Denim Jacket", price: 4500, category: "Fashion", rating: 4.6, img: "https://images.unsplash.com/photo-1527010154944-f2241763d806?w=400&q=80" },
  { id: 20, name: "Retro Canvas Sneakers", price: 5400, category: "Fashion", rating: 4.7, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 21, name: "Leather Messenger Bag", price: 3800, category: "Fashion", rating: 4.5, img: "https://images.unsplash.com/photo-1544816153-12ad5d714b49?w=400&q=80" },
  { id: 22, name: "Silk Evening Gown", price: 12000, category: "Fashion", rating: 4.9, img: "https://images.unsplash.com/photo-1539008835158-9671147ee163?w=400&q=80" },
  { id: 23, name: "Urban Knit Sweater", price: 2900, category: "Fashion", rating: 4.1, img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400&q=80" },
  // Beauty
  { id: 24, name: "Organic Facial Serum", price: 1800, category: "Beauty", rating: 4.7, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" },
  { id: 25, name: "Matte Lipstick Kit", price: 4200, category: "Beauty", rating: 4.8, img: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=400&q=80" },
  { id: 26, name: "Deep Cleansing Mask", price: 1400, category: "Beauty", rating: 4.5, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80" },
  { id: 27, name: "Signature Parfum", price: 9500, category: "Beauty", rating: 4.9, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80" },
  { id: 28, name: "Rose Water Toner", price: 950, category: "Beauty", rating: 4.3, img: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80" },
  { id: 29, name: "Hydrating Day Cream", price: 2400, category: "Beauty", rating: 4.6, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80" },
  { id: 30, name: "Glow Skin Tonic", price: 3200, category: "Beauty", rating: 4.4, img: "https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&q=80" },
];

export default function SmartCartApp() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Filter Logic
  const filtered = useMemo(() => PRODUCT_LIST.filter(p => 
    (activeCat === "All" || p.category === activeCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ), [activeCat, search]);

  const addToCart = (p) => {
    setCart(curr => {
      const exists = curr.find(i => i.id === p.id);
      return exists ? curr.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...curr, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, d) => setCart(curr => curr.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const remove = (id) => setCart(curr => curr.filter(i => i.id !== id));
  const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={styles.app}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.navInner}>
          <div style={styles.logoBox}>
            <div style={styles.iconCircle}><Zap size={22} fill="#fff" color="#fff" /></div>
            <h1 style={styles.brandTitle}>SmartCart</h1>
          </div>
          <div style={styles.searchBar}>
            <Search size={18} color="#94a3b8" />
            <input style={styles.searchInput} placeholder="Search premium products..." onChange={e => setSearch(e.target.value)} />
          </div>
          <button style={styles.bagTrigger} onClick={() => setIsBagOpen(true)}>
            <ShoppingBag size={24} color="#1e293b" />
            {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
          </button>
        </div>
      </header>

      {/* Category Navigation */}
      <div style={styles.catSection}>
        <div style={styles.catIsland}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{...styles.catTab, ...(activeCat === c ? styles.activeTab : {})}}>{c}</button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {filtered.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.imgWrapper}>
                <img src={p.img} alt={p.name} style={styles.pImg} />
                <div style={styles.ratingBadge}><Star size={12} fill="#fbbf24" color="#fbbf24" /> {p.rating}</div>
              </div>
              <div style={styles.cardBody}>
                <small style={styles.catLabel}>{p.category}</small>
                <h4 style={styles.pName}>{p.name}</h4>
                <div style={styles.pFooter}>
                  <span style={styles.priceText}>₹{p.price.toLocaleString()}</span>
                  <button style={styles.addBtn} onClick={() => addToCart(p)}>Add to Bag</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sidebar Shopping Bag */}
      {isBagOpen && (
        <div style={styles.overlay} onClick={() => setIsBagOpen(false)}>
          <div style={styles.sidebar} onClick={e => e.stopPropagation()}>
            <div style={styles.sideHead}>
              <h2 style={{margin: 0, fontSize: '24px'}}>Your Bag</h2>
              <X cursor="pointer" onClick={() => setIsBagOpen(false)} />
            </div>
            
            <div style={styles.sideBody}>
              {cart.length === 0 ? <div style={styles.emptyBag}>Your bag is currently empty.</div> : 
                cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <img src={item.img} style={styles.cartThumb} />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: '0 0 5px 0' }}>{item.name}</h5>
                      <div style={styles.qtyRow}>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}><Minus size={12}/></button>
                        <span>{item.qty}</span>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}><Plus size={12}/></button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '800', margin: 0 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      <Trash2 size={16} color="#ef4444" cursor="pointer" onClick={() => remove(item.id)} />
                    </div>
                  </div>
                ))
              }
            </div>

            {cart.length > 0 && (
              <div style={styles.sideFoot}>
                <div style={styles.totalRow}><span>Total Price</span><span>₹{totalAmount.toLocaleString()}</span></div>
                <button style={styles.checkoutBtn} onClick={() => alert('Order Placed!')}>Checkout Now <ChevronRight size={18}/></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { fontFamily: "'Inter', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" },
  navbar: { background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100, padding: "0 5%" },
  navInner: { height: "75px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" },
  logoBox: { display: "flex", alignItems: "center", gap: "10px" },
  iconCircle: { background: "#6366f1", padding: "8px", borderRadius: "10px", display: "flex", alignItems: "center" },
  brandTitle: { fontSize: "24px", fontWeight: "900", color: "#111827", letterSpacing: "-1px" },
  searchBar: { display: "flex", background: "#f3f4f6", padding: "10px 18px", borderRadius: "14px", width: "35%" },
  searchInput: { border: "none", background: "none", outline: "none", marginLeft: "10px", width: "100%", fontSize: "14px" },
  bagTrigger: { position: "relative", border: "none", background: "#f3f4f6", cursor: "pointer", padding: "12px", borderRadius: "14px" },
  badge: { position: "absolute", top: "-5px", right: "-5px", background: "#6366f1", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "10px", fontWeight: "bold" },
  
  catSection: { position: "sticky", top: "75px", zIndex: 90, padding: "15px 0", display: "flex", justifyContent: "center", background: "rgba(249, 250, 251, 0.8)", backdropFilter: "blur(8px)" },
  catIsland: { display: "flex", background: "#fff", padding: "6px", borderRadius: "40px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb", gap: "5px" },
  catTab: { border: "none", background: "none", padding: "8px 20px", borderRadius: "25px", fontSize: "13px", fontWeight: "600", cursor: "pointer", color: "#6b7280" },
  activeTab: { background: "#111827", color: "#fff" },

  main: { maxWidth: "1200px", margin: "0 auto", padding: "20px 5% 50px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "25px" },
  card: { background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #f3f4f6", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" },
  imgWrapper: { position: "relative", height: "200px", background: "#f3f4f6" },
  pImg: { width: "100%", height: "100%", objectFit: "cover" },
  ratingBadge: { position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.9)", padding: "4px 8px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", display: "flex", gap: "4px", alignItems: "center" },
  cardBody: { padding: "20px" },
  catLabel: { color: "#6366f1", fontWeight: "800", fontSize: "10px", textTransform: "uppercase" },
  pName: { margin: "5px 0 15px", fontSize: "15px", height: "40px", overflow: "hidden", fontWeight: "600" },
  pFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  priceText: { fontSize: "20px", fontWeight: "900" },
  addBtn: { background: "#111827", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" },

  overlay: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", justifyContent: "flex-end" },
  sidebar: { width: "420px", background: "#fff", height: "100%", display: "flex", flexDirection: "column", padding: "35px", boxShadow: "-10px 0 30px rgba(0,0,0,0.1)" },
  sideHead: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6", paddingBottom: "20px" },
  sideBody: { flex: 1, overflowY: "auto", padding: "20px 0" },
  emptyBag: { textAlign: "center", marginTop: "100px", color: "#9ca3af" },
  cartItem: { display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #f9fafb" },
  cartThumb: { width: "65px", height: "65px", objectFit: "cover", borderRadius: "12px" },
  qtyRow: { display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" },
  qtyBtn: { background: "#f3f4f6", border: "none", borderRadius: "6px", padding: "4px", cursor: "pointer" },
  sideFoot: { borderTop: "2px solid #f3f4f6", paddingTop: "25px" },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: "22px", fontWeight: "900", marginBottom: "20px" },
  checkoutBtn: { width: "100%", background: "#10b981", color: "#fff", border: "none", padding: "18px", borderRadius: "16px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }
};