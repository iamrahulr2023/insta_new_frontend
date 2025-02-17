// import React from 'react'
// import axios from "axios";
// import "./Message_P.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faMagnifyingGlass, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
// import { PiFilmStripFill } from "react-icons/pi";
// import { BiMessageRoundedCheck } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { IoCompassOutline } from "react-icons/io5";
// import { FaThreads } from "react-icons/fa6";
// import { HiBars3 } from "react-icons/hi2";
// import { useParams } from "react-router-dom";
// import { faIdBadge, faFilm } from "@fortawesome/free-solid-svg-icons";
// import { Link } from 'react-router-dom';
// import { useState , useEffect } from 'react';
// import pro_img from "C:/Users/Home/Desktop/InPlant_training_2025/backend_pratise/server/Inten_project/insta/src/assets/insta_default_img.webp"

// const Message_p = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const { id , loginid } = useParams();
//     const [isLoading, setIsLoading] = useState(true);
//     // const loginid = "19";
//       const [profilePic, setProfilePic] = useState(null);
//       const [posts, setPosts] = useState([]);
//       const [loading, setLoading] = useState(false);
//       const [showPopup, setShowPopup] = useState(false);
//       const [username , setUsername]  = useState("");
//     const [follower_c , setfollowers_count] = useState(0);
//     const [following_c , setfollowing_count]  = useState(0);
//     useEffect(() => {
//         fetchProfileData();

//       }, []);

//       const fetchProfileData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/api/profile_frds/${id}`);
//           console.log("summahmmm",response.data)
//           setPosts(response.data.posts || []);
//           if (response.data.profilePic) {
//             const { contentType, imageData } = response.data.profilePic;
//             setProfilePic(`data:${contentType};base64,${imageData}`);
//             setPosts(response.data.posts);
//             setUsername(response.data.user_name);
//             setfollowers_count(response.data.followers);
//             setfollowing_count(response.data.following);
//           }
//         } catch (error) {
//           console.error("Error fetching profile data:", error);
//         }
//       };

//       useEffect(() => {
//         fetchMessages();
//       }, []);

//     //   const fetchMessages = async () => {
//     //     try {
//     //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//     //       setMessages(response.data.messages);
//     //     } catch (error) {
//     //       console.error("Error fetching messages:", error);
//     //     }
//     //   };

//     //   const handleSendMessage = async (e) => {
//     //     e.preventDefault();
//     //     if (!newMessage.trim()) return;

//     //     try {
//     //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//     //         loginid: loginid,
//     //         content: newMessage,
//     //       });
//     //       setMessages([...messages, response.data.message]);
//     //       setNewMessage(""); // Clear input field
//     //     } catch (error) {
//     //       console.error("Error sending message:", error);
//     //     }
//     //   };

//     // crt code

//     // const fetchMessages = async () => {
//     //     try {
//     //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//     //       const sortedMessages = response.data.messages.sort(
//     //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//     //       );
//     //       setMessages(sortedMessages);
//     //     } catch (error) {
//     //       console.error("Error fetching messages:", error);
//     //     }
//     //   };

//     //   const handleSendMessage = async (e) => {
//     //     e.preventDefault();
//     //     if (!newMessage.trim()) return;

//     //     try {
//     //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//     //         loginid: loginid,
//     //         content: newMessage,
//     //       });
//     //       setMessages([...messages, response.data.message]); // Append new message
//     //       setNewMessage(""); // Clear input field
//     //     } catch (error) {
//     //       console.error("Error sending message:", error);
//     //     }
//     //   };

// // crt code
//     // const fetchMessages = async () => {
//     //     try {
//     //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//     //       const sortedMessages = response.data.messages.sort(
//     //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//     //       );
//     //       setMessages(sortedMessages);
//     //     } catch (error) {
//     //       console.error("Error fetching messages:", error);
//     //     }
//     //   };

//     //   const handleSendMessage = async (e) => {
//     //     e.preventDefault();
//     //     if (!newMessage.trim()) return;

//     //     try {
//     //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//     //         loginid: loginid, // Sender's uniqueId
//     //         content: newMessage, // The message content
//     //       });
//     //       setMessages([...messages, response.data.message]); // Append the new message
//     //       setNewMessage(""); // Clear the input field
//     //     } catch (error) {
//     //       console.error("Error sending message:", error);
//     //     }
//     //   };

