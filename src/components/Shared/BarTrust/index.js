"use client";

import { Box, Typography, Grid } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function BarTrust() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
        px: 2,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        mt: 5,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* 1 */}
        <Grid item size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CoffeeIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography color="text.secondary" fontWeight={600}>Café 100% Artesanal</Typography>
              <Typography variant="body2" color="text.secondary">
                Tostado y seleccionado cuidadosamente desde origen.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 2 */}
        <Grid item size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography color="text.secondary" fontWeight={600}>
                Envíos rápidos a todo el país
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recibe tu café fresco en la puerta de tu hogar.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 3 */}
        <Grid item size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <VerifiedIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography color="text.secondary" fontWeight={600}>Calidad garantizada</Typography>
              <Typography variant="body2" color="text.secondary">
                Productos certificados y satisfacción asegurada.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
