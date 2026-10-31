export default function TransactionItem({ type, amount, date }) {
  const isDeposit = type === "Deposit";

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div className={`transaction-item ${isDeposit ? "deposit" : "withdrawal"}`}>
      <div className="tx-left">
        <span className="tx-icon">{isDeposit ? "▲" : "▼"}</span>
        <div>
          <p className="tx-type">{type}</p>
          <p className="tx-date">{date}</p>
        </div>
      </div>
      <p className="tx-amount">{isDeposit ? "+" : "-"}{formatted}</p>
    </div>
  );
}
