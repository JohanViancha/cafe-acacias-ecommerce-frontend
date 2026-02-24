import { Category as CategoryApi } from "@/api/category";
import { customColors } from "@/theme/theme";
import { LocationOn, Phone } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

const categoryCtrl = new CategoryApi();

const Footer = () => {
  const [categories, setCategories] = useState([]);

  const linkStyle = {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s",
    "&:hover": {
      color: "white",
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Box
      component="footer"
      id="contacto"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "3fr 2fr 2fr 5fr",
            },
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
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              Café orgánico de especialidad cultivado en las montañas de
              Lebrija, Santander. Tres generaciones de tradición cafetera en
              cada taza.
            </Typography>
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
              {categories.map((category) => (
                <Link sx={linkStyle} href={`/products/${category.slug}`}>
                  {category.title}
                </Link>
              ))}
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
              <Link href="/#historia" sx={linkStyle}>
                Nuestra Historia
              </Link>
              <Link href="/#process" sx={linkStyle}>
                Proceso de Cultivo
              </Link>
              <Link href="/shipping-returns" sx={linkStyle}>
                Envíos y Devoluciones
              </Link>
              <Link href="/faq" sx={linkStyle}>
                Preguntas Frecuentes
              </Link>
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
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <LocationOn
                  sx={{ color: customColors.harvest, fontSize: 20, mt: 0.3 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Finca Las Acacias
                  <br />
                  Lebrija, Santander
                  <br />
                  Colombia
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Phone sx={{ color: customColors.harvest, fontSize: 20 }} />
                <Link href="tel:+573001234567" sx={linkStyle}>
                  +57 317 851 6553
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Bottom Bar */}
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            © 2026 Café Las Acacias. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="/terms"
              sx={{ ...linkStyle, color: "rgba(255, 255, 255, 0.5)" }}
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacy-policy"
              sx={{ ...linkStyle, color: "rgba(255, 255, 255, 0.5)" }}
            >
              Política de Privacidad
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
