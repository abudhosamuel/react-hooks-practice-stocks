import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, handleStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock) => (
        <Stock key={stock.id} stock={stock} handleStockClick={handleStockClick} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
