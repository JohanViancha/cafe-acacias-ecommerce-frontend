"use client";

import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import AddressSelected from "./AddressSelected";
import Summary from "./Summary";

export default function StepTwo({ products }) {
  const [addressSelected, setAddressSelected] = useState(null);

  return (
    <>
      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
        Dirección
      </Typography>

      <Grid container spacing={4}>
        {/* 🟦 IZQUIERDA */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7, xl: 8 }}>
        <AddressSelected
            addressSelected={addressSelected}
            setAddressSelected={setAddressSelected}
          />
        </Grid>

        {/* 🟩 DERECHA */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5, xl: 4 }}>
          <Summary products={products} addressSelected={addressSelected} />
        </Grid>
      </Grid>
    </>
  );
}
