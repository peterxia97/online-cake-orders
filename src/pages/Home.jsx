import { useState } from "react";
import { products } from "../data/products";

const CATEGORY_MAP = {
  flavorCream: "口味裱花奶油蛋糕",
  fruitCream: "水果裱花奶油蛋糕"
};

export default function Home() {
  const [category, setCategory] = useState("flavorCream");

  const list = products.filter(p => p.category === category);

  return (
    <div style={styles.page}>
      {/* 顶部标题 */}
      <div style={styles.header}>多糖星球</div>

      <div style={styles.body}>
        {/* 左侧分类（塔塔 Cake 风格） */}
        <div style={styles.left}>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <div
              key={key}
              style={{
                ...styles.categoryItem,
                ...(category === key ? styles.categoryActive : {})
              }}
              onClick={() => setCategory(key)}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 右侧商品列表 */}
        <div style={styles.right}>
          {list.map(item => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>

                <div style={styles.priceRow}>
                  <span style={styles.price}>
                    ¥{item.sizes[6]}
                  </span>
                  <span style={styles.sizeText}> / 6寸</span>
                </div>

                <button style={styles.addBtn}>＋</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= 样式 ================= */

const styles = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f7f7f7",
    minHeight: "100vh"
  },

  header: {
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
    background: "#fff",
    borderBottom: "1px solid #eee"
  },

  body: {
    display: "flex"
  },

  left: {
    width: 110,
    background: "#fff",
    borderRight: "1px solid #eee"
  },

  categoryItem: {
    padding: "14px 10px",
    fontSize: 13,
    color: "#666",
    cursor: "pointer"
  },

  categoryActive: {
    color: "#d0021b",
    fontWeight: "bold",
    background: "#fff5f5"
  },

  right: {
    flex: 1,
    padding: 10
  },

  card: {
    display: "flex",
    background: "#fff",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    objectFit: "cover"
  },

  info: {
    flex: 1,
    marginLeft: 10,
    position: "relative"
  },

  name: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 6
  },

  priceRow: {
    fontSize: 14
  },

  price: {
    color: "#d0021b",
    fontWeight: "bold"
  },

  sizeText: {
    color: "#999",
    marginLeft: 4
  },

  addBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    background: "#d0021b",
    border: "none",
    color: "#fff",
    width: 28,
    height: 28,
    borderRadius: 6,
    fontSize: 18,
    lineHeight: "28px"
  }
};