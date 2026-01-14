"use client";

import BasicModal from "@/components/Shared/BasicModal";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { useState } from "react";

export default function OrderPayment({ order }) {
  const [showModal, setShowModal] = useState(false);
  const createdAt = new Date(order.createdAt).toLocaleString();
  const products = order.products;
  const address = order.addressShiping;

  const openCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Card
        sx={{
          mx: "auto",
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: "background.default",
          },
          borderColor: "primary.main",
        }}
        onClick={openCloseModal}
      >
        <CardContent>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack gap={1}>
              <Typography variant="body2" color="text.secondary">
                {createdAt}
              </Typography>
              <Typography variant="body2" color="text.main">
                ID del pedido: <strong>{order.idPayment}</strong>
              </Typography>
              <Typography variant="body1" color="text.main">
                Total:{" "}
                <strong>${order.totalPayment.toLocaleString("es-CO")}</strong>
              </Typography>
            </Stack>

            <Chip
              label={order.state}
              sx={{
                color: "background.paper",
              }}
              color={
                order.state === "Entregado" || order.state === "Enviado"
                  ? "success"
                  : order.state === "Pedido creado" ||
                    order.state === "Pago confirmado" ||
                    order.state === "Preparando tu café"
                  ? "info"
                  : "error"
              }
            />
          </Stack>
        </CardContent>
      </Card>

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Informacion del pedido"
        width={600}
      >
        <Typography variant="body1" fontWeight={"600"} my={1}>
          Productos
        </Typography>

        <Stack spacing={1}>
          {products.map((product) => (
            <Box
              key={product.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight="medium">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category?.title}
                </Typography>
              </Box>

              <Typography fontWeight="bold">
                {product.quantity} X ${(product.price - (product?.discount * product?.price) / 100).toLocaleString("es-CO")}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* DIRECCIÓN */}
        <Typography variant="body1" fontWeight={"600"}  >
          Dirección de envío
        </Typography>

        <Stack
          flexDirection="row"
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography fontWeight="medium">{address.title}</Typography>
            <Typography variant="body2">{address.address}</Typography>
            <Typography variant="body2">
              {address.city}, {address.state}
            </Typography>
            <Typography variant="body2">Tel: {address.phone}</Typography>
          </Box>
          <Box>
            {" "}
            <Typography fontWeight="bold">${7000}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* RESUMEN */}
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography color="primary.main" fontWeight="bold">
              Total
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography fontWeight="bold" color="primary.main">
              ${order.totalPayment}
            </Typography>
          </Grid>
        </Grid>
      </BasicModal>
    </>
  );
}
