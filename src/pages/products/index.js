import ProductCard from "@/components/Shared/ProductCard";
import BasicLayout from "@/layouts/BasicLayout";
import { customColors } from "@/theme/theme";
import { Close, FilterList, Search, TuneOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Product } from "@/api/product";
import { Category } from "@/api";

const productCtrl = new Product();
const categoryCtrl = new Category();

const roastLevels = [
  { value: "all", label: "Todos los tostados" },
  { value: "claro", label: "Tostado Claro" },
  { value: "medio", label: "Tostado Medio" },
  { value: "oscuro", label: "Tostado Oscuro" },
];

const sortOptions = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "name-asc", label: "Nombre: A-Z" },
  { value: "name-desc", label: "Nombre: Z-A" },
  { value: "discount", label: "Mayor Descuento" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const responseProducts = await productCtrl.getProducts();
        const responseCategory = await categoryCtrl.getAll();
        setProducts(responseProducts.data);
        setCategories(responseCategory.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!products || !categories) return null;

  const [searchQuery,   setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [roast, setRoast] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([20000, 50000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

   const [openSort, setOpenSort] = useState(false);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpenSort(false);
    // Capturing=true para cerrar también si el scroll viene de un contenedor.
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [openSort]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query),
      );
    }

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category.title === category);
    }

    // Filter by roast level
    if (roast !== "all") {
      result = result.filter((p) => p.roast === roast);
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, searchQuery, category, roast, sortBy, priceRange]);

  const activeFiltersCount = [
    category !== "all",
    roast !== "all",
    priceRange[0] > 20000 || priceRange[1] < 50000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("all");
    setRoast("all");
    setPriceRange([20000, 50000]);
    setSearchQuery("");
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const FiltersContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Category Filter */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Categoría
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            key="all"
            label="Todos"
            onClick={() => setCategory("all")}
            variant={category === "all" ? "filled" : "outlined"}
            sx={{
              borderColor: category === "all" ? "primary.main" : "divider",
              bgcolor: category === "all" ? "primary.main" : "transparent",
              color:
                category === "all" ? "primary.contrastText" : "text.primary",
              "&:hover": {
                bgcolor: category === "all" ? "primary.dark" : "action.hover",
              },
            }}
          />

          {categories.map((cat) => (
            <Chip
              key={cat.documentId}
              label={cat.title}
              onClick={() => setCategory(cat.title)}
              variant={category === cat.title ? "filled" : "outlined"}
              sx={{
                borderColor:
                  category === cat.title ? "primary.main" : "divider",
                bgcolor:
                  category === cat.title ? "primary.main" : "transparent",
                color:
                  category === cat.title
                    ? "primary.contrastText"
                    : "text.primary",
                "&:hover": {
                  bgcolor:
                    category === cat.title ? "primary.dark" : "action.hover",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Price Range Filter */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Rango de Precio
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
            min={20000}
            max={50000}
            step={1000}
            sx={{
              color: "primary.main",
              "& .MuiSlider-thumb": {
                bgcolor: "primary.main",
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formatPrice(priceRange[0])}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatPrice(priceRange[1])}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{
            borderColor: "divider",
            color: "text.secondary",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
        >
          Limpiar Filtros ({activeFiltersCount})
        </Button>
      )}
    </Box>
  );

  return (
    <BasicLayout>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Hero Section */}
        <Box
          sx={{
            pt: 4,
            pb:3,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Container maxWidth="xl">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Todos los Productos
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.85,
                lineHeight: 1.8,
              }}
            >
              Descubre nuestra colección completa de cafés cuidadosamente cultivados y tostados en las montañas de Lebrija.
            </Typography>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          {/* Search and Sort Bar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 4,
              alignItems: { md: "center" },
              justifyContent: "space-between",
            }}
          >
            {/* Search */}
            <TextField
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                width: { xs: "100%", md: 300 },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Mobile Filter Button */}
              <Button
                variant="outlined"
                startIcon={<TuneOutlined />}
                onClick={() => setMobileFiltersOpen(true)}
                sx={{
                  display: { xs: "flex", lg: "none" },
                  borderColor: "divider",
                  color: "text.primary",
                }}
              >
                Filtros
                {activeFiltersCount > 0 && (
                  <Chip
                    label={activeFiltersCount}
                    size="small"
                    sx={{
                      ml: 1,
                      height: 20,
                      minWidth: 20,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                    }}
                  />
                )}
              </Button>

              {/* Sort Dropdown */}
              <FormControl
                disableScrollLock
                size="small"
                sx={{ minWidth: 200 }}
              >
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  open={openSort}
                  onOpen={() => setOpenSort(true)}
                  onClose={() => setOpenSort(false)}
                  value={sortBy}
                  label="Ordenar por"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ bgcolor: "background.paper" }}
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: {
                        bgcolor: "background.paper",
                        // Asegura que el menú quede sobre el header/controles.
                        zIndex: (theme) => theme.zIndex.modal + 1,
                      },
                    },
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Content Grid */}
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Desktop Filters Sidebar */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                width: 280,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 100,
                  p: 3,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <FilterList sx={{ color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Filtros
                  </Typography>
                </Box>
                <FiltersContent />
              </Box>
            </Box>

            {/* Products Grid */}
            <Box sx={{ flex: 1 }}>
              {/* Results Count */}
              <Typography variant="body2" color="text.secondary" mb={3}>
                Mostrando {filteredAndSortedProducts.length} de{" "}
                {products.length} productos
              </Typography>

              {filteredAndSortedProducts.length > 0 ? (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    },
                    gap: 3,
                  }}
                >
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" color="text.secondary" mb={2}>
                    No se encontraron productos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Intenta ajustar los filtros o buscar con otros términos.
                  </Typography>
                  <Button variant="outlined" onClick={clearFilters}>
                    Limpiar Filtros
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>

        {/* Mobile Filters Drawer */}
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              width: 320,
              p: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterList sx={{ color: "primary.main" }} />
              <Typography variant="h6" fontWeight={600}>
                Filtros
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <FiltersContent />
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Aplicar Filtros
            </Button>
          </Box>
        </Drawer>
      </Box>
    </BasicLayout>
  );
};

export default Products;
