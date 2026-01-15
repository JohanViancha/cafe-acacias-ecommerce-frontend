"use client";

import Footer from "@/components/Footer";
import HeaderCart from "@/components/Cart/HeaderCart";
import { Box } from "@mui/material";

export default function CartLayout({ children }) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <HeaderCart />

        <Box component="main" pt={10} flexGrow={1} pb={2} px={2}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
