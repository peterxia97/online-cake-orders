import { useState, useEffect } from "react";
import { products } from "./data/products";

// 分类映射（保持你的原有分类）
const CATEGORY_MAP = {
  flavorCream: { name: "口味裱花奶油蛋糕", icon: "🍰" },
  fruitCream: { name: "水果裱花奶油蛋糕", icon: "🍓" },
  topping: { name: "加料", icon: "🧋" }
};

// 分类显示顺序
const CATEGORY_ORDER = ["flavorCream", "fruitCream", "topping"];

export default function Home() {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState("flavorCream");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    pickupTime: "asap"
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // 过滤当前分类的产品
  const filteredProducts = products.filter(p => p.category === selectedCategory);

  // 计算购物车总价（澳元）
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 计算购物车总数量
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 添加产品到购物车
  const addToCart = (product, options = {}) => {
    setCart(prevCart => {
      // 查找是否已存在相同产品（考虑蛋糕尺寸）
      const existingIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        (product.type === "topping" || item.size === options.size)
      );

      if (existingIndex > -1) {
        // 更新数量
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += options.quantity || 1;
        return updatedCart;
      } else {
        // 添加新项目
        const newItem = {
          ...product,
          size: options.size,
          price: product.type === "topping" ? product.price : (options.price || product.sizes[6]),
          quantity: options.quantity || 1
        };
        return [...prevCart, newItem];
      }
    });
    
    // 关闭产品弹窗
    setSelectedProduct(null);
  };

  // 更新购物车项目数量
  const updateCartItem = (index, newQuantity) => {
    if (newQuantity < 1) {
      // 移除项目
      setCart(prev => prev.filter((_, i) => i !== index));
    } else {
      // 更新数量
      setCart(prev => prev.map((item, i) => 
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // 移除购物车项目
  const removeCartItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // 生成订单文本（澳洲格式）
  const generateOrderText = () => {
    const cakes = cart.filter(item => item.type === "cake");
    const toppings = cart.filter(item => item.type === "topping");

    let text = "🍰 多糖星球蛋糕订单 🍰\n";
    text += "══════════════════\n\n";

    if (cakes.length > 0) {
      text += "🎂 蛋糕：\n";
      cakes.forEach(item => {
        text += `• ${item.name} ${item.size}寸 x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
      });
      text += "\n";
    }

    if (toppings.length > 0) {
      text += "🧋 加料：\n";
      toppings.forEach(item => {
        text += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
      });
      text += "\n";
    }

    text += `💰 合计：$${cartTotal.toFixed(2)}\n\n`;
    text += "👤 取货人信息：\n";
    text += `姓名：${orderInfo.name || "未填写"}\n`;
    text += `电话：${orderInfo.phone || "未填写"}\n`;
    text += `取货时间：${orderInfo.pickupTime === "asap" ? "尽快取货（约2小时后）" : "指定时间"}\n\n`;
    text += "📍 自提点：\n";
    text += "多糖星球蛋糕店（悉尼CBD店）\n";
    text += "123 George St, Sydney NSW 2000\n";
    text += "📞 (02) 1234 5678\n\n";
    text += "⏰ 请按时到店取货，感谢您的订单！";

    return text;
  };

  // 提交订单
  const submitOrder = () => {
    if (!orderInfo.name || !orderInfo.phone) {
      alert("请填写姓名和电话");
      return;
    }

    // 生成订单号
    const newOrderNumber = `DT${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);

    // 复制订单信息到剪贴板
    const orderText = generateOrderText();
    navigator.clipboard.writeText(orderText)
      .then(() => {
        setShowOrderModal(false);
        setShowSuccess(true);
        
        // 3秒后自动关闭成功提示
        setTimeout(() => {
          setShowSuccess(false);
          // 清空购物车
          setCart([]);
          setOrderInfo({ name: "", phone: "", pickupTime: "asap" });
        }, 3000);
      })
      .catch(err => {
        console.error("复制失败:", err);
        alert("订单生成成功，但复制失败，请手动保存订单信息");
      });
  };

  // 渲染产品卡片
  const renderProductCard = (product) => {
    const isCake = product.type === "cake";
    const basePrice = isCake ? product.sizes[6] : product.price;

    return (
      <div key={product.id} className="product-card">
        <div className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x180/ff6b8b/ffffff?text=蛋糕";
            }}
          />
          <div className="product-tag">
            {product.category === "flavorCream" ? "口味" : 
             product.category === "fruitCream" ? "水果" : "加料"}
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-description">
            {isCake ? "手工制作，新鲜食材" : "新鲜水果加料"}
          </div>
          
          <div className="product-footer">
            <div className="product-price">
              ${basePrice.toFixed(2)}
              {isCake && <small> / 6寸</small>}
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={() => {
                if (product.type === "topping") {
                  addToCart(product);
                } else {
                  setSelectedProduct(product);
                }
              }}
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 渲染购物车项目
  const renderCartItem = (item, index) => (
    <div key={index} className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        {item.size && <div className="cart-item-size">{item.size}寸</div>}
        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      
      <div className="cart-item-controls">
        <button 
          className="quantity-btn"
          onClick={() => updateCartItem(index, item.quantity - 1)}
        >
          -
        </button>
        
        <span className="quantity">{item.quantity}</span>
        
        <button 
          className="quantity-btn"
          onClick={() => updateCartItem(index, item.quantity + 1)}
        >
          +
        </button>
        
        <button 
          className="remove-btn"
          onClick={() => removeCartItem(index)}
        >
          移除
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* 顶部店铺信息栏 */}
      <header className="store-header">
        <div className="store-info">
          <h1 className="store-name">多糖星球蛋糕店</h1>
          <div className="store-tags">
            <span className="tag">手工制作</span>
            <span className="tag">新鲜食材</span>
            <span className="tag">4.8分</span>
            <span className="tag">仅限自提</span>
          </div>
          <div className="store-meta">
            <div className="meta-item">
              <i>🕐</i>
              <span>营业中 · 9:00-20:00</span>
            </div>
            <div className="meta-item">
              <i>📍</i>
              <span>悉尼CBD店</span>
            </div>
            <div className="meta-item">
              <i>📞</i>
              <span>(02) 1234 5678</span>
            </div>
          </div>
        </div>
      </header>

      {/* 分类导航栏 */}
      <nav className="category-nav">
        {CATEGORY_ORDER.map(categoryKey => (
          <button
            key={categoryKey}
            className={`category-item ${selectedCategory === categoryKey ? 'active' : ''}`}
            onClick={() => setSelectedCategory(categoryKey)}
          >
            <span>{CATEGORY_MAP[categoryKey].icon}</span>
            <span>{CATEGORY_MAP[categoryKey].name}</span>
          </button>
        ))}
      </nav>

      {/* 产品列表 */}
      <main className="product-list">
        {filteredProducts.map(renderProductCard)}
      </main>

      {/* 底部购物车栏 */}
      {cart.length > 0 && (
        <div className="cart-bar">
          <div className="cart-info" onClick={() => setShowCart(true)}>
            <div className="cart-icon">
              🛒
              <span className="cart-count">{cartCount}</span>
            </div>
            <div className="cart-details">
              <div className="cart-total">${cartTotal.toFixed(2)}</div>
              <div className="cart-minimum">点击查看购物车</div>
            </div>
          </div>
          <button 
            className={`checkout-btn ${cartTotal >= 20 ? 'enabled' : ''}`}
            onClick={() => cartTotal >= 20 && setShowOrderModal(true)}
            disabled={cartTotal < 20}
          >
            {cartTotal >= 20 ? '去结算' : `还差$${(20 - cartTotal).toFixed(2)}`}
          </button>
        </div>
      )}

      {/* 购物车侧边栏 */}
      <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>购物车</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>
            ✕
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>
              <p>购物车是空的</p>
              <p>快去挑选喜欢的蛋糕吧</p>
            </div>
          ) : (
            cart.map(renderCartItem)
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>商品总额</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>应付总额</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className="submit-order-btn"
              onClick={() => {
                setShowCart(false);
                setShowOrderModal(true);
              }}
              disabled={cartTotal < 20}
            >
              {cartTotal >= 20 ? '提交订单' : `满$20起订`}
            </button>
          </div>
        )}
      </div>

      {/* 产品规格弹窗 */}
      {selectedProduct && selectedProduct.type === "cake" && (
        <div className="product-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedProduct.name}</h3>
              <button className="close-modal" onClick={() => setSelectedProduct(null)}>
                ✕
              </button>
            </div>
            
            <div className="size-options">
              {[6, 8].map(size => (
                <div 
                  key={size}
                  className={`size-option ${size === 6 ? 'selected' : ''}`}
                  onClick={() => setSelectedProduct({...selectedProduct, selectedSize: size})}
                >
                  <span className="size-label">{size}寸</span>
                  <span className="size-price">${selectedProduct.sizes[size].toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="quantity-control">
              <button className="quantity-btn-large" onClick={() => {
                setSelectedProduct({...selectedProduct, selectedQty: Math.max(1, (selectedProduct.selectedQty || 1) - 1)});
              }}>
                -
              </button>
              
              <span className="quantity-large">{selectedProduct.selectedQty || 1}</span>
              
              <button className="quantity-btn-large" onClick={() => {
                setSelectedProduct({...selectedProduct, selectedQty: (selectedProduct.selectedQty || 1) + 1});
              }}>
                +
              </button>
            </div>
            
            <div className="modal-total">
              合计：${((selectedProduct.sizes[selectedProduct.selectedSize || 6] || selectedProduct.sizes[6]) * (selectedProduct.selectedQty || 1)).toFixed(2)}
            </div>
            
            <button 
              className="add-to-cart-modal"
              onClick={() => addToCart(selectedProduct, {
                size: selectedProduct.selectedSize || 6,
                quantity: selectedProduct.selectedQty || 1,
                price: selectedProduct.sizes[selectedProduct.selectedSize || 6]
              })}
            >
              加入购物车
            </button>
          </div>
        </div>
      )}

      {/* 订单确认弹窗 */}
      {showOrderModal && (
        <div className="order-modal">
          <div className="order-content">
            <div className="modal-header">
              <h3>确认订单信息</h3>
              <button className="close-modal" onClick={() => setShowOrderModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="order-section">
              <h4>👤 取货人信息</h4>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="请输入姓名"
                  value={orderInfo.name}
                  onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={orderInfo.phone}
                  onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="order-section">
              <h4>🕐 取货时间</h4>
              <div className="time-options">
                <label className="time-option">
                  <input
                    type="radio"
                    name="pickupTime"
                    value="asap"
                    checked={orderInfo.pickupTime === "asap"}
                    onChange={(e) => setOrderInfo({...orderInfo, pickupTime: e.target.value})}
                  />
                  <span>尽快取货（约2小时后）</span>
                </label>
                <label className="time-option">
                  <input
                    type="radio"
                    name="pickupTime"
                    value="specific"
                    checked={orderInfo.pickupTime === "specific"}
                    onChange={(e) => setOrderInfo({...orderInfo, pickupTime: e.target.value})}
                  />
                  <span>指定时间</span>
                </label>
              </div>
            </div>
            
            <div className="order-section">
              <h4>📍 自提点信息</h4>
              <div className="store-address">
                <p><strong>多糖星球蛋糕店（悉尼CBD店）</strong></p>
                <p>📍 123 George St, Sydney NSW 2000</p>
                <p>📞 (02) 1234 5678</p>
                <p>🕐 营业时间：9:00-20:00</p>
                <p>🚶 仅限自提，请按时取货</p>
              </div>
            </div>
            
            <div className="order-section">
              <h4>📋 订单明细</h4>
              <div className="order-items">
                {cart.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name} {item.size && `${item.size}寸`} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <div className="total-row">
                  <span>商品总额</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>应付总额</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowOrderModal(false)}>
                取消
              </button>
              <button className="confirm-btn" onClick={submitOrder}>
                确认下单
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 成功提示 */}
      {showSuccess && (
        <div className="success-toast">
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
          <h3 style={{ marginBottom: '10px' }}>下单成功！</h3>
          <p style={{ marginBottom: '5px' }}>订单号：{orderNumber}</p>
          <p style={{ marginBottom: '15px' }}>订单信息已复制到剪贴板</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            请通过微信联系确认订单
          </p>
        </div>
      )}

      {/* 联系客服按钮 */}
      <button 
        className="contact-button"
        onClick={() => window.location.href = "/contact"}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: cart.length > 0 ? '80px' : '20px',
          background: '#ff6b8b',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255, 107, 139, 0.3)',
          zIndex: '999',
          transition: 'all 0.3s'
        }}
      >
        💬
      </button>

      {/* 加载样式 */}
      <style jsx>{`
        .contact-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(255, 107, 139, 0.4);
        }
        
        .success-toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 5000;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}
