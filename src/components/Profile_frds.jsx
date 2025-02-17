import React from "react";
import axios from "axios";
import "./Profile_frds.css";
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
import pro_img from "../assets/insta_pro.jpg";

const Profile_frds = () => {
  const { id, loginid } = useParams();
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [follower_c, setfollowers_count] = useState(0);
  const [following_c, setfollowing_count] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerUsers, setFollowerUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showFollowersPopup, setShowFollowersPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);

  useEffect(() => {
    fetchProfileData();
    checkIfFollowing();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `https://insta-server-3e4p.onrender.com/api/profile_frds/${id}`
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

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `https://insta-server-3e4p.onrender.com/api/follow`,
        {
          followerId: loginid,
          followingId: id,
        }
      );
      setIsFollowing(true);
      setfollowers_count((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        `https://insta-server-3e4p.onrender.com/api/unfollow`,
        {
          followerId: loginid,
          followingId: id,
        }
      );
      setIsFollowing(false);
      setfollowers_count((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const checkIfFollowing = async () => {
    try {
      const response = await axios.get(
        `https://insta-server-3e4p.onrender.com/api/check-follow/${loginid}/${id}`
      );
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `https://insta-server-3e4p.onrender.com/api/followers/${id}`
      );
      setFollowerUsers(response.data);
      setShowFollowersPopup(true);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `https://insta-server-3e4p.onrender.com/api/following/${id}`
      );
      setFollowingUsers(response.data);
      setShowFollowingPopup(true);
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  };

  return (
    <div>
      <div className="sidenav">
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

      <div className="profile">
        <div className="profile-header">
          <div className="profile-pic">
            <img
              className="profile_pic_me_f"
              src={profilePic || pro_img}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{username}</h2>
            {isFollowing ? (
              <button onClick={handleUnfollow}>Unfollow</button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )}
            <Link to={`/message/${id}/${loginid}`}>
              <button>Message</button>
            </Link>
          </div>
        </div>

        <div className="stats_pf">
          <p>{posts.length} posts</p>
          <p>{follower_c} followers</p>
          <p>{following_c} following</p>
        </div>

        <div className="posts_line_p"></div>

        <div className="posts_section">
          <p>
            <span className="icon_m">🎥</span>POSTS
          </p>
          <p style={{paddingLeft:"19px"}} className="saved_p">
            <span className="icon_m">🎞️</span>
            <span className="savd_s">SAVED</span>
          </p>
          <p>
            <span className="icon_m">📛</span>TAGGED
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
                <img
                  key={index}
                  src={`data:${post.contentType};base64,${post.imageData}`}
                  alt={`Post ${index + 1}`}
                  className="post-image"
                />
              ))}
            </div>
          )}
        </div>

        {/* <div className="content">
    <h3>Share Photos</h3>
    <button>Share your first photo</button>
  </div> */}
      </div>
    </div>
  );
};

export default Profile_frds;
