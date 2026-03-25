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
              <div className="product-price">¥ {item.price}</div>
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

  const total = product.price * quantity;

  return (
    <div className="product-card" style={{ marginTop: 20 }}>
      <h3>下单：{product.name}</h3>

      <label>数量：</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <label>备注（口味 / 祝福语 / 自提时间）：</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <p>
        <strong>合计：¥ {total}</strong>
      </p>

      <button
        onClick={() => {
          alert(
            `✅ 下单成功！\n\n商品：${product.name}\n数量：${quantity}\n合计：¥${total}\n备注：${note}\n\n请添加微信联系客服确认`
          );
        }}
      >
        提交订单
      </button>
      
      {/* ✅ 固定联系客服按钮 */}
      <ContactButton />
    </div>
  );
}
/* ===== 固定联系客服悬浮按钮 ===== */

function ContactButton() {
  return (
    <div
      className="contact-button"
      onClick={() => {
        alert(
          "请添加微信：TayloveTay\n\n复制微信号后，在微信中搜索即可联系客服确认订单"
        );
        window.location.href = "weixin://";
      }}
    >
      💬 联系客服
    </div>
  );
}