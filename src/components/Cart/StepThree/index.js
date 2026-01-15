import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function StepThree() {
  const { query } = useRouter();

  const state = query["bold-order-id"];

  const approveState = () => {
    return (
      <>
        <CheckCircleIcon color="primary" sx={{ fontSize: 65 }} />

        <Typography variant="h4" fontWeight={700} mt={2} color="primary">
          ¡Compra confirmada!
        </Typography>
        <Typography color="text.secondary">
          Gracias por apoyar el café artesanal de Lebrija ☕
        </Typography>
      </>
    );
  };

  const rejectedState = () => {
    return (
      <>
        <CheckCircleIcon color="error" sx={{ fontSize: 65 }} />

        <Typography variant="h4" fontWeight={700} mt={2} color="error">
          ¡Transacción fallida!
        </Typography>
        <Typography color="text.secondary">
          Hemos tenido problemas con el pago de tu compra☕
        </Typography>
      </>
    );
  };

  const processingState = () => {
    return (
      <>
        <CheckCircleIcon color="info" sx={{ fontSize: 65 }} />

        <Typography variant="h4" fontWeight={700} mt={2} color="info">
          ¡La transacción está procesando!
        </Typography>
        <Typography color="text.secondary">
          Tu pago está siendo procesada, por favor espera un momento☕
        </Typography>
      </>
    );
  };

  const pendingState = () => {
    return (
      <>
        <CheckCircleIcon color="info" sx={{ fontSize: 65 }} />

        <Typography variant="h4" fontWeight={700} mt={2} color="primary">
          ¡La transacción está pendiente!
        </Typography>
        <Typography color="text.secondary">
          Tu pago está pendiente, por favor espera un momento mientras
          confirmamos tu pago☕
        </Typography>
      </>
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        {state === "approved"
          ? approveState()
          : state === "rejectd" || state === 'failed'
          ? rejectedState()
          : state === "processing"
          ? processingState()
          : pendingState()}
        <Typography mt={1} color="text.secondary">
          <strong>ID de compra :</strong> {query["bold-order-id"]}
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
