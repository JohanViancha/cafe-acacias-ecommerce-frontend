import { Category } from "@/api";
import {
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
const categoryCtrl = new Category();

const navLinks = [
  { label: "Inicio", href: "/#" },
  { label: "Productos", href: "/#productos" },
  { label: "Nuestra Historia", href: "/#historia" },
  { label: "Contacto", href: "/#contacto" },
];

function MenuApp({ isMobile, setDrawerOpen }) {
  const [categories, setCategories] = useState(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {!isMobile ? (
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {navLinks?.map((nav) => {
            return (
              <Box
                key={nav.label}
                component="a"
                href={nav.href}
                sx={{
                  position: "relative",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "primary.contrastText",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    width: "100%",
                    height: 5,
                    bgcolor: "#ffffff28",
                    transform: "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.3s ease-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {nav.label}
              </Box>
            );
          })}
          <Box
            onClick={handleMenuClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              color: menuOpen
                ? "primary.contrastText"
                : "rgba(255, 255, 255, 0.8)",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
          >
            Categorias
            <KeyboardArrowDown
              sx={{
                fontSize: "1.25rem",
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            disableScrollLock={true}
            MenuListProps={{
              "aria-labelledby": "catalogo-button",
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                },
              },
            }}
          >
            {categories?.map((item) => (
              <MenuItem
                key={item.documentId}
                onClick={handleMenuClose}
                component="a"
                href={`/products/${item.slug}`}
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  py: 1.5,
                  px: 2.5,
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "primary.contrastText",
                  },
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <List>
          {navLinks?.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 2,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: {
                      color: "primary.contrastText",
                      fontSize: "1.125rem",
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
              sx={{
                py: 2,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemText
                primary="Catálogo"
                primaryTypographyProps={{
                  sx: {
                    color: "primary.contrastText",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                  },
                }}
              />
              {mobileSubmenuOpen ? (
                <ExpandLess sx={{ color: "primary.contrastText" }} />
              ) : (
                <ExpandMore sx={{ color: "primary.contrastText" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={mobileSubmenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories?.map((item) => (
                <ListItemButton
                  key={item.title}
                  component="a"
                  href={`/products/${item.slug}`}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    pl: 4,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      sx: {
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "1rem",
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      )}
    </>
  );
}

export default MenuApp;