//     const fetchMessages = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//           const sortedMessages = response.data.messages.sort(
//             (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//           );
//           setMessages(sortedMessages);
//           setIsLoading(false); // Stop loading after messages are fetched
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//           setIsLoading(false); // Stop loading even if there's an error
//         }
//       };

//       const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;

//         try {
//           const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//             loginid: loginid, // Sender's uniqueId
//             content: newMessage, // The message content
//           });
//           setMessages([...messages, response.data.message]);
//           window.location.reload(); // Append the new message
//           setNewMessage("");

//            // Clear the input field
//         } catch (error) {
//           console.error("Error sending message:", error);
//         }
//       };

//   return (
//     <div>
//      <div className="sidenav">
//         <div className="logo">Instagram{loginid}
//           {/* <img className="insta" src={image}/> */}
//         </div>
//         <div className="navs">
//           <ul>
//             <li> <FontAwesomeIcon className="hicon" icon={faHouse}/>Home</li>
//             <li><FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />Search</li>
//             <li> <IoCompassOutline style={{ marginRight: "12px",  }} size={25} />Explore</li>
//             <li><PiFilmStripFill style={{ marginRight: "12px",  }} size={25}/>Reels</li>
//             <li><BiMessageRoundedCheck style={{ marginRight: "5px",  }} size={25} /> Messages</li>
//             <li><FontAwesomeIcon className="heart" icon={faRegularHeart} />Notifications</li>
//             <li><FontAwesomeIcon className="heart" icon={faSquarePlus} />
//             Create</li>

//             {/* <Link to={`/profile/${id}`}> */}
//              <li>
//             <CgProfile style={{ marginRight: "12px" }} size={25} />
//              Profile
//                </li>
//              {/* </Link> */}
//           </ul>
//         </div>
//         <div className="bottom_navs">
//           <div className="threads"> <FaThreads style={{ marginRight: "12px",  }} size={25} />Threads</div>
//           <div className="more"> <HiBars3 style={{ marginRight: "15px",  }} size={28}  /> More</div>
//       </div>

//          </div>

//           {/* <div style={{color:"red"}} className="message_con">

//             pkojibhj;mklnj

//             <div className="text_con">

//                 <input onSubmit={()=>handleMessage()} className='text_con_in' type='text'/>
//             </div>
//         </div> */}

// {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.senderId === loginid ? "message sent" : "message received"}>
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

// {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === Number(loginid) ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

// {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === Number(loginid) ? "received" : "send"
//             }`}
//           >
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

// <div className="message-container">
// <div className="profile">
//           <div className="profile-header">
//            <div className="profile-pic">
//           <img className="profile_pic" src={profilePic || pro_img} alt="Profile" />
//             </div>
//                 <div className="profile-info">
//                  <h2>{username}</h2>
//                <button>{username}</button>
//              <button>Message</button>
//              </div>
//            </div>
//         </div>
//       <div className="messages-list">
//         {isLoading ? (
//           <p>Loading messages...</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 msg.senderId === Number(loginid) ? "received" : "sent"
//               }`}
//             >
//               <p>{msg.content}</p>
//               <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//             </div>
//           ))
//         )}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>

//     </div>
//   )
// }

// export default Message_p




// import React from "react";
// import axios from "axios";
// import "./Message_P.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHouse,
//   faMagnifyingGlass,
//   faSquarePlus,
// } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
// import { PiFilmStripFill } from "react-icons/pi";
// import { BiMessageRoundedCheck } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { IoCompassOutline } from "react-icons/io5";
// import { FaThreads } from "react-icons/fa6";
// import { HiBars3 } from "react-icons/hi2";
// import { useParams } from "react-router-dom";
// import { faIdBadge, faFilm } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import pro_img from "C:/Users/Home/Desktop/route/Inten_project/insta/src/assets/insta_pro.jpg";
// import { motion } from "framer-motion";

