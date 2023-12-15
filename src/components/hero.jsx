import React, { useState } from "react";

export default function Hero({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    if (searchValue === "") {
      onSearch(null);
    } else {
      onSearch(searchValue);
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Kafka</h1>
        <p>
          Unlimited Sources of Inspiration <br /> Explore the World of Photography With Us!.
        </p>
        <input type="text" value={search} onChange={handleSearch} placeholder="Find inspiration..." />
      </div>
    </div>
  );
}
