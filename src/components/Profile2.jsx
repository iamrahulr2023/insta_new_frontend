
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { PiFilmStripFill } from "react-icons/pi";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoCompassOutline } from "react-icons/io5";
import { FaThreads } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { faIdBadge, faFilm } from "@fortawesome/free-solid-svg-icons";
import pro_img from "C:/Users/Home/Desktop/InPlant_training_2025/backend_pratise/server/Inten_project/insta/src/assets/insta_default_img.webp"


const Profile = () => {
  const { id } = useParams(); 
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username , setUsername]  = useState("");
  const [follower_c , setfollowers_count] = useState(0);
  const [following_c , setfollowing_count]  = useState(0);
  const [postDescription, setPostDescription] = useState("");
  const [showEditBioPopup, setShowEditBioPopup] = useState(false); // To show/hide the popup
const [bio, setBio] = useState(""); // To store the current bio
const [newBio, setNewBio] = useState("");
const [fetchedbio , setfetchedbio] = useState("");
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


  const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/images/${id}`);
        setPosts(response.data.posts || []);
        if (response.data.profilePic) {
          const { contentType, imageData } = response.data.profilePic;
          setProfilePic(`data:${contentType};base64,${imageData}`);
          setPosts(response.data.posts);
          setUsername(response.data.user_name);
          setfollowers_count(response.data.followers);
          setfollowing_count(response.data.following);
         setfetchedbio(response.data.bio);
        console.log("hiiiiiiiiiii",response.data.posts);
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
      await axios.post(`http://localhost:3000/api/upload/profile-pic/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    try {
      // Include the description in the post upload request
      await axios.post(`http://localhost:3000/api/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { description: postDescription } // Send description in query parameters (or body if necessary)
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

    console.log(newBio)
    try {
      const response = await axios.post(`http://localhost:3000/api/update-bio/${id}`, { bio: newBio });
      setBio(response.data.bio); // Update the bio in the UI
      alert("Bio updated successfully!");
      setShowEditBioPopup(false); // Close the popup
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };
  

  return (
    <div className="main">
      {/* Sidebar */}
      <div className="sidenav">
        <div className="logo_s">Instagram{postDescription}</div>
        <div className="navs">
          <ul>
            <li><FontAwesomeIcon className="hicon" icon={faHouse}/>Home</li>
            <li><FontAwesomeIcon className="heart" icon={faMagnifyingGlass}/>Search</li>
            <li><IoCompassOutline style={{ marginRight: "12px" }} size={25}/>Explore</li>
            <li><PiFilmStripFill style={{ marginRight: "12px" }} size={25}/>Reels</li>
            <li><BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25}/>Messages</li>
            <li><FontAwesomeIcon className="heart" icon={faRegularHeart}/>Notifications</li>
            <li onClick={() => setShowPopup(true)}><FontAwesomeIcon className="heart" icon={faSquarePlus}/>Create</li>
            <li><CgProfile style={{ marginRight: "12px" }} size={25}/>Profile</li>
          </ul>
        </div>
        <div className="bottom_navs">
          <div className="threads"><FaThreads style={{ marginRight: "12px" }} size={25}/>Threads</div>
          <div className="more"><HiBars3 style={{ marginRight: "15px" }} size={28}/>More</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile">
        <div className="profile-header">
          <div className="profile-pic" onClick={() => document.getElementById("profilePicUpload").click()}>
            <img className="profile_pic" src={profilePic || pro_img} alt="Profile" />
          </div>
          <input type="file" id="profilePicUpload" style={{ display: "none" }} onChange={handleProfilePicUpload} />
          <div className="profile-info">
            <h2>{username}</h2>
            {/* <button>Edit Profile</button> */}
            <button onClick={() => {
  setNewBio(bio); // Set the current bio in the textarea
  setShowEditBioPopup(true); // Show the popup
}}>
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
    (typeof fetchedbio === 'string' ? fetchedbio.split(',') : fetchedbio).map((line, index) => (
      <p key={index} className="bio-line">
        {line.trim()} 
      </p>
    ))
  ) : (
    <p>No bio available</p>
  )}
