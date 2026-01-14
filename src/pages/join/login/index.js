"use client";

import JoinLayout from "@/layouts/JoinLayout";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Auth } from "@/api";
import NextLink from "next/link";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Seo from "@/components/Shared/Seo";

const authCtrl = new Auth();
export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = () => {
    return {
      identifier: "",
      password: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const { jwt } = await authCtrl.login(formValues);
        login(jwt);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Seo />
      <JoinLayout>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h6" textAlign="center">
            Iniciar Sesión
          </Typography>

          <TextField
            placeholder="Correo electronico o nombre de usuario"
            label="Usuario"
            name="identifier"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            error={formik.errors.identifier}
          />
          <TextField
            label="Contraseña"
            fullWidth
            name="password"
            onChange={formik.handleChange}
            error={formik.errors.password}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ingresar
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Link component={NextLink} href="/join/register" underline="hover">
              Crear cuenta
            </Link>
            <Link
              component={NextLink}
              href="/join/forgot-password"
              underline="hover"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </JoinLayout>
    </>
  );
}
