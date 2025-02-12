import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtected from "./Components/AuthProtected/AuthProtected";
import ProductDetails from "./Components/ProductsDetails/ProductsDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishList from "./Components/WishList/WishList";
import Checkout from "./Components/CheckOut/CheckOut";
import CartProtectedRoute from "./Components/CartProtectedRoute/CartProtectedRoute";
import AllOrders from "./Components/AllOrders/AllOrders";
import { initFlowbite } from "flowbite";


function App() {
  useEffect(() => {
    initFlowbite();
  });

  const [forgotPasswordVisited, setForgotPasswordVisited] = useState(false);

  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: 'cart',
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: 'checkout',
          element: (
            <ProtectedRoute>
              <CartProtectedRoute>
                <Checkout />
              </CartProtectedRoute>
            </ProtectedRoute>
          ),
        },
        {
          path: 'wishList',
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: 'brands',
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: 'allorders',
          element: (
            <ProtectedRoute>
             
                <AllOrders />
             
            </ProtectedRoute>
          ),
        },
        {
          path: 'categories',
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: 'productsDetails/:pid/:cid',
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products/productsDetails/:pid/:cid',
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: 'register',
          element: (
            <AuthProtected>
              <Register />
            </AuthProtected>
          ),
        },
        {
          path: 'login',
          element: (
            <AuthProtected>
              <Login />
            </AuthProtected>
          ),
        },
        {
          path: 'forget-password',
          element: (
            <AuthProtected>
              <ForgetPassword setForgotPasswordVisited={setForgotPasswordVisited} />
            </AuthProtected>
          ),
        },
        {
          path: 'reset-password',
          element: (
            <AuthProtected>
              {forgotPasswordVisited ? <ResetPassword /> : <Notfound />}
            </AuthProtected>
          ),
        },
        {
          path: '*',
          element: <Notfound />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App