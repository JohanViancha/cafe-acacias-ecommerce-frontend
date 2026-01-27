"use client";

import Menu from "@/components/Menu";
import { useAuth } from "@/hooks";
import CoffeeIcon from "@mui/icons-material/Coffee";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  alpha,
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchList from "../Shared/SearchList";
import { Product } from "@/api/product";
import { useCart } from "@/hooks/useCart";


// 🔍 Estilos del contenedor del buscador
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
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        {/* LOGO */}
        <Box display="flex" alignItems="center" gap={1}>
          <CoffeeIcon />
          <Typography
            variant="h6"
            component={NextLink}
            href="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Café Las Acacias
          </Typography>
        </Box>

        {/* BUSCADOR */}
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

        <Box sx={{ flexGrow: 1 }} />

        {/* MENÚ DE OPCIONES */}
        <Stack>
          <Box display="flex" alignItems="center" gap={2}>
            <Menu />
            <IconButton color="inherit" onClick={goToCart}>
              <Badge badgeContent={total} color="secondary">
                <ShoppingCartIcon color="inherit" />
              </Badge>
            </IconButton>
          </Box>
        </Stack>
        <Box>
          <Button color="inherit" onClick={user ? goToAccount : goToLogin}>
            <PersonIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
