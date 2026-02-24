import { Box, Container, Typography, Link } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Product } from "@/api/product";

import { customColors } from "@/theme/theme";
import GridProducts from "@/components/Shared/GridProducts";
import { useEffect, useState } from "react";

const productCtrl = new Product();

const ProductsSection = () => {
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
      component="section"
      id="productos"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HEADER ================= */}
        <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
          <Typography
            component="span"
            sx={{
              display: "block",
              mb: 2,
              color: customColors.accent,
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            Nuestra Selección
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem", lg: "3.25rem" },
              mb: 3,
              fontWeight: 600,
            }}
          >
            Cafés de Origen
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 2,
              bgcolor: customColors.accent,
              mx: "auto",
              mb: 3,
            }}
          />

          <Typography
            sx={{
              maxWidth: 620,
              mx: "auto",
              lineHeight: 1.8,
              color: "text.secondary",
            }}
          >
            Cada variedad es el resultado de un proceso artesanal cuidadoso,
            desde la cosecha hasta el tostado perfecto.
          </Typography>
        </Box>

        {/* ================= GRID ================= */}

        <GridProducts products={products} />

        {/* ================= FOOTER LINK ================= */}
        <Box textAlign="center" mt={6}>
          <Link
            href="/products"
            underline="none"
            sx={{
              position: "relative",
              color: "primary.main",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              "&:hover": {
                color: "primary.main",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -1,
                left: 0,
                width: "100%",
                height: 5,
                bgcolor: "primary.main",
                transform: "scaleX(0)",
                transformOrigin: "center",
                transition: "transform 0.3s ease-out",
              },
              "&:hover::after": {
                transform: "scaleX(1)",
              },
            }}
          >
            Ver todos los productos
            <ArrowForward sx={{ fontSize: 18, position: "absolute", top: 0 }} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;
