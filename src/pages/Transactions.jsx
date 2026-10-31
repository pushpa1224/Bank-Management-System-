import { useState } from "react";
import { useBank } from "../context/BankContext";
import TransactionItem from "../components/TransactionItem";

export default function Transactions() {
  const { account } = useBank();
  const [filter, setFilter] = useState("All");

  const filtered = account.transactions.filter((tx) => {
    if (filter === "All") return true;
    return tx.type === filter;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>Transaction History</h1>
        <p className="subtext">All your past deposits and withdrawals.</p>
      </div>

      <div className="filter-bar">
        {["All", "Deposit", "Withdrawal"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-msg">
            {account.transactions.length === 0
              ? "No transactions yet. Start by making a deposit."
              : "No transactions match this filter."}
          </p>
        </div>
      ) : (
        <div className="transaction-list">
          {filtered.map((tx) => (
            <TransactionItem
              key={tx.id}
              type={tx.type}
              amount={tx.amount}
              date={tx.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
