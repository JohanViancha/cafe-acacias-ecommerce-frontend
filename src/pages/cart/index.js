import { Product } from "@/api/product";
import StepOne from "@/components/Cart/StepOne";
import StepTwo from "@/components/Cart/StepTwo";
import StepThree from "@/components/Cart/StepThree";
import { useCart } from "@/hooks/useCart";
import CartLayout from "@/layouts/CartLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "@/components/Shared/Seo";

const productCtrl = new Product();

export default function Cart() {
  const {
    query: { step = 0 },
  } = useRouter();
  const [products, setProducts] = useState(null);
  const { cart } = useCart();

  const currentStep = Number(step);

  useEffect(() => {
    if (!cart || !Array.isArray(cart)) return;

    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Carrito de compras" />
      <CartLayout>
        {currentStep === 0 && <StepOne products={products} />}
        {currentStep === 1 && <StepTwo products={products} />}
        {currentStep === 2 && <StepThree>Confirmacion</StepThree>}
      </CartLayout>
    </>
  );
}
