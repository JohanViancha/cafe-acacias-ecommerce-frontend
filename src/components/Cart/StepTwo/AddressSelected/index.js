"use client";

import { Address } from "@/api/address";
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

const addressCtrl = new Address();

export default function AddressSelected({
  addressSelected,
  setAddressSelected,
}) {
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.documentId);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {addresses.map((address) => {

        const isSelected = addressSelected?.documentId === address.documentId;

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
                      color: isSelected ? "background.paper" : "text.primary",
                    },
                  }}
                />

                <Box>
                  <Typography fontWeight={600}>{address.title}</Typography>
                  <Typography variant="body2">{address.fullName}</Typography>
                  <Typography variant="body2">
                    {address.address}, {address.city}
                  </Typography>
                  <Typography variant="body2">Tel: {address.phone}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
