"use client";

import { Product } from "@/api/product";
import BasicLayout from "@/layouts/BasicLayout";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import WishListIcon from "@/components/Shared/Wishlisticon";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import Seo from "@/components/Shared/Seo";

export default function ProductPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [price, setPrice] = useState(0);
  const { addCart } = useCart();
  const SHIPPING_COST = 6000;
  const subtotal = price * quantity;
  const total = subtotal + SHIPPING_COST;

  const additionalInfo = [
    { label: "Origen", value: "Lebrija, Santander - Colombia" },
    { label: "Tipo de grano", value: "Arábica 100%" },
    { label: "Proceso", value: "Lavado" },
    { label: "Nivel de tostión", value: "Media" },
    { label: "Altura", value: "1.600 msnm" },
    { label: "Presentación", value: "250g / 500g / 1kg" },
  ];

  useEffect(() => {
    if (product?.discount || product.discount > 0) {
      setPrice(product?.price - product?.discount);
    } else {
      setPrice(0);
    }
  }, []);

  const addCartWrapper = () => {
    addCart(product.documentId, quantity);
  };

  return (
    <>
      <Seo title={`${product.title}`} description={`${product.summary}`} />
      <BasicLayout>
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
          <Grid container spacing={4}>
            {/* Imagen */}

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT5CDqK9ZPmXDXseMYPOXV75T1PFG8kkk9g&s"
                alt={product.title}
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              />
            </Grid>

            {/* Información */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                {/* Categoría */}
                <Chip
                  icon={<CoffeeIcon />}
                  label={product.category.title.replace("-", " ")}
                  color="primary"
                  sx={{ width: "fit-content" }}
                />
                {/* Nombre */}
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {product.title}
                </Typography>
                {/* Precio */}
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignContent: "center",
                    gap: "20px",
                  }}
                >
                  {price > 0 && (
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: product.discount
                          ? "line-through"
                          : "normal",
                      }}
                      color="primary"
                      fontWeight={700}
                    >
                      ${product.price.toLocaleString("es-CO")}
                    </Typography>
                  )}
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    $
                    {(
                      product.price -
                      (product.discount * product.price) / 100
                    ).toLocaleString("es-CO")}
                  </Typography>
                </Stack>

                <Divider />
                {/* Descripción */}
                <Typography variant="body1" color="text.secondary">
                  {product.summary}
                </Typography>
                {/* Características */}
                <Stack direction="row" spacing={1}>
                  <Chip label={product.presentation || "Grano / Molido"} />
                  <Chip label="100% Artesanal" />
                </Stack>
                {/* Cantidad */}
                <TextField
                  type="number"
                  label="Cantidad"
                  size="small"
                  value={quantity}
                  sx={{ width: 120 }}
                  slotProps={{
                    input: {
                      min: 1,
                    },
                  }}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    setQuantity(value);
                  }}
                />
                {/* Resumen */}
                <Divider />
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Domicilio</Typography>
                    <Typography color="primary">
                      ${SHIPPING_COST.toLocaleString("es-CO")}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                    >
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ${total.toLocaleString("es-CO")}
                    </Typography>
                  </Stack>
                </Stack>

                {/* CTA */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <WishListIcon productId={product.documentId} />

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<LocalShippingIcon />}
                    sx={{ py: 1.5, flexGrow: 1 }}
                    onClick={addCartWrapper}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Descripción" />
            <Tab label="Información adicional" />
            <Tab label="Comentarios" />
          </Tabs>

          {/* CONTENIDO */}
          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Typography color="text.secondary">
                {product.description}
              </Typography>
            )}

            {tabValue === 1 && (
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: "#e4e3e0",
                }}
              >
                <Table size="small">
                  <TableBody>
                    {additionalInfo.map((item) => (
                      <TableRow key={item.label}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                            width: "40%",
                            border: "1px solid",
                            borderColor: "primary.main",
                          }}
                        >
                          {item.label}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "text.primary",
                            border: "1px solid",
                            borderColor: "primary.main",
                          }}
                        >
                          {item.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {tabValue === 2 && (
              <Typography color="text.secondary">
                Aún no hay comentarios para este producto.
              </Typography>
            )}
          </Box>
        </Box>
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { product },
  } = context;

  const productCtrl = new Product();
  const response = await productCtrl.getBySlug(product);

  return {
    props: {
      product: response,
    },
  };
}
