import { useState } from "react";
import "./App.css";
import FilterSection from "./components/filterSection/FilterSection";
import TableSection from "./components/tableSection/TableSection";
import { TablesContext } from "./context/TableContext";

function App() {
  const [tables, setTables] = useState([
    "clients A",
    "clients B",
    "clients C",
    "clients D",
    "clients E",
  ]);
  const [wordSearch, setWordSearch] = useState("");
  return (
    <>
      <h1>Dynamic MultiTable</h1>
      <TablesContext.Provider value={{ tables, setTables }}>
        <div className="container">
          <FilterSection setWordSearch={setWordSearch} />
          <TableSection wordSearch={wordSearch} />
        </div>
      </TablesContext.Provider>
    </>
  );
}

export default App;
