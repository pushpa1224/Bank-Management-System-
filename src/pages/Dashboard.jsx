import { Link } from "react-router-dom";
import { useBank } from "../context/BankContext";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";

export default function Dashboard() {
  const { account } = useBank();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome back, {account.accountHolder.split(" ")[0]} 👋</h1>
        <p className="subtext">Here's a summary of your account.</p>
      </div>

      <div className="account-info-card">
        <div className="account-info-row">
          <div>
            <span className="info-label">Account Holder</span>
            <span className="info-value">{account.accountHolder}</span>
          </div>
          <div>
            <span className="info-label">Account Number</span>
            <span className="info-value">{account.accountNumber}</span>
          </div>
          <div>
            <span className="info-label">Account Type</span>
            <span className="info-value">Savings Account</span>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        <BalanceCard label="Current Balance" amount={account.balance} color="#1a56db" />
        <BalanceCard label="Total Deposited" amount={account.totalDeposited} color="#0e9f6e" />
        <BalanceCard label="Total Withdrawn" amount={account.totalWithdrawn} color="#e02424" />
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <Link to="/transactions" className="see-all-link">See all</Link>
        </div>

        {account.transactions.length === 0 ? (
          <p className="empty-msg">No transactions yet. Start by making a deposit.</p>
        ) : (
          <div className="transaction-list">
            {account.transactions.slice(0, 3).map((tx) => (
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
    </div>
  );
}
