import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Link,
  CardActionArea,
  CardActions,
} from "@mui/material";
import WishListIcon from "@/components/Shared/Wishlisticon";

export default function GridProduct({ wishlist, onReload }) {
  return (
    <Grid container spacing={3}>
      {wishlist.map(({ product }) => (
        <Grid key={product.documentId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              transition: "0.2s",
              pb: 2,
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardActionArea href={`/${product.slug}`}>
              {/* Imagen */}
              <CardMedia
                component="img"
                height="180"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT5CDqK9ZPmXDXseMYPOXV75T1PFG8kkk9g&s"
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />

              {/* Contenido */}
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  px: 3,
                }}
              >
                <Typography variant="body1">{product.title}</Typography>

                <Box mt={1}>
                  <Typography variant="body1" color="primary" fontWeight="bold">
                    ${product.price.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ px: 3 }}>
              <WishListIcon
                productId={product.documentId}
                removeCallback={onReload}
                label={"Eliminar"}
              />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
