"use client";

import NoResult from "@/components/Shared/NoResult";
import { useAuth } from "@/hooks";
import { useCart } from "@/hooks/useCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useRouter } from "next/router";
import Cart from "@/assets/cart-empty.png";

export default function StepOne({ products = [] }) {
  if (!products?.length)
    return (
      <Box>
        <NoResult
          subtitle="Tu carrito está vacío"
          text={
            "Parece que aún no has añadido nada. ¡Empieza a explorar y encuentra algo que te guste!"
          }
          image={Cart}
          actionText="Continuar comprando"
          redirectAction="./products"
        />
      </Box>
    );

  const router = useRouter();
  const { user } = useAuth();

  const { changeQuantityItem, deleteItem } = useCart();

  const summary = products.reduce(
    (acc, product) => {
      return {
        subtotal: acc.subtotal + product.price * product.quantity,
        discount:
          acc.discount +
          (product.discount * (product.price * product.quantity)) / 100,
      };
    },
    { subtotal: 0, discount: 0 },
  );

  const total = summary.subtotal - summary.discount;

  const goToLogin = () => router.push("/join/login");

  const goToStepTwo = () => {
    if (!user) goToLogin();
    else router.replace({ query: { ...router.query, step: 1 } });
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
        Productos agregados
      </Typography>

      <Grid container spacing={4}>
        {/* 🟦 TABLA DE PRODUCTOS */}

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7, xl: 8 }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderColor: "primary.main",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  ></TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Producto
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Precio
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Cantidad
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Total
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box
                        sx={{
                          position: "relative",
                          width: 80,
                          height: 80,
                        }}
                      >
                        <Image
                          fill
                          src={`/${product.image}`}
                          alt={product.title}
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                          priority
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>{product.title}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="text.secondary">
                        ${product.price.toLocaleString("es-CO")}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={product.quantity}
                        sx={{ width: 90 }}
                        slotProps={{
                          input: { inputProps: { min: 1, max: product.stock } },
                        }}
                        onChange={(e) =>
                          changeQuantityItem(product.documentId, e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Typography fontWeight={600} color="primary.main">
                        $
                        {(product.price * product.quantity).toLocaleString(
                          "es-CO",
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        sx={{ color: "error.main" }}
                        onClick={() => deleteItem(product.documentId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* 🟩 RESUMEN */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5, xl: 4 }}>
          <Card variant="outlined" sx={{ borderColor: "primary.main" }}>
            <CardHeader
              sx={{
                backgroundColor: "primary.main",
                "& .MuiCardHeader-subheader": {
                  color: "background.paper",
                  fontWeight: "bold",
                },
              }}
              subheader="Resumen de compra"
            />
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={500}>
                  ${summary.subtotal.toLocaleString("es-CO")}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary">Descuento</Typography>
                <Typography fontWeight={500} color="error.main">
                  - ${Math.round(summary.discount).toLocaleString("es-CO")}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold" color="primary.main">
                  ${total.toLocaleString("es-CO")}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  gap: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button fullWidth variant="outlined" href="/">
                  Continuar comprando
                </Button>
                <Button fullWidth variant="contained" onClick={goToStepTwo}>
                  Procesar pago
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
