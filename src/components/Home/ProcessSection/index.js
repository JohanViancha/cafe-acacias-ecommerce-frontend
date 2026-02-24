import { Box, Container, Typography, Avatar } from "@mui/material";
import { AccessTime, Layers, WbSunny, LocalCafe } from "@mui/icons-material";
import { customColors } from "@/theme/theme";

const steps = [
  {
    number: "01",
    title: "Cosecha Selectiva",
    description:
      "Solo recolectamos cerezas en su punto óptimo de maduración, garantizando la máxima dulzura y complejidad.",
    icon: AccessTime,
  },
  {
    number: "02",
    title: "Beneficio Húmedo",
    description:
      "Proceso tradicional de despulpado y fermentación controlada que desarrolla los sabores únicos de nuestro terroir.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Secado al Sol",
    description:
      "Secamos nuestros granos en camas africanas bajo el sol de las montañas, logrando una humedad perfecta del 11%.",
    icon: WbSunny,
  },
  {
    number: "04",
    title: "Tostado Artesanal",
    description:
      "Tostamos en pequeños lotes para resaltar el perfil de sabor único de cada cosecha, desde la finca hasta tu taza.",
    icon: LocalCafe,
  },
];

const ProcessSection = () => {
  return (
    <Box
      id="process"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="overline"
            sx={{
              color: customColors.harvest,
              letterSpacing: "0.2em",
              fontWeight: 500,
              display: "block",
              mb: 2,
            }}
          >
            Del Campo a Tu Taza
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem", lg: "3.25rem" },
              color: "white",
              mb: 3,
            }}
          >
            Nuestro Proceso
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 2,
              bgcolor: customColors.harvest,
              mx: "auto",
            }}
          />
        </Box>

        {/* Steps */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={step.number}
              p={2}
              sx={{
                position: "relative",
                textAlign: "center",
                "&:hover .step-icon": {
                  color: "primary.main",
                },
                bgcolor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Connector Line */}

              {/* Number */}
              <Typography
                variant="h2"
                sx={{
                  color: `${customColors.harvest}50`,
                  fontWeight: 300,
                  fontSize: "3.5rem",
                  mb: 2,
                }}
              >
                {step.number}
              </Typography>

              {/* Icon */}
              <Avatar
                className="step-icon"
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 3,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: customColors.harvest,
                  transition: "all 0.3s ease",
                }}
              >
                <step.icon sx={{ fontSize: 28 }} />
              </Avatar>

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {step.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.7,
                  maxWidth: 280,
                  mx: "auto",
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProcessSection;
