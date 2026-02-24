"use client";

import { Wishlist } from "@/api/wishlist";
import { useAuth } from "@/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading, useNotify } from "@/contexts";

const wishlistCtrl = new Wishlist();

export default function WishListIcon({ productId, label, removeCallback }) {
  const [hasWishlist, setHasWishlist] = useState(null);
  const { user } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { notify } = useNotify();

  useEffect(() => {
    (async () => {
      try {
        startLoading;
        const response = await wishlistCtrl.check(user.documentId, productId);
        setHasWishlist(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      } finally {
        stopLoading();
      }
    })();
  }, [productId]);

  const addWishlist = async (e) => {
    e.stopPropagation();

    const response = await wishlistCtrl.add(user.documentId, productId);
    setHasWishlist(response);
    notify("Se ha agregado el producto a la lista de deseos", "success");
  };

  const deleteWishlist = async (e) => {
    e.stopPropagation();

    try {
      await wishlistCtrl.delete(hasWishlist.documentId);
      setHasWishlist(false);
      notify("Se ha eliminado el producto de la lista de deseos", "info");

      if (removeCallback) {
        removeCallback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hasWishlist === null) return null;

  return label ? (
    <Button
      onClick={deleteWishlist}
      fullWidth
      variant="outlined"
      startIcon={<DeleteIcon />}
    >
      {label}
    </Button>
  ) : (
    <IconButton
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      sx={{
        width: 40,
        height: 40,
        p: 0,
        flexShrink: 0,
        color: hasWishlist ? "error.main" : "text.secondary",
        "&:hover": {
          color: "error.main",
          transform: "scale(1.1)",
        },
      }}
    >
      {hasWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
