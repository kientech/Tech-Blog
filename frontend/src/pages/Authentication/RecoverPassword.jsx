import React, { useState } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../components/Client/Loading/Loading";

function RecoverPassword() {
  // State to manage the email input, loading, message, and error
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle email input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading

    try {
      // Replace with your backend endpoint for password recovery
      const response = await axios.post(`${api}api/v1/auth/forgot-password`, {
        email,
      });

      // Handle successful response
      toast.success("Password Reset Link Sent to Your Email!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError("");
      setMessage("");
    } catch (err) {
      // Handle error response
      toast.error("User Not Found!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMessage("");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="w-full h-[700px] rounded-lg bg-gray-50 flex gap-x-4 mx-auto my-8">
      <div className="w-[50%] p-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between my-8">
            <Link
              to={"/"}
              className="text-2xl font-bold mr-1 pt-2 text-[#ff7079]"
            >
              Tech Blog
            </Link>
            <Link
              to={"/register"}
              className="underline text-md text-buttonColor"
            >
              Create an account
            </Link>
          </div>
          <div className="mt-24">
            <h2 className="font-bold text-2xl my-4 text-center text-gray-900">
              Recover Password
            </h2>
            <div style={{ marginBottom: "15px" }} className="w-[80%] mx-auto">
              <label htmlFor="email" className="font-base my-2 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email ...."
                id="email"
                value={email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "16px" }}
                className="rounded-lg border shadow-sm text-buttonColor outline-none focus:border-buttonColor"
                disabled={loading} // Disable input while loading
              />

              <div className="my-8 w-full h-full mx-auto">
                <button
                  type="submit"
                  className="block w-[300px] mx-auto py-3 text-white rounded-lg bg-buttonColor"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <Loading /> // Loading text, can replace with a spinner
                  ) : (
                    "Reset Password"
                  )}
                </button>
                <Link
                  to={"/login"}
                  className="flex items-center mx-auto mt-4 justify-center gap-x-4 w-[300px] py-2 border rounded-lg my-2"
                >
                  <FaLongArrowAltLeft />
                  <h1>Back to Login</h1>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="p-10 w-[50%] h-full rounded-lg">
        <img
          src="https://cdn.dribbble.com/userupload/14138765/file/original-4bd9e0eb3b782700c8469c74fc8fc7ce.png?resize=1504x1128"
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default RecoverPassword;
