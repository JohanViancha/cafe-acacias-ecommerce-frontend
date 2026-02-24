import {
  AuthProvider,
  CartProvider,
  NotifyProvider,
  LoadingProvider,
} from "@/contexts";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme.ts";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <NotifyProvider>
              <LoadingProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </LoadingProvider>
            </NotifyProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