</div>

        <div className="stats">
          <p>{posts.length} posts</p>
          <p>{follower_c} followers</p>
          <p>{following_c} following</p>
        </div>

        <div className="posts_line"></div>
        <div className="posts_section">
          <p><FontAwesomeIcon className="icon_m" icon={faFilm}/>POSTS</p>
          <p className="saved_p"><PiFilmStripFill style={{ paddingRight: "5px" }} size={18}/><span className="saved_s">SAVED</span></p>
          <p><FontAwesomeIcon className="icon_m" icon={faIdBadge}/>TAGGED</p>
        </div>

       <div className="content">
  {posts.length === 0 ? (
    <>
      <h3>Share Photos</h3>
      <button onClick={() => setShowPopup(true)}>Share your first photo</button>
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


      {/* Popup for creating posts */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Create Post</h3>
            <input type="file" onChange={handlePostUpload} />
            <input 
              type="text" 
              placeholder="Add a description..." 
              value={postDescription} 
              onChange={(e) => setPostDescription(e.target.value)}  // Handle description change
            />
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { PiFilmStripFill } from "react-icons/pi";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoCompassOutline } from "react-icons/io5";
import { FaThreads } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { faIdBadge, faFilm } from "@fortawesome/free-solid-svg-icons";
import pro_img from "C:/Users/Home/Desktop/InPlant_training_2025/backend_pratise/server/Inten_project/insta/src/assets/insta_default_img.webp"


const Profile = () => {
  const { id } = useParams(); 
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username , setUsername]  = useState("");
  const [follower_c , setfollowers_count] = useState(0);
  const [following_c , setfollowing_count]  = useState(0);
  const [postDescription, setPostDescription] = useState("");
  const [showEditBioPopup, setShowEditBioPopup] = useState(false); // To show/hide the popup
const [bio, setBio] = useState(""); // To store the current bio
const [newBio, setNewBio] = useState("");
const [fetchedbio , setfetchedbio] = useState("");
const [selectedPost, setSelectedPost] = useState(null); // State to hold selected post data

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
    setSelectedPost(post); // Set selected post data
  };
  

  const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/images/${id}`);
        setPosts(response.data.posts || []);
        if (response.data.profilePic) {
          const { contentType, imageData } = response.data.profilePic;
          setProfilePic(`data:${contentType};base64,${imageData}`);
          setPosts(response.data.posts);
          setUsername(response.data.user_name);
          setfollowers_count(response.data.followers);
          setfollowing_count(response.data.following);
         setfetchedbio(response.data.bio);
        console.log("hiiiiiiiiiii",response.data.posts);
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
      await axios.post(`http://localhost:3000/api/upload/profile-pic/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated!");
      fetchProfileData();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };


  // const handlePostUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   formData.append("description", postDescription);
  //   try {
  //     // Include the description in the post upload request
  //     await axios.post(`http://localhost:3000/api/upload/${id}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       params: { description: postDescription } // Send description in query parameters (or body if necessary)
  //     });
  //     alert("Post uploaded successfully!");
  //     setShowPopup(false);
  //     setPostDescription(""); // Reset description after upload
  //     fetchProfileData();
  //   } catch (error) {
  //     console.error("Error uploading post:", error);
  //   }
  // };

  const handlePostUpload = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("description", postDescription);
    formData.append("audio", audioFile); // Append audio to form data
  
    try {
      await axios.post(`http://localhost:3000/api/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post uploaded successfully!");
      setPostDescription(""); // Clear description after upload
      setImageFile(null); // Clear the image file
      setAudioFile(null); // Clear the audio file
      fetchProfileData(); // Fetch the updated profile data
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

    console.log(newBio)
    try {
      const response = await axios.post(`http://localhost:3000/api/update-bio/${id}`, { bio: newBio });
      setBio(response.data.bio); // Update the bio in the UI
      alert("Bio updated successfully!");
      setShowEditBioPopup(false); // Close the popup
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };
  
  

  return (
    <div className="main">
      {/* Sidebar */}
      <div className="sidenav">
        <div className="logo_s">Instagram{postDescription}</div>
        <div className="navs">
          <ul>
            <li><FontAwesomeIcon className="hicon" icon={faHouse}/>Home</li>
            <li><FontAwesomeIcon className="heart" icon={faMagnifyingGlass}/>Search</li>
            <li><IoCompassOutline style={{ marginRight: "12px" }} size={25}/>Explore</li>
            <li><PiFilmStripFill style={{ marginRight: "12px" }} size={25}/>Reels</li>
            <li><BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25}/>Messages</li>
            <li><FontAwesomeIcon className="heart" icon={faRegularHeart}/>Notifications</li>
            <li onClick={() => setShowPopup(true)}><FontAwesomeIcon className="heart" icon={faSquarePlus}/>Create</li>
            <li><CgProfile style={{ marginRight: "12px" }} size={25}/>Profile</li>
          </ul>
        </div>
        <div className="bottom_navs">
          <div className="threads"><FaThreads style={{ marginRight: "12px" }} size={25}/>Threads</div>
          <div className="more"><HiBars3 style={{ marginRight: "15px" }} size={28}/>More</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile">
        <div className="profile-header">
          <div className="profile-pic" onClick={() => document.getElementById("profilePicUpload").click()}>
            <img className="profile_pic" src={profilePic || pro_img} alt="Profile" />
          </div>
          <input type="file" id="profilePicUpload" style={{ display: "none" }} onChange={handleProfilePicUpload} />
          <div className="profile-info">
            <h2>{username}</h2>
            {/* <button>Edit Profile</button> */}
            <button onClick={() => {
  setNewBio(bio); // Set the current bio in the textarea
  setShowEditBioPopup(true); // Show the popup
}}>
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
    (typeof fetchedbio === 'string' ? fetchedbio.split(',') : fetchedbio).map((line, index) => (
      <p key={index} className="bio-line">
        {line.trim()} 
      </p>
    ))
  ) : (
    <p>No bio available</p>
  )}
