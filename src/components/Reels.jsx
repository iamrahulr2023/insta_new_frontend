// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Reels.css';

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   useEffect(() => {
//     // Clear error after 5 seconds
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get('https://insta-server-3e4p.onrender.com/api/media/');
//       setMedia(response.data);
//     } catch (error) {
//       setError('Could not load media. Please try again later.');
//       console.error('Error fetching media:', error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Check file size (50MB limit)
//       if (file.size > 50 * 1024 * 1024) {
//         setError('File size too large. Please select a file under 50MB.');
//         event.target.value = null;
//         return;
//       }

//       // Check file type
//       const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'video/mp4',
//         'video/webm',
//         'video/quicktime'
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         setError('Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV).');
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('media', selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('https://insta-server-3e4p.onrender.com/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Add the new media to the beginning of the array
//       setMedia(prevMedia => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);

//       // Reset file input
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = null;

//     } catch (error) {
//       let errorMessage = 'Error uploading file. Please try again.';

//       if (error.response) {
//         // Server responded with an error
//         errorMessage = error.response.data.message || errorMessage;
//       } else if (error.request) {
//         // Request was made but no response
//         errorMessage = 'Server not responding. Please try again later.';
//       }

//       setError(errorMessage);
//       console.error('Upload error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === 'video') {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             controls
//             autoPlay
//             loop
//             muted
//             className="media-item"
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//           <p className="media-filename">{item.filename}</p>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img
//             src={mediaUrl}
//             alt={item.filename}
//             className="media-item"
//           />
//           <p className="media-filename">{item.filename}</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Media Gallery</h1>
//       </header>
//       <main>
//         <div className="upload-section">
//           <input
//             type="file"
//             accept="image/*, video/mp4, video/webm, video/quicktime"
//             onChange={handleFileSelect}
//             className="file-input"
//           />
//           <button
//             onClick={handleUpload}
//             disabled={loading || !selectedFile}
//             className="upload-button"
//           >
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}
//         </div>
//         <div className="media-grid">
//           {media.map(item => (
//             <div key={item._id} className="media-card">
//               {item.type === "video" ? (
//                 <video src={mediaUrl} controls autoPlay loop muted className="media-item"></video>
//               ) : (
//                 <img src={mediaUrl} alt={item.filename} className="media-item" />
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//       <div className="media-grid">
//         {media.map(item => (
//           <div key={item._id} className="media-card">
//             {item.type === "video" ? (
//               <video src={mediaUrl} controls autoPlay loop muted className="media-item"></video>
//             ) : (
//               <img src={mediaUrl} alt={item.filename} className="media-item" />
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="media-grid">
//         {media.map(item => {
//           const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`; // Define mediaUrl inside the loop

//           return (
//             <div key={item._id} className="media-card">
//               {item.type === "video" ? (
//                 <video src={mediaUrl} controls autoPlay loop muted className="media-item"></video>
//               ) : (
//                 <img src={mediaUrl} alt={item.filename} className="media-item" />
//               )}
//             </div>
//           );
//         })}
//       </div>

//     </div>
//   );
// }

// export default Reels;

//crt code

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Reels.css';

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   useEffect(() => {
//     // Clear error after 5 seconds
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get('https://insta-server-3e4p.onrender.com/api/media/');
//       setMedia(response.data);
//     } catch (error) {
//       setError('Could not load media. Please try again later.');
//       console.error('Error fetching media:', error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Check file size (50MB limit)
//       if (file.size > 50 * 1024 * 1024) {
//         setError('File size too large. Please select a file under 50MB.');
//         event.target.value = null;
//         return;
//       }

//       // Check file type
//       const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'video/mp4',
//         'video/webm',
//         'video/quicktime'
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         setError('Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV).');
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('media', selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('https://insta-server-3e4p.onrender.com/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Add the new media to the beginning of the array
//       setMedia(prevMedia => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);

//       // Reset file input
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = null;

//     } catch (error) {
//       let errorMessage = 'Error uploading file. Please try again.';

//       if (error.response) {
//         // Server responded with an error
//         errorMessage = error.response.data.message || errorMessage;
//       } else if (error.request) {
//         // Request was made but no response
//         errorMessage = 'Server not responding. Please try again later.';
//       }

//       setError(errorMessage);
//       console.error('Upload error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === 'video') {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             controls
//             autoPlay
//             loop
//             muted
//             className="media-item"
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//           <p className="media-filename">{item.filename}</p>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img
//             src={mediaUrl}
//             alt={item.filename}
//             className="media-item"
//           />
//           <p className="media-filename">{item.filename}</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Media Gallery</h1>
//       </header>
//       <main>
//         <div className="upload-section">
//           <input
//             type="file"
//             accept="image/*, video/mp4, video/webm, video/quicktime"
//             onChange={handleFileSelect}
//             className="file-input"
//           />
//           <button
//             onClick={handleUpload}
//             disabled={loading || !selectedFile}
//             className="upload-button"
//           >
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}
//         </div>

//       </main>
//       <div className="media-grid">
//           {media.map(item => renderMediaItem(item))}
//         </div>
//     </div>
//   );
// }

// export default Reels;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './Reels.css';

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const videoRefs = useRef([]); // Store references to videos

//   const id = 34;
//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get('https://insta-server-3e4p.onrender.com/api/media/');
//       setMedia(response.data);
//     } catch (error) {
//       setError('Could not load media. Please try again later.');
//       console.error('Error fetching media:', error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) {
//         setError('File size too large. Please select a file under 50MB.');
//         event.target.value = null;
//         return;
//       }

//       const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'video/mp4',
//         'video/webm',
//         'video/quicktime'
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         setError('Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV).');
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('media', selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('https://insta-server-3e4p.onrender.com/api/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setMedia(prevMedia => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);

//       // Reset file input
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = null;

//     } catch (error) {
//       let errorMessage = 'Error uploading file. Please try again.';

//       if (error.response) {
//         // Server responded with an error
//         errorMessage = error.response.data.message || errorMessage;
//       } else if (error.request) {
//         // Request was made but no response
//         errorMessage = 'Server not responding. Please try again later.';
//       }

//       setError(errorMessage);
//       console.error('Upload error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item, index) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === 'video') {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             ref={(el) => (videoRefs.current[index] = el)}
//             className="media-item"
//             muted={false} // Allow audio
//             controls
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img src={mediaUrl} alt={item.filename} className="media-item" />
//         </div>
//       );
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video.play().catch((error) => console.error('Video play error:', error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Play when 50% of the video is visible
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observer.unobserve(video);
//       });
//     };
//   }, [media]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Media Gallery</h1>
//       </header>
//       <main>
//         <div className="upload-section">
//           <input type="file" accept="image/*, video/mp4, video/webm, video/quicktime" onChange={handleFileSelect} className="file-input" />
//           <button onClick={handleUpload} disabled={loading || !selectedFile} className="upload-button">
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           {error && <div className="error-message">{error}</div>}
//         </div>
//       </main>
//       <div className="media-grid">
//         {media.map((item, index) => renderMediaItem(item, index))}
//       </div>
//     </div>
//   );
// }

// export default Reels;

//crt code

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Reels.css";
// import { LuMessageCircle } from "react-icons/lu";
// import { LuSend } from "react-icons/lu";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
// import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const videoRefs = useRef([]); // Store references to videos
//   const [profilePic, setProfilePic] = useState(null);
//   const [username, setUsername] = useState("");
//   const [likedPosts, setLikedPosts] = useState({});
//   const id = 34;
//   useEffect(() => {
//     fetchMedia();
//     // fetchProfileData();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // const fetchProfileData = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:3000/api/images/${id}`
//   //     );
//   //     setPosts(response.data.posts || []);
//   //     if (response.data.profilePic) {
//   //       const { contentType, imageData } = response.data.profilePic;
//   //       setProfilePic(`data:${contentType};base64,${imageData}`);
//   //       // setPosts(response.data.posts);
//   //       setUsername(response.data.userName);
//   //       // setfollowers_count(response.data.followersCount);
//   //       // setfollowing_count(response.data.followingCount);
//   //       // setfetchedbio(response.data.bio);
//   //       console.log("hiiiiiiiiiii", response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching profile data:", error);
//   //   }
//   // };

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get("https://insta-server-3e4p.onrender.com/api/media/");
//       setMedia(response.data);
//       console.log("eeeeeeeeeeeeeeee", response.data);
//     } catch (error) {
//       setError("Could not load media. Please try again later.");
//       console.error("Error fetching media:", error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) {
//         setError("File size too large. Please select a file under 50MB.");
//         event.target.value = null;
//         return;
//       }

//       const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "video/mp4",
//         "video/webm",
//         "video/quicktime",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         setError(
//           "Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV)."
//         );
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("media", selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `https://insta-server-3e4p.onrender.com/api/upload_reel/${id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setMedia((prevMedia) => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);
//       document.querySelector('input[type="file"]').value = null;
//     } catch (error) {
//       let errorMessage = "Error uploading file. Please try again.";
//       if (error.response)
//         errorMessage = error.response.data.message || errorMessage;
//       else if (error.request)
//         errorMessage = "Server not responding. Please try again later.";
//       setError(errorMessage);
//       console.error("Upload error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item, index) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === "video") {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             ref={(el) => (videoRefs.current[index] = el)}
//             className="media-item"
//             muted={false} // Allow audio
//             controls
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img src={mediaUrl} alt={item.filename} className="media-item" />
//         </div>
//       );
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video
//               .play()
//               .catch((error) => console.error("Video play error:", error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Play when 50% of the video is visible
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observer.unobserve(video);
//       });
//     };
//   }, [media]);

//   const arrayBufferToBase64 = (bufferData) => {
//     let binary = "";
//     const bytes = new Uint8Array(bufferData); // Convert data array to a Uint8Array
//     bytes.forEach((b) => (binary += String.fromCharCode(b))); // Convert to binary string
//     return btoa(binary); // Encode to base64
//   };

//   // const handleLikeToggle = async (postId) => {
//   //   console.log("hello", postId);
//   //   if (!postId) {
//   //     console.error("Invalid postId:", postId);
//   //     return;
//   //   }

//   //   const isLiked = likedPosts[postId]?.liked;

//   //   try {
//   //     const response = await axios.post(
//   //       `http://localhost:3000/api/posts_reels/${postId}/like`,
//   //       {
//   //         // Current user ID
//   //         likeAction: !isLiked, // Pass whether the like action is adding or removing
//   //       }
//   //     );

//   //     const { likesCount } = response.data;

//   //     // Update local state
//   //     setLikedPosts((prevState) => ({
//   //       ...prevState,
//   //       [postId]: {
//   //         liked: !isLiked,
//   //         likesCount,
//   //       },
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error toggling like:", error);
//   //   }
//   // };

//   const handleLikeToggle = async (postId) => {
//     console.log("Liking post:", postId);
//     if (!postId) return;
// console.log("ffffffffffffff",postId);
//     try {
//         const response = await axios.post(
//             `https://insta-server-3e4p.onrender.com/api/posts_reels/${postId}/like`
//         );

//         const { likesCount } = response.data;

//         // Update state with new like count
//         setLikedPosts((prevState) => ({
//             ...prevState,
//             [postId]: {
//                 liked: true,
//                 likesCount,
//             },
//         }));
//     } catch (error) {
//         console.error("Error liking post:", error);
//     }
// };

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <h1>Media Gallery</h1>
//       </header> */}
//       {/* <main>
//         <div className="upload-section">
//           <input type="file" accept="image/*, video/mp4, video/webm, video/quicktime" onChange={handleFileSelect} className="file-input" />
//           <button onClick={handleUpload} disabled={loading || !selectedFile} className="upload-button">
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           {error && <div className="error-message">{error}</div>}
//         </div>
//       </main> */}

//       {/* <div className="media-grid">
//         {media.map((item, index) => renderMediaItem(item, index)

//         {item.username && item.profilePic?.imageData && (
//           <div className="profile-section">
//             <img
//               src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData.toString("base64")}`}
//               alt="Profile"
//               className="profile-pic"
//             />
//             <span className="username">{item.username}</span>
//           </div>
//         )}

//         )}

//         <div className="icons_box_b">
//           <FontAwesomeIcon icon={faRegularHeart} />
//           <LuMessageCircle />
//           <LuSend />
//           <FontAwesomeIcon icon={faBookmark} />
//         </div>
//       </div> */}

//       <div className="media-grid">
//         {media.map((item, index) => (
//           <div key={index} className="media-item">
//             {console.log("uuuuuuuuuuuuuuuu", item.profilePic)}

//             {/* Media Content */}
//             {renderMediaItem(item, index)}

//             {item.username && item.profilePic?.imageData && (
//               <div className="profile-section_reel">
//                 <img
//                   src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData}`}
//                   alt="Profile"
//                   className="profile-pic7"
//                 />
//                 <span className="username_reel">{item.username}</span>
//               </div>
//             )}

//             {/* Icons Section */}
//             <div className="icons_box_b">
//               <FontAwesomeIcon icon={faRegularHeart} />
//               {/* <FontAwesomeIcon
//                 style={{
//                   // color: likedPosts[post.post._id]?.liked ? "red" : "white",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                 }}

//                 onClick={() => handleLikeToggle(item._id)}
//                 icon={
//                   likedPosts[item.likesCount]?.liked
//                     ? faSolidHeart
//                     : faRegularHeart
//                 }
//               /> */}
//               {/* <FontAwesomeIcon
//                 style={{
//                   color: likedPosts[item._id]?.liked ? "red" : "black",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => handleLikeToggle(item._id)}
//                 icon={
//                   likedPosts[item._id]?.liked ? faSolidHeart : faRegularHeart
//                 }
//               /> */}
//               <span className="like-count">
//                 {likedPosts[item._id]?.likesCount || item.likesCount} likes
//               </span>

//               <LuMessageCircle />
//               <LuSend />
//               <FontAwesomeIcon icon={faBookmark} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reels;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Reels.css";
// import { LuMessageCircle } from "react-icons/lu";
// import { LuSend } from "react-icons/lu";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
// import { faBookmark } from "@fortawesome/free-regular-svg-icons";
// import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const videoRefs = useRef([]); // Store references to videos
//   const [profilePic, setProfilePic] = useState(null);
//   const [username, setUsername] = useState("");
//   const [likedPosts, setLikedPosts] = useState({});
//   const id = 34;
//   useEffect(() => {
//     fetchMedia();
//     // fetchProfileData();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // const fetchProfileData = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:3000/api/images/${id}`
//   //     );
//   //     setPosts(response.data.posts || []);
//   //     if (response.data.profilePic) {
//   //       const { contentType, imageData } = response.data.profilePic;
//   //       setProfilePic(`data:${contentType};base64,${imageData}`);
//   //       // setPosts(response.data.posts);
//   //       setUsername(response.data.userName);
//   //       // setfollowers_count(response.data.followersCount);
//   //       // setfollowing_count(response.data.followingCount);
//   //       // setfetchedbio(response.data.bio);
//   //       console.log("hiiiiiiiiiii", response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching profile data:", error);
//   //   }
//   // };

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get("https://insta-server-3e4p.onrender.com/api/media/");
//       setMedia(response.data);
//       console.log("eeeeeeeeeeeeeeee", response.data);
//     } catch (error) {
//       setError("Could not load media. Please try again later.");
//       console.error("Error fetching media:", error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) {
//         setError("File size too large. Please select a file under 50MB.");
//         event.target.value = null;
//         return;
//       }

//       const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "video/mp4",
//         "video/webm",
//         "video/quicktime",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         setError(
//           "Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV)."
//         );
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("media", selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `https://insta-server-3e4p.onrender.com/api/upload_reel/${id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setMedia((prevMedia) => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);
//       document.querySelector('input[type="file"]').value = null;
//     } catch (error) {
//       let errorMessage = "Error uploading file. Please try again.";
//       if (error.response)
//         errorMessage = error.response.data.message || errorMessage;
//       else if (error.request)
//         errorMessage = "Server not responding. Please try again later.";
//       setError(errorMessage);
//       console.error("Upload error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item, index) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === "video") {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             ref={(el) => (videoRefs.current[index] = el)}
//             className="media-item"
//             muted={false} // Allow audio
//             controls
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img src={mediaUrl} alt={item.filename} className="media-item" />
//         </div>
//       );
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video
//               .play()
//               .catch((error) => console.error("Video play error:", error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Play when 50% of the video is visible
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observer.unobserve(video);
//       });
//     };
//   }, [media]);

//   const arrayBufferToBase64 = (bufferData) => {
//     let binary = "";
//     const bytes = new Uint8Array(bufferData); // Convert data array to a Uint8Array
//     bytes.forEach((b) => (binary += String.fromCharCode(b))); // Convert to binary string
//     return btoa(binary); // Encode to base64
//   };

//   // const handleLikeToggle = async (postId) => {
//   //   console.log("hello", postId);
//   //   if (!postId) {
//   //     console.error("Invalid postId:", postId);
//   //     return;
//   //   }

//   //   const isLiked = likedPosts[postId]?.liked;

//   //   try {
//   //     const response = await axios.post(
//   //       `http://localhost:3000/api/posts_reels/${postId}/like`,
//   //       {
//   //         // Current user ID
//   //         likeAction: !isLiked, // Pass whether the like action is adding or removing
//   //       }
//   //     );

//   //     const { likesCount } = response.data;

//   //     // Update local state
//   //     setLikedPosts((prevState) => ({
//   //       ...prevState,
//   //       [postId]: {
//   //         liked: !isLiked,
//   //         likesCount,
//   //       },
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error toggling like:", error);
//   //   }
//   // };

//   const handleLikeToggle = async (postId) => {
//     console.log("Liking post:", postId);
//     if (!postId) return;
// console.log("ffffffffffffff",postId);
//     try {
//         const response = await axios.post(
//             `https://insta-server-3e4p.onrender.com/api/posts_reels/${postId}/like`
//         );

//         const { likesCount } = response.data;

//         // Update state with new like count
//         setLikedPosts((prevState) => ({
//             ...prevState,
//             [postId]: {
//                 liked: true,
//                 likesCount,
//             },
//         }));
//     } catch (error) {
//         console.error("Error liking post:", error);
//     }
// };

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <h1>Media Gallery</h1>
//       </header> */}
//       {/* <main>
//         <div className="upload-section">
//           <input type="file" accept="image/*, video/mp4, video/webm, video/quicktime" onChange={handleFileSelect} className="file-input" />
//           <button onClick={handleUpload} disabled={loading || !selectedFile} className="upload-button">
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           {error && <div className="error-message">{error}</div>}
//         </div>
//       </main> */}

//       {/* <div className="media-grid">
//         {media.map((item, index) => renderMediaItem(item, index)

//         {item.username && item.profilePic?.imageData && (
//           <div className="profile-section">
//             <img
//               src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData.toString("base64")}`}
//               alt="Profile"
//               className="profile-pic"
//             />
//             <span className="username">{item.username}</span>
//           </div>
//         )}

//         )}

//         <div className="icons_box_b">
//           <FontAwesomeIcon icon={faRegularHeart} />
//           <LuMessageCircle />
//           <LuSend />
//           <FontAwesomeIcon icon={faBookmark} />
//         </div>
//       </div> */}

//       <div className="media-grid">
//         {media.map((item, index) => (
//           <div key={index} className="media-item">
//             {console.log("uuuuuuuuuuuuuuuu", item.profilePic)}
//             <div className="media_con">
//               {/* Media Content */}
//               {renderMediaItem(item, index)}

//               {item.username && item.profilePic?.imageData && (
//                 <div className="profile-section_reel">
//                   <img
//                     src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData}`}
//                     alt="Profile"
//                     className="profile-pic7"
//                   />
//                   <span className="username_reel">{item.username}</span>
//                 </div>
//               )}

//               {/* Icons Section */}
//               <div className="icons_box_b">
//                 {/* <FontAwesomeIcon icon={faRegularHeart} /> */}
//                 {/* <FontAwesomeIcon
//                 style={{
//                   // color: likedPosts[post.post._id]?.liked ? "red" : "white",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                 }}

//                 onClick={() => handleLikeToggle(item._id)}
//                 icon={
//                   likedPosts[item.likesCount]?.liked
//                     ? faSolidHeart
//                     : faRegularHeart
//                 }
//               /> */}
//                 <span className="like-count">
//                   {likedPosts[item._id]?.likesCount || item.likesCount} likes
//                 </span>
//                 <FontAwesomeIcon
//                   style={{
//                     color: likedPosts[item._id]?.liked ? "red" : "white",
//                     fontSize: "24px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleLikeToggle(item._id)}
//                   icon={
//                     likedPosts[item._id]?.liked ? faSolidHeart : faRegularHeart
//                   }
//                 />

//                 <LuMessageCircle />
//                 <LuSend />
//                 <FontAwesomeIcon icon={faBookmark} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reels;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Reels.css";
// import { LuMessageCircle } from "react-icons/lu";
// import { LuSend } from "react-icons/lu";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
// import { faBookmark } from "@fortawesome/free-regular-svg-icons";
// import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

// function Reels() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const videoRefs = useRef([]); // Store references to videos
//   const [profilePic, setProfilePic] = useState(null);
//   const [username, setUsername] = useState("");
//   const [likedPosts, setLikedPosts] = useState({});
//   const [showmessage, setshowmessage] = useState(false);
//   const [newCommand, setNewCommand] = useState("");
//   const [commands, setCommands] = useState([]);
//   const id = 34;
//   useEffect(() => {
//     fetchMedia();
//     // fetchProfileData();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // const fetchProfileData = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:3000/api/images/${id}`
//   //     );
//   //     setPosts(response.data.posts || []);
//   //     if (response.data.profilePic) {
//   //       const { contentType, imageData } = response.data.profilePic;
//   //       setProfilePic(`data:${contentType};base64,${imageData}`);
//   //       // setPosts(response.data.posts);
//   //       setUsername(response.data.userName);
//   //       // setfollowers_count(response.data.followersCount);
//   //       // setfollowing_count(response.data.followingCount);
//   //       // setfetchedbio(response.data.bio);
//   //       console.log("hiiiiiiiiiii", response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching profile data:", error);
//   //   }
//   // };

//   const fetchMedia = async () => {
//     try {
//       const response = await axios.get("https://insta-server-3e4p.onrender.com/api/media/");
//       setMedia(response.data);
//       console.log("eeeeeeeeeeeeeeee", response.data);
//     } catch (error) {
//       setError("Could not load media. Please try again later.");
//       console.error("Error fetching media:", error);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) {
//         setError("File size too large. Please select a file under 50MB.");
//         event.target.value = null;
//         return;
//       }

//       const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "video/mp4",
//         "video/webm",
//         "video/quicktime",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         setError(
//           "Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV)."
//         );
//         event.target.value = null;
//         return;
//       }

//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("media", selectedFile);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `https://insta-server-3e4p.onrender.com/api/upload_reel/${id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setMedia((prevMedia) => [response.data.media, ...prevMedia]);
//       setSelectedFile(null);
//       document.querySelector('input[type="file"]').value = null;
//     } catch (error) {
//       let errorMessage = "Error uploading file. Please try again.";
//       if (error.response)
//         errorMessage = error.response.data.message || errorMessage;
//       else if (error.request)
//         errorMessage = "Server not responding. Please try again later.";
//       setError(errorMessage);
//       console.error("Upload error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMediaItem = (item, index) => {
//     const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

//     if (item.type === "video") {
//       return (
//         <div key={item._id} className="media-card">
//           <video
//             ref={(el) => (videoRefs.current[index] = el)}
//             className="media-item"
//             muted={false} // Allow audio
//             controls
//           >
//             <source src={mediaUrl} type={item.contentType} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     } else {
//       return (
//         <div key={item._id} className="media-card">
//           <img src={mediaUrl} alt={item.filename} className="media-item" />
//         </div>
//       );
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video
//               .play()
//               .catch((error) => console.error("Video play error:", error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Play when 50% of the video is visible
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observer.unobserve(video);
//       });
//     };
//   }, [media]);

//   const arrayBufferToBase64 = (bufferData) => {
//     let binary = "";
//     const bytes = new Uint8Array(bufferData); // Convert data array to a Uint8Array
//     bytes.forEach((b) => (binary += String.fromCharCode(b))); // Convert to binary string
//     return btoa(binary); // Encode to base64
//   };

//   // const handleLikeToggle = async (postId) => {
//   //   console.log("hello", postId);
//   //   if (!postId) {
//   //     console.error("Invalid postId:", postId);
//   //     return;
//   //   }

//   //   const isLiked = likedPosts[postId]?.liked;

//   //   try {
//   //     const response = await axios.post(
//   //       `http://localhost:3000/api/posts_reels/${postId}/like`,
//   //       {
//   //         // Current user ID
//   //         likeAction: !isLiked, // Pass whether the like action is adding or removing
//   //       }
//   //     );

//   //     const { likesCount } = response.data;

//   //     // Update local state
//   //     setLikedPosts((prevState) => ({
//   //       ...prevState,
//   //       [postId]: {
//   //         liked: !isLiked,
//   //         likesCount,
//   //       },
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error toggling like:", error);
//   //   }
//   // };

//   const handleLikeToggle = async (postId) => {
//     console.log("Liking post:", postId);
//     if (!postId) return;
//     console.log("ffffffffffffff", postId);
//     try {
//       const response = await axios.post(
//         `https://insta-server-3e4p.onrender.com/api/posts_reels/${postId}/like`
//       );

//       const { likesCount } = response.data;

//       // Update state with new like count
//       setLikedPosts((prevState) => ({
//         ...prevState,
//         [postId]: {
//           liked: true,
//           likesCount,
//         },
//       }));
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handlecmd_in_c = (e) => {
//     setNewCommand(e.target.value);
//   };

//   // const handlekeypres = async (e, postId) => {
//   //   if (e.key === "Enter" && newCommands[postId]?.trim() !== "") {
//   //     const commandToAdd = newCommands[postId].trim();
//   //     console.log("chiiiiiiiiiii",commandToAdd);
//   //     try {
//   //       // Send command to backend
//   //       const response = await axios.post(
//   //         `http://localhost:3000/api/reels/${postId}/commands`,
//   //         {
//   //            command: commandToAdd.toString(),
//   //         }
//   //       );

//   //       // Update commands state
//   //       setCommands((prev) => ({
//   //         ...prev,
//   //         [postId]: response.data.commands, // Store updated commands for the post
//   //       }));

//   //       console.log("Command added successfully:", commandToAdd);
//   //     } catch (error) {
//   //       console.error("Error adding command:", error);
//   //     }

//   //     // Clear input after submission
//   //     setNewCommands((prev) => ({
//   //       ...prev,
//   //       [postId]: "",
//   //     }));
//   //   }
//   // };
//   // const handlekeypres = async (e, postId) => {
//   //   if (e.key === "Enter" && newCommand.trim() !== "") {
//   //     const commandToAdd = newCommand.trim();
//   //     setCommands((prevCommands) => [...prevCommands, commandToAdd]); // Update local state

//   //     console.log(
//   //       "Adding command:",
//   //       commandToAdd,
//   //       "Post ID:",
//   //       postId,
//   //       "User ID"
//   //     );

//   //     try {
//   //       // Send the command to the backend
//   //       await axios.post(`http://localhost:3000/api/reels/${postId}/commands`, {
//   //         command: commandToAdd, // The new command to add
//   //       });

//   //       console.log("Command added successfully:", commandToAdd);
//   //     } catch (error) {
//   //       console.error("Error adding command:", error);
//   //     }

//   //     // Clear the input field
//   //     setNewCommand("");
//   //   }
//   // };

//   const handlekeypres = async (e, postId) => {
//     if (e.key === "Enter" && newCommand.trim() !== "") {
//       const commandToAdd = newCommand.trim();
  
//       // Update commands for the specific post
//       setCommands((prevCommands) => ({
//         ...prevCommands,
//         [postId]: [...(prevCommands[postId] || []), commandToAdd],
//       }));
  
//       console.log("Adding command:", commandToAdd, "Post ID:", postId);
  
//       try {
//         // Send the command to the backend
//         await axios.post(`https://insta-server-3e4p.onrender.com/api/reels/${postId}/commands`, {
//           command: commandToAdd,
//         });
  
//         console.log("Command added successfully:", commandToAdd);
//       } catch (error) {
//         console.error("Error adding command:", error);
//       }
  
//       // Clear the input field
//       setNewCommand("");
//     }
//   };
  
//   return (
//     <div className="App">
//       <div className="media-grid">
//         {media.map((item, index) => (
//           <div key={index} className="media-item">
//             {console.log("uuuuuuuuuuuuuuuu", item.profilePic)}
//             <div className="media_con">
//               {/* Media Content */}
//               {renderMediaItem(item, index)}

//               {item.username && item.profilePic?.imageData && (
//                 <div className="profile-section_reel">
//                   <img
//                     src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData}`}
//                     alt="Profile"
//                     className="profile-pic7"
//                   />
//                   <span className="username_reel">{item.username}</span>
//                 </div>
//               )}

//               {/* Icons Section */}
//               <div className="icons_box_b">
//                 <span className="like-count_reels">
//                   {likedPosts[item._id]?.likesCount || item.likesCount}
//                 </span>
//                 <FontAwesomeIcon
//                   style={{
//                     color: likedPosts[item._id]?.liked ? "red" : "white",
//                     fontSize: "24px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleLikeToggle(item._id)}
//                   icon={
//                     likedPosts[item._id]?.liked ? faSolidHeart : faRegularHeart
//                   }
//                 />

//                 <LuMessageCircle onClick={() => setshowmessage(true)} />
//                 <p>{console.log("Commands for item:", item.commands.length)
// }</p>

//                 <LuSend />
//                 <FontAwesomeIcon icon={faBookmark} />
//               </div>
//             </div>

//             {showmessage && (
//               <div className="mess_con_reel">
//                 <div className="messages_div">
//                   <div className="messages_div">
//                   <p>Total Commands: {item.commands?.length || 0}</p> 
//                     {item.commands?.map((cmd, i) => (
//                       <p key={i}>{cmd}</p>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="in_reel">
//                   <input
//                     type="text"
//                     value={newCommand}
//                     onChange={(e) => handlecmd_in_c(e, item._id)}
//                     onKeyPress={(e) => handlekeypres(e, item._id)}
//                   />
//                 </div>
//                 <button onClick={() => setshowmessage(false)}>close</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reels;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reels.css";
import { LuMessageCircle } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

function Reels() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRefs = useRef([]); // Store references to videos
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [showmessage, setshowmessage] = useState({});  // Changed to object
  const [newCommand, setNewCommand] = useState({});     // Changed to object
  const [commands, setCommands] = useState({});         // Already an object
  const id = 34;

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("https://insta-server-3e4p.onrender.com/api/media/");
      setMedia(response.data);
      console.log("Media data:", response.data);
    } catch (error) {
      setError("Could not load media. Please try again later.");
      console.error("Error fetching media:", error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError("File size too large. Please select a file under 50MB.");
        event.target.value = null;
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/webm",
        "video/quicktime",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV)."
        );
        event.target.value = null;
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("media", selectedFile);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://insta-server-3e4p.onrender.com/api/upload_reel/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMedia((prevMedia) => [response.data.media, ...prevMedia]);
      setSelectedFile(null);
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      let errorMessage = "Error uploading file. Please try again.";
      if (error.response)
        errorMessage = error.response.data.message || errorMessage;
      else if (error.request)
        errorMessage = "Server not responding. Please try again later.";
      setError(errorMessage);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMediaItem = (item, index) => {
    const mediaUrl = `https://insta-server-3e4p.onrender.com/api/media/${item._id}`;

    if (item.type === "video") {
      return (
        <div key={item._id} className="media-card">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="media-item"
            muted={false}
            controls
          >
            <source src={mediaUrl} type={item.contentType} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div key={item._id} className="media-card">
          <img src={mediaUrl} alt={item.filename} className="media-item" />
        </div>
      );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video
              .play()
              .catch((error) => console.error("Video play error:", error));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [media]);

  const handleLikeToggle = async (postId) => {
    console.log("Liking post:", postId);
    if (!postId) return;
    
    try {
      const response = await axios.post(
        `https://insta-server-3e4p.onrender.com/api/posts_reels/${postId}/like`
      );

      const { likesCount } = response.data;

      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: {
          liked: true,
          likesCount,
        },
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handlecmd_in_c = (e, postId) => {
    setNewCommand({
      ...newCommand,
      [postId]: e.target.value
    });
  };

  const handlekeypres = async (e, postId) => {
    if (e.key === "Enter" && newCommand[postId]?.trim()) {
      const commandToAdd = newCommand[postId].trim();

      try {
        // Send the command to the backend
        await axios.post(`https://insta-server-3e4p.onrender.com/api/reels/${postId}/commands`, {
          command: commandToAdd,
        });

        // Update local state
        setCommands(prevCommands => ({
          ...prevCommands,
          [postId]: [...(prevCommands[postId] || []), commandToAdd]
        }));

        // Clear just this post's input
        setNewCommand(prev => ({
          ...prev,
          [postId]: ''
        }));
      } catch (error) {
        console.error("Error adding command:", error);
      }
    }
  };

  return (
    <div className="App">
      <div className="media-grid">
        {media.map((item, index) => (
          <div key={index} className="media-item">
            <div className="media_con">
              {renderMediaItem(item, index)}

              {item.username && item.profilePic?.imageData && (
                <div className="profile-section_reel">
                  <img
                    src={`data:${item.profilePic.contentType};base64,${item.profilePic.imageData}`}
                    alt="Profile"
                    className="profile-pic7"
                  />
                  <span className="username_reel">{item.username}</span>
                </div>
              )}

              <div className="icons_box_b">
                <span style={{backgroundColor:"transparent",  position:"absolute",
                    top:"160px", right:"-20px",}} className="like-count_reels">
                  {likedPosts[item._id]?.likesCount || item.likesCount}
                </span>
                <FontAwesomeIcon
                  style={{
                    position:"absolute",
                    top:"130px",
                   
                    backgroundColor:"transparent",
                    color: likedPosts[item._id]?.liked ? "red" : "white",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLikeToggle(item._id)}
                  icon={
                    likedPosts[item._id]?.liked ? faSolidHeart : faRegularHeart
                  }
                />
                    
                    <span style={{backgroundColor:"transparent",right:"-2px"}} className="like-count_reels">
                  {item.commands?.length}
                </span>
                      <LuMessageCircle style={{backgroundColor:"transparent"}} onClick={() => setshowmessage(prev => ({
                  ...prev,
                  [item._id]: true
                }))} />
                 
                    
                
                
                <LuSend style={{backgroundColor:"transparent",}} />
                <FontAwesomeIcon style={{backgroundColor:"transparent",}} icon={faBookmark} />
              </div>
            </div>

            {showmessage[item._id] && (
              <div className="mess_con_reel">
                <div className="messages_div">
                  <div className="messages_div">
                    <p>Total Commands: {item.commands?.length || 0}</p>
                    {item.commands?.map((cmd, i) => (
                      <p key={i}>{cmd}</p>
                    ))}
                  </div>
                </div>
                <div className="in_reel">
                  <input
                    type="text"
                    value={newCommand[item._id] || ''}
                    onChange={(e) => handlecmd_in_c(e, item._id)}
                    onKeyPress={(e) => handlekeypres(e, item._id)}
                    placeholder="Add a comment..."
                  />
                </div>
                <button onClick={() => setshowmessage(prev => ({
                  ...prev,
                  [item._id]: false
                }))}>close</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;