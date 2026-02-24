import { createContext, useContext, useState, ReactNode } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}

      {/* GLOBAL LOADER */}

      <Backdrop
        open={loading}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: (theme) => theme.zIndex.modal + 9999,

          /* 🔥 BLUR */
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",

          /* oscurecimiento leve */
          backgroundColor: "rgba(0,0,0,0.25)",

          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
        Cargando...
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
};
