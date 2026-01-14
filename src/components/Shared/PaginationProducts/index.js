"use client";

import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function PaginationProducts({ currenPage, totalPages }) {
  const router = useRouter();

  const onChangePage = (_, value) => {
    router.replace({ query: { ...router.query, page: value } });
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
  
      <Pagination
        page={currenPage}
        count={totalPages}
        onChange={onChangePage}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