</div>

        <div className="stats">
          <p>{posts.length} posts</p>
          <p>{follower_c} followers</p>
          <p>{following_c} following</p>
        </div>

        <div className="posts_line"></div>
        <div className="posts_section">
          <p><FontAwesomeIcon className="icon_m" icon={faFilm}/>POSTS</p>
          <p className="saved_p"><PiFilmStripFill style={{ paddingRight: "5px" }} size={18}/><span className="saved_s">SAVED</span></p>
          <p><FontAwesomeIcon className="icon_m" icon={faIdBadge}/>TAGGED</p>
        </div>

        <div className="content">
  {posts.length === 0 ? (
    <>
      <h3>Share Photos</h3>
      <button onClick={() => setShowPopup(true)}>Share your first photo</button>
    </>
  ) : (
    <div className="posts-gallery">
      {posts.map((post, index) => (
        <div key={index} className="post-item" onClick={() => handlePostClick(post)}>
          <img
            src={`data:${post.contentType};base64,${post.imageData}`}
            alt={`Post ${index + 1}`}
            className="post-image"
          />
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

{selectedPost && (
  <div className="popup">
    <div className="popup-content">
      <h3>Post Details</h3>
      <div className="post-detail">
        {/* Display Post Image */}
        <img
          src={`data:${selectedPost.contentType};base64,${selectedPost.imageData}`}
          alt="Post"
          className="post-detail-image"
        />
        
        {/* Display Like Count */}
        <p><strong>Likes: </strong>{selectedPost.likesCount}</p>

        {/* Display Description */}
        <div>
          <strong>Description:</strong>
          {selectedPost?.description && selectedPost.description.length > 0 ? (
  selectedPost.description.map((desc, index) => (
    <p key={index}>{desc}</p>
  ))
) : (
  <p>No description available</p>
)}

        </div>

        {/* Display Created At */}
        <p><strong>Created At: </strong>{new Date(selectedPost.createdAt).toLocaleString()}</p>

        {/* Display Commands */}
        <div>
          <strong>Commands:</strong>
          {selectedPost.commands.length > 0 ? (
            selectedPost.commands.map((command, index) => (
              <p key={index}>{command}</p>
            ))
          ) : (
            <p>No commands</p>
          )}
        </div>

        {/* Close Button */}
        <button onClick={() => setSelectedPost(null)}>Close</button>
      </div>
    </div>
  </div>
)}


      {/* Popup for creating posts */}
      {/* Popup for creating posts */}
{showPopup && (
  <div className="popup">
    <div className="popup-content">
      <h3>Create Post</h3>
      
      <form onSubmit={handlePostUpload}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Audio File:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </div>

        <div>
          <label>Image File:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Upload Post</button>
      </form>

      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Profile;
