import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMess, seterrorMess] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (loginData) {
      try {
        setisLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          loginData,
          toast.success("thanks for login")
        );
        if (data.message === "success") {
          navigate("/");
          setToken(data.token);
        }
      } catch {
        seterrorMess("Email or Passowrd incorrect");
      } finally {
        setisLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:max-w-screen-xl container mx-auto"
      >
        <h2 className="text-2xl text-mainclr my-7 font-bold">Login Form</h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        )}
        {errorMess ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMess}
          </div>
        ) : null}
        <div className="flex justify-between">
          <Link to={`/forget-password`}>
            {" "}
            <span
              type="submit"
              className="text-black cursor-pointer  hover:text-mainclrbold duration-300  font-medium  text-lg sm:w-auto py-2.5 text-center"
            >
              Forget Your Password ?
            </span>
          </Link>
          <button
            type="submit"
            className="text-white bg-mainclr hover:bg-mainclrbold duration-200 focus:ring-4 focus:outline-none focus:ring-mainclr font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-mainclr dark:hover:bg-mainclr dark:focus:ring-mainclr"
          >
            {isLoading ? <FaSpinner className="animate-spin"  /> : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
