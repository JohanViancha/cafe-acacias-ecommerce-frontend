import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

export default function FiltersPanel({ filters, setFilters }) {
  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>

        {/* Categorías */}
        <Typography variant="subtitle1">Categoría</Typography>
        <Stack>
          {["Grano", "Molido", "Cápsulas"].map(cat => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={filters.category.includes(cat)}
                  onChange={() => toggleFilter("category", cat)}
                />
              }
              label={cat}
            />
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Tipo de café */}
        <Typography variant="subtitle1">Tipo de café</Typography>
        <Stack>
          {["Arábica", "Robusta", "Blend"].map(type => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.type.includes(type)}
                  onChange={() => toggleFilter("type", type)}
                />
              }
              label={type}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
