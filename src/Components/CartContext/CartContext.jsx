import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status === "success") {
        setCartItems(res.data.data.products);
        setCartCount(res.data.numOfCartItems);
        setCartId(res.data.data._id);
      }
    } catch (error) {
      setError("Failed to fetch cart data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function addProductToCart(pid) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: pid,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status === "success") {
        setCartItems(res.data.data.products);
        setCartCount(res.data.numOfCartItems);
      }
      return res;
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProductQuantity(pid, quantity) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pid}`,
        {
          count: quantity,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status === "success") {
        setCartItems(res.data.data.products);
        setCartCount(res.data.numOfCartItems);
      }
      return res;
    } catch (error) {
      setError("Failed to update product quantity. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeProductFromCart(pid) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${pid}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status === "success") {
        setCartItems(res.data.data.products);
        setCartCount(res.data.numOfCartItems);
      }
      return res;
    } catch (error) {
      setError("Failed to remove product from cart. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.message === "success") {
        setCartItems([]);
        setCartCount(0);
      }
      return res;
    } catch (error) {
      setError("Failed to clear cart. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        isLoading,
        error,
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
        clearCart,
        fetchCart,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
