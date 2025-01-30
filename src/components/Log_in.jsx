import React, { useState } from "react";
import axios from "axios";
import "./Log_in.css";
import { Link , useNavigate} from 'react-router-dom';

function Log_in() {

      const navigate = useNavigate();
  // State for handling form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for handling success or error messages
  const [message, setMessage] = useState("");
   const [Res , setRes] = useState({})
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("handle submit clicked",formData)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Login successful!");
      
        
        console.log("Response:", response.data);
        const { id} = response.data.user;
        navigate("/home", { state: { id} });
        // Redirect or handle success here
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      {/* <div className="left-section">
        <img
          src="https://via.placeholder.com/3000" // Replace with actual image source
          alt="App preview"
          className="phone-preview"
        />
      </div> */}
      <div className="right-section">
        <div className="form-box">
          <h1 className="loo">Instagram</h1>
          <form className="forml" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Mobile Number or Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="divider">OR</div>
          <button className="facebook-login">Log in with Facebook</button>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <div className="res">{message && <p>{message}</p>}</div>
        </div>
        <div className="signup-link">
          Don't have an account? <Link to="/sigin">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Log_in;
