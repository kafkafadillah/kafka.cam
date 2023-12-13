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
        <p>The internet’s source for visuals.</p>
        <input type="text" value={search} onChange={handleSearch} placeholder="Search..." />
      </div>
    </div>
  );
}
