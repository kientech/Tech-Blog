import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Client/Loading/Loading";

function CreateBlogPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews
  const token = Cookies.get("token");
  const { user, loadUserFromLocalStorage } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await loadUserFromLocalStorage();
      if (!user && !token) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [loadUserFromLocalStorage]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(`${api}api/v1/blogs/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Created Blog Successfully!");
      navigate("/dashboard/manage-blogs");
    } catch (error) {
      toast.error("Error creating Blog!");
      console.error("There was an error creating the blog!", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Create a New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images:
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            accept="image/*"
          />
          {/* Preview images */}
          <div className="mt-4 flex space-x-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover border border-gray-300 rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content:
          </label>
          <Editor
            apiKey="kipc10e7w0fa5b7bozt9l0xwwmoukji25fh9wbyfnbzmuls5"
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              apiKey: "kipc10e7w0fa5b7bozt9l0xwwmoukji25fh9wbyfnbzmuls5",
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image media",
              image_title: true,
              automatic_uploads: true,
              images_upload_url: "/upload", 
              file_picker_types: "image media",
              images_upload_handler: (blobInfo, success, failure) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open("POST", "/upload"); 

                xhr.onload = () => {
                  if (xhr.status < 200 || xhr.status >= 300) {
                    failure("HTTP Error: " + xhr.status);
                    return;
                  }
                  const json = JSON.parse(xhr.responseText);
                  success(json.location);
                };

                const formData = new FormData();
                formData.append("file", blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
              },
            }}
            value={content}
            onEditorChange={(newText) => setContent(newText)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPage;
