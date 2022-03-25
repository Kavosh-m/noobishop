import React from "react";
import { Link } from "react-router-dom";

const NotFoundRoute = () => {
  return (
    <div>
      <p>Page not found</p>
      <Link to="/" className="mt-5 rounded-3xl bg-red-200 px-4 py-2">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundRoute;
