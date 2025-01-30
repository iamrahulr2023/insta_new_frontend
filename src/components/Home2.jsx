


import React from "react";
import { useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import image from "C:/Users/Home/Desktop/InPlant_training_2025/backend_pratise/server/Inten_project/insta/src/assets/Screenshot 2025-01-20 223303.png"; 


import { PiFilmStripFill } from "react-icons/pi";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { CgProfile } from "react-icons/cg";
import { IoCompassOutline } from "react-icons/io5";
import { FaThreads } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { LuMessageCircle } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { HiDotsHorizontal } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import pro_img from "C:/Users/Home/Desktop/InPlant_training_2025/backend_pratise/server/Inten_project/insta/src/assets/insta_default_img.webp"
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";


const Home = ({Getid}) => {

  const location = useLocation();
  const { id} = location.state || {};
  const [product, setProduct] = useState("Nantha");
  const [profilepic , setProfilePic] = useState();
  const  [username , setUsername] = useState("user_name");
  const [users, setUsers] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked status for each post
  const [bgColor, setBgColor] = useState("");

  // const [comments, setComments] = useState({}); // Store comments for each post
  // const [newComment, setNewComment] = useState("");
  const [newCommand, setNewCommand] = useState(""); // For the current input
  const [commands, setCommands] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [playingPostId, setPlayingPostId] = useState(null);
// For storing all commands // Track the new comment being added
  
  useEffect(() => {
    Getid(id);
    fetchProfileData();
   fetch_all_profiles();
   fetchLatestPosts();
  //  fetchComments(post.post._id);
  }, []);
  const current_user= id;
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile_data/${id}`);
      
      if (response.data.profilePic) {
        const { contentType, imageData } = response.data.profilePic;
        setProfilePic(`data:${contentType};base64,${imageData}`);
        setUsername(response.data.user_name);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post to open in the popup
  };

  
  const closePopup = () => {
    setSelectedPost(null); // Reset the selected post
  };
  

  const fetch_all_profiles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/all_profile_data");
      console.log("Fetched users:", response.data); // Ensure _id is present
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };
  

  const handleFollow = async (userIdss) => {
    console.log("clicked userId:", userIdss); // Verify the passed userId
    if (!userIdss) {
      console.error("Invalid userId");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/follow", {
        followerId: id, // Current logged-in user's MongoDB `_id`
        followingId: userIdss, // The MongoDB `_id` of the user to follow
      });
  
      // Update the users array to reflect the follow status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userIdss
            ? { ...user, isFollowing: true } // Update follow status
            : user
        )
      );
  setTimeout(() => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userIdss));
    console.log(`Filtered out user with ID: ${userIdss}`);
  }, 3000);
  
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/latest_posts");
      console.log("Fetched latest posts:", response.data);
      setLatestPosts(response.data);
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    }
  };


  //crt tcode
  // const handleLikeToggle = async (postId,user_post_id) => {
  //   console.log("Post ID:", postId, user_post_id);  // Debugging log for postId
  //   if (!postId) {
  //     console.error("Invalid postId:", postId);
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
  //       userId: id, // Use the logged-in user's ID (current user's ID)
  //     });
  
  //     const { likesCount } = response.data;
  
  //     setLikedPosts((prevState) => ({
  //       ...prevState,
  //       [postId]: {
  //         liked: !prevState[postId]?.liked,
  //         likesCount,  // Update the like count in the state
  //       },
  //     }));
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };
  
  const handleLikeToggle = async (postId, userPostId) => {

    console.log("hello", postId)
    if (!postId) {
      console.error("Invalid postId:", postId);
      return;
    }
  
    const isLiked = likedPosts[postId]?.liked;
  
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
        userId: id, // Current user ID
        likeAction: !isLiked, // Pass whether the like action is adding or removing
      });
    
      const { likesCount } = response.data;
  
      // Update local state
      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: {
          liked: !isLiked,
          likesCount,
        },
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // const handlecommands = async(postid)=>{
  //   if (!postid) {
  //     console.error("Invalid postId:", postId);
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`http://localhost:3000/api/posts/${postid}/like`, {
  //       userId: id, // Current user ID // Pass whether the like action is adding or removing
  //     });
    
  //     // const { likesCount } = response.data;
  
  //     // Update local state
  //     // setLikedPosts((prevState) => ({
  //     //   ...prevState,
  //     //   [postId]: {
  //     //     liked: !isLiked,
  //     //     likesCount,
  //     //   },
  //     // }));
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // }

  
  // message
//   const handleInputChange = (e) => {
//     setNewCommand(e.target.value);
//   };

//   const handleKeyPress = async (e, postid) => {

//     if (e.key === "Enter" && newCommand.trim() !== "") {
//       const commandToAdd = newCommand.trim();
//       setCommands((prevCommands) => [...prevCommands, commandToAdd]); // Update local state
// console.log(commandToAdd , id ,postid);
//       try {
//         // Post to backend
//         await axios.post(`http://localhost:3000/api/posts/${postid}/commands`, {
//           userId :id, // Current user ID
//           command: commandToAdd, // The new command to add
//         });

//         console.log("Command added successfully:", commandToAdd);
//       } catch (error) {
//         console.error("Error adding command:", error);
//       }

//       // Clear the input field
//       setNewCommand("");
//     }
//   };


const handleInputChange = (e, postid) => {
  // Log the postid for debugging
  console.log("Post ID in handleInputChange:", postid);
  setNewCommand(e.target.value);
};

const handleKeyPress = async (e, postid) => {
  if (e.key === "Enter" && newCommand.trim() !== "") {
    const commandToAdd = newCommand.trim();
    setCommands((prevCommands) => [...prevCommands, commandToAdd]); // Update local state
    console.log("Adding command:", commandToAdd, "Post ID:", postid, "User ID:", id);

    try {
      // Post to backend
      await axios.post(`http://localhost:3000/api/posts/${postid}/commands`, {
        userId: id, // Current user ID
        command: commandToAdd, // The new command to add
      });

      console.log("Command added successfully:", commandToAdd);
    } catch (error) {
      console.error("Error adding command:", error);
    }

    // Clear the input field
    setNewCommand("");
  }
};


  const handleC = () => {
    setBgColor((prevColor) => (prevColor === "" ? "red" : ""));
  };
  
  // const handleAddComment = async (postId) => {
  //   if (!newComment.trim()) return;
  
  //   try {
  //     const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, {
  //       userId: id, // Current user ID
  //       comment: newComment,
  //     });
  
  //     // Update comments locally
  //     setComments((prevState) => ({
  //       ...prevState,
  //       [postId]: [...(prevState[postId] || []), response.data.comment],
  //     }));
  
  //     setNewComment(""); // Clear input field
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };
  
  // const fetchComments = async (postId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
  //     setComments((prevState) => ({
  //       ...prevState,
  //       [postId]: response.data.comments,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };
  
  const toggleAudio = (postId) => {
    if (playingPostId === postId) {
      setPlayingPostId(null); // Pause if it's already playing
    } else {
      setPlayingPostId(postId); // Play the audio
    }
  };
  return (
    <div className="main">
      {/* Sidebar */}

    <div className="sidenav">
        <div className="logo_f">Instagram{id}
          {/* <img className="insta" src={image}/> */}
        </div>
        <div className="navs">
          <ul>
            <li> <FontAwesomeIcon className="hicon" icon={faHouse}/>Home</li>
            <li><FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />Search</li>
            <li> <IoCompassOutline style={{ marginRight: "12px",  }} size={25} />Explore</li>
            <li><PiFilmStripFill style={{ marginRight: "12px",  }} size={25}/>Reels</li>
            <li><BiMessageRoundedCheck style={{ marginRight: "5px",  }} size={25} /> Messages</li>
            <li><FontAwesomeIcon className="heart" icon={faRegularHeart} />Notifications</li>
            <li><FontAwesomeIcon className="heart" icon={faSquarePlus} />
            Create</li>
            {/* <Link to="/profile/${id}"> <li> <CgProfile style={{ marginRight: "12px",  }} size={25} /> Profile </li></Link> */}
            <Link to={`/profile/${id}`}>
             <li>
            <CgProfile style={{ marginRight: "12px" }} size={25} />
             Profile
               </li>
             </Link>

          </ul>
        </div>
        <div className="bottom_navs">
          <div className="threads"> <FaThreads style={{ marginRight: "12px",  }} size={25} />Threads</div>
          <div className="more"> <HiBars3 style={{ marginRight: "15px",  }} size={28}  /> More</div>
      </div>
      
    </div>

     <div className="middle">

      <div className="stories"></div>
      <div className="reels">


      {/* {latestPosts.map((post, index) => (
  <div key={index} className="post1">
    <div className="headers">
      <div className="left_head">
        <div className="ch_img">
          <img
            className="profile_pic2"
            src={`data:${post.profilePic.contentType};base64,${post.profilePic.imageData}`}
            alt="Profile"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
        <div className="ch_na">{post.username}</div>
        <div className="time">. Latest</div>
      </div>
    </div>
    <div className="imgs">
      <img
        className="insta"
        src={`data:${post.post.contentType};base64,${post.post.imageData}`}
        alt="Post"
      />
    </div>
    <div className="footer">
      <div className="iconses">
        <div className="left">
          <button
            className="like-button"
            style={{
              color: likedPosts[post.post._id]?.liked ? "red" : "gray",
            }}
            onClick={() => handleLikeToggle(post.post._id,post._id)} // Use post._id here
          >
            ❤️
          </button>
          <span>{likedPosts[post.post._id]?.likesCount || post.post.likes?.length || 0} Likes</span>
        </div>
        <FontAwesomeIcon icon={faBookmark} />
      </div>
    </div>
  </div>
))} */}

<div>
      {latestPosts.map((post, index) => (
        <div key={index} className="post1">
          <div className="headers">
            <div className="left_head">
              <div className="ch_img">
                <img
                  className="profile_pic2"
                  src={`data:${post.profilePic.contentType};base64,${post.profilePic.imageData}`}
                  alt="Profile"
                  style={{ height: "50px", width: "50px" }}
                />
              </div>
              <div className="ch_na">{post.username}</div>
              <div className="time">. Latest</div>
            </div>
          </div>
          
          <div className="imgs">
            <img
              className="insta"
              src={`data:${post.post.contentType};base64,${post.post.imageData}`}
              alt="Post"
              onClick={() => handlePostClick(post)} 
            />
            
            {/* Check if the post contains audio */}
            {post.post.audio && (
              <div className="audio-container">
                {/* Speaker icon to play/pause audio */}
                <div
                  onClick={() => toggleAudio(post._id)}
                  style={{ cursor: "pointer" }}
                >
                  {playingPostId === post._id ? (
                    <FaVolumeUp style={{ fontSize: "24px", color: "gray" }} />
                  ) : (
                    <FaVolumeMute style={{ fontSize: "24px", color: "gray" }} />
                  )}
                </div>
                
                {/* Audio element */}
                <audio
                  controls
                  autoPlay={playingPostId === post._id}
                  style={{ display: "none" }} // Hide the default audio controls
                >
                  <source
                    src={`data:${post.post.audio.contentType};base64,${post.post.audio.data}`}
                    type={post.post.audio.contentType}
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>

          <div className="footer">
            <div className="iconses">
              <div className="left">
                <div
                  className="like-button"
                  style={{
                    color: likedPosts[post.post._id]?.liked ? "red" : "gray",
                  }}
                  onClick={() => handleLikeToggle(post.post._id, post._id)} 
                >
                  <div className="like-button">
                    <FontAwesomeIcon
                      style={{
                        color: likedPosts[post.post._id]?.liked ? "red" : "gray",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleLikeToggle(post.post._id, post._id)}
                      icon={likedPosts[post.post._id]?.liked ? faSolidHeart : faRegularHeart}
                    />
                    <span>{likedPosts[post.post._id]?.likesCount || post.post.likesCount || 0} </span>
                  </div>
                </div>
                <div className="left">  
                  <LuMessageCircle onClick={() => handlecommands(post._id)} />
                  <LuSend />
                </div>
                <FontAwesomeIcon style={{ position: "absolute", left: "450px" }} icon={faBookmark} />
              </div>
            </div>

            <div className="icons_under">
              {post.post.description && post.post.description.length > 0 ? (
                post.post.description.map((desc, descIndex) => (
                  <p key={descIndex} className="post-description">{desc}</p>
                ))
              ) : (
                <p>No description available</p>
              )}
              <div className="liked_by">Liked by _45ak_brito and others</div>
              <div className="page_name">
                sunnews #SportsClicks | இந்திய கிரிக்கெட் வீரர் சிராஜின் இன்ஸ்டா பதிவு!...
                more
              </div>
              <div className="commands-list">
                <input
                  type="text"
                  style={{ color: "white", width: "200px", height: "20px" }}
                  placeholder="Add new commands"
                  value={newCommand}
                  onChange={(e) => handleInputChange(e, post.post._id)} 
                  onKeyPress={(e) => handleKeyPress(e, post.post._id)} 
                />
                <h4>Commands:</h4>
                {post.post.commands && post.post.commands.length > 0 ? (
                  <ul>
                    {post.post.commands.map((cmd, cmdIndex) => (
                      <li key={cmdIndex}>{cmd}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No commands available</p>
                )}
              </div>  
            </div>
          </div>
        </div>
      ))}
    </div>

      </div>
     </div> 


<div className="suggestion">
      <div className="top_">
        <div className="p_img"><img className="profile_pic" style={{ height: "50px", width: "50px" }} src={profilepic} alt="Profile" /></div>
        <div className="text_name">{username}</div>
        <div className="switch">Switch</div>
      </div>

      <div className="middle_">
        <div className="sugg">Suggested for you</div>
        <div className="see_all">See All</div>
      </div>

<div className="bottom_">
  {users.length === 0 ? (
    <p>No users found.</p>
  ) : (
    users
      .filter((user) => {
        // Ensure the current user (Kavin) is not following the user (Rahul)
        return !user.followers?.some((follower) => follower.id === id);  // `id` is Kavin's ID
      })
      .map((user, index) => (
     <div key={index} className="user_card">
          <div className="p_img">
            <img
              className="profile_pic"
              src={
                user.profilePic
                  ? `data:${user.profilePic.contentType};base64,${user.profilePic.imageData}`
                  : pro_img
              }
              alt="Profile"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
          <Link to={`/profile_frds/${user._id}/${id}`}> <div className="text_name">{user.user_name}</div></Link>  
          <button
            className="switch"
            style={{
              backgroundColor: user.isFollowing ? "white" : "#0095f6",
              color: user.isFollowing ? "#000" : "#fff",
              border: user.isFollowing ? "1px solid #ddd" : "none",
            }}
            onClick={() => handleFollow(user._id)} // Pass user._id here
          >
            {user.isFollowing ? "Following" : "Follow"}
          </button>
        </div>
       
      ))
  )}
</div>

    </div>

<div className="pop_up_post_box">
    {selectedPost && (
      <div className="overlay">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div className="popup-content">
      <button
        onClick={closePopup}
        className="absolute top-4 right-4 text-gray-500"
      >
        ✖
      </button>
      <img
        src={`data:${selectedPost.post.contentType};base64,${selectedPost.post.imageData}`}
        alt="Selected Post"
        className="rounded-lg"
      />
      <div className="text-lg font-semibold mb-2">
        Likes: {selectedPost.post.likesCount}
      </div>
      <p className="text-gray-700 mb-4">{selectedPost.post.description}</p>
      <h4>Commands:</h4>
      <ul>
        {selectedPost.post.commands && selectedPost.post.commands.length > 0 ? (
          selectedPost.post.commands.map((cmd, index) => (
            <li key={index}>{cmd}</li>
          ))
        ) : (
          <p>No commands available</p>
        )}
      </ul>
    </div>
  </motion.div>
  </div>
)}

</div>
    </div>
  );
};

export default Home;



























