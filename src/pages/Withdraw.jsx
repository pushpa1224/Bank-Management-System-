import { useEffect, useRef, useState } from "react";
import { useBank } from "../context/BankContext";

export default function Withdraw() {
  const { account, withdraw } = useBank();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirming, setConfirming] = useState(false);
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
    if (value > account.balance) {
      setError("Oops! You don't have enough balance for this withdrawal.");
      return;
    }

    setConfirming(true);
  }

  function confirmWithdraw() {
    const value = parseFloat(amount);
    withdraw(value);
    setSuccess(`$${value.toFixed(2)} withdrawn successfully!`);
    setAmount("");
    setConfirming(false);
    setTimeout(() => setSuccess(""), 3000);
  }

  function cancelWithdraw() {
    setConfirming(false);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Withdraw Money</h1>
        <p className="subtext">Withdraw funds from your account.</p>
      </div>

      <div className="form-card">
        <div className="current-balance-bar">
          <span>Current Balance</span>
          <span className="balance-highlight">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(account.balance)}
          </span>
        </div>

        {confirming ? (
          <div className="confirm-box">
            <p className="confirm-text">
              Are you sure you want to withdraw{" "}
              <strong>${parseFloat(amount).toFixed(2)}</strong>?
            </p>
            <div className="confirm-actions">
              <button onClick={confirmWithdraw} className="btn btn-danger">
                Yes, Withdraw
              </button>
              <button onClick={cancelWithdraw} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bank-form">
            <div className="form-group">
              <label htmlFor="withdraw-amount">Amount (USD)</label>
              <input
                id="withdraw-amount"
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

            <button type="submit" className="btn btn-danger">
              Withdraw
            </button>
          </form>
        )}

        {success && <p className="form-success">{success}</p>}
      </div>
    </div>
  );
}