// const Message_p = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const { id, loginid } = useParams();
//   const [isLoading, setIsLoading] = useState(true);
//   // const loginid = "19";
//   const [profilePic, setProfilePic] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [username, setUsername] = useState("");
//   const [follower_c, setfollowers_count] = useState(0);
//   const [following_c, setfollowing_count] = useState(0);
//   const [followingUsers, setFollowingUsers] = useState([]);
//   const [showFollowingPopup, setShowFollowingPopup] = useState(false);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/profile_frds/${id}`
//       );
//       console.log("summahmmm", response.data);
//       setPosts(response.data.posts || []);
//       if (response.data.profilePic) {
//         const { contentType, imageData } = response.data.profilePic;
//         setProfilePic(`data:${contentType};base64,${imageData}`);
//         setPosts(response.data.posts);
//         setUsername(response.data.user_name);
//         setfollowers_count(response.data.followers);
//         setfollowing_count(response.data.following);
//       }
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     fetchFollowing();
//   }, []);

//   //   const fetchMessages = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//   //       setMessages(response.data.messages);
//   //     } catch (error) {
//   //       console.error("Error fetching messages:", error);
//   //     }
//   //   };

//   //   const handleSendMessage = async (e) => {
//   //     e.preventDefault();
//   //     if (!newMessage.trim()) return;

//   //     try {
//   //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//   //         loginid: loginid,
//   //         content: newMessage,
//   //       });
//   //       setMessages([...messages, response.data.message]);
//   //       setNewMessage(""); // Clear input field
//   //     } catch (error) {
//   //       console.error("Error sending message:", error);
//   //     }
//   //   };

//   // crt code

//   // const fetchMessages = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//   //       const sortedMessages = response.data.messages.sort(
//   //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//   //       );
//   //       setMessages(sortedMessages);
//   //     } catch (error) {
//   //       console.error("Error fetching messages:", error);
//   //     }
//   //   };

//   //   const handleSendMessage = async (e) => {
//   //     e.preventDefault();
//   //     if (!newMessage.trim()) return;

//   //     try {
//   //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//   //         loginid: loginid,
//   //         content: newMessage,
//   //       });
//   //       setMessages([...messages, response.data.message]); // Append new message
//   //       setNewMessage(""); // Clear input field
//   //     } catch (error) {
//   //       console.error("Error sending message:", error);
//   //     }
//   //   };

//   // crt code
//   // const fetchMessages = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
//   //       const sortedMessages = response.data.messages.sort(
//   //         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//   //       );
//   //       setMessages(sortedMessages);
//   //     } catch (error) {
//   //       console.error("Error fetching messages:", error);
//   //     }
//   //   };

//   //   const handleSendMessage = async (e) => {
//   //     e.preventDefault();
//   //     if (!newMessage.trim()) return;

//   //     try {
//   //       const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
//   //         loginid: loginid, // Sender's uniqueId
//   //         content: newMessage, // The message content
//   //       });
//   //       setMessages([...messages, response.data.message]); // Append the new message
//   //       setNewMessage(""); // Clear the input field
//   //     } catch (error) {
//   //       console.error("Error sending message:", error);
//   //     }
//   //   };

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/messages/${id}/${loginid}`
//       );
//       const sortedMessages = response.data.messages.sort(
//         (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//       );
//       setMessages(sortedMessages);
//       setIsLoading(false); // Stop loading after messages are fetched
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setIsLoading(false); // Stop loading even if there's an error
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/api/message/${id}`,
//         {
//           loginid: loginid, // Sender's uniqueId
//           content: newMessage, // The message content
//         }
//       );
//       setMessages([...messages, response.data.message]);
//       window.location.reload(); // Append the new message
//       setNewMessage("");

