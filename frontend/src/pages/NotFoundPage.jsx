// components/Client/NotFoundPage.js
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center py-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-buttonColor underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
