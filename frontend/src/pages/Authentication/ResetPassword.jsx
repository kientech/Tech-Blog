import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../components/Client/Loading/Loading";

function ResetPassword() {
  const { token } = useParams(); // Get the token from URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically

  // State to manage the password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      // Replace with your backend endpoint for resetting password
      const response = await axios.put(
        `${api}api/v1/auth/reset-password/${token}`,
        { password }
      );

      toast.success("Password Reset successfully.", {
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
      navigate("/login"); // Redirect to login page after successful password reset
    } catch (err) {
      toast.error("Failed to reset password. Please try again.", {
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
            <Link to={"/login"} className="underline text-md text-buttonColor">
              Back to Login
            </Link>
          </div>
          <div className="mt-24">
            <h2 className="font-bold text-2xl my-4 text-center text-gray-900">
              Reset Password
            </h2>
            <div style={{ marginBottom: "15px" }} className="w-[80%] mx-auto">
              <label htmlFor="password" className="font-base my-2 block">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password ...."
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ width: "100%", padding: "16px" }}
                className="rounded-lg border shadow-sm text-buttonColor outline-none focus:border-buttonColor"
              />
              <label htmlFor="confirmPassword" className="font-base my-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password ...."
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                style={{ width: "100%", padding: "16px" }}
                className="rounded-lg border shadow-sm text-buttonColor outline-none focus:border-buttonColor"
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
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="p-10 w-[50%] h-full rounded-lg">
        <img
          src="https://cdn.dribbble.com/userupload/14524706/file/original-69cf2eda9223fbdad89f6e393f0af55f.png?resize=1504x1128"
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default ResetPassword;
