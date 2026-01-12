import React, { useMemo, useState } from "react";
import { services, formatPriceRange } from "./servicesData";
import Cart from "./Cart"; // Cart komponentini import qilamiz

export default function Server({
  showSearch = true,
  tagFilter = "barchasi",
  onSelect,
}) {
  const [q, setQ] = useState("");
  const [cartItems, setCartItems] = useState([]); // Savatcha holatini saqlaymiz
  const [selectedTariff, setSelectedTariff] = useState("standart"); // Tanlangan tarif

  const tags = useMemo(() => {
    const set = new Set(["barchasi"]);
    services.forEach((s) => s.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchTag = tagFilter === "barchasi" || s.tags?.includes(tagFilter);
      const haystack = `${s.name} ${s.desc} ${s.materials?.join(" ")}`.toLowerCase();
      const matchQuery = haystack.includes(q.toLowerCase());
      return matchTag && matchQuery;
    });
  }, [q, tagFilter]);

  // Savatchaga xizmat qo‘shish
  const addToCart = (service) => {
    const updatedService = {
      ...service,
      selectedTariff: service.priceRange[selectedTariff],
    };
    setCartItems((prevItems) => [...prevItems, updatedService]);
  };

  // Savatchadan xizmat o‘chirish
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.wrap}>
      <Header
        showSearch={showSearch}
        q={q}
        onChangeQ={setQ}
        tags={tags}
        currentTag={tagFilter}
      />
      <div style={styles.tariffs}>
        <label>
          Tarifni tanlang:
          <select
            value={selectedTariff}
            onChange={(e) => setSelectedTariff(e.target.value)}
            style={styles.select}
          >
            <option value="standart">Standart</option>
            <option value="premium">Premium</option>
            <option value="delux">Delux</option>
          </select>
        </label>
      </div>
      <div style={styles.grid}>
        {filtered.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            selectedTariff={selectedTariff} // Tarifni uzatamiz
            onSelect={addToCart} // Tanlangan xizmatni savatchaga qo‘shish
          />
        ))}
      </div>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

function ServiceCard({ service, selectedTariff, onSelect }) {
  const { name, desc, priceRange, unit, materials, tags } = service;
  const price = priceRange[selectedTariff]; // Tanlangan tarif bo‘yicha narx

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{name}</h3>
        {tags?.length ? (
          <div style={styles.badges}>
            {tags.map((t) => (
              <span key={t} style={badgeStyle(t)}>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p style={styles.desc}>{desc}</p>

      <div style={styles.meta}>
        <div>
          <div style={styles.metaLabel}>Narx:</div>
          <div style={styles.metaValue}>{price} {unit}</div>
        </div>
        <div>
          <div style={styles.metaLabel}>Materiallar:</div>
          <div style={styles.metaValue}>{materials?.join(", ")}</div>
        </div>
      </div>

      <button
        style={styles.btn}
        onClick={() => onSelect(service)} // Xizmatni savatchaga qo‘shish
        aria-label={`${name} xizmatini tanlash`}
      >
        Tanlash
      </button>
    </div>
  );
}

// Stilizatsiya
const styles = {
  wrap: { maxWidth: 1100, margin: "0 auto", padding: 16 },
  header: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 },
  title: { margin: 0 },
  controls: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  input: {
    flex: "0 1 320px",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    outline: "none"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 12
  },
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "#fff"
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 },
  cardTitle: { margin: 0, fontSize: 18 },
  badges: { display: "flex", gap: 6, flexWrap: "wrap" },
  desc: { margin: 0, color: "#334155" },
  meta: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    fontSize: 14,
    color: "#0f172a"
  },
  metaLabel: { fontSize: 12, color: "#64748b" },
  metaValue: { fontWeight: 500 },
  btn: {
    marginTop: "auto",
    padding: "10px 12px",
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer"
  },
  select: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    marginTop: 8,
  },
  tariffs: {
    marginBottom: 16,
  }
};

function badgeStyle(tag) {
  const palette = {
    asosiy: ["#e2e8f0", "#0f172a"],
    ommabop: ["#e2e8f0", "#0f172a"],
    premium: ["#fef3c7", "#92400e"],
    delikat: ["#fee2e2", "#991b1b"],
    ustama: ["#ede9fe", "#5b21b6"],
    "qo‘shimcha": ["#ecfeff", "#155e75"],
    salomatlik: ["#dcfce7", "#166534"],
    estetika: ["#f1f5f9", "#0f172a"],
    logistika: ["#f1f5f9", "#0f172a"],
    "ta’mirlash": ["#fff7ed", "#9a3412"]
  };
  const [bg, fg] = palette[tag] || ["#f1f5f9", "#0f172a"];
  return {
    background: bg,
    color: fg,
    padding: "2px 8px",
    borderRadius: 999,
    fontSize: 12
  };
}