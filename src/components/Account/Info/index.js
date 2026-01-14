"use client";
import { useAuth } from "@/hooks";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function Info() {
  const { user } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p={2}
      m={"auto"}
      width={500}
    >
      <Box textAlign={"center"} width="100%">
        <AccountCircleSharpIcon sx={{ fontSize: "70px" }} color="primary" />

        <Typography variant="h5" fontWeight="bold" color="primary">
          {user.username}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Miembro desde: {user.createdAt}
        </Typography>
      </Box>
    </Box>
  );
}

export default Info;
