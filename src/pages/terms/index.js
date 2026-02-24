import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import BasicLayout from "@/layouts/BasicLayout";
BasicLayout;

const Section = ({ title, children }) => (
  <Box mb={4}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>

    <Typography color="text.secondary">{children}</Typography>
  </Box>
);

export default function TermsPage() {
  return (
    <BasicLayout>
      <Box sx={{ bgcolor: "#fafafa", py: 8 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 5, borderRadius: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Términos y Condiciones
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Última actualización: 2026
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="1. Aceptación de los términos">
              Al acceder y realizar compras en nuestra tienda online de café,
              aceptas cumplir con los presentes términos y condiciones.
            </Section>

            <Section title="2. Productos">
              Nuestros productos corresponden a café tostado y derivados. Nos
              esforzamos por mostrar descripciones e imágenes reales, aunque
              pueden existir ligeras variaciones.
            </Section>

            <Section title="3. Precios y pagos">
              Todos los precios están expresados en moneda local e incluyen
              impuestos aplicables. Nos reservamos el derecho de modificar
              precios sin previo aviso.
            </Section>

            <Section title="4. Envíos">
              Los tiempos de entrega pueden variar según la ubicación del
              cliente y la disponibilidad logística.
            </Section>

            <Section title="5. Cambios y devoluciones">
              Solo se aceptarán devoluciones en caso de productos defectuosos o
              errores en el pedido reportados dentro de las primeras 48 horas.
            </Section>

            <Section title="6. Propiedad intelectual">
              Todo el contenido del sitio web, incluyendo imágenes, textos y
              logotipos, pertenece a la marca y está protegido por derechos de
              autor.
            </Section>

            <Section title="7. Modificaciones">
              Nos reservamos el derecho de actualizar estos términos en
              cualquier momento.
            </Section>
          </Paper>
        </Container>
      </Box>
    </BasicLayout>
  );
}
