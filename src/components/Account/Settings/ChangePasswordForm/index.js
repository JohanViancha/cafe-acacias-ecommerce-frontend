import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { User } from "@/api";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useAuth } from "@/hooks";

const userCtrl = new User();

function ChangePasswordForm() {
  const { user, logout } = useAuth();

  const initialValues = () => {
    return {
      password: "",
      repeatPassword: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      password: Yup.string().required(true),
      repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref("password")], true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password });
        logout();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={5}>
          <TextField
            fullWidth
            size="small"
            type="password"
            name="password"
            label="Contraseña"
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={5}>
          <TextField
            fullWidth
            size="small"
            type="password"
            name="repeatPassword"
            label="Repetir contraseña"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
            variant="outlined"
          />
        </Grid>
        <Grid size={2}>
          <Button
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChangePasswordForm;
