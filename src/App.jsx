import { useState } from "react";
import "./App.css";
import FilterSection from "./components/filterSection/FilterSection";
import TableSection from "./components/tableSection/TableSection";
import { TablesContext } from "./context/TableContext";

function App() {
  const [tables, setTables] = useState([
    "clients",
    "sales",
    "products",
    "manufacturers",
    "salesmen",
  ]);
  return (
    <>
      <h1>Dynamic MultiTable</h1>
      <TablesContext.Provider value={{ tables, setTables }}>
        <div className="container">
          <FilterSection />
          <TableSection />
        </div>
      </TablesContext.Provider>
    </>
  );
}

export default App;
