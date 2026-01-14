import { Order } from "@/api/order";
import NoResult from "@/components/Shared/NoResult";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import OrderPayment from "./OrderPayment";

const orderCtrl = new Order();

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.documentId);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

  return orders.map((order)=> { 
    return <OrderPayment order={order} />
  })
  
    
  
}
