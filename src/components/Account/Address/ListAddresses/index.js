"use client";
import { useState, useEffect } from "react";

import { Address as AddressCtrl } from "@/api/address";
import { useAuth } from "@/hooks";
import Address from "./Address/index";
import { Stack } from "@mui/material";

const addressCtrl = new AddressCtrl();

export default function ListAddresses(props) {
  const { reload, onReload } = props;

  const [addresses, setAddresses] = useState(null);
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
  }, [reload]);

  if (!addresses) return null;
  return (
    <Stack sx={{ gap: 2, mt: 2 }}>
      {addresses.map((address) => (
        <Address
          key={address.id}
          addressId={address.documentId}
          address={address}
          onReload={onReload}
        />
      ))}
    </Stack>
  );
}
