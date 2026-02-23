"use client";

import { Typography, Stack, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NoResult({
  subtitle = "",
  text = "",
  redirectAction = "",
  actionText = "",
  image,
}) {
  const router = useRouter();
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      {image && <Image src={image} width={300} height={300} />}

      <Stack gap={3} alignItems={"center"}>
        <Typography variant="h6" fontWeight={"bold"}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.primary" textAlign="center">
          {text}
        </Typography>
        {actionText && (
          <Button
            variant="outlined"
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },
            }}
            onClick={() => router.push(redirectAction)}
          >
            {actionText}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
