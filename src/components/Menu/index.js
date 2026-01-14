import { Category } from "@/api";
import Link from "next/link";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";

const categoryCtrl = new Category();

function Menu() {
  const [categories, setCategories] = useState(null);

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
      {categories?.map((category) => {
        return (
          <Button
            key={category.documentId}
            color="inherit"
            component={Link}
            href={`/products/${category.slug}`}
          >
            {category.title}
          </Button>
        );
      })}
    </>
  );
}

export default Menu;
