"use client";

import { Box } from "@mui/material";
import TopBar from "@/components/Topbar";
import Footer from "@/components/Footer";

export default function BasicLayout({ children }) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="background.default"
        mt={10}
      >
        <TopBar isOpenSearch />

        <Box component="main" flexGrow={1}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
