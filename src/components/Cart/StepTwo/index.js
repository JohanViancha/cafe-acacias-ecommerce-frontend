"use client";

import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import AddressSelected from "./AddressSelected";
import Summary from "./Summary";
import { useRouter } from "next/router";

export default function StepTwo({ products }) {
  const [addressSelected, setAddressSelected] = useState(null);
  const router = useRouter()

  if (!products) {
    router.replace({ query: { ...router.query, step: 0 } });
  };

  return (
    <>
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
