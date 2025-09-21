# Dynamic Multi-table

To run locally follow the next steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/carvesco/dynamic-multitable.git
   cd dynamic-multitable
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

This is the web app that I developed for the assignemnt, the layout it similar to the one used in the document, i think is the best one for diplaying tables and filters. The CSV file were generated using [https://www.mockaroo.com/] I assumed all the files/tables had the same fields, id does not make sense to search on all tables if some substring can only appear in some tables.

In the filters section we have:

- First we have a button to **reset** all the filters, and have all the tables displayed.
- Next we have an input to **search** across all table certain substring, if the table does not contain the substring, the table is hidden.
- The **Displayed Tables** section are button that represent the state of the table, if it is displayed or not, the can be pressed to show or hide the respective table. And finally
- Finally and slider to filter the **TOTALVALUE** field in all tables

En each table we also can search for substring but only in the selected table, pressing the magnifying glass button opens a popover that let us search for the substring we want to find.
