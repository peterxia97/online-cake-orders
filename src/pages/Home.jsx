import { useState } from "react";
import { products } from "../data/products";

export default function Home() {
  const [category, setCategory] = useState("flavorCream");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState(6);

  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  return (
    <div style={styles.container}>
      {/* 标题 */}
      <h1 style={styles.title}>多糖星球</h1>
      <p style={styles.subtitle}>定制蛋糕 · 微信下单</p>

      <div style={styles.layout}>
        {/* 左侧分类 */}
        <div style={styles.sidebar}>
          <button
            style={category === "flavorCream" ? styles.activeBtn : styles.btn}
            onClick={() => {
              setCategory("flavorCream");
              setSelectedProduct(null);
            }}
          >
            口味裱花奶油蛋糕
          </button>

          <button
            style={category === "fruitCream" ? styles.activeBtn : styles.btn}
            onClick={() => {
              setCategory("fruitCream");
              setSelectedProduct(null);
            }}
          >
            水果裱花奶油蛋糕
          </button>
        </div>

        {/* 右侧蛋糕列表 */}
        <div style={styles.grid}>
          {filteredProducts.map((item) => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <h3 style={styles.name}>{item.name}</h3>

              {/* 尺寸选择 */}
              <div style={styles.sizeBox}>
                <button
                  style={size === 6 ? styles.sizeActive : styles.sizeBtn}
                  onClick={() => setSize(6)}
                >
                  6 寸
                </button>
                <button
                  style={size === 8 ? styles.sizeActive : styles.sizeBtn}
                  onClick={() => setSize(8)}
                >
                  8 寸
                </button>
              </div>

              <p style={styles.price}>￥{item.sizes[size]}</p>

              <button
                style={styles.selectBtn}
                onClick={() =>
                  setSelectedProduct({
                    ...item,
                    selectedSize: size,
                    selectedPrice: item.sizes[size],
                  })
                }
              >
                选择
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 下单表单 */}
      {selectedProduct && <OrderForm product={selectedProduct} />}
    </div>
  );
}

/* ===== 下单组件 ===== */
function OrderForm({ product }) {
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const orderText = `
多糖星球蛋糕订单
————————
蛋糕：${product.name}
尺寸：${product.selectedSize} 寸
价格：￥${product.selectedPrice}
备注：${note || "无"}
  `.trim();

  if (submitted) {
    return (
      <div style={styles.orderBox}>
        <h3>✅ 下单成功</h3>
        <pre style={styles.orderText}>{orderText}</pre>
        <button
          style={styles.copyBtn}
          onClick={() => navigator.clipboard.writeText(orderText)}
        >
          📋 复制订单信息
        </button>
        <p style={{ marginTop: 10 }}>
          请添加微信：<b>TayloveTay</b> 确认制作与取货时间
        </p>
      </div>
    );
  }

  return (
    <div style={styles.orderBox}>
      <h3>确认订单</h3>
      <textarea
        placeholder="备注（蛋糕文字 / 取货时间等）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={styles.textarea}
      />
      <button
        style={styles.submitBtn}
        onClick={() => {
          navigator.clipboard.writeText(orderText);
          setSubmitted(true);
        }}
      >
        ✅ 确认下单
      </button>
    </div>
  );
}

/* ===== 样式（手机端优先） ===== */
const styles = {
  container: {
    padding: 12,
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  layout: {
    display: "flex",
  },
  sidebar: {
    minWidth: 110,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    padding: "8px 6px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
  },
  activeBtn: {
    padding: "8px 6px",
    borderRadius: 6,
    border: "1px solid #ff7a00",
    background: "#fff5ee",
    color: "#ff7a00",
  },
  grid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    paddingLeft: 12,
  },
  card: {
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: 6,
  },
  name: {
    fontSize: 14,
    margin: "8px 0",
  },
  sizeBox: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 6,
  },
  sizeBtn: {
    padding: "4px 8px",
    fontSize: 12,
    border: "1px solid #ccc",
    borderRadius: 12,
    background: "#fff",
  },
  sizeActive: {
    padding: "4px 8px",
    fontSize: 12,
    border: "1px solid #ff7a00",
    borderRadius: 12,
    background: "#fff5ee",
    color: "#ff7a00",
  },
  price: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  selectBtn: {
    padding: "6px 0",
    width: "100%",
    borderRadius: 6,
    border: "none",
    background: "#ff7a00",
    color: "#fff",
  },
  orderBox: {
    marginTop: 20,
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  textarea: {
    width: "100%",
    height: 70,
    marginBottom: 10,
  },
  submitBtn: {
    width: "100%",
    padding: 10,
    background: "#ff7a00",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
  copyBtn: {
    marginTop: 8,
    padding: 8,
    width: "100%",
  },
  orderText: {
    background: "#f9f9f9",
    padding: 8,
    whiteSpace: "pre-wrap",
  },
};