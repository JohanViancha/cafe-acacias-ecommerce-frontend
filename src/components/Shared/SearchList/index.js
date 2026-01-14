import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import NoResult from "../NoResult";

export default function SearchList({ results, openResults, setValue }) {
  return (
    openResults && (
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          mt: 1,
          zIndex: 10,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {results.length > 0 ? (
          <List dense>
            {results.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => {
                  router.push(`/products/${item.documentId}`);
                  setValue("");
                }}
              >
                <Tooltip title={item.title} arrow>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  />
                </Tooltip>
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 1 }}>
            <NoResult text={`No hay resultados`} />
          </Box>
        )}
      </Paper>
    )
  );
}
