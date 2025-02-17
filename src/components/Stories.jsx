// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const userId = 34;

//   useEffect(() => {
//     // Fetch the user's stories from the backend
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//         setStories(response.data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   const handlePostUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("description", postDescription);
//     formData.append("audio", audioFile);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post uploaded successfully!");
//       setShowPopup(false);
//       setPostDescription(""); // Reset description after upload
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Stories</h2>

//       {/* Render all stories */}
//       <div className="stories-list">
//         {stories.length > 0 ? (
//           stories.map((story, index) => (
//             <div key={index} className="story-card">
//               <h3>{story.description}</h3>
//               {/* Display the image */}
//               <img src={story.image} alt="Story" style={{ width: "200px", height: "200px" }} />
//               {/* Play the audio */}
//               <audio controls>
//                 <source src={story.audio} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           ))
//         ) : (
//           <p>No stories available.</p>
//         )}
//       </div>

//       <div className="form_con">
//         <button onClick={() => setShowPopup(true)}>Create New Post</button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay_new">
//           <div className="popup-container_new">
//             <h3 className="popup-title_new">Create New Post</h3>

//             <div className="file-upload-container_new">
//               <div className="img_upcon">
//                 <img className="img_up" src="path/to/your/image" alt="Upload" />
//               </div>
//               <input
//                 type="file"
//                 onChange={handlePostUpload}
//                 className="popup-file-input_new"
//               />
//               <span className="file-upload-text_new">Select from computer</span>
//             </div>

//             <input
//               type="text"
//               placeholder="Add a description..."
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//               className="popup-text-input_new"
//             />

//             <input
//               type="file"
//               accept="audio/*"
//               onChange={(e) => setAudioFile(e.target.files[0])}
//               required
//               className="popup-audio-input_new"
//             />

//             <button onClick={() => setShowPopup(false)} className="popup-close-btn_new">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Stories.css";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [activeStory, setActiveStory] = useState(null);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const userId = 34;

