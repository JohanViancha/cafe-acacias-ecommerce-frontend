import { Cart } from "@/api/cart";
import { useAuth } from "@/hooks";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
  Button,
  CardActions,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const cartCtrl = new Cart();

export default function Summary({ products, addressSelected }) {
  if (!products || products.length === 0) return;

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  const initBoldCheckout = () => {
    if (
      document.querySelector(
        'script[src="https://checkout.bold.co/library/boldPaymentButton.js"]'
      )
    ) {
      console.warn("Bold Checkout script is already loaded.");
      return;
    }

    var js;
    js = document.createElement("script");
    js.onload = () => {
      window.dispatchEvent(new Event("boldCheckoutLoaded"));
    };
    js.onerror = () => {
      window.dispatchEvent(new Event("boldCheckoutLoadFailed"));
    };
    js.src = "https://checkout.bold.co/library/boldPaymentButton.js";
    document.head.appendChild(js);
  };

  useEffect(() => {
    const subtotal = products.reduce(
      (acc, product) =>
        acc +
        (product.price - (product?.discount * product?.price) / 100) *
          product.quantity,

      0
    );

    setSubtotal(subtotal);
    setTotal(subtotal + 7000);
  }, [products]);

  useEffect(() => {
    initBoldCheckout();
  }, []);

  const pay = async () => {
    try {
      const currency = "COP";
      const order = await cartCtrl.paymentCart(
        products,
        user.id,
        currency,
        addressSelected
      );

      const checkout = new BoldCheckout({
        customerData: JSON.stringify({
          email: user.email,
          fullName: `${user.firstName} ${user.lastName}`,
          phone: addressSelected.phone,
          dialCode: addressSelected.dialCode,
          documentType: user.documentType,
          documentNumber: user.documentNumber,
        }),
        billingAddress: JSON.stringify({
          address: addressSelected.address,
          zipCode: addressSelected.postalCode,
          city: addressSelected.city,
          state: addressSelected.state,
          country: "CO",
        }),
        orderId: order.idPayment,
        apiKey: order.apiKey,
        description: "Compra de Cafe",
        currency: currency,
        integritySignature: order.hashIntegraty,
        amount: order.totalPayment,
        redirectionUrl: "https://cafe-acacias.up.railway.app/cart?step=2",
      });

      checkout.open();
      cartCtrl.deleteAll();

      router.replace({
        query: {
          ...router.query,
          step: 2,
          "bold-order-id": order.idPayment,
          "bold-tx-status": "approved",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card variant="outlined" sx={{ borderColor: "primary.main" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Resumen de pago
        </Typography>

        <List dense disablePadding>
          {(products || []).map((product) => (
            <ListItem key={product.id} disableGutters sx={{ mb: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                gap={3}
              >
                <Box>
                  <Typography fontWeight={600}>{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category.title}
                  </Typography>
                </Box>

                <Typography fontWeight={600}>
                  {product.quantity} X $
                  {(
                    product.price -
                    (product.discount * product.price) / 100
                  ).toLocaleString("es-CO")}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Stack gap={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Subtotal</Typography>
            <Typography fontWeight="bold">
              ${subtotal.toLocaleString("es-CO")}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Envio</Typography>
            <Typography fontWeight="bold">
              ${(7000).toLocaleString("es-CO")}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold" variant="h6">
              ${total.toLocaleString("es-CO")}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <Divider />

      <CardActions>
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => {
              router.replace({ query: { ...router.query, step: 0 } });
            }}
          >
            Volver
          </Button>
          <Button
            fullWidth
            disabled={!addressSelected}
            variant="contained"
            color="primary"
            onClick={pay}
          >
            Pagar
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
