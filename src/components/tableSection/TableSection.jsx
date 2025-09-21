import { useContext } from "react";
import TableComponent from "../tableComponent/TableComponent";
import "./TableSection.css";
import { TablesContext } from "../../context/TableContext";

function TableSection({ wordSearch }) {
  const { tables, setTables } = useContext(TablesContext);
  const tableCount = tables.length;
  const getTableSectionClass = (count) => {
    return `table-section table-count-${count}`;
  };
  const hideTable = (tableName) => {
    setTables(tables.filter((t) => t !== tableName));
  };

  return (
    <div style={{ flexDirection: "column", display: "flex", flex: 3 }}>
      <div className={getTableSectionClass(tableCount)} style={{ flex: 1 }}>
        {tables.map((tableName) => (
          <TableComponent
            key={tableName}
            table={tableName}
            wordSearch={wordSearch}
            hideTable={() => hideTable(tableName)}
          />
        ))}
      </div>
    </div>
  );
}

export default TableSection;
