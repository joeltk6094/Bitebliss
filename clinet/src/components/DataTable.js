import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultTheme = createTheme();

  
 //  handling null or undefined data
 if (!data) {
  console.warn("Data is null or undefined. Make sure to pass a valid array.");
  data = []; 
}

  console.log("Data format:", data);

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <MaterialTable
          columns={columns}
          data={data}
          title={title}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
