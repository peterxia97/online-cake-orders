import { useState } from "react";
import { products } from "../data/products";

const CATEGORY_MAP = {
  flavorCream: "口味裱花奶油蛋糕",
  fruitCream: "水果裱花奶油蛋糕"
};

export default function Home() {
  const [category, setCategory] = useState("flavorCream");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState(6);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const list = products.filter(p => p.category === category);

  const price =
    selectedProduct ? selectedProduct.sizes[size] * quantity : 0;

  return (
    <div style={styles.page}>
      <div style={styles.header}>多糖星球</div>

      <div style={styles.body}>
        {/* 左侧大类 */}
        <div style={styles.left}>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <div
              key={key}
              style={{
                ...styles.categoryItem,
                ...(category === key ? styles.categoryActive : {})
              }}
              onClick={() => {
                setCategory(key);
                setSelectedProduct(null);
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 商品列表 */}
        <div style={styles.right}>
          {list.map(item => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} style={styles.image} />

              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.price}>￥{item.sizes[6]} 起</div>

                <button
                  style={styles.addBtn}
                  onClick={() => {
                    setSelectedProduct(item);
                    setSize(6);
                    setQuantity(1);
                    setNote("");
                  }}
                >
                  ＋
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 下单弹窗 */}
      {selectedProduct && (
        <div style={styles.sheet}>
          <h3>{selectedProduct.name}</h3>

          <div style={styles.row}>
            <span>尺寸：</span>
            <button
              style={size === 6 ? styles.active : styles.btn}
              onClick={() => setSize(6)}
            >
              6 寸
            </button>
            <button
              style={size === 8 ? styles.active : styles.btn}
              onClick={() => setSize(8)}
            >
              8 寸
            </button>
          </div>

          <div style={styles.row}>
            <span>数量：</span>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <textarea
            placeholder="备注（蛋糕字样 / 取货时间）"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={styles.textarea}
          />

          <div style={styles.total}>合计：￥{price}</div>

          <button
            style={styles.submit}
            onClick={() => {
              navigator.clipboard.writeText(
                `蛋糕：${selectedProduct.name}\n尺寸：${size}寸\n数量：${quantity}\n合计：￥${price}\n备注：${note || "无"}`
              );
              alert("订单信息已复制，请到微信联系我");
            }}
          >
            确认下单
          </button>
        </div>
      )}
    </div>
  );
}

/* ========= 样式 ========= */
const styles = {
  page: { fontFamily: "sans-serif", background: "#f7f7f7", minHeight: "100vh" },
  header: { padding: 12, textAlign: "center", background: "#fff", fontWeight: "bold" },
  body: { display: "flex" },

  left: { width: 110, background: "#fff" },
  categoryItem: { padding: 14, fontSize: 13 },
  categoryActive: { color: "#d0021b", fontWeight: "bold", background: "#fff5f5" },

  right: { flex: 1, padding: 10 },
  card: { display: "flex", background: "#fff", marginBottom: 10, borderRadius: 10, padding: 8 },
  image: { width: 80, height: 80, borderRadius: 8, objectFit: "cover" },

  info: { flex: 1, marginLeft: 10, position: "relative" },
  name: { fontSize: 14 },
  price: { color: "#d0021b", marginTop: 4 },

  addBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    background: "#d0021b",
    color: "#fff",
    border: "none",
    width: 28,
    height: 28,
    borderRadius: 6
  },

  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    padding: 12,
    borderTop: "1px solid #ddd"
  },

  row: { marginBottom: 8 },
  btn: { margin: "0 5px" },
  active: { margin: "0 5px", color: "#fff", background: "#d0021b" },

  textarea: { width: "100%", height: 60 },
  total: { marginTop: 8, fontWeight: "bold", color: "#d0021b" },
  submit: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#d0021b",
    color: "#fff",
    border: "none",
    borderRadius: 6
  }
};