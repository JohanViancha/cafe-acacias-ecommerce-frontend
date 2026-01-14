import { Address as AddressCtrl } from "@/api/address";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import BasicModal from "@/components/Shared/BasicModal/index";
import Confirm from "@/components/Shared/Confirm/index";

import AddressForm from "@/components/Account/Address/AddressForm/index";

const addressCtrl = new AddressCtrl();

function Address(props) {
  const { addressId, address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCtrl.delete(addressId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            {address.title}
          </Typography>
          <Typography variant="body2">
            {address.name}, {address.address}, {address.state}, {address.city},{" "}
            {address.postalCode}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
            px: 2,
          }}
        >
          <Button
            size="small"
            aria-label="update"
            variant="contained"
            color="primary"
            onClick={openCloseEdit}
          >
            <EditIcon />
          </Button>

          <Button
            size="small"
            aria-label="delete"
            variant="contained"
            color="primary"
            onClick={openCloseConfirm}
          >
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>

      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        title="Confirmación de eliminación"
        content="¿Estas seguro de que quieres eliminar la dirección?"
      />

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          addressId={addressId}
          address={address}
        />
      </BasicModal>
    </>
  );
}

export default Address;
