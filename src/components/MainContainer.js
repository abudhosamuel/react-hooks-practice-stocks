import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const addToPortfolio = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const removeFromPortfolio = (stock) => {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    if (filterBy === "All") {
      return true;
    } else {
      return stock.type === filterBy;
    }
  });

  return (
    <div>
      <SearchBar setSortBy={setSortBy} setFilterBy={setFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleStockClick={addToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} handleStockClick={removeFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
