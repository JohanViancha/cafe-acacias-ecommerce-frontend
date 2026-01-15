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
          size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
        >
          <Badge
            badgeContent={discount(p.discount)}
            color="primary"
            variant="string"
            sx={{
              "& .MuiBadge-badge": {
                minWidth: 28,
                height: 30,
                fontSize: "0.8rem",
                fontWeight: "bold",
                px: 1,
                py: 0.5,
              },
            }}
          >
            <Card
              sx={{
                maxWidth: 400,
                minHeight: 300,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <CardActionArea sx={{ p: 1 }} href={`/${p.slug}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVT5CDqK9ZPmXDXseMYPOXV75T1PFG8kkk9g&s"
                  alt="green iguana"
                  sx={{ borderRadius: 2 }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Tooltip title={p.title} arrow>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      sx={{
                        fontWeight:"600",
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
