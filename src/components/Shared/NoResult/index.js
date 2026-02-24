"use client";

import { Typography, Stack, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NoResult({children,
  subtitle = "",
  text = "",
  redirectAction = "",
  actionText = "",
  image,
}) {
  const router = useRouter();
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      {image && <Image src={image} width={250} height={250} />}

      <Stack gap={3} alignItems={"center"}>
        <Typography variant="h6" fontWeight={"bold"}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.primary" textAlign="center" p={2}>
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
        {children}
      </Stack>
    </Stack>
  );
}
