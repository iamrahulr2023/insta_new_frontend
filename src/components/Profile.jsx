//testing

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
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
import pro_img from "../assets/insta_pro.jpg";
import { motion } from "framer-motion";
import { LuMessageCircle } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import img_upload from "../assets/Screenshot 2025-01-30 114823.png";
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { id } = useParams();
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [follower_c, setfollowers_count] = useState(0);
  const [following_c, setfollowing_count] = useState(0);
  const [postDescription, setPostDescription] = useState("");
  const [showEditBioPopup, setShowEditBioPopup] = useState(false); // To show/hide the popup
  const [bio, setBio] = useState(""); // To store the current bio
  const [newBio, setNewBio] = useState("");
  const [fetchedbio, setfetchedbio] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);
  const [followersUsers, setFollowersUsers] = useState([]);
  const [showFollowersPopup, setShowFollowersPopup] = useState(false);
  const navigate = useNavigate();
  // To store the updated bio
  // New state for post description

  useEffect(() => {
    fetchProfileData();
    fetchProfileData2();
  }, []);

  // const fetchProfileData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/images/${id}`);
  //     setPosts(response.data.posts || []);
  //     if (response.data.profilePic) {
  //       const { contentType, imageData } = response.data.profilePic;
  //       setProfilePic(`data:${contentType};base64,${imageData}`);
  //       setPosts(response.data.posts);
  //       setUsername(response.data.user_name);
  //       setfollowers_count(response.data.followers);
  //       setfollowing_count(response.data.following);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching profile data:", error);
  //   }
  // };

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post to open in the popup
  };

  const closePopup = () => {
    setSelectedPost(null); // Reset the selected post
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/images/${id}`
      );
      setPosts(response.data.posts || []);
      if (response.data.profilePic) {
        const { contentType, imageData } = response.data.profilePic;
        setProfilePic(`data:${contentType};base64,${imageData}`);
        setPosts(response.data.posts);
        setUsername(response.data.userName);
        setfollowers_count(response.data.followersCount);
        setfollowing_count(response.data.followingCount);
        setfetchedbio(response.data.bio);
        console.log("hiiiiiiiiiii", response.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios.post(
        `http://localhost:3000/api/upload/profile-pic/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Profile picture updated!");
      fetchProfileData();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handlePostUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", postDescription);

    formData.append("audio", audioFile);

    console.log("summma ", audioFile);
    try {
      // Include the description in the post upload request
      await axios.post(`http://localhost:3000/api/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { description: postDescription }, // Send description in query parameters (or body if necessary)
      });
      alert("Post uploaded successfully!");
      setShowPopup(false);
      setPostDescription(""); // Reset description after upload
      fetchProfileData();
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const fetchProfileData2 = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${id}`);
      const { profile_bio, username } = response.data;
      setBio(profile_bio || []); // Safely handle missing bio
      setUsername(username);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // const handleBioUpdate = async () => {
  //   try {
  //     const updatedBio = newBio.split("\n"); // Convert text to array of lines
  //     const response = await axios.post(`http://localhost:3000/api/update-bio/${id}`, {
  //       bio: updatedBio,
  //     });
  //     setBio(response.data.profile_bio); // Update bio in state
  //     alert("Bio updated successfully!");
  //     setEditingBio(false); // Close editor
  //   } catch (error) {
  //     console.error("Error updating bio:", error);
  //   }
  // };

  const handleBioUpdate = async () => {
    console.log(newBio);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/update-bio/${id}`,
        { bio: newBio }
      );
      setBio(response.data.bio); // Update the bio in the UI
      alert("Bio updated successfully!");
      setShowEditBioPopup(false); // Close the popup
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/following/${id}`
      );
      console.log(response.data);
      setFollowingUsers(response.data);
      setShowFollowingPopup(true);
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/followers/${id}`
      );
      setFollowersUsers(response.data);
      setShowFollowersPopup(true);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  return (
    <div className="main">
      {/* Sidebar */}
      <div className="sidenav">
        <div className="logo_s">Instagram{postDescription}</div>
        <div className="navs">
          <ul>
            <li>
              <FontAwesomeIcon className="hicon" icon={faHouse} />
              Home
            </li>
            <li>
              <FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />
              Search
            </li>
            <li>
              <IoCompassOutline style={{ marginRight: "12px" }} size={25} />
              Explore
            </li>
            <li>
              <PiFilmStripFill style={{ marginRight: "12px" }} size={25} />
              Reels
            </li>
            <li>
              <BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25} />
              Messages
            </li>
            <li>
              <FontAwesomeIcon className="heart" icon={faRegularHeart} />
              Notifications
            </li>
            <li onClick={() => setShowPopup(true)}>
              <FontAwesomeIcon className="heart" icon={faSquarePlus} />
              Create
            </li>
            <li>
              <CgProfile style={{ marginRight: "12px" }} size={25} />
              Profile
            </li>
          </ul>
        </div>
        <div className="bottom_navs">
          <div className="threads">
            <FaThreads style={{ marginRight: "12px" }} size={25} />
            Threads
          </div>
          <div className="more">
            <HiBars3 style={{ marginRight: "15px" }} size={28} />
            More
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profileme">
        <div className="profile-header">
          <div
            className="profile-pic_me"
            onClick={() => document.getElementById("profilePicUpload").click()}
          >
            <img
              className="profile_pic"
              src={profilePic || pro_img}
              alt="Profile"
            />
          </div>
          <input
            type="file"
            id="profilePicUpload"
            style={{ display: "none" }}
            onChange={handleProfilePicUpload}
          />
          <div className="profile-info_p">
            <h2>{username}</h2>
            {/* <button>Edit Profile</button> */}
            <button
              style={{
                height: "40px",
                width: "90px",
                marginTop: "15px",
                backgroundColor: "grey",
              }}
              onClick={() => {
                setNewBio(bio); // Set the current bio in the textarea
                setShowEditBioPopup(true); // Show the popup
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
        {/* <div className="bio-section">
  {Array.isArray(fetchedbio) && fetchedbio.length > 0 ? (
    fetchedbio.map((line, index) => (
      <p key={index} className="bio-line">
        {line}
      </p>
    ))
  ) : (
    <p>No bio available</p>
  )}
</div> */}

        <div className="bio-section">
          {fetchedbio ? (
            // Check if fetchedbio is a string and split it, else map if it's already an array
            (typeof fetchedbio === "string"
              ? fetchedbio.split(",")
              : fetchedbio
            ).map((line, index) => (
              <p key={index} className="bio-line">
                {line.trim()}
              </p>
            ))
          ) : (
            <p>No bio available</p>
          )}
        </div>

        <div className="stats_p">
          <p>{posts.length} posts</p>
          <p onClick={fetchFollowers}>{follower_c} followers</p>
          {/* <p>{following_c} following</p> */}
          <p onClick={fetchFollowing}>{following_c} following</p>
        </div>

        <div className="posts_line"></div>
        <div className="posts_section_p">
          <p>
            <FontAwesomeIcon className="icon_m" icon={faFilm} />
            POSTS
          </p>
          <p className="saved_p">
            <PiFilmStripFill style={{ paddingRight: "5px" }} size={18} />
            <span className="saved_s">SAVED</span>
          </p>
          <p>
            <FontAwesomeIcon className="icon_m" icon={faIdBadge} />
            TAGGED
          </p>
        </div>

        <div className="content">
          {posts.length === 0 ? (
            <>
              <h3>Share Photos</h3>
              <button onClick={() => setShowPopup(true)}>
                Share your first photo
              </button>
            </>
          ) : (
            <div className="posts-gallery">
              {posts.map((post, index) => (
                <div key={index} className="post-item">
                  {/* Display the image */}
                  <img
                    src={`data:${post.contentType};base64,${post.imageData}`}
                    alt={`Post ${index + 1}`}
                    className="post-image"
                    onClick={() => handlePostClick(post)}
                  />

                  {/* Display the description */}

                  {/* {post.des && post.des.length > 0 ? (
            post.des.map((desc, descIndex) => (
              <p key={descIndex} className="post-description">{desc}</p>
            ))
          ) : (
            <p>No description available</p>
          )} */}
                  {/* <p>{post.likesCount}</p>
            <p>{post.createdAt}</p>
            <p>{post.commands}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <div className="des">{posts.map((post, index) => (
                <p key={index}> post.description</p>
              ))}</div> */}

      {showEditBioPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Bio</h3>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Write something about yourself..."
              rows={5}
              className="bio-textarea"
            />
            <div className="popup-buttons">
              <button onClick={handleBioUpdate}>Save</button>
              <button onClick={() => setShowEditBioPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showFollowersPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pop"
        >
          <div className="popup-content">
            <h3>Followers</h3>
            <div className="followers-list">
              {followersUsers.map((user, index) => (
                <div key={index} className="follower-item">
                  <img
                    src={user.profilePic || "/default-profile.png"}
                    alt={user.username}
                    className="profile-pic_following"
                  />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowFollowersPopup(false)}>Close</button>
          </div>
        </motion.div>
      )}

      {showFollowingPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="pop"
        >
          <div className="popup-content">
            <h3>Following</h3>
            <div className="following-list">
              {followingUsers.map((user, index) => (
                <div key={index} className="following-item">
                  <img
                    src={user.profilePic || "/default-profile.png"} // Use default if no image
                    alt={user.username}
                    className="profile-pic_following"
                  />
                  <p>{user.username}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowFollowingPopup(false)}>Close</button>
          </div>
        </motion.div>
      )}

      {selectedPost && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="popup-container"
        >
          <div className="popup-content2">
            <button onClick={closePopup} className="popup-close-btn">
              ✖
            </button>
            <div className="img_con_box2">
              {selectedPost.imageData && selectedPost.contentType && (
                <img
                  src={`data:${selectedPost.contentType};base64,${selectedPost.imageData}`}
                  alt="Selected Post"
                  className="popup-image"
                />
              )}
            </div>
            <div className="second_half">
              <div className="bootom_icons">
                <div className="popup-likes">
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="lc"
                  >
                    <FontAwesomeIcon
                      style={{
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                      icon={faRegularHeart}
                    />
                    <span style={{ padding: "9px" }}>
                      {selectedPost.likesCount}Likes
                    </span>
                  </div>
                  <LuMessageCircle size={25} />

                  <FontAwesomeIcon
                    style={{
                      position: "absolute",
                      left: "490px",
                      fontSize: "25px",
                    }}
                    icon={faBookmark}
                  />
                  <LuSend size={25} />
                </div>
                <p className="cmd_s">Add a command</p>
                <p className="popup-description">{selectedPost.description}</p>
              </div>
              <div className="cmds_listed">
                <h4 className="popup-title">Commands:</h4>
                <ul className="popup-commands">
                  {selectedPost.commands && selectedPost.commands.length > 0 ? (
                    selectedPost.commands.map((cmd, index) => (
                      <li key={index} className="popup-command-item">
                        {cmd}
                      </li>
                    ))
                  ) : (
                    <p className="popup-no-commands">No commands available</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showPopup && (
        <div className="popup-overlay_new">
          <div className="popup-container_new">
          <p onClick={() => navigate(`/upload/${id}`)} style={{backgroundColor:"blue" , padding:"10px" , width:"100px" , borderRadius:"10px" , marginLeft:"190px"}}>Create a Reel</p>
            <h3 className="popup-title_new">Create New Post</h3>

            <div className="file-upload-container_new">
              <div
                style={{ width: "0px", marginLeft: "190px" }}
                className="img_upcon"
              >
                {" "}
                <img className="img_up" src={img_upload}/>
              </div>
              <input
                type="file"
                onChange={handlePostUpload}
                className="popup-file-input_new"
              />
              <span className="file-upload-text_new">Select from computer</span>
            </div>

            <input
              type="text"
              placeholder="Add a description..."
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="popup-text-input_new"
            />

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
              required
              className="popup-audio-input_new"
            />

            <button
              onClick={() => setShowPopup(false)}
              className="popup-close-btn_new"
            >
              Close
            </button>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
