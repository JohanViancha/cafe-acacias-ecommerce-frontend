import React, {useState} from "react";
import { Button } from "@mui/material";
import BasicModal from "@/components/Shared/BasicModal/index";
import AddressForm from "@/components/Account/Address/AddressForm/index";


function AddAddress({onReload}) {

  const [show, setShow] = useState(false)

  const onToggleModal = () => setShow((prevState)=> !prevState)

  return (
    <>
      <Button type="submit" onClick={onToggleModal} variant="contained" color="primary">
        Crear
      </Button>

      <BasicModal show={show} onClose={onToggleModal} title="Nueva dirección">
        <AddressForm onClose={onToggleModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}

export default AddAddress;
