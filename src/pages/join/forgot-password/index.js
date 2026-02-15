"use client";

import { Button, TextField, Box, Stack,  Typography, Link } from "@mui/material";
import NextLink from "next/link";
import Seo from "@/components/Shared/Seo";
import JoinLayout from "@/layouts/JoinLayout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import BasicModal from "@/components/Shared/BasicModal";
import { Auth } from "@/api";

const authCtrl = new Auth();

export default function ForgotPasswordPage() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prevState) => !prevState);

  const initialValues = () => {
    return {
      email: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email().required(true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await authCtrl.forgotPassword(formValues);
        toggleModal()
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
            Recuperar Contraseña
          </Typography>

          <TextField
            name="email"
            onChange={formik.handleChange}
            error={formik.errors.password}
            label="Correo electrónico"
            type="email"
            fullWidth
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar enlace de recuperación
          </Button>

          <Link
            component={NextLink}
            href="/join/login"
            underline="hover"
            textAlign="center"
          >
            Volver al inicio de sesión
          </Link>
        </Box>
      </JoinLayout>

      <Box>
        <BasicModal
          show={showModal}
          onClose={toggleModal}
          title="Ingresar usuario"
          width={400}
        >
          <Stack gap={2}>
            <Typography variant="body2" fontWeight={"600"} my={1}>
              Se ha enviando un correo para recuperar contraseña
            </Typography>
            <Button variant="contained" color="primary" onClick={toggleModal}>
              Ok
            </Button>
          </Stack>
        </BasicModal>
      </Box>
    </>
  );
}
