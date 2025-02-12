import { ImCheckmark } from "react-icons/im";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AllOrders() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const shippingAddress = Cookies.get("shippingAddress");

    
    if (!shippingAddress) {
      navigate("/");
    } else {
      setIsRedirecting(true);
    }

    const path = window.location.pathname;
    if (path === "/") {
      Cookies.remove("shippingAddress"); 
    }
  }, [navigate]);

  useEffect(() => {
    if (isRedirecting) {
      navigate("https://el-kadi.github.io/FreshCart-E-commerce-App/allorders");
    }
  }, [isRedirecting, navigate]);

  return (
    <div className="h-[50vh] absolute inset-0 translate-y-[50%]">
      <h3 className="flex flex-col text-center w-96 mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <div className="bg-green-600 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-5">
            <ImCheckmark className="mx-auto text-8xl text-center text-white " />
          </div>
          Payment Complete
        </h5>
        <p className="text-xs text-gray-500/70 mb-1">
          You will be contacted within 48 to 72 hours.
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 w-full">
          Your order is on its way and will be delivered soon. Thank you for
          shopping with us!
        </p>
      </h3>
    </div>
  );
}
