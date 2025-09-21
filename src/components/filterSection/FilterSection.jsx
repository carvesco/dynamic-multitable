import "./FilterSection.css";
function FilterSection() {
  return (
    <div className="filter-section" style={{ flex: 1 }}>
      <h2>Filter Section</h2>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default FilterSection;
