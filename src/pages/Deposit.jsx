import { useEffect, useRef, useState } from "react";
import { useBank } from "../context/BankContext";

export default function Deposit() {
  const { account, deposit } = useBank();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const value = parseFloat(amount);

    if (!amount || isNaN(value)) {
      setError("Please enter a valid amount.");
      return;
    }
    if (value <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    deposit(value);
    setSuccess(`$${value.toFixed(2)} deposited successfully!`);
    setAmount("");

    setTimeout(() => setSuccess(""), 3000);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Deposit Money</h1>
        <p className="subtext">Add funds to your account.</p>
      </div>

      <div className="form-card">
        <div className="current-balance-bar">
          <span>Current Balance</span>
          <span className="balance-highlight">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(account.balance)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bank-form">
          <div className="form-group">
            <label htmlFor="deposit-amount">Amount (USD)</label>
            <input
              id="deposit-amount"
              ref={inputRef}
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className="form-input"
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit" className="btn btn-primary">
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
}
