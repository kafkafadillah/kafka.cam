import React from "react";

export default function SectionHeader({ dataCategory, handleChangeDropdownOption, handleClickCategory, dropdown }) {
  return (
    <>
      <div className="sec-category">
        {dataCategory.map((category) => (
          <button key={category.id} onClick={() => handleClickCategory(category.category)} className="cat-btn">
            {category.category}
          </button>
        ))}
      </div>
      <div className="sec-header">
        <h3>Trending</h3>
        <div className="sec-dropdown">
          <select value={dropdown} onChange={handleChangeDropdownOption}>
            <option value="all">All</option>
            <option value="collected">Collected</option>
            <option value="liked">Liked</option>
          </select>
        </div>
      </div>
    </>
  );
}
