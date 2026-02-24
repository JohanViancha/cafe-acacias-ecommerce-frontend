"use client";

import {
  AppBar,
  Box,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const steps = [
  { label: "Carrito", icon: ShoppingCartIcon },
  { label: "Pago", icon: AttachMoneyIcon },
  { label: "Confirmación", icon: CheckIcon },
];

export default function HeaderCart() {
  const {
    query: { step = 0 },
  } = useRouter();

  const activeStep = Number(step);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          py: 1,
        }}
      >
        <Toolbar sx={{ height: { xs: 64, md: 80 } }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo del Café"
                width={70}
                priority
                style={{ borderRadius: "50%" }}
              />
            </Link>
          </Box>
          <Box sx={{ width: "60%", margin: "auto" }}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;

                return (
                  <Step key={step.label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": {
                          color: "#fff",
                          fontSize: isActive ? "0.9rem" : "0.75rem",
                          fontWeight: isActive ? 600 : 400,
                          transition: "all 0.3s ease",
                        },
                        "& .MuiStepLabel-label.Mui-active": {
                          color: "background.paper",
                        },
                        "& .MuiStepLabel-label.Mui-completed": {
                          color: "background.default",
                        },
                      }}
                      slots={{
                        stepIcon: (props) => {
                          const { active, completed } = props;
                          const highlight = active || completed;

                          return (
                            <Box
                              sx={{
                                width: highlight ? 33 : 27,
                                height: highlight ? 33 : 27,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: highlight
                                  ? "#fff"
                                  : "rgba(255,255,255,0.35)",
                                color: highlight ? "primary.main" : "#fff",
                                transform: active ? "scale(1.15)" : "scale(1)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <Icon fontSize={active ? "medium" : "small"} />
                            </Box>
                          );
                        },
                      }}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer para evitar overlay */}
      <Toolbar />
    </>
  );
}
