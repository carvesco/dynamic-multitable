import { useContext } from "react";
import "./FilterSection.css";
import { TablesContext } from "../../context/TableContext";

function FilterSection({ setWordSearch, setMinMaxValues, minMaxValues }) {
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
          setMinMaxValues({ min: 0, max: 10000 });
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
          document.querySelector(".search-input").value = "";
        }}
      >
        Search
      </button>
      <h3>Displayed Tables</h3>
      <div className="tables-grid">
        {Array.from(
          { length: Math.ceil(defaultTables.length / 2) },
          (_, rowIndex) => (
            <div key={rowIndex} className="tables-row">
              {defaultTables
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map((table) => (
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
          )
        )}
      </div>

      <h3>Total Value Range</h3>
      <div className="slider-container">
        <div className="slider-row">
          <label htmlFor="min-value">Min:</label>
          <input
            id="min-value"
            type="range"
            min={0}
            max={10000}
            defaultValue={0}
            value={minMaxValues.min}
            onChange={(e) =>
              setMinMaxValues((prev) => ({ ...prev, min: e.target.value }))
            }
          />
          <span className="slider-value">{minMaxValues.min || 0}</span>
        </div>
        <div className="slider-row">
          <label htmlFor="max-value">Max:</label>
          <input
            id="max-value"
            type="range"
            min={0}
            max={10000}
            value={minMaxValues.max}
            defaultValue={10000}
            onChange={(e) =>
              setMinMaxValues((prev) => ({ ...prev, max: e.target.value }))
            }
          />
          <span className="slider-value">{minMaxValues.max || 100}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
