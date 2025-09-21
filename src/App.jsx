import "./App.css";
import FilterSection from "./components/filterSection/FilterSection";
import TableSection from "./components/tableSection/TableSection";

function App() {
  return (
    <>
      <h1>Dynamic MultiTable</h1>
      <div className="container">
        <FilterSection />
        <TableSection />
      </div>
    </>
  );
}

export default App;
