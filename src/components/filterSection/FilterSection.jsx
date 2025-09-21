import { useContext } from "react";
import "./FilterSection.css";
import { TablesContext } from "../../context/TableContext";

function FilterSection({ setWordSearch }) {
  const { tables, setTables } = useContext(TablesContext);
  const defaultTables = [
    "clients A",
    "clients B",
    "clients C",
    "clients D",
    "clients E",
  ];
  return (
    <div className="filter-section" style={{ flex: 1 }}>
      <h2>Filter Section</h2>
      <button
        className="reset-button"
        onClick={() => {
          setTables(defaultTables), setWordSearch(" ");
        }}
      >
        Reset Filters
      </button>
      <h3>Search term</h3>
      <input className="search-input" type="text" placeholder="Search..." />
      <button
        className="search-button"
        onClick={() => {
          const input = document.querySelector(".search-input");
          setWordSearch(input.value);
        }}
      >
        Search
      </button>
      <h3>Displayed Tables</h3>
      {defaultTables.map((table) => (
        <div
          key={table}
          className={
            tables.includes(table)
              ? "displayed-table-item"
              : "hidden-table-item"
          }
          onClick={() => {
            if (tables.includes(table)) {
              setTables(tables.filter((t) => t !== table));
            } else {
              setTables([...tables, table]);
            }
          }}
        >
          <p>{table}</p>
        </div>
      ))}
    </div>
  );
}

export default FilterSection;
