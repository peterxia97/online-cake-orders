import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // 3秒后重置
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>联系客服</h1>
        <p>有任何问题或建议，欢迎联系我们</p>
      </div>

      <div className="contact-content">
        {/* 联系信息卡片 */}
        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-icon">📍</div>
            <h3>店铺地址</h3>
            <p>多糖星球蛋糕店（悉尼CBD店）</p>
            <p>123 George St, Sydney NSW 2000</p>
            <p className="card-note">仅限自提，不提供配送服务</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">📞</div>
            <h3>联系电话</h3>
            <p>(02) 1234 5678</p>
            <p>营业时间：9:00-20:00</p>
            <p className="card-note">非营业时间请留言</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">💬</div>
            <h3>微信客服</h3>
            <p>扫描二维码添加微信</p>
            <div className="wechat-qr">
              <div className="qr-placeholder">
                <span>微信二维码</span>
                <small>请在此处放置您的微信二维码</small>
              </div>
            </div>
            <p className="card-note">添加时请备注"蛋糕订购"</p>
          </div>
        </div>

        {/* 联系表单 */}
        <div className="contact-form-container">
          <h2>在线留言</h2>
          <p>我们会尽快回复您的留言</p>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>留言已发送！</h3>
              <p>感谢您的反馈，我们会尽快联系您</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="请输入您的姓名"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">留言内容</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="请描述您的问题或建议"
                  rows="5"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "发送中..." : "发送留言"}
              </button>
            </form>
          )}
        </div>

        {/* 常见问题 */}
        <div className="faq-section">
          <h2>常见问题</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Q: 需要提前多久预订？</h3>
              <p>A: 建议至少提前2小时预订，复杂定制蛋糕需要提前24小时。</p>
            </div>
            <div className="faq-item">
              <h3>Q: 可以修改或取消订单吗？</h3>
              <p>A: 订单确认后1小时内可以修改或取消，超过时间将无法更改。</p>
            </div>
            <div className="faq-item">
              <h3>Q: 支持哪些支付方式？</h3>
              <p>A: 目前仅支持到店支付（现金、银行卡、PayID）。</p>
            </div>
            <div className="faq-item">
              <h3>Q: 营业时间是什么时候？</h3>
              <p>A: 每天9:00-20:00，节假日照常营业。</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          padding: 20px;
          background: #f5f5f5;
          min-height: 100vh;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .contact-header h1 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .contact-header p {
          color: #666;
          font-size: 14px;
        }
        
        .contact-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .contact-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .card-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }
        
        .contact-card h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .contact-card p {
          margin: 5px 0;
          color: #666;
          font-size: 14px;
        }
        
        .card-note {
          color: #ff6b8b !important;
          font-size: 12px !important;
          margin-top: 10px !important;
          font-weight: 500;
        }
        
        .wechat-qr {
          margin: 15px 0;
        }
        
        .qr-placeholder {
          background: #f5f5f5;
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
        }
        
        .qr-placeholder span {
          display: block;
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .qr-placeholder small {
          color: #999;
          font-size: 12px;
        }
        
        .contact-form-container {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .contact-form-container h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .contact-form-container > p {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff6b8b;
        }
        
        .submit-btn {
          width: 100%;
          background: #ff6b8b;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .submit-btn:hover:not(:disabled) {
          background: #ff5a7a;
        }
        
        .submit-btn:disabled {
          background: #ddd;
          cursor: not-allowed;
        }
        
        .success-message {
          text-align: center;
          padding: 40px 20px;
        }
        
        .success-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .success-message h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .success-message p {
          color: #666;
          font-size: 14px;
        }
        
        .faq-section {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .faq-section h2 {
          font-size: 20px;
          margin-bottom: 20px;
          color: #333;
        }
        
        .faq-list {
          display: grid;
          gap: 20px;
        }
        
        .faq-item {
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .faq-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .faq-item h3 {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .faq-item p {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .contact-cards {
            grid-template-columns: 1fr;
          }
          
          .contact-page {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}