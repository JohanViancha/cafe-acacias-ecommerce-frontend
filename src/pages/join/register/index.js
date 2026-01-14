"use client";
import JoinLayout from "@/layouts/JoinLayout";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Auth } from "@/api";
import { useRouter } from "next/router";
import Seo from "@/components/Shared/Seo";

const authCtrl = new Auth();
export default function RegisterPage() {
  const router = useRouter();
  const initialValues = () => {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email(true).required(true),
      username: Yup.string().required(true),
      firstName: Yup.string().required(true),
      lastName: Yup.string().required(true),
      password: Yup.string().required(true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await authCtrl.register(formValues);
        router.push("/join/login");
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h6" textAlign="center">
            Crear Cuenta
          </Typography>

          <TextField
            label="Nombres"
            name="firstName"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName}
          />

          <TextField
            label="Apellidos"
            name="lastName"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName}
          />
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            fullWidth
            onChange={formik.handleChange}
            error={formik.errors.username}
          />

          <TextField
            label="Correo electrónico"
            name="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            loading={formik.isSubmitting}
          >
            Registrarme
          </Button>

          <Link
            component={NextLink}
            href="/join/login"
            underline="hover"
            textAlign="center"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </Box>
      </JoinLayout>
    </>
  );
}
