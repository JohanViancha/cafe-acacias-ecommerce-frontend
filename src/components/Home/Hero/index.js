import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import heroImage from '@/assets/hero-coffee-farm.jpg';
import { customColors } from '@/theme/theme';

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ================= BACKGROUND ================= */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Image */}
        <Image
          src={heroImage}
          alt="Café Las Acacias, 100% Artesanal"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(58,47,38,0.6) 0%, rgba(45,36,28,0.85) 100%)',
          }}
        />
      </Box>

      {/* ================= CONTENT ================= */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Location badge */}
          <Chip
            icon={
              <LocationOn
                sx={{ color: `${customColors.harvest} !important` }}
              />
            }
            label="Lebrija, Santander · Colombia"
            sx={{
              bgcolor: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              fontWeight: 500,
              letterSpacing: '0.05em',
              py: 2.5,
              px: 1,
            }}
          />

          {/* Title */}
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: '2.5rem',
                sm: '3.5rem',
                md: '4.5rem',
                lg: '5rem',
              },
              color: 'white',
              lineHeight: 1.1,
              fontWeight: 600,
            }}
          >
            Café Las Acacias, 
            <br />
            <Box component="span" sx={{ fontStyle: 'italic' }}>
            100% Artesanal  
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 640,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Cultivado con amor en las montañas de Santander. Cada grano cuenta la
            historia de nuestra tierra, nuestro clima único y generaciones de
            tradición cafetera.
          </Typography>

          {/* CTA */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              href="#productos"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                border: '2px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'transparent',
                  borderColor: 'white',
                },
              }}
            >
              Explorar Cafés
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="#historia"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                color: 'white',
                borderColor: 'white',
                borderWidth: 2,
                '&:hover': {
                  bgcolor: 'white',
                  color: 'primary.main',
                },
              }}
            >
              Nuestra Historia
            </Button>
          </Stack>

          {/* Trust indicators */}
          <Stack
            direction="row"
            spacing={{ xs: 3, md: 5 }}
            divider={
              <Box
                sx={{
                  width: 1,
                  height: 40,
                  bgcolor: 'rgba(255,255,255,0.2)',
                }}
              />
            }
            sx={{ pt: 4 }}
          >
            {[
              { value: '100%', label: 'Natural' },
              { value: '1,400m', label: 'Altitud' },
              { value: '+10', label: 'Años de Tradición' },
            ].map((item) => (
              <Box key={item.label} textAlign="center">
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* ================= SCROLL INDICATOR ================= */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 12,
              bgcolor: 'rgba(255,255,255,0.6)',
              borderRadius: 3,
              animation: 'scroll 2s infinite',
              '@keyframes scroll': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
