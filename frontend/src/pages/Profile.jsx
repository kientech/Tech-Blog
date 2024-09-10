import React, { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api";
import Cookies from "js-cookie";
import Loading from "../components/Client/Loading/Loading";

const Profile = () => {
  const { user, loadUserFromLocalStorage, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      await loadUserFromLocalStorage();
      if (user) {
        setFormData({
          fullname: user.fullname || "",
          email: user.email || "",
          avatar: user.avatar || "",
        });
        setAvatarPreview(getImageUrl(user.avatar));
      }
    } catch (error) {
      toast.error("Failed to load user data!", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  }, [loadUserFromLocalStorage, user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getImageUrl = (avatar) => {
    if (avatar.startsWith("http")) {
      return avatar;
    } else if (avatar.startsWith("/upload")) {
      return `${api}api/v1${avatar}`;
    }
    return "";
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, avatar: file });

        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    const token = Cookies.get("token");

    try {
      const response = await axios.patch(`${api}api/v1/users/profile`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      updateUser(response.data.data);
      toast.success("Profile Updated Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update profile! " + error.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto my-10 p-5 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      {loading ? (
        <Loading borderTopColor="buttonColor" />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-buttonColor"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-buttonColor"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-buttonColor"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-4 h-32 w-32 rounded-full object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-buttonColor text-white py-2 px-4 rounded-lg font-bold hover:bg-opacity-90 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
