import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { User } from "@/api";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useAuth } from "@/hooks";

const userCtrl = new User();

function ChangeEmailForm() {
  const { user,updateUser } = useAuth();

  const initialValues = () => {
    return {
      email: "",
      repeatEmail: "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email(true).required(true),
      repeatEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("email")], true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { email: formValue.email });
        updateUser("email", formValue.email);
        formik.handleReset();
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
            name="email"
            label="Correo electronico"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={5}>
          <TextField
            fullWidth
            size="small"
            name="repeatEmail"
            label="Repetir correo electronico"
            value={formik.values.repeatEmail}
            onChange={formik.handleChange}
            error={formik.errors.repeatEmail}
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

export default ChangeEmailForm;
