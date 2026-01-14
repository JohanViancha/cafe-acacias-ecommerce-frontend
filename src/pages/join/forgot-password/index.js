"use client";

import { Button, TextField, Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";

export default function ForgotPasswordPage() {
  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6" textAlign="center">
        Recuperar Contraseña
      </Typography>

      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        required
      />

      <Button variant="contained" color="primary" fullWidth>
        Enviar enlace de recuperación
      </Button>

      <Link component={NextLink} href="/join/login" underline="hover" textAlign="center">
        Volver al inicio de sesión
      </Link>
    </Box>
  );
}
