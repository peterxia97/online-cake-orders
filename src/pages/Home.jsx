import { useState } from "react";
import { products } from "../data/products";

const CATEGORY_MAP = {
  flavorCream: "口味裱花奶油蛋糕",
  fruitCream: "水果裱花奶油蛋糕",
  topping: "加料"
};

export default function Home() {
  const [category, setCategory] = useState("flavorCream");
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(null); // 当前选中的蛋糕
  const [size, setSize] = useState(6);
  const [quantity, setQuantity] = useState(1);

  const list = products.filter(p => p.category === category);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>多糖星球</div>

      <div style={styles.body}>
        {/* 左侧分类 */}
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

        {/* 右侧商品 */}
        <div style={styles.right}>
          {list.map(item => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} style={styles.image} />

              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>

                <div style={styles.price}>
                  ￥
                  {item.type === "topping"
                    ? item.price
                    : item.sizes[6]}{" "}
                </div>

                <button
                  style={styles.addBtn}
                  onClick={() => {
                    if (item.type === "topping") {
                      setCart([
                        ...cart,
                        { ...item, quantity: 1 }
                      ]);
                    } else {
                      setPopup(item);
                      setSize(6);
                      setQuantity(1);
                    }
                  }}
                >
                  ＋
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部购物车栏 */}
      {cart.length > 0 && (
        <div style={styles.cartBar}>
          <div>
            已选 {cart.length} 件 ｜ ￥{totalPrice}
          </div>
          <button
            style={styles.cartBtn}
            onClick={() => {
              const text = cart
                .map(
                  i =>
                    `${i.name} x${i.quantity} ￥${i.price * i.quantity}`
                )
                .join("\n");
              navigator.clipboard.writeText(
                `多糖星球订单\n${text}\n合计：￥${totalPrice}`
              );
              alert("订单已复制，请微信联系我确认");
            }}
          >
            去下单
          </button>
        </div>
      )}

      {/* 蛋糕规格弹窗 */}
      {popup && (
        <div style={styles.sheet}>
          <h3>{popup.name}</h3>

          <div>
            尺寸：
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

          <div>
            数量：
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span style={{ margin: "0 8px" }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div style={{ marginTop: 10, color: "#d0021b" }}>
            ￥{popup.sizes[size] * quantity}
          </div>

          <button
            style={styles.submit}
            onClick={() => {
              setCart([
                ...cart,
                {
                  name: popup.name,
                  price: popup.sizes[size],
                  quantity
                }
              ]);
              setPopup(null);
            }}
          >
            加入购物车
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= 样式 ================= */
const styles = {
  page: { background: "#f7f7f7", minHeight: "100vh" },
  header: { padding: 12, textAlign: "center", background: "#fff", fontWeight: "bold" },
  body: { display: "flex" },

  left: { width: 110, background: "#fff" },
  categoryItem: { padding: 14, fontSize: 13 },
  categoryActive: { background: "#fff5f5", color: "#d0021b", fontWeight: "bold" },

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
    width: 28,
    height: 28,
    background: "#d0021b",
    color: "#fff",
    border: "none",
    borderRadius: 6
  },

  cartBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    padding: 10
  },
  cartBtn: { background: "#d0021b", color: "#fff", border: "none", padding: "6px 12px" },

  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    padding: 12,
    borderTop: "1px solid #ddd"
  },
  btn: { margin: "0 5px" },
  active: { margin: "0 5px", background: "#d0021b", color: "#fff" },
  submit: { width: "100%", marginTop: 10, background: "#d0021b", color: "#fff", border: "none", padding: 8 }
};
