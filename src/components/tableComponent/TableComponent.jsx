import { useState, useEffect } from "react";
import "./TableComponent.css";
import { BiSearchAlt } from "react-icons/bi";
import { Popover } from "react-tiny-popover";

const TableComponent = ({ table, wordSearch, hideTable }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!wordSearch) {
      return;
    }
    if (wordSearch === " ") {
      loadCSVData();
    }
    setData((prevData) =>
      prevData.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(wordSearch.toLowerCase())
      )
    );
  }, [wordSearch]);

  useEffect(() => {
    if (!loading && !error && data.length === 0) {
      hideTable();
    }
  }, [loading, error, data, hideTable]);

  // Function to parse CSV text into objects
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());

    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((value) => value.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      return row;
    });

    return { headers, data };
  };

  const searchTable = (word) => {
    if (!word) {
      return;
    }
    let filteredData = data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(word.toLowerCase())
    );
    setData(filteredData);
  };

  const loadCSVData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Import the CSV file from public folder
      const response = await fetch(`/${table}.csv`);
      if (!response.ok) {
        throw new Error("Failed to load CSV file");
      }

      const csvText = await response.text();
      const { headers, data } = parseCSV(csvText);

      setHeaders(headers);
      setData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading CSV:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCSVData();
  }, []);

  return (
    <div className="table-component-wrapper">
      <div className="table-header">
        <h2 className="table-title">
          {table.charAt(0).toUpperCase() + table.slice(1)}
        </h2>
        <Popover
          isOpen={isPopoverOpen}
          onClickOutside={() => setIsPopoverOpen(false)}
          positions={["bottom", "right", "top", "left"]}
          content={
            <div className="popover-content">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
              />
              <BiSearchAlt
                className="search-icon"
                onClick={() => {
                  const input = document.querySelector(
                    ".popover-content .search-input"
                  );
                  searchTable(input.value);
                  setIsPopoverOpen(false);
                }}
              />
            </div>
          }
        >
          <BiSearchAlt
            className="search-icon"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          />
        </Popover>
      </div>
      <div className="table-container">
        {loading && <div className="loading">Loading CSV data...</div>}

        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && data.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header.replace("_", " ").toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id || index}>
                  {headers.map((header) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="no-data">No data available</div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
