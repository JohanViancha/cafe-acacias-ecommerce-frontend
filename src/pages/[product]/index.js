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
import Image from "next/image";

export default function ProductPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [price, setPrice] = useState(0);
  const { addCart } = useCart();
  const subtotal = price * quantity;

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
      setPrice(product?.price - (product?.price * product?.discount) / 100);
    } else {
      setPrice(product?.price);
    }
  }, []);

  const addCartWrapper = () => {
    addCart(product.documentId, quantity);
  };

  return (
    <>
      <Seo title={`${product.title}`} description={`${product.summary}`} />
      <BasicLayout>
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: 2 }}>
          <Grid container spacing={4}>
            {/* Imagen */}

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 250, sm: 350, md: 450 },
                }}
              >
                <Image
                  fill
                  src={`/${product.image}`}
                  alt={product.title}
                  style={{ objectFit: "cover", borderRadius: '10px' }}
                  priority
                />
              </Box>
            </Grid>

            {/* Información */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                {/* Categoría */}
                <Chip
                  icon={<CoffeeIcon />}
                  label={product.category.title.replace("-", " ")}
                  color="primary"
                  sx={{ width: "fit-content", px: 1 }}
                />
                {/* Nombre */}
                <Typography variant="h5" fontWeight={600} color="text.primary">
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
                      variant="h6"
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
                  <Chip label={product.category.title || "Grano / Molido"} />
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
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                    >
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ${subtotal.toLocaleString("es-CO")}
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
              <Typography color="text.secondary">{product.summary}</Typography>
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

  console.log(product);
  const productCtrl = new Product();
  const response = await productCtrl.getBySlug(product);

  console.log(response);

  return {
    props: {
      product: response,
    },
  };
}
