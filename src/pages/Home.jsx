import { useState } from "react";
import { products } from "../data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container">
      <h2>多糖星球</h2>
      <p>蛋糕 & 饮品线上下单</p>

      {products.map((item) => (
        <div key={item.id}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", borderRadius: 8 }}
          />

          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>¥ {item.price}</strong></p>

          <button onClick={() => setSelectedProduct(item)}>
            选择
          </button>
        </div>
      ))}

      {selectedProduct && (
        <OrderForm product={selectedProduct} />
      )}
    </div>
  );
}
function OrderForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const total = product.price * quantity;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>下单：{product.name}</h3>

      <p>单价：¥ {product.price}</p>

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

      <p><strong>合计：¥ {total}</strong></p>

      <button
        onClick={() => {
          alert(
            `✅ 下单成功！\n\n商品：${product.name}\n数量：${quantity}\n合计：¥${total}\n备注：${note}\n\n请添加微信：多糖星球客服\n确认订单并完成付款`
          );
        }}
      >
        提交订单
      </button>
    </div>
  );
}