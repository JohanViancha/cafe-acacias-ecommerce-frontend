import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme.ts";
import { AuthProvider, CartProvider } from "@/contexts";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps}/>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
