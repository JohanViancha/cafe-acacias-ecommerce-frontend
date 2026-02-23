import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  CardActionArea,
} from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { customColors } from "@/theme/theme";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({
  documentId,
  title,
  summary,
  price,
  originalPrice,
  image,
  slug,
  discount,
  origin = "Lebrija",
}) => {
  const { addCart } = useCart();

  const addCartWrapper = () => {
    addCart(documentId, 1);
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        "&:hover .product-image": {
          transform: "scale(1.05)",
        },
        "&:hover .quick-add": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      {/* ================= IMAGE ================= */}
      <CardActionArea href={`/${slug}`}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/${image}`}
            alt={title}
            fill
            priority={false}
            className="product-image"
            style={{
              objectFit: "cover",
              transition: "transform 0.7s ease-out",
            }}
          />

          {/* Discount */}
          {discount && (
            <Chip
              label={`-${discount}%`}
              size="small"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                bgcolor: customColors.accent,
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
                zIndex: 2,
              }}
            />
          )}

          {/* Quick add */}
          <IconButton
            className="quick-add"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              color: "white",
              opacity: 0,
              transform: "translateY(16px)",
              transition: "all 0.3s ease",
              zIndex: 2,
              "&:hover": {
                bgcolor: customColors.accent,
              },
            }}
          >
            <ShoppingBag />
          </IconButton>
        </Box>
      </CardActionArea>

      {/* ================= CONTENT ================= */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Chip
          size="small"
          label={`Origen ${origin}`}
          sx={{
            bgcolor: `${customColors.nature}15`,
            color: customColors.nature,
            fontSize: "0.7rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "1.1rem",
            fontWeight: 500,
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
        >
          {summary}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Typography fontWeight={600}>{formatPrice(price)}</Typography>
          {originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {formatPrice(originalPrice)}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
          }}
          onClick={addCartWrapper}
        >
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