//       // Clear the input field
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const fetchFollowing = async () => {
//     console.log("hello", id);
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/following_m/${id}`
//       );
//       console.log(response.data);
//       setFollowingUsers(response.data);
//       setShowFollowingPopup(true);
//     } catch (error) {
//       console.error("Error fetching following users:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="sidenav">
//         {/* <div onClick={fetchFollowing} className="logo">Instagram{loginid} */}
//         <div className="logo">
//           Instagram{loginid}
//           {/* <img className="insta" src={image}/> */}
//         </div>
//         <div className="navs">
//           <ul>
//             <li>
//               {" "}
//               <FontAwesomeIcon className="hicon" icon={faHouse} />
//               Home
//             </li>
//             <li>
//               <FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />
//               Search
//             </li>
//             <li>
//               {" "}
//               <IoCompassOutline style={{ marginRight: "12px" }} size={25} />
//               Explore
//             </li>
//             <li>
//               <PiFilmStripFill style={{ marginRight: "12px" }} size={25} />
//               Reels
//             </li>
//             <li>
//               <BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25} />{" "}
//               Messages
//             </li>
//             <li>
//               <FontAwesomeIcon className="heart" icon={faRegularHeart} />
//               Notifications
//             </li>
//             <li>
//               <FontAwesomeIcon className="heart" icon={faSquarePlus} />
//               Create
//             </li>

//             {/* <Link to={`/profile/${id}`}> */}
//             <li>
//               <CgProfile style={{ marginRight: "12px" }} size={25} />
//               Profile
//             </li>
//             {/* </Link> */}
//           </ul>
//         </div>
//         <div className="bottom_navs">
//           <div className="threads">
//             {" "}
//             <FaThreads style={{ marginRight: "12px" }} size={25} />
//             Threads
//           </div>
//           <div className="more">
//             {" "}
//             <HiBars3 style={{ marginRight: "15px" }} size={28} /> More
//           </div>
//         </div>
//       </div>

//       {/* <div style={{color:"red"}} className="message_con">

//             pkojibhj;mklnj

//             <div className="text_con">

//                 <input onSubmit={()=>handleMessage()} className='text_con_in' type='text'/>
//             </div>
//         </div> */}

//       {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.senderId === loginid ? "message sent" : "message received"}>
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

//       {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === Number(loginid) ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

//       {/* <div className="message-container">
//       <div className="messages-list">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === Number(loginid) ? "received" : "send"
//             }`}
//           >
//             <p>{msg.content}</p>
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>
//       <form className="message-input" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div> */}

//       <div className="second_container">
//       <div className="popup-content_messagers">
//           <h3>Following</h3>
//           <div className="following-list">
//             {followingUsers.map((user, index) => (
//               <div key={index} className="following-item">
//                 <img
//                   src={user.profilePic || "/default-profile.png"} // Use default if no image
//                   alt={user.username}
//                   className="profile-pic_following"
//                 />
//                 <Link to={`/message/${user.objid}/${loginid}`}>
//                   <p>{user.username}</p>{" "}
//                 </Link>
//               </div>
//             ))}
//           </div>
//           {/* <button onClick={() => setShowFollowingPopup(false)}>Close</button> */}
//         </div>

//         <div className="message-container_new">
//           <div className="profile_new1">
//             <div className="profile-header">
//               <div className="profile-pic2_box">
//                 <img
//                   className="profile_pic3"
//                   src={profilePic || pro_img}
//                   alt="Profile"
//                 />
//               </div>
//               <div className="profile-info">
//                 <h2>{username}</h2>
//                 <button>{username}</button>
//                 <button>Message</button>
//               </div>
//             </div>
//           </div>
//           <div className="messages-lst">
//             <div className="mes_box_con">
//               {isLoading ? (
//                 <p>Loading messages...</p>
//               ) : (
//                 messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`message ${
//                       msg.senderId === Number(loginid) ? "received" : "sent"
//                     }`}
//                   >
//                     <p>{msg.content}</p>
//                     <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                   </div>
//                 ))
//               )}
//             </div>
//             <form className="message-input" onSubmit={handleSendMessage}>
//               <input
//                 className="in_boxx"
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message_p;



import React from "react";
import axios from "axios";
import "./Message_P.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { PiFilmStripFill } from "react-icons/pi";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoCompassOutline } from "react-icons/io5";
import { FaThreads } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { faIdBadge, faFilm } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import pro_img from "C:/Users/Home/Desktop/route/Inten_project/insta/src/assets/insta_pro.jpg";
import { motion } from "framer-motion";

