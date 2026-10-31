import { createContext, useContext, useEffect, useState } from "react";

const BankContext = createContext();

const defaultAccount = {
  accountHolder: "Benita Rimon",
  accountNumber: "1042-8821-5890",
  balance: 5000,
  totalDeposited: 0,
  totalWithdrawn: 0,
  transactions: [],
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem("bankData");
    return saved ? JSON.parse(saved) : defaultAccount;
  } catch {
    return defaultAccount;
  }
}

export function BankProvider({ children }) {
  const [account, setAccount] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem("bankData", JSON.stringify(account));
  }, [account]);

  function deposit(amount) {
    const transaction = {
      id: Date.now(),
      type: "Deposit",
      amount,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAccount((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      totalDeposited: prev.totalDeposited + amount,
      transactions: [transaction, ...prev.transactions],
    }));
  }

  function withdraw(amount) {
    const transaction = {
      id: Date.now(),
      type: "Withdrawal",
      amount,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAccount((prev) => ({
      ...prev,
      balance: prev.balance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount,
      transactions: [transaction, ...prev.transactions],
    }));
  }

  return (
    <BankContext.Provider value={{ account, deposit, withdraw }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  return useContext(BankContext);
}
