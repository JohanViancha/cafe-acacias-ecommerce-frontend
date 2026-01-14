import { Product } from "@/api/product";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GridProducts from "@/components/Shared/GridProducts";

const productCtrl = new Product();

function BannerLastProductPublished() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getLastPublished();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!products) return null;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 3, md: 6 },
        py: 4,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.35)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, color: "white" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          Últimos Productos
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            opacity: 0.9,
          }}
        >
          Descubre nuestra selección de cafés especiales cultivados en las
          montañas de Lebrija, un lugar reconocido por su tradición cafetera y
          suelos ricos que brindan un sabor único, profundo y lleno de carácter.
          Cada grano es seleccionado cuidadosamente para ofrecerte una
          experiencia auténtica y memorable.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <GridProducts products={products} />
        </Grid>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#3f8b6e",
            ":hover": { bgcolor: "#35795e" },
            px: 3,
            mt: 3,
          }}
        >
          Ver productos
        </Button>
      </Box>
    </Box>
  );
}

export default BannerLastProductPublished;
