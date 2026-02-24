"use client";

import { Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Address } from "@/api/address";
import { useAuth } from "@/hooks";
import { useNotify } from "@/contexts";

const addressCtrl = new Address();

export default function AddressForm({ onClose, onReload, addressId, address }) {
  const { user } = useAuth();
  const { notify } = useNotify();

  const initialValues = (address) => {
    return {
      title: address?.title || "",
      name: address?.name || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      phone: address?.phone || "",
    };
  };

  const validationSchema = () => {
    return Yup.object({
      title: Yup.string().required(true),
      name: Yup.string().required(true),
      address: Yup.string().required(true),
      city: Yup.string().required(true),
      state: Yup.string().required(true),
      postalCode: Yup.string().required(true),
      phone: Yup.number().required(true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressCtrl.update(formValue, addressId);
        } else {
          await addressCtrl.create(formValue, user.id);
        }

        formik.handleReset();
        onReload();
        notify("La direacción ha sido creada correctamente", "success");
      } catch (error) {
        console.error(error);
        notify("La direacción no pudo crearse, intenta de nuevo", "error");
      } finally {
        onClose();
      }
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <Grid container spacing={2}>
        {/* Título 100% */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="Título de la dirección"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
        </Grid>

        {/* Nombres */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Nombres y apellidos"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
        </Grid>

        {/* Dirección */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Dirección"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
        </Grid>

        {/* Departamento */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Departamento"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.errors.state}
          />
        </Grid>

        {/* Ciudad */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Ciudad"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
          />
        </Grid>

        {/* Código postal */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Código postal"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={formik.errors.postalCode}
          />
        </Grid>

        {/* Teléfono */}
        <Grid size={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
        </Grid>

        {/* Botón */}
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            loading={formik.isSubmitting}
          >
            Guardar dirección
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