const Message_p = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { id, loginid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // const loginid = "19";
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [follower_c, setfollowers_count] = useState(0);
  const [following_c, setfollowing_count] = useState(0);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile_frds/${id}`
      );
      console.log("summahmmm", response.data);
      setPosts(response.data.posts || []);
      if (response.data.profilePic) {
        const { contentType, imageData } = response.data.profilePic;
        setProfilePic(`data:${contentType};base64,${imageData}`);
        setPosts(response.data.posts);
        setUsername(response.data.user_name);
        setfollowers_count(response.data.followers);
        setfollowing_count(response.data.following);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchFollowing();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/${id}/${loginid}`
      );
      const sortedMessages = response.data.messages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sortedMessages);
      setIsLoading(false); // Stop loading after messages are fetched
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false); // Stop loading even if there's an error
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/message/${id}`,
        {
          loginid: loginid, // Sender's uniqueId
          content: newMessage, // The message content
        }
      );
      setMessages([...messages, response.data.message]);
      window.location.reload(); // Append the new message
      setNewMessage("");

      // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchFollowing = async () => {
    console.log("hello", id);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/following_m/${id}`
      );
      console.log(response.data);
      setFollowingUsers(response.data);
      setShowFollowingPopup(true);
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  return (
    <div>
      <div className="sidenav">
        {/* <div onClick={fetchFollowing} className="logo">Instagram{loginid} */}
        <div className="logo">
          Instagram{loginid}
          {/* <img className="insta" src={image}/> */}
        </div>
        <div className="navs">
          <ul>
            <li>
              {" "}
              <FontAwesomeIcon className="hicon" icon={faHouse} />
              Home
            </li>
            <li>
              <FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />
              Search
            </li>
            <li>
              {" "}
              <IoCompassOutline style={{ marginRight: "12px" }} size={25} />
              Explore
            </li>
            <li>
              <PiFilmStripFill style={{ marginRight: "12px" }} size={25} />
              Reels
            </li>
            <li>
              <BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25} />{" "}
              Messages
            </li>
            <li>
              <FontAwesomeIcon className="heart" icon={faRegularHeart} />
              Notifications
            </li>
            <li>
              <FontAwesomeIcon className="heart" icon={faSquarePlus} />
              Create
            </li>

            {/* <Link to={`/profile/${id}`}> */}
            <li>
              <CgProfile style={{ marginRight: "12px" }} size={25} />
              Profile
            </li>
            {/* </Link> */}
          </ul>
        </div>
        <div className="bottom_navs">
          <div className="threads">
            {" "}
            <FaThreads style={{ marginRight: "12px" }} size={25} />
            Threads
          </div>
          <div className="more">
            {" "}
            <HiBars3 style={{ marginRight: "15px" }} size={28} /> More
          </div>
        </div>
      </div>

      <div className="second_container">
        <div className="popup-content_messagers">
          <div style={{ position: "fixed" }} className="name_and_pro"></div>
          {/* <h3>Following</h3> */}
          <div className="following-list">
            {followingUsers.map((user, index) => (
              <div key={index} className="following-item">
                <img
                  src={user.profilePic || "/default-profile.png"} // Use default if no image
                  alt={user.username}
                  className="profile-pic_following"
                />
                <Link
                  className="name_of_f"
                  to={`/message/${user.objid}/${loginid}`}
                >
                  <p>{user.username}</p>{" "}
                </Link>
              </div>
            ))}
          </div>
          {/* <button onClick={() => setShowFollowingPopup(false)}>Close</button> */}
        </div>

        <div  className="message-container_new">
          <div  className="profile_new1">
            <div className="profile-header">
              <div
                style={{ marginRight: "210px" }}
                className="profile-pic2_box"
              >
                <img
                  className="profile_pic3"
                  src={profilePic || pro_img}
                  alt="Profile"
                />
              </div>
              <div className="profile-info_mess2">
                <h2>{username}</h2>
                {/* <button>{username}</button> */}
                <button
                  style={{
                    backgroundColor: "grey",
                    width: "100px",
                    padding: "10px",
                    marginLeft: "30px",
                  }}
                >
                  View profile
                </button>
              </div>
            </div>
          </div>
          <div  className="messages-lst">
            <div  className="mes_box_con">
              {isLoading ? (
                <p>Loading messages...</p>
              ) : (
                messages.map((msg, index) => (
                  <div className="con_mess">
                    <div
                      key={index}
                      className={`message ${
                        msg.senderId === Number(loginid) ? "received" : "sent"
                      }`}
                    >
                      <span className="mess">{msg.content}</span>
                    </div>
                    <span
                      key={index}
                      className={`message ${
                        msg.senderId === Number(loginid) ? "receivedt" : "sentt"
                      }`}
                      style={{ fontSize: "12px" }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
            <form
              style={{ backgroundColor: "black", width: "50%", height: "40px" }}
              className="message-input"
              onSubmit={handleSendMessage}
            >
              <input
                className="in_boxx"
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message_p;
