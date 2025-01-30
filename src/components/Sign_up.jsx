// import React, { useState } from "react";

// function Sign_up() {
//   // Step 1: Initialize state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // Step 2: Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value, // Dynamically update the corresponding field
//     });
//   };

//   // Step 3: Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Add additional logic like sending data to an API
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter your name"
//         />
//       </div>
//       <div>
        
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//         />
//       </div>
//       <div>
        
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter your password"
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default Sign_up;



// import React from "react";
// import "./Sign_up.css";

// function  Sign_up() {
//   return (
//     <div className="signup-container">
//       <div className="form-box">
//         <h1 className="logo">Instagram</h1>
//         <p className="tagline">Sign up to see photos and videos from your friends.</p>
//         <button className="facebook-login">Log in with Facebook</button>
//         <div className="divider">OR</div>
//         <form  className="signup-form">
//           <input  type="text" placeholder="Mobile Number or Email" required />
//           <input type="password" placeholder="Password" required />
//           <input type="text" placeholder="Full Name" required />
//           <input type="text" placeholder="Username" required />
//           <button type="submit" className="signup-button">Sign up</button>
//         </form>
//         <p className="terms">
//           By signing up, you agree to our <strong>Terms</strong>, <strong>Privacy Policy</strong>, and <strong>Cookies Policy</strong>.
//         </p>
//       </div>
//       <div className="login-link">
//         Have an account? <a href="#">Log in</a>
//       </div>
//     </div>
//   );
// }

// export default Sign_up;


import React, { useState } from "react";
import "./Sign_up.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sign_up() {

  const navigate = useNavigate();
  // Step 1: Initialize state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Step 2: Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the corresponding field
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Sending data to the backend using Axios
        const response = await axios.post("http://localhost:3000/sigin", formData);
  
        // Handle success response
        setResponseMessage("Registration successful!");
        console.log("Server Response:", response.data);
        // const { id} = response.data.user;
        // console.log("idssssss",id);
        // Clear the form fields
        setFormData({
          email: "",
          password: "",
          name: "",
          username: "",
        });
       navigate("/login");
      } catch (error) {
        // Handle error response
        setResponseMessage("Registration failed. Please try again.");
        console.error("Error:", error.response?.data || error.message);
      }
  
    // Add additional logic like sending data to an API
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h1 className="loo">Instagram</h1>
        <p className="tagline">Sign up to see photos and videos from your friends.</p>
        <button className="facebook-login">Log in with Facebook</button>
        <div className="divider">OR</div>
        <form className="signup-form" onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <button type="submit" className="signup-button">Sign up</button>
        </form>
        <p className="terms">
          By signing up, you agree to our <strong>Terms</strong>, <strong>Privacy Policy</strong>, and <strong>Cookies Policy</strong>.
        </p>
      </div>
      <div className="login-link">
        Have an account? <Link to="/login"> Log in </Link>
      </div>
    </div>
  );
}

export default Sign_up;
