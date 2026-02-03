import { Box, Container, Typography, Stack } from '@mui/material';
import { Layers, Favorite } from '@mui/icons-material';
import Image from 'next/image';

import coffeeHarvestImage from '@/assets/coffee-harvest.jpg';
import coffeeCupImage from '@/assets/coffee-cup.jpg';
import { customColors } from '@/theme/theme';

const StorySection = () => {
  return (
    <Box
      component="section"
      id="historia"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: 'secondary.light',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* IMAGES */}
          <Box sx={{ position: 'relative' }}>
            {/* Main Image */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 50px -15px hsla(24, 35%, 22%, 0.18)',
                zIndex: 10,
              }}
            >
              <Image
                src={coffeeHarvestImage}
                alt="Cosecha de café en Lebrija"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Secondary Image */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -32,
                right: -32,
                width: '66%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 50px -15px hsla(24, 35%, 22%, 0.18)',
                border: 4,
                borderColor: 'background.default',
                display: { xs: 'none', md: 'block' },
                zIndex: 20,
              }}
            >
              <Image
                src={coffeeCupImage}
                alt="Taza de café artesanal"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Decorative Element */}
            <Box
              sx={{
                position: 'absolute',
                top: -16,
                left: -16,
                width: 96,
                height: 96,
                border: 2,
                borderColor: `${customColors.accent}50`,
                borderRadius: 2,
                zIndex: 0,
              }}
            />
          </Box>

          {/* CONTENT */}
          <Box sx={{ pl: { lg: 4 } }}>
            <Typography
              variant="overline"
              sx={{
                color: customColors.accent,
                letterSpacing: '0.2em',
                fontWeight: 500,
                mb: 2,
                display: 'block',
              }}
            >
              Nuestra Historia
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                mb: 4,
              }}
            >
              Tres Generaciones
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: customColors.accent }}>
                de Pasión Cafetera
              </Box>
            </Typography>

            <Stack spacing={2.5} sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
              <Typography>
                En las fértiles montañas de <strong>Lebrija, Santander</strong>, a más de 1,400 metros
                de altitud, nuestra familia ha cultivado café por más de tres décadas.
              </Typography>
              <Typography>
                Nuestro café crece bajo la sombra de árboles nativos, nutrido por suelos volcánicos y
                bendecido por el clima perfecto de nuestra región.
              </Typography>
              <Typography>
                Cada cereza es seleccionada a mano, preservando un perfil con acidez brillante y
                notas a frutas tropicales y panela.
              </Typography>
            </Stack>

            {/* VALUES */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: `${customColors.nature}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                  }}
                >
                  <Layers sx={{ color: customColors.nature, fontSize: 20 }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Cultivo Sostenible
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prácticas que respetan la tierra
                </Typography>
              </Box>

              <Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: `${customColors.accent}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                  }}
                >
                  <Favorite sx={{ color: customColors.accent, fontSize: 20 }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Hecho con Amor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cada grano cuenta una historia
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StorySection;
