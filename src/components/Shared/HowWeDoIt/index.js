"use client";

import { Box, Typography, Grid, Button } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const steps = [
  {
    title: "Cultivo en Lebrija",
    description:
      "Café cultivado en fincas de altura, donde el clima y la tradición crean un sabor único.",
    icon: <AgricultureIcon fontSize="large" />,
  },
  {
    title: "Selección artesanal",
    description:
      "Cada grano es seleccionado manualmente para garantizar calidad y uniformidad.",
    icon: <HandymanIcon fontSize="large" />,
  },
  {
    title: "Tueste controlado",
    description:
      "Tostado en pequeños lotes para resaltar aroma, cuerpo y notas naturales.",
    icon: <LocalFireDepartmentIcon fontSize="large" />,
  },
  {
    title: "Envío fresco",
    description:
      "Empacado cuidadosamente y enviado rápido para conservar su frescura.",
    icon: <LocalShippingIcon fontSize="large" />,
  },
];

export default function HowWeDoIt() {
  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        px: 2,
        color: "white",
        overflow: "hidden",
        mt: 5,
        borderRadius: 3
      }}
    >
      {/* 🎥 VIDEO DE FONDO */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/coffee-process.mp4" type="video/mp4" />
      </Box>

      {/* OVERLAY OSCURO */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* CONTENIDO */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
          Cómo hacemos nuestro café
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          maxWidth={700}
          mx="auto"
          mb={6}
          sx={{ opacity: 0.9 }}
        >
          Desde las montañas de Lebrija hasta tu taza, cuidamos cada detalle del
          proceso para ofrecerte un café artesanal, auténtico y lleno de
          carácter.
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box textAlign="center" px={2}>
                <Box sx={{ mb: 2, color: "primary.light" }}>{step.icon}</Box>

                <Typography fontWeight={600} mb={1}>
                  {step.title}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 5 }}
            href="/proceso"
          >
            Conoce el proceso completo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