//   useEffect(() => {
//     // Fetch the user's stories from the backend
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//         setStories(response.data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   const handlePostUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("description", postDescription);
//     formData.append("audio", audioFile);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post uploaded successfully!");
//       setShowPopup(false);
//       setPostDescription(""); // Reset description after upload
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleStoryClick = (index) => {
//     setActiveStory(index);
//     setCurrentStoryIndex(index);
//     // Pause all other audio elements
//     document.querySelectorAll("audio").forEach((audio) => {
//       if (audio.parentElement.getAttribute("data-index") !== index.toString()) {
//         audio.pause();
//       }
//     });
//   };

//   const nextStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//     setActiveStory((prevIndex) => (prevIndex + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//     setActiveStory((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//   };

//   return (
//     <div className="stories-container">
//       <h2>Stories</h2>

//       <div className="story-navigation">
//         <button onClick={prevStory}>Previous</button>
//         <div className="stories">
//           {stories.length > 0 ? (
//             stories.map((story, index) => (
//               <div
//                 key={story.id}
//                 className={`story-card ${
//                   index === currentStoryIndex ? "active" : ""
//                 } ${
//                   index === (currentStoryIndex - 1 + stories.length) % stories.length
//                     ? "previous"
//                     : ""
//                 } ${
//                   index === (currentStoryIndex + 1) % stories.length ? "next" : ""
//                 }`}
//                 data-index={index}
//                 onClick={() => handleStoryClick(index)}
//               >
//                 <div className="story-content">
//                   <img src={story.image} alt="Story" className="story-image" />
//                   <h3 className="story-description">{story.description}</h3>
//                   <div className="audio-container">
//                     <audio controls>
//                       <source src={story.audio} type="audio/mpeg" />
//                       Your browser does not support the audio element.
//                     </audio>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No stories available.</p>
//           )}
//         </div>
//         <button onClick={nextStory}>Next</button>
//       </div>

//       <div className="form_con">
//         <button className="create-post-btn" onClick={() => setShowPopup(true)}>
//           Create New Post
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay_new">
//           <div className="popup-container_new">
//             <h3 className="popup-title_new">Create New Post</h3>

//             <div className="file-upload-container_new">
//               <div className="img_upcon">
//                 <img className="img_up" src="upload-icon.png" alt="Upload" />
//               </div>
//               <input
//                 type="file"
//                 onChange={handlePostUpload}
//                 className="popup-file-input_new"
//                 accept="image/*"
//               />
//               <span className="file-upload-text_new">Select from computer</span>
//             </div>

//             <input
//               type="text"
//               placeholder="Add a description..."
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//               className="popup-text-input_new"
//             />

//             <input
//               type="file"
//               accept="audio/*"
//               onChange={(e) => setAudioFile(e.target.files[0])}
//               required
//               className="popup-audio-input_new"
//             />

//             <button onClick={() => setShowPopup(false)} className="popup-close-btn_new">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Stories.css";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const userId = 34;
//   const audioRef = useRef(null); // Reference to the audio element

//   useEffect(() => {
//     // Fetch the user's stories from the backend
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//         setStories(response.data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   useEffect(() => {
//     // Play the current story's audio when the story changes
//     if (stories.length > 0 && audioRef.current) {
//       audioRef.current.load(); // Reload the audio source
//       audioRef.current.play().catch((error) => {
//         console.error("Audio playback error:", error);
//       });
//     }
//   }, [currentStoryIndex, stories]);

//   const handleStoryClick = (index) => {
//     setCurrentStoryIndex(index);
//   };

//   const nextStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//   };

//   return (
//     <div className="stories-container">
//       <h2>Stories</h2>

//       <div className="story-navigation">
//         <button onClick={prevStory}>Previous</button>
//         <div className="stories">
//           {stories.length > 0 ? (
//             stories.map((story, index) => (
//               <div
//                 key={story.id}
//                 className={`story-card ${index === currentStoryIndex ? "active" : ""}`}
//                 onClick={() => handleStoryClick(index)}
//               >
//                 <div className="story-content">
//                   <img src={story.image} alt="Story" className="story-image" />
//                   <h3 className="story-description">{story.description}</h3>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No stories available.</p>
//           )}
//         </div>
//         <button onClick={nextStory}>Next</button>
//       </div>

//       {/* Audio player for the active story */}
//       {stories.length > 0 && (
//         <div className="audio-container">
//           <audio ref={audioRef} controls autoPlay>
//             <source src={stories[currentStoryIndex]?.audio} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}

//       <div className="form_con">
//         <button className="create-post-btn" onClick={() => setShowPopup(true)}>
//           Create New Post
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay_new">
//           <div className="popup-container_new">
//             <h3 className="popup-title_new">Create New Post</h3>

//             <div className="file-upload-container_new">
//               <div className="img_upcon">
//                 <img className="img_up" src="upload-icon.png" alt="Upload" />
//               </div>
//               <input
//                 type="file"
//                 onChange={(e) => setAudioFile(e.target.files[0])}
//                 className="popup-file-input_new"
//                 accept="audio/*"
//               />
//               <span className="file-upload-text_new">Select from computer</span>
//             </div>

//             <input
//               type="text"
//               placeholder="Add a description..."
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//               className="popup-text-input_new"
//             />

//             <button onClick={() => setShowPopup(false)} className="popup-close-btn_new">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Stories.css";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const userId = 34;
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//         setStories(response.data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   useEffect(() => {
//     if (stories.length > 0 && audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play().catch((error) => {
//         console.error("Audio playback error:", error);
//       });
//     }
//   }, [currentStoryIndex, stories]);

//   const handlePostUpload = async () => {
//     if (!imageFile && !audioFile) {
//       alert("Please select both an image and an audio file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("audio", audioFile);
//     formData.append("description", postDescription);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post uploaded successfully!");
//       setShowPopup(false);
//       setPostDescription("");
//       setImageFile(null);
//       setAudioFile(null);
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleStoryClick = (index) => {
//     setCurrentStoryIndex(index);
//   };

//   const nextStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//   };

//   return (
//     <div className="stories-container">
//       <h2>Stories</h2>

//       <div className="story-navigation">
//         <button onClick={prevStory}>Previous</button>
//         <div className="stories">
//           {stories.length > 0 ? (
//             stories.map((story, index) => (
//               <div
//                 key={story.id}
//                 className={`story-card ${index === currentStoryIndex ? "active" : ""}`}
//                 onClick={() => handleStoryClick(index)}
//               >
//                 <div className="story-content">
//                   <img src={story.image} alt="Story" className="story-image" />
//                   <h3 className="story-description">{story.description}</h3>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No stories available.</p>
//           )}
//         </div>
//         <button onClick={nextStory}>Next</button>
//       </div>

//       {stories.length > 0 && (
//         <div className="audio-container">
//           <audio ref={audioRef} controls autoPlay>
//             <source src={stories[currentStoryIndex]?.audio} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}

//       <div className="form_con">
//         <button className="create-post-btn" onClick={() => setShowPopup(true)}>
//           Create New Post
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay_new">
//           <div className="popup-container_new">
//             <h3 className="popup-title_new">Create New Post</h3>

//             {/* Image Upload */}
//             <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
//             {imageFile && <p>Image Selected: {imageFile.name}</p>}

//             {/* Description */}
//             <input
//               type="text"
//               placeholder="Add a description..."
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//             />

//             {/* Audio Upload */}
//             <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />
//             {audioFile && <p>Audio Selected: {audioFile.name}</p>}

//             <button onClick={handlePostUpload}>Upload Post</button>
//             <button onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Stories.css";
// import { useParams } from "react-router-dom";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const { id } = useParams();
//   const userId = id || 23;
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories`);
//         setStories(response.data.stories);

//         // Find index of story matching the `uniqueId`
//         const activeStoryIndex = response.data.stories.findIndex(
//           (story) => story.uniqueId === Number(id) // Ensure `id` is a number
//         );

//         // Set the current story index
//         setCurrentStoryIndex(activeStoryIndex !== -1 ? activeStoryIndex : 0);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [id]); // Run this effect when `id` changes

//   useEffect(() => {
//     if (stories.length > 0 && audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play().catch((error) => {
//         console.error("Audio playback error:", error);
//       });
//     }
//   }, [currentStoryIndex, stories]);

//   const handlePostUpload = async () => {
//     if (!imageFile && !audioFile) {
//       alert("Please select an image or audio file.");
//       return;
//     }

//     const formData = new FormData();
//     if (imageFile) formData.append("image", imageFile);
//     if (audioFile) formData.append("audio", audioFile);
//     formData.append("description", postDescription);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post uploaded successfully!");
//       setShowPopup(false);
//       setPostDescription("");
//       setImageFile(null);
//       setAudioFile(null);
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleStoryClick = (index) => {
//     setCurrentStoryIndex(index);
//   };

//   const nextStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//   };

//   return (
//     <div className="stories-container">
//       <h2>Stories</h2>

//       {/* <div>
//         {console.log("llllllllllllllll",stories)}
//       {stories.map((story, index) => (
//         <div key={index} className="story">
//           <div className="story-header">
//             <img style={{height:"50px" , width:"50px"}} src={story.profilePic} alt="Profile" className="prfile-pic" />
//             <span style={{color:"blue" , height:"20px", width:"20px"}}>{story.username}</span>
//           </div>

//         </div>
//       ))}
//     </div> */}

// {/*
// <div>
//   {stories.map((story, index) => (
//     <div key={index} className="story">
//       {console.log("Profile Pic for", story.username, ":", story.profilePic)}

//       <div className="story-header">
//         {story.profilePic ? (
//           <img
//             style={{
//               height: "50px",
//               width: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//             src={story.profilePic}
//             alt={`${story.username}'s Profile`}
//             className="profile-pic"
//           />
//         ) : (
//           <img
//             style={{
//               height: "50px",
//               width: "50px",
//               borderRadius: "50%",
//               backgroundColor: "#ddd",
//               objectFit: "cover",
//             }}
//             src="https://via.placeholder.com/50"
//             alt="Default Profile"
//           />
//         )}
//         <span style={{ color: "blue", fontWeight: "bold", marginLeft: "10px" }}>
//           {story.username || "Unknown User"}
//         </span>
//       </div>
//     </div>
//   ))}
// </div> */}

//       <div className="story-navigation">
//         <button onClick={prevStory}>Previous</button>
//         <div className="stories">
//           {stories.length > 0 ? (
//             stories.map((story, index) => (
//               <div
//                 key={story.id}
//                 className={`story-card ${index === currentStoryIndex ? "active" : ""}`}
//                 onClick={() => handleStoryClick(index)}
//               >
//                 <div className="story-content">
//                 <img
//                   className="story_pro_img"
//                   style={{
//                     height: "50px",
//                     width: "50px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                   }}
//                   src={story.profilePic}
//                   alt={story.username}
//                 />
//                 <span
//                   className="story_pro_img_n"
//                   style={{ color: "white" }}
//                 >
//                   {story.username}
//                 </span>
//                 <GiSpeaker  className="speak"/>

//                 <FaPause className="pass" />

//                 <HiDotsHorizontal
//                   className="dots"
//                   style={{ color: "white", display: "flex" }}
//                   size={25}
//                 />
//                 <div className="down">
//                   <input placeholder={`Reply to ${story.username}`}   style={{ color: "white", backgroundColor: "transparent"  , border:"solid 2px white"}}  className="input_reply" type="text" />
//                 <FontAwesomeIcon   style={{ color: "white", backgroundColor: "transparent" }}  className="heart_ic_d" icon={faRegularHeart} />
//                 <LuSend style={{background:"transparent" , color:"white"}} />
//                 </div>
                  
//                 {/* Story Image */}
//                 {story.image && (
//                   <img
//                     src={story.image}
//                     alt="Story"
//                     className="story-image"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       marginTop: "10px",
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No stories available.</p>
//         )}
//       </div>
//         <button onClick={nextStory}>Next</button>
//       </div>

//       {stories.length > 0 && (
//         <div className="audio-container">
//           <audio ref={audioRef} controls autoPlay>
//             <source src={stories[currentStoryIndex]?.audio} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}

//       <div className="form_con">
//         <button className="create-post-btn" onClick={() => setShowPopup(true)}>
//           Create New Post
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay_new">
//           <div className="popup-container_new">
//             <h3 className="popup-title_new">Create New Post</h3>

//             {/* Image Upload */}
//             <div className="file-upload-container_new">
//               <div className="img_upcon">
//                 <img className="img_up" src="upload-icon.png" alt="Upload" />
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImageFile(e.target.files[0])}
//                 className="popup-file-input_new"
//               />
//               <span className="file-upload-text_new">Select an image</span>
//             </div>

//             {/* Audio Upload */}
//             <div className="file-upload-container_new">
//               <input
//                 type="file"
//                 accept="audio/*"
//                 onChange={(e) => setAudioFile(e.target.files[0])}
//                 className="popup-audio-input_new"
//               />
//               <span className="file-upload-text_new">Select an audio file</span>
//             </div>

//             <input
//               type="text"
//               placeholder="Add a description..."
//               value={postDescription}
//               onChange={(e) => setPostDescription(e.target.value)}
//               className="popup-text-input_new"
//             />

//             <button onClick={handlePostUpload} className="popup-upload-btn_new">
//               Upload
//             </button>
//             <button onClick={() => setShowPopup(false)} className="popup-close-btn_new">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

//crt code final 2

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Stories.css";
import { useParams } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { FaPause } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const { id } = useParams();
  const userId = id || 23;
  const storiesContainerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          `https://insta-server-3e4p.onrender.com/api/getStories`
        );
        setStories(response.data.stories);

        // Find the index of the active story based on uniqueId
        const activeStoryIndex = response.data.stories.findIndex(
          (story) => story.uniqueId === Number(id)
        );

        // Set the current story index
        setCurrentStoryIndex(activeStoryIndex !== -1 ? activeStoryIndex : 0);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, [id]);

  useEffect(() => {
    // Scroll active story into view
    if (storiesContainerRef.current) {
      const activeStory =
        storiesContainerRef.current.children[currentStoryIndex];
      if (activeStory) {
        activeStory.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    // Play the audio of the active story
    if (stories.length > 0 && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
    }
  }, [currentStoryIndex, stories]);

  const handleStoryClick = (index) => {
    setCurrentStoryIndex(index);
  };

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
  };

  return (
    <div className="stories-container">
      <div className="story-navigation">
        <button onClick={prevStory}>Previous</button>

        <div className="stories-wrapper">
          <div className="stories2" ref={storiesContainerRef}>
            {stories.map((story, index) => (
              <div
                key={story.uniqueId}
                className={`story-card ${
                  index === currentStoryIndex ? "active" : ""
                }`}
                onClick={() => handleStoryClick(index)}
              >
                <div className="story-content">
                  {/* Profile Image */}

                  <img
                    className="story_pro_img"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={story.profilePic}
                    alt={story.username}
                  />
                  <span
                    className="story_pro_img_n"
                    style={{ color: "white" }}
                  >
                    {story.username}
                  </span>
                  <GiSpeaker  className="speak"/>

                  <FaPause className="pass" />

                  <HiDotsHorizontal
                    className="dots"
                    style={{ color: "white", display: "flex" }}
                    size={25}
                  />
                  <div className="down">
                    <input placeholder={`Reply to ${story.username}`}   style={{ color: "white", backgroundColor: "transparent"  , border:"solid 2px white"}}  className="input_reply" type="text" />
                  <FontAwesomeIcon   style={{ color: "white", backgroundColor: "transparent" }}  className="heart_ic_d" icon={faRegularHeart} />
                  <LuSend style={{background:"transparent" , color:"white"}} />
                  </div>
                  
                  {/* Story Image */}
                  {story.image && (
                    <img
                      src={story.image}
                      alt="Story"
                      className="story-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextStory}>Next</button>
      </div>

      {/* Audio Player */}
      {stories.length > 0 && stories[currentStoryIndex]?.audio && (
        <div className="audio-container">
          <audio ref={audioRef} controls autoPlay>
            <source src={stories[currentStoryIndex].audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Stories;

// Stories.js

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Stories.css";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const userId = 34;
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//         setStories(response.data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [userId]);

//   useEffect(() => {
//     if (stories.length > 0 && audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play().catch((error) => {
//         console.error("Audio playback error:", error);
//       });
//     }
//   }, [currentStoryIndex, stories]);

//   const handlePostUpload = async () => {
//     if (!imageFile && !audioFile) {
//       alert("Please select an image or audio file.");
//       return;
//     }

//     const formData = new FormData();
//     if (imageFile) formData.append("image", imageFile);
//     if (audioFile) formData.append("audio", audioFile);
//     formData.append("description", postDescription);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Post uploaded successfully!");
//       setShowPopup(false);
//       setPostDescription("");
//       setImageFile(null);
//       setAudioFile(null);
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleStoryClick = (index) => {
//     setCurrentStoryIndex(index);
//   };

//   const nextStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
//   };

//   return (
//     <div className="instagram-stories">
//       <div className="stories-viewer">
//         <div className="stories-header">
//           <div className="user-info">
//             <div className="user-avatar">
//               <img src={stories[currentStoryIndex]?.userAvatar || "default-avatar.png"} alt="User" />
//             </div>
//             <span className="username">{stories[currentStoryIndex]?.username || "User"}</span>
//             <span className="story-time">22h</span>
//           </div>
//           <button className="close-button" onClick={() => window.history.back()}>×</button>
//         </div>

//         <div className="story-progress-bar">
//           {stories.map((_, index) => (
//             <div
//               key={index}
//               className={`progress-segment ${index === currentStoryIndex ? 'active' : ''} ${index < currentStoryIndex ? 'completed' : ''}`}
//             />
//           ))}
//         </div>

//         <div className="story-content">
//           {stories.length > 0 && (
//             <div className="current-story">
//               {stories[currentStoryIndex]?.image && (
//                 <img
//                   src={stories[currentStoryIndex].image}
//                   alt="Story"
//                   className="story-media"
//                 />
//               )}
//               <div className="story-description">
//                 {stories[currentStoryIndex]?.description}
//               </div>
//               {stories[currentStoryIndex]?.audio && (
//                 <audio ref={audioRef} controls className="story-audio">
//                   <source src={stories[currentStoryIndex].audio} type="audio/mpeg" />
//                 </audio>
//               )}
//             </div>
//           )}

//           <button className="nav-button prev" onClick={prevStory}>‹</button>
//           <button className="nav-button next" onClick={nextStory}>›</button>
//         </div>
//       </div>

//       <div className="stories-tray">
//         {stories.map((story, index) => (
//           <div
//             key={index}
//             className={`story-thumbnail ${index === currentStoryIndex ? 'active' : ''}`}
//             onClick={() => handleStoryClick(index)}
//           >
//             <div className="story-ring">
//               <img
//                 src={story.image || "default-thumbnail.png"}
//                 alt={`Story ${index + 1}`}
//               />
//             </div>
//             <span className="story-username">User {index + 1}</span>
//           </div>
//         ))}
//       </div>

//       <button className="create-story-btn" onClick={() => setShowPopup(true)}>+</button>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <h3>Create New Story</h3>

//             <div className="upload-section">
//               <label className="upload-label">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                   className="file-input"
//                 />
//                 <span>Upload Image</span>
//               </label>

//               <label className="upload-label">
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={(e) => setAudioFile(e.target.files[0])}
//                   className="file-input"
//                 />
//                 <span>Upload Audio</span>
//               </label>

//               <input
//                 type="text"
//                 placeholder="Add a description..."
//                 value={postDescription}
//                 onChange={(e) => setPostDescription(e.target.value)}
//                 className="description-input"
//               />
//             </div>

//             <div className="popup-buttons">
//               <button onClick={handlePostUpload} className="upload-btn">Share</button>
//               <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Stories.css";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [postDescription, setPostDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const userId = 34;

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   const fetchStories = async () => {
//     try {
//       const response = await axios.get(`https://insta-server-3e4p.onrender.com/api/getStories/${userId}`);
//       setStories(response.data.stories);
//     } catch (error) {
//       console.error("Error fetching stories:", error);
//     }
//   };

//   const handlePostUpload = async () => {
//     if (!imageFile && !audioFile) {
//       alert("Please select at least one file (image or audio)");
//       return;
//     }

//     const formData = new FormData();
//     if (imageFile) formData.append("image", imageFile);
//     if (audioFile) formData.append("audio", audioFile);
//     formData.append("description", postDescription);

//     try {
//       await axios.post(`https://insta-server-3e4p.onrender.com/api/upload_stories/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Reset form and fetch updated stories
//       setShowPopup(false);
//       setPostDescription("");
//       setImageFile(null);
//       setAudioFile(null);
//       fetchStories();

//       alert("Post uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading post:", error);
//       alert("Failed to upload post. Please try again.");
//     }
//   };

//   return (
//     <div className="stories-container">
//       <h2>Stories</h2>

//       {/* Stories List */}
//       <div className="stories-list">
//         {stories.length > 0 ? (
//           stories.map((story, index) => (
//             <div key={index} className="story-card">
//               <h3>{story.description}</h3>
//               {story.image && (
//                 <img
//                   src={story.image}
//                   alt="Story"
//                   className="story-image"
//                 />
//               )}
//               {story.audio && (
//                 <audio controls className="story-audio">
//                   <source src={story.audio} type="audio/mpeg" />
//                   Your browser does not support the audio element.
//                 </audio>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No stories available.</p>
//         )}
//       </div>

//       {/* Create Post Button */}
//       <div className="create-post">
//         <button onClick={() => setShowPopup(true)}>Create New Post</button>
//       </div>

//       {/* Upload Popup */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-container">
//             <h3>Create New Post</h3>

//             {/* Image Upload */}
//             <div className="file-upload">
//               <label>
//                 Upload Image:
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                 />
//               </label>
//               {imageFile && <p>Selected image: {imageFile.name}</p>}
//             </div>

//             {/* Audio Upload */}
//             <div className="file-upload">
//               <label>
//                 Upload Audio:
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={(e) => setAudioFile(e.target.files[0])}
//                 />
//               </label>
//               {audioFile && <p>Selected audio: {audioFile.name}</p>}
//             </div>

//             {/* Description */}
//             <div className="description-input">
//               <label>
//                 Description:
//                 <input
//                   type="text"
//                   value={postDescription}
//                   onChange={(e) => setPostDescription(e.target.value)}
//                   placeholder="Add a description..."
//                 />
//               </label>
//             </div>

//             {/* Buttons */}
//             <div className="popup-buttons">
//               <button onClick={handlePostUpload}>Upload</button>
//               <button onClick={() => setShowPopup(false)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stories;
