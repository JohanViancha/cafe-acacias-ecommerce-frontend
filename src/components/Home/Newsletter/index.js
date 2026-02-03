import { customColors } from '@/theme/theme';
import { Send } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: `${customColors.accent}12`,
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center">
          <Typography
            variant="overline"
            sx={{
              color: customColors.accent,
              letterSpacing: '0.2em',
              fontWeight: 500,
              display: 'block',
              mb: 2,
            }}
          >
            Únete a Nuestra Comunidad
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              mb: 2,
            }}
          >
            Recibe Novedades y Ofertas
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Suscríbete para recibir descuentos exclusivos, consejos de preparación
            y ser el primero en conocer nuestras nuevas cosechas.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              fullWidth
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.default',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
              sx={{
                px: 4,
                py: 1.5,
                whiteSpace: 'nowrap',
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: customColors.accent,
                },
              }}
            >
              Suscribirse
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 2 }}
          >
            Respetamos tu privacidad. Puedes cancelar en cualquier momento.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
