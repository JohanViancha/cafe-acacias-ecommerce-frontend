import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicLayout from "@/layouts/BasicLayout";

const faqs = [
  {
    question: "¿De dónde proviene el café?",
    answer:
      "Nuestro café proviene de fincas de Lebrija, Santader, cultivado por caficultores locales bajo procesos sostenibles.",
  },
  {
    question: "¿Qué tipos de café ofrecen?",
    answer:
      "Ofrecemos café en grano, molido y tostado. También contamos con diferentes perfiles de tostión: suave, media y oscura.",
  },
  {
    question: "¿Cuánto tarda el envío?",
    answer:
      "Los envíos nacionales tardan entre 2 y 5 días hábiles dependiendo de la ciudad.",
  },
  {
    question: "¿Cómo debo almacenar el café?",
    answer:
      "Recomendamos almacenarlo en un recipiente hermético, lejos de la luz, humedad y calor para conservar su frescura.",
  },
  {
    question: "¿El café viene recién tostado?",
    answer:
      "Sí. Tostamos el café bajo demanda para garantizar el mejor aroma y sabor posible.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos digitales.",
  },
  {
    question: "¿Puedo devolver mi pedido?",
    answer:
      "Si el producto llega en mal estado, puedes solicitar cambio o devolución dentro de las primeras 48 horas.",
  },
];

export default function FaqPage() {
  return (
    <BasicLayout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Preguntas Frecuentes ☕
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Encuentra respuestas rápidas sobre nuestros productos, envíos y
            pedidos.
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </BasicLayout>
  );
}
