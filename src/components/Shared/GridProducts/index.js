import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Badge,
  Tooltip,
} from "@mui/material";

function GridProducts({ products }) {
  const discount = (discountValue) => {
    if (discountValue) return `- ${discountValue}%`;

    return null;
  };
  return (
    <>
      {products.map((p) => (
        <Grid
          key={p.id}
          item
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{ ":hover": { scale: 1.1 } }}
        >
          <Badge
            badgeContent={discount(p.discount)}
            color="primary"
            variant="string"
            sx={{
              "& .MuiBadge-badge": {
                minWidth: 28,
                height: 30,
                fontSize: "1rem",
                fontWeight: "bold",
                px: 1.5,
                py: 1.5,
              },
            }}
          >
            <Card
              sx={{
                maxWidth: 350,
                minHeight: 300,
                borderRadius: 3,
                backgroundColor: "background.paper",
              }}
            >
              <CardActionArea sx={{ p: 2 }} href={`/${p.slug}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT5CDqK9ZPmXDXseMYPOXV75T1PFG8kkk9g&s"
                  alt="green iguana"
                  sx={{ borderRadius: 3 }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Tooltip title={p.title} arrow>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.title}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={p.summary} arrow>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.summary}
                    </Typography>
                  </Tooltip>

                  <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    sx={{ color: "primary.main", marginTop: 2 }}
                  >
                    $ {p.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Badge>
        </Grid>
      ))}
    </>
  );
}

export default GridProducts;
