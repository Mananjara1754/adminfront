// Transactions.js
import React from 'react';

function Transactions() {
  const pendingTransactions = [{ name: 'Buy USDT', amount: '1024.53 USDT', status: 'In process' }];
  const completedTransactions = [
    { name: 'Buy USDT', amount: '7104.23 USDT', status: 'Completed' },
    { name: 'Sell BTC', amount: '5 BTC', status: 'Completed' },
  ];

  return (
    <div className="transactions">
      <div className="pending-transactions">
        <h3>Pending Execution</h3>
        {pendingTransactions.map((tx, index) => (
          <div key={index}>
            <p>{tx.name}</p>
            <p>{tx.amount}</p>
            <p>{tx.status}</p>
          </div>
        ))}
      </div>
      <div className="completed-transactions">
        <h3>Completed Transactions</h3>
        {completedTransactions.map((tx, index) => (
          <div key={index}>
            <p>{tx.name}</p>
            <p>{tx.amount}</p>
            <p>{tx.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
