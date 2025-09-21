import { useState, useEffect } from "react";
import "./TableComponent.css";

const TableComponent = ({ table }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Load CSV data on component mount
  useEffect(() => {
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

    loadCSVData();
  }, []);

  return (
    <div className="table-component-wrapper">
      <h2 className="table-title">
        {table.charAt(0).toUpperCase() + table.slice(1)}
      </h2>
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
