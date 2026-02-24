"use client";

import { Product } from "@/api/product";
import MenuApp from "@/components/Menu";
import { useAuth } from "@/hooks";
import SearchList from "../Shared/SearchList";
import { useCart } from "@/hooks/useCart";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  alpha,
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  InputBase,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: 400,
  [theme.breakpoints.down("sm")]: {
    display: "none", // ocultar en pantallas pequeñas (opcional)
  },
}));

// 🔎 Ícono dentro del buscador
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// ✏️ Input del buscador
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const productCtrl = new Product();

export default function TopBar({ isOpenSearch }) {
  const { user } = useAuth();
  const { total } = useCart();
  const router = useRouter();

  const goToLogin = () => router.push("/join/login");
  const goToAccount = () => router.push("/account");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [openResults, setOpenResults] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const goToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (!debouncedValue) {
      setResults([]);
      setOpenResults(false);
      return;
    }
    searchProduct();
  }, [debouncedValue]);

  const searchProduct = async () => {
    const results = await productCtrl.searchProducts(debouncedValue);
    setResults(results.data);
    setOpenResults(true);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: trigger ? "primary.main" : "rgba(58, 47, 38, 0.95)",
          backdropFilter: "blur(8px)",
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ height: { xs: 64, md: 80 }, justifyContent: "space-between" }}
          >
            {/* Logo */}
            <Link href={"/"}>
              <Image alt="Logo" width={70} priority src={Logo} />
            </Link>

            {isOpenSearch && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Buscar productos…"
                  inputProps={{ "aria-label": "search" }}
                />

                <SearchList
                  results={results}
                  openResults={openResults}
                  setValue={setValue}
                />
              </Search>
            )}

            {/* Desktop Navigation */}

            <MenuApp />

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { color: "white" },
                }}
                onClick={user ? goToAccount : goToLogin}
              >
                <PersonIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  "&:hover": { color: "white" },
                }}
                onClick={goToCart}
              >
                <Badge
                  badgeContent={total}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "hsl(18, 45%, 45%)",
                      color: "white",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                    },
                  }}
                >
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{
                  display: { md: "none" },
                  color: "primary.contrastText",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        disableScrollLock
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "primary.main",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "primary.contrastText" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <MenuApp isMobile setDrawerOpen={setDrawerOpen} />
        </List>
      </Drawer>
    </>
  );
}
