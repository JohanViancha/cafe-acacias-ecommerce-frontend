"use client";

import { Address } from "@/api/address";
import NoResult from "@/components/Shared/NoResult";
import { useAuth } from "@/hooks";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Radio,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import WithoutAddress from "@/assets/without-address.png";
import AddAddress from "@/components/Account/Address/AddAddress/index";
import { useLoading } from "@/contexts";

const addressCtrl = new Address();

export default function AddressSelected({
  addressSelected,
  setAddressSelected,
}) {
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const getAddress = async () => {
    try {
      startLoading();
      const response = await addressCtrl.getAll(user.documentId);
      setAddresses(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      {addresses.length === 0 ? (
        <NoResult
          subtitle="No tienes direcciones registradas"
          text="Para continuar con tu compra, es necesario que tengas al menos una dirección registrada en tu cuenta.
Actualmente no cuentas con ninguna dirección guardada, por lo que no podemos procesar tu pedido."
          image={WithoutAddress}
        >
          <AddAddress textButton="Crear dirección" onReload={getAddress} />
        </NoResult>
      ) : (
        <>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            mb={2}
          >
            Dirección
          </Typography>

          {addresses.map((address) => {
            const isSelected =
              addressSelected?.documentId === address.documentId;

            return (
              <Card
                key={address.documentId}
                variant="outlined"
                sx={{
                  mb: 2,
                  cursor: "pointer",
                  borderColor: "primary.main",
                  "&:hover": {
                    boxShadow: 4,
                  },
                  color: isSelected ? "background.paper" : "text.primary",
                  bgcolor: isSelected ? "primary.main" : "background.paper",
                }}
                onClick={() => setAddressSelected(address)}
              >
                <CardContent>
                  <Stack flexDirection={"row"}>
                    <Radio
                      checked={isSelected}
                      sx={{
                        color: "grey.400",
                        "&.Mui-checked": {
                          color: isSelected
                            ? "background.paper"
                            : "text.primary",
                        },
                      }}
                    />

                    <Box>
                      <Typography fontWeight={600}>{address.title}</Typography>
                      <Typography variant="body2">
                        {address.fullName}
                      </Typography>
                      <Typography variant="body2">
                        {address.address}, {address.city}
                      </Typography>
                      <Typography variant="body2">
                        Tel: {address.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}
