import React from "react";
import { Category as CategoryApi } from "@/api";
import { Product } from "@/api/product";
import BasicLayout from "@/layouts/BasicLayout";
import { Box, Typography, Grid } from "@mui/material";
import GridProducts from "@/components/Shared/GridProducts";
import NoResult from "@/components/Shared/NoResult";
import PaginationProducts from "@/components/Shared/PaginationProducts";
import Seo from "@/components/Shared/Seo";

function CategoryPage({ category, products, pagination }) {
  const hasProducts = products.length > 0;
  return (
    <>
    <Seo title={`Categoria ${category.title}`}/>
      <BasicLayout>
        <Box p={10} >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={0.5}
            color="text.primary"
          >
            {category.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            {category.description}
          </Typography>

          {hasProducts ? (
            <Box>
              <Grid container spacing={3}>
                <GridProducts products={products} />
              </Grid>
              <PaginationProducts
                currenPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </Box>
          ) : (
            <NoResult
              text={`No hay productos relacionados a la categoria ${category.title}`}
            />
          )}
        </Box>
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { category } = params;
  const categoryCtrl = new CategoryApi();
  const productsCtrl = new Product();
  const responseCategory = await categoryCtrl.getBySlug(category);
  const responseProduct = await productsCtrl.getProductsByCategorySlug(
    category,
    page
  );

  return {
    props: {
      category: responseCategory,
      products: responseProduct.data,
      pagination: responseProduct.meta.pagination,
    },
  };
}

export default CategoryPage;
