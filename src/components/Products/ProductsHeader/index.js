import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

export default function ProductsHeader({ total, sort, setSort }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography variant="body2" color="text.secondary">
        {total} productos encontrados
      </Typography>

      <FormControl size="small">
        <Select
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <MenuItem value="relevance">Relevancia</MenuItem>
          <MenuItem value="price-asc">Precio: menor a mayor</MenuItem>
          <MenuItem value="price-desc">Precio: mayor a menor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
