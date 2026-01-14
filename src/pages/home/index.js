"use client";

import { Box, Typography, Button } from "@mui/material";
import NextLink from "next/link";
import BasicLayout from "@/layouts/BasicLayout";
import BannerLastProductPublished from "@/components/Home/BannerLastProductPublished/BannerLastProductPublished";
import BarTrust from "@/components/Shared/BarTrust";
import HowWeDoIt from "@/components/Shared/HowWeDoIt";
import Seo from "@/components/Shared/Seo";

export default function HomePage() {
  return (
    <>
      <Seo />
      <BasicLayout>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minHeight="70vh"
          gap={2}
        >
          <Typography variant="h3" fontWeight="bold" color="primary.main">
            Bienvenido a CoffeeShop ☕
          </Typography>

          <Typography variant="h6" color="text.primary" maxWidth={600}>
            Disfruta del aroma, sabor y calidad de nuestros granos
            seleccionados. Café artesanal directamente desde las montañas hasta
            tu taza.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            component={NextLink}
            href="/productos"
            sx={{ mt: 2 }}
          >
            Ver productos
          </Button>
        </Box>

        <BannerLastProductPublished />
        <BarTrust />
        <HowWeDoIt />
      </BasicLayout>
    </>
  );
}
