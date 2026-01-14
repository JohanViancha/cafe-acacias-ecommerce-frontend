"use client";

import { Box } from "@mui/material";
import TopBar from "@/components/Topbar";
import Footer from "@/components/Footer";

export default function BasicLayout({ children, isOpenSearch = false }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <TopBar isOpenSearch />

      <Box component="main" pt={10} flexGrow={1} pb={2} px={2}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
