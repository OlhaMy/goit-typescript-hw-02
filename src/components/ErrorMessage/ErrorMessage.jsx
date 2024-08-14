import React from "react";
import { Toaster } from "react-hot-toast";

const ErrorMessage = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};
export default ErrorMessage;
