import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme.ts";
import { AuthProvider, CartProvider } from "@/contexts";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </CartProvider>
        <script src="https://checkout.bold.co/library/boldPaymentButton.js"></script>
      </AuthProvider>
    </>
  );
}
