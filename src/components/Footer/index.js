import { Box, Container, Typography, IconButton, Link, Stack, Divider } from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Instagram,
  Facebook,
} from '@mui/icons-material';
import { customColors } from '@/theme/theme';

const Footer = () => {
  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'white',
    },
  };

  return (
    <Box
      component="footer"
      id="contacto"
      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: '3fr 2fr 2fr 5fr' },
            gap: 6,
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Café Las Acacias
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              Café orgánico de especialidad cultivado en las montañas de Lebrija, Santander.
              Tres generaciones de tradición cafetera en cada taza.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                mb: 2,
              }}
            >
              Tienda
            </Typography>
            <Stack spacing={1.5}>
              <Link href="#" sx={linkStyle}>Café en Grano</Link>
              <Link href="#" sx={linkStyle}>Café Molido</Link>
              <Link href="#" sx={linkStyle}>Café Tostado</Link>
              <Link href="#" sx={linkStyle}>Ofertas Especiales</Link>
            </Stack>
          </Box>

          {/* Information */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                mb: 2,
              }}
            >
              Información
            </Typography>
            <Stack spacing={1.5}>
              <Link href="#" sx={linkStyle}>Nuestra Historia</Link>
              <Link href="#" sx={linkStyle}>Proceso de Cultivo</Link>
              <Link href="#" sx={linkStyle}>Envíos y Devoluciones</Link>
              <Link href="#" sx={linkStyle}>Preguntas Frecuentes</Link>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                mb: 2,
              }}
            >
              Contacto
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOn sx={{ color: customColors.harvest, fontSize: 20, mt: 0.3 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Finca Las Acacias<br />
                  Lebrija, Santander<br />
                  Colombia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: customColors.harvest, fontSize: 20 }} />
                <Link href="tel:+573001234567" sx={linkStyle}>
                  +57 300 123 4567
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: customColors.harvest, fontSize: 20 }} />
                <Link href="mailto:hola@cafelasacacias.com" sx={linkStyle}>
                  hola@cafelasacacias.com
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Bottom Bar */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            © 2024 Café Las Acacias. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" sx={{ ...linkStyle, color: 'rgba(255, 255, 255, 0.5)' }}>
              Términos y Condiciones
            </Link>
            <Link href="#" sx={{ ...linkStyle, color: 'rgba(255, 255, 255, 0.5)' }}>
              Política de Privacidad
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
