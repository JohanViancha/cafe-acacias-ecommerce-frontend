import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";

export class Cart {
  add(productId, quantity = 1) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    if (objIndex < 0) {
      products.push({ id: productId, quantity: quantity });
    } else {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + quantity;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += Number(item.quantity);
    });

    return count;
  }

  changeQuantity(productId, quantity) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    products[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  delete(productId) {
    const products = this.getAll();
    const updateProducts = products.filter(
      (product) => product.id !== productId
    );

    localStorage.setItem(ENV.CART, JSON.stringify(updateProducts));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(products, idUser, currency, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENY_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products,
          user: idUser,
          currency: currency,
          address: address,
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
