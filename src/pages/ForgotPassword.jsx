import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import './forgot-password.css';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // ✅ Required for setMessage below

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });

      if (res.data.success) {
        setMessage("Reset link sent to your email");
        toast.success("Reset link sent to your email", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        setMessage("Failed to send reset email");
        toast.error("Failed to send reset email", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      setMessage("Something went wrong");
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

return (
  <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="submit" type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  </>
);
}
export default ForgotPassword;
