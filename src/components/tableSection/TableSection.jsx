import TableComponent from "../tableComponent/TableComponent";
import "./TableSection.css";

function TableSection() {
  // Define the tables you want to display
  // Examples:
  // const tables = ["clients"]; // 1 table: full width
  // const tables = ["clients", "sales"]; // 2 tables: stacked vertically
  // const tables = ["clients", "sales", "products"]; // 3 tables: 2 on top, 1 below
  // const tables = ["clients", "sales", "products", "inventory"]; // 4 tables: 2x2 grid

  const tables = ["clients", "sales", "products", "manufacturers", "salesmen"];
  const tableCount = tables.length;

  // Determine the CSS class based on table count
  const getTableSectionClass = (count) => {
    return `table-section table-count-${count}`;
  };

  return (
    <div style={{ flexDirection: "column", display: "flex", flex: 3 }}>
      <div className={getTableSectionClass(tableCount)} style={{ flex: 1 }}>
        {tables.map((tableName) => (
          <TableComponent key={tableName} table={tableName} />
        ))}
      </div>
    </div>
  );
}

export default TableSection;
