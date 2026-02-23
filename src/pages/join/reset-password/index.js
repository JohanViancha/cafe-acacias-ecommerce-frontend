"use client";

import Seo from "@/components/Shared/Seo";
import JoinLayout from "@/layouts/JoinLayout";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Auth } from "@/api";
import { useRouter } from "next/router";
import BasicModal from "@/components/Shared/BasicModal";

const authCtrl = new Auth();

export default function ResetPasswordPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prevState) => !prevState);

  const confirmChange = () => {
    toggleModal();
    router.push("/");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const initialValues = () => {
    return {
      password: "",
      passwordConfirmation: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      password: Yup.string().required(true),
      passwordConfirmation: Yup.string().required(true),
    });
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await authCtrl.resetPassword({ ...formValues, code: query.code });
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
            Restablecer contraseña
          </Typography>

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

          <TextField
            label="Confirmar contraseña"
            fullWidth
            name="passwordConfirmation"
            onChange={formik.handleChange}
            error={formik.errors.passwordConfirmation}
            type={showConfirmPassword ? "text" : "password"}
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
                      onClick={handleClickShowConfirmPassword}
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
            Cambiar contraseña
          </Button>
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
              La contraseña ha sido cambiada
            </Typography>
            <Button variant="contained" color="primary" onClick={confirmChange}>
              Ok
            </Button>
          </Stack>
        </BasicModal>
      </Box>
    </>
  );
}
