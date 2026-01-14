"use client";

import { Typography } from "@mui/material";

export default function NoResult({ text }) {
  return (
    <Typography variant="body2" color="text.primary" textAlign="center">
      {text}
    </Typography>
  );
}
