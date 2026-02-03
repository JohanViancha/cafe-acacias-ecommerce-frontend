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
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 500,
              color: "primary.main",
              position: "relative",

              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -2,
                width: "100%",
                height: 1,
                bgcolor: "currentColor",
                transform: "scaleX(0)",
                transformOrigin: "right",
                transition: "transform 0.3s ease",
              },

              "&:hover": {
                color: customColors.accent,
              },

              "&:hover::after": {
                transform: "scaleX(1)",
                transformOrigin: "left",
              },
            }}
          >
            Ver todos los productos
            <ArrowForward sx={{ fontSize: 18 }} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;
