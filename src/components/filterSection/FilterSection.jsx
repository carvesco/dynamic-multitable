import { useContext } from "react";
import "./FilterSection.css";
import { TablesContext } from "../../context/TableContext";

function FilterSection() {
  const { tables, setTables } = useContext(TablesContext);
  console.log(tables);
  const defaultTables = [
    "clients",
    "sales",
    "products",
    "manufacturers",
    "salesmen",
  ];
  return (
    <div className="filter-section" style={{ flex: 1 }}>
      <h2>Filter Section</h2>
      <input type="text" placeholder="Search..." />
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
