import ProductCard from "@/components/Shared/ProductCard";
import { Box } from "@mui/material";


function GridProducts({ products }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: { xs: 3, lg: 4 },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Box>
  );
}

export default GridProducts;
