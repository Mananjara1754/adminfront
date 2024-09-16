// WalletOverview.js
import React from 'react';

function WalletOverview() {
  const walletData = [
    { name: 'Bitcoin', balance: '1.95232 BTC', value: '$47,748.42' },
    { name: 'Ethereum', balance: '3 ETH', value: '$7,153.44' },
    { name: 'Tether', balance: '657.67 USDT', value: '$657.67' },
    // Add more data accordingly
  ];

  return (
    <div className="wallet-overview">
      {walletData.map((item, index) => (
        <div className="wallet-item" key={index}>
          <h3>{item.name}</h3>
          <p>Balance: {item.balance}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WalletOverview;
