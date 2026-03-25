export default function Contact() {
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: 40 }}
    >
      <h2>联系我</h2>

      <p style={{ color: "#666", marginBottom: 24 }}>
        微信扫码添加我，确认下单信息
      </p>

      <img
        src="/images/wechat-qr.png"
        alt="我的微信二维码"
        style={{ width: 220 }}
      />

      <p style={{ marginTop: 16, fontSize: 14 }}>
        我的微信号：
        <strong> TayloveTay </strong>
      </p>
    </div>
  );
}