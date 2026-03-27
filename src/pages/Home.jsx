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
  const [popup, setPopup] = useState(null);
  const [size, setSize] = useState(6);
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);

  const list = products.filter(p => p.category === category);

  /* ===== 加入购物车（自动累加） ===== */
  const addToCart = (item, extra = {}) => {
  setCart(prev => {
    const index = prev.findIndex(
      i =>
        i.id === item.id &&
        (item.type === "topping" || i.size === extra.size)
    );

    if (index > -1) {
      const copy = [...prev];
      copy[index].quantity += extra.quantity || 1;
      return copy;
    }

    return [
      ...prev,
      {
        ...item,
        size: extra.size,
        price:
          item.type === "topping"
            ? item.price          // ✅ 加料用自身 price
            : extra.price,         // ✅ 蛋糕用规格 price
        quantity: extra.quantity || 1
      }
    ];
  });
};

  /* ===== 总价 ===== */
  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  /* ===== 订单文本（分组） ===== */
  const orderText = () => {
    const cakes = cart.filter(i => i.type === "cake");
    const toppings = cart.filter(i => i.type === "topping");

    let text = "多糖星球蛋糕订单\n————————\n";

    if (cakes.length) {
      text += "🍰 蛋糕：\n";
      cakes.forEach(i => {
        text += `${i.name} ${i.size}寸 x${i.quantity} ￥${i.price * i.quantity}\n`;
      });
      text += "\n";
    }

    if (toppings.length) {
      text += "🧋 加料：\n";
      toppings.forEach(i => {
        text += `${i.name} x${i.quantity} ￥${i.price * i.quantity}\n`;
      });
      text += "\n";
    }

    text += `合计：￥${total}`;
    return text;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>多糖星球</div>

      <div style={styles.body}>
        {/* 左侧分类 */}
        <div style={styles.left}>
          {Object.entries(CATEGORY_MAP).map(([k, v]) => (
            <div
              key={k}
              style={{
                ...styles.category,
                ...(category === k ? styles.activeCategory : {})
              }}
              onClick={() => setCategory(k)}
            >
              {v}
            </div>
          ))}
        </div>

        {/* 商品列表 */}
        <div style={styles.right}>
          {list.map(item => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} style={styles.img} />

              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.price}>
                  ￥{item.type === "cake" ? item.sizes[6] : item.price}
                </div>

                <button
                  style={styles.add}
                  onClick={() => {
                    if (item.type === "topping") {
                      addToCart(item);
                    } else {
                      setPopup(item);
                      setSize(6);
                      setQty(1);
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

      {/* ===== 底部购物车栏 ===== */}
      {cart.length > 0 && (
        <div style={styles.cartBar} onClick={() => setShowCart(true)}>
          <span>已选 {cart.length} 件</span>
          <span style={{ color: "#d0021b", fontWeight: "bold" }}>
            ￥{total}
          </span>
        </div>
      )}

      {/* ===== 购物车弹窗（✅ 显示总价）===== */}
      {showCart && (
        <div style={styles.sheet}>
          <h3>购物车</h3>

          {cart.map((i, idx) => (
            <div key={idx} style={styles.cartItem}>
              <span>
                {i.name}
                {i.size && ` ${i.size}寸`}
              </span>

              <div>
                <button
                  onClick={() =>
                    setCart(c =>
                      c.map((x, j) =>
                        j === idx && x.quantity > 1
                          ? { ...x, quantity: x.quantity - 1 }
                          : x
                      )
                    )
                  }
                >
                  -
                </button>

                <span style={{ margin: "0 6px" }}>{i.quantity}</span>

                <button
                  onClick={() =>
                    setCart(c =>
                      c.map((x, j) =>
                        j === idx ? { ...x, quantity: x.quantity + 1 } : x
                      )
                    )
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    setCart(c => c.filter((_, j) => j !== idx))
                  }
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {/* ✅ 总价区域（重点） */}
          <div style={styles.cartTotal}>
            <span>合计：</span>
            <span>￥{total}</span>
          </div>

          <button
            style={styles.submit}
            onClick={() => {
              navigator.clipboard.writeText(orderText());
              alert("订单信息已复制，请微信联系我确认");
              setShowCart(false);
            }}
          >
            去下单
          </button>
        </div>
      )}

      {/* ===== 蛋糕规格弹窗 ===== */}
      {popup && (
        <div style={styles.sheet}>
          <h3>{popup.name}</h3>

          <div style={{ marginBottom: 8 }}>
            尺寸：
            <button
              style={size === 6 ? styles.active : styles.btn}
              onClick={() => setSize(6)}
            >
              6 寸 ￥{popup.sizes[6]}
            </button>
            <button
              style={size === 8 ? styles.active : styles.btn}
              onClick={() => setSize(8)}
            >
              8 寸 ￥{popup.sizes[8]}
            </button>
          </div>

          <div style={{ marginBottom: 8 }}>
            数量：
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          <div style={{ color: "#d0021b", fontWeight: "bold" }}>
            合计：￥{popup.sizes[size] * qty}
          </div>

          <button
            style={styles.submit}
            onClick={() => {
              addToCart(popup, {
                size,
                quantity: qty,
                price: popup.sizes[size]
              });
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

/* ===== 样式 ===== */
const styles = {
  page: { background: "#f7f7f7", minHeight: "100vh" },
  header: { padding: 12, textAlign: "center", background: "#fff", fontWeight: "bold" },
  body: { display: "flex" },

  left: { width: 110, background: "#fff" },
  category: { padding: 14, fontSize: 13 },
  activeCategory: { color: "#d0021b", fontWeight: "bold", background: "#fff5f5" },

  right: { flex: 1, padding: 10 },
  card: { display: "flex", background: "#fff", marginBottom: 10, padding: 8, borderRadius: 10 },
  img: { width: 80, height: 80, borderRadius: 8, objectFit: "cover" },
  info: { flex: 1, marginLeft: 10, position: "relative" },
  name: { fontSize: 14 },
  price: { color: "#d0021b", marginTop: 4 },
  add: { position: "absolute", right: 0, bottom: 0 },

  cartBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #eee"
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

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  },

  cartTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    color: "#d0021b",
    marginTop: 10
  },

  btn: { margin: "0 6px" },
  active: { margin: "0 6px", background: "#d0021b", color: "#fff" },

  submit: {
    width: "100%",
    marginTop: 10,
    background: "#d0021b",
    color: "#fff",
    padding: 10,
    border: "none",
    borderRadius: 6
  }
};