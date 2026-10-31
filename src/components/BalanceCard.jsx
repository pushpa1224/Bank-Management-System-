export default function BalanceCard({ label, amount, color }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div className="balance-card" style={{ borderTopColor: color }}>
      <p className="balance-label">{label}</p>
      <p className="balance-amount" style={{ color }}>
        {formatted}
      </p>
    </div>
  );
}
