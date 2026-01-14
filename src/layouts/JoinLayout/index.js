"use client";

import { useAuth } from "@/hooks";
import { Box, Container, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function JoinLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/");
    return null;
  }
  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
    
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            borderRadius: 4,
            p: 4,
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Image
              src="/cafe.jpg"
              alt="Logo del Café"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Coffee Shop
            </Typography>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
