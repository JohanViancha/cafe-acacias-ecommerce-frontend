import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BasicLayout from "@/layouts/BasicLayout";

const SectionCard = ({ icon, title, children }) => (
  <Paper
    elevation={2}
    sx={{
      p: 4,
      height: "100%",
      borderRadius: 3,
    }}
  >
    <Box display="flex" alignItems="center" mb={2}>
      {icon}
      <Typography variant="h6" ml={1} fontWeight="bold">
        {title}
      </Typography>
    </Box>

    <Typography color="text.secondary">{children}</Typography>
  </Paper>
);

export default function ShippingReturnsPage() {
  return (
    <BasicLayout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Envíos y Devoluciones 🚚
          </Typography>

          <Typography color="text.secondary">
            Conoce nuestros tiempos de entrega, costos y políticas de
            devolución.
          </Typography>
        </Box>

        <Divider sx={{ mb: 5 }} />

        {/* GRID */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} width={"100%"}>
            <SectionCard
              icon={<LocalShippingIcon color="primary" />}
              title="Opciones de Envío"
            >
              Realizamos envíos a todo el territorio nacional. Trabajamos con
              transportadoras confiables para garantizar que tu café llegue
              fresco y en perfectas condiciones.
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={6} width={"100%"}>
            <SectionCard
              icon={<AccessTimeIcon color="primary" />}
              title="Tiempos de Entrega"
            >
              Los pedidos se procesan en un plazo de 24 horas. El tiempo
              estimado de entrega es de 2 a 5 días hábiles dependiendo de tu
              ubicación.
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={6} width={"100%"}>
            <SectionCard
              icon={<Inventory2Icon color="primary" />}
              title="Seguimiento del Pedido"
            >
              Una vez enviado tu pedido recibirás un número de guía para
              realizar el seguimiento en tiempo real desde la transportadora.
            </SectionCard>
          </Grid>

          <Grid item xs={12} md={6} width={"100%"}  >
            <SectionCard
              icon={<AutorenewIcon color="primary" />}
              title="Cambios y Devoluciones"
            >
              Si tu producto llega dañado o incorrecto, puedes solicitar cambio
              o devolución dentro de las primeras 48 horas posteriores a la
              entrega. Nuestro equipo validará el caso rápidamente.
            </SectionCard>
          </Grid>
        </Grid>

        {/* FOOTER INFO */}
        <Box mt={6} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Para solicitudes de devolución o soporte, contáctanos a través de
            nuestro correo o canal de atención al cliente.
          </Typography>
        </Box>
      </Container>
    </BasicLayout>
  );
}
