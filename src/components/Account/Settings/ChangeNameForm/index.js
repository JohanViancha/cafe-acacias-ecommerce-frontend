import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { User } from "@/api";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useAuth } from "@/hooks";

const userCtrl = new User();

function ChangeNameForm() {
  const { user } = useAuth();

  const initialValues = () => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };

  const validationSchema = () => {
    return Yup.object({
      firstName: Yup.string().required(true),
      lastName: Yup.string().required(true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, formValue);
      } catch (error) {
        console.error(error);
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
            name="firstName"
            label="Nombres"
            value={formik.values.firstName}
            error={formik.errors.firstName}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={5}>
          <TextField
            fullWidth
            size="small"
            name="lastName"
            label="Apellidos"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName}
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

export default ChangeNameForm;
