import { useState } from "react";
import { products } from "../data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("all");

  // 根据分类筛选商品
  const filteredProducts = products.filter(
    (item) => category === "all" || item.category === category
  );

  return (
    <div className="container">
      {/* ===== 品牌标题 ===== */}
      <h1 className="brand-title">多糖星球</h1>
      <p className="brand-subtitle">
        定制蛋糕 · 美味奶茶 · 微信下单
      </p>

      {/* ===== 左右布局 ===== */}
      <div className="layout">
        {/* ===== 左侧分类 ===== */}
        <div className="category-menu">
          <button
            className={category === "all" ? "active" : ""}
            onClick={() => {
              setCategory("all");
              setSelectedProduct(null);
            }}
          >
            全部
          </button>

          <button
            className={category === "cake1" ? "active" : ""}
            onClick={() => {
              setCategory("cake1");
              setSelectedProduct(null);
            }}
          >
            生日蛋糕
          </button>

          <button
            className={category === "cake2" ? "active" : ""}
            onClick={() => {
              setCategory("cake2");
              setSelectedProduct(null);
            }}
          >
            草莓蛋糕
          </button>

          <button
            className={category === "cake3" ? "active" : ""}
            onClick={() => {
              setCategory("cake3");
              setSelectedProduct(null);
            }}
          >
            巧克力蛋糕
          </button>

          <button
            className={category === "milktea1" ? "active" : ""}
            onClick={() => {
              setCategory("milktea1");
              setSelectedProduct(null);
            }}
          >
            原味奶茶
          </button>

          <button
            className={category === "milktea2" ? "active" : ""}
            onClick={() => {
              setCategory("milktea2");
              setSelectedProduct(null);
            }}
          >
            珍珠奶茶
          </button>

          <button
            className={category === "milktea3" ? "active" : ""}
            onClick={() => {
              setCategory("milktea3");
              setSelectedProduct(null);
            }}
          >
            抹茶奶茶
          </button>
        </div>

        {/* ===== 右侧商品列表 ===== */}
        <div className="product-list">
          {filteredProducts.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />

              <div className="product-name">{item.name}</div>
              <div className="product-price">$ {item.price}</div>
              <p>{item.description}</p>

              <button onClick={() => setSelectedProduct(item)}>
                选择
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 下单表单 ===== */}
      {selectedProduct && <OrderForm product={selectedProduct} />}
    </div>
  );
}

/* ===== 下单表单组件 ===== */
function OrderForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = product.price * quantity;

  const orderText = `
多糖星球订单
商品：${product.name}
数量：${quantity}
单价：$${product.price}
合计：$${total}
备注：${note || "无"}
`.trim();

  // ✅ 下单成功后的展示
  if (submitted) {
    return (
      <div className="product-card" style={{ marginTop: 32 }}>
        <h3>✅ 下单成功</h3>

        <p>请添加我的微信确认制作与取货时间：</p>

        {/* ✅ 订单信息展示 */}
        <pre
          style={{
            background: "#f7f7f7",
            padding: 12,
            fontSize: 13,
            whiteSpace: "pre-wrap",
            marginTop: 12
          }}
        >
          {orderText}
        </pre>

        {/* ✅ 复制订单 */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(orderText);
          }}
        >
          📋 复制订单信息
        </button>

        {/* ✅ 二维码 */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 14, marginBottom: 8 }}>
            扫码添加我的微信
          </p>

          <img
            src="/images/wechat-qr.png"
            alt="微信我的二维码"
            style={{ width: 200 }}
          />

          <p style={{ fontSize: 13, marginTop: 8 }}>
            微信号：<strong>TayloveTay</strong>
          </p>
        </div>
      </div>
    );
  }

  // ✅ 下单前表单
  return (
    <div className="product-card" style={{ marginTop: 32 }}>
      <h3>确认订单</h3>

      <label>数量</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <label>备注 (蛋糕上的信息 / 取货时间)</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <p>
        <strong>合计: ${total}</strong>
      </p>

      <button
        onClick={() => {
          setSubmitted(true);
          navigator.clipboard.writeText(orderText);
        }}
      >
        ✅ 下单
      </button>
    </div>
  );
}
/* ===== 固定联系我下单悬浮按钮 ===== */

function ContactButton() {
  const wechatId = "TayloveTay"; // ✅ 换成你的微信号

  return (
    <div
      className="contact-button"
      onClick={() => {
        // ① 自动复制微信号
        navigator.clipboard.writeText(wechatId);

        // ② 给用户明确提示
        alert(
          `我的微信号已复制：${wechatId}\n\n请打开微信 → 搜索 → 添加我确认订单`
        );

        // ③ 尝试跳回微信（成功更好，不成功也不影响）
        window.location.href = "weixin://";
      }}
    >
      💬 联系我
    </div>
  );
}