import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import BasicLayout from "@/layouts/BasicLayout";

const Section = ({ title, children }) => (
  <Box mb={4}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>

    <Typography color="text.secondary">{children}</Typography>
  </Box>
);

export default function PrivacyPolicyPage() {
  return (
    <BasicLayout>
      <Box sx={{ bgcolor: "#fafafa", py: 8 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 5, borderRadius: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Política de Privacidad
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Última actualización: 2026
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="1. Información que recopilamos">
              Recopilamos información personal como nombre, dirección, correo
              electrónico y datos necesarios para procesar pedidos.
            </Section>

            <Section title="2. Uso de la información">
              Utilizamos la información para procesar compras, mejorar nuestros
              servicios y brindar soporte al cliente.
            </Section>

            <Section title="3. Protección de datos">
              Implementamos medidas de seguridad para proteger la información
              personal contra accesos no autorizados.
            </Section>

            <Section title="4. Compartir información">
              No vendemos ni compartimos información personal con terceros,
              excepto cuando sea necesario para completar envíos o cumplir
              obligaciones legales.
            </Section>

            <Section title="5. Cookies">
              Nuestro sitio puede utilizar cookies para mejorar la experiencia
              del usuario y analizar el tráfico web.
            </Section>

            <Section title="6. Derechos del usuario">
              El usuario puede solicitar la actualización, modificación o
              eliminación de sus datos personales.
            </Section>

            <Section title="7. Cambios en la política">
              Esta política puede actualizarse periódicamente para reflejar
              mejoras o cambios legales.
            </Section>
          </Paper>
        </Container>
      </Box>
    </BasicLayout>
  );
}
