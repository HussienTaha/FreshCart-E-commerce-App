import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import Cookies from "js-cookie";

export default function CheckOut() {
  const { cartId } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Mansoura",
    "El-Mahalla El-Kubra",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Faiyum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Qena",
    "Sohag",
    "Hurghada",
    "6th of October City",
    "Shibin El Kom",
    "Banha",
    "Kafr El Sheikh",
    "Arish",
    "10th of Ramadan City",
    "Marsa Matruh",
    "Idku",
    "Bilbeis",
    "Mit Ghamr",
    "Al-Hamidiyya",
    "Desouk",
    "Qalyub",
    "Abu Kabir",
    "Kafr El Dawwar",
    "Girga",
    "Akhmim",
    "Matareya",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (shippingAddress.details.length < 3) {
      newErrors.details = "Details must be at least 3 characters long.";
    }

    if (!/^01[0125][0-9]{8}$/.test(shippingAddress.phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number.";
    }

    if (!shippingAddress.city) {
      newErrors.city = "Please enter a city.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Cookies.set("shippingAddress", JSON.stringify(shippingAddress), {
      expires: 7,
    });

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://el-kadi.github.io/FreshCart-E-commerce-App`,
        { shippingAddress },
        { headers: { token: localStorage.getItem("token") } }
      );

      if (res.data.status === "success") {
        window.location.href = res.data.session.url;
      }
    } catch (error) {
      setError("Failed to complete payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shipping Details
          </label>
          <input
            type="text"
            value={shippingAddress.details}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                details: e.target.value,
              })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter shipping details"
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">{errors.details}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select your city
          </label>
          <select
            id="cities"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a city</option>
            {egyptianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
