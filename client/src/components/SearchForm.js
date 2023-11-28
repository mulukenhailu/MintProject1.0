import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Search from "@mui/icons-material/Search";

const SearchForm = () => {
  const top100Films = ["test", "eyyre", "shhsh"];
  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: { xs: "90%", md: "60%" }, margin: "auto" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Properties List"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchForm;
