import { Wishlist as WishlistCtrl } from "@/api";
import NoResult from "@/components/Shared/NoResult";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import GridProduct from "./GridProduct";

const wishlistCtrl = new WishlistCtrl();

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.getAll(user.documentId);
        setWishlist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return !wishlist || wishlist.length === 0 ? (
    <NoResult text="No tienes ningun producto en la lista de deseos" />
  ) : (
    <GridProduct wishlist={wishlist} onReload={onReload} />
  );
}
