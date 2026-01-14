import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function StepThree() {
  const { query } = useRouter();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleIcon color="primary" sx={{ fontSize: 72 }} />
        <Typography variant="h4" fontWeight={700} mt={2} color="primary">
          ¡Compra confirmada!
        </Typography>
        <Typography color="text.secondary">
          Gracias por apoyar el café artesanal de Lebrija ☕
        </Typography>
        <Typography mt={1} color="text.secondary">
          <strong>ID de compra :</strong> {query['bold-order-id']}
        </Typography>
      </Box>

      {/* ACTION */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button href="/account" variant="contained" size="large">
          Ver mi pedido
        </Button>
      </Box>
    </Box>
  );
}
