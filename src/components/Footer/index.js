"use client";

import { Box, Typography, IconButton, Link, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        borderTop: "1px solid",
        borderColor:'text.disabled'
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="text.secondary">
            Información legal
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link
              component={NextLink}
              href="/terminos"
              underline="hover"
            >
              Términos y condiciones
            </Link>

            <Link
              component={NextLink}
              href="/privacidad"
              underline="hover"
            >
              Política de privacidad
            </Link>

            <Link
              component={NextLink}
              href="/devoluciones"
              underline="hover"
            >
              Política de devoluciones
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="text.secondary">
            Contacto
          </Typography>

          <Typography variant="body2" color="text.secondary">
            📍 Calle 123 #45-67, Bogotá
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📞 +57 300 123 4567
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✉️ contacto@coffeeshop.com
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="text.secondary">
            Síguenos
          </Typography>

          <Box display="flex" gap={1}>
            <IconButton
              color="primary"
              aria-label="Facebook"
              component="a"
              href="https://facebook.com"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              color="primary"
              aria-label="Instagram"
              component="a"
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              color="primary"
              aria-label="WhatsApp"
              component="a"
              href="https://wa.me/573001234567"
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>

            <IconButton
              color="primary"
              aria-label="TikTok"
              component="a"
              href="https://tiktok.com"
              target="_blank"
            >
               <MusicNoteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} CoffeeShop — Todos los derechos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
}
