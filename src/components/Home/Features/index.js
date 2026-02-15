import {
  LocalShipping,
  Security,
  Spa,
  WorkspacePremium,
} from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';

const features = [
  {
    icon: LocalShipping,
    title: 'Envío a Todo el País',
    description: 'Llevamos nuestro café fresco directamente a tu puerta en cualquier ciudad de Colombia.',
  },
  {
    icon: Security,
    title: 'Compra Segura',
    description: 'Tus pagos están protegidos con encriptación de nivel bancario.',
  },
  {
    icon: Spa,
    title: '100% Artesanal',
    description: 'Cultivado sin pesticidas ni químicos. Solo café puro de la montaña.',
  },
  {
    icon: WorkspacePremium,
    title: 'Calidad Premium',
    description: 'Granos seleccionados que cumplen los más altos estándares de calidad.',
  },
];

const Features = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 4, lg: 6 },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                '&:hover .feature-icon': {
                  bgcolor: 'primary.main',
                  '& svg': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Avatar
                className="feature-icon"
                sx={{
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'secondary.main',
                  transition: 'all 0.3s ease',
                }}
              >
                <feature.icon
                  sx={{
                    fontSize: 28,
                    color: 'primary.main',
                    transition: 'color 0.3s ease',
                  }}
                />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 220, mx: 'auto' }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
