import React from "react";
import axios from "axios";
import "./Message_P.css";
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
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pro_img from "../assets/insta_pro.jpg";

const Message_p = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { id, loginid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
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
        fetchMessages();
        fetchFollowing();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/profile_frds/${id}`);
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

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/messages/${id}/${loginid}`);
            const sortedMessages = response.data.messages.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            setMessages(sortedMessages);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post(`http://localhost:3000/api/message/${id}`, {
                loginid: loginid,
                content: newMessage,
            });
            setMessages([...messages, response.data.message]);
            window.location.reload();
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const fetchFollowing = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/following_m/${id}`);
            setFollowingUsers(response.data);
            setShowFollowingPopup(true);
        } catch (error) {
            console.error("Error fetching following users:", error);
        }
    };

    return (
        <div>
            <div className="sidenav">
                <div className="logo">Instagram{loginid}</div>
                <div className="navs">
                    <ul>
                        <li><FontAwesomeIcon className="hicon" icon={faHouse} />Home</li>
                        <li><FontAwesomeIcon className="heart" icon={faMagnifyingGlass} />Search</li>
                        <li><IoCompassOutline style={{ marginRight: "12px" }} size={25} />Explore</li>
                        <li><PiFilmStripFill style={{ marginRight: "12px" }} size={25} />Reels</li>
                        <li><BiMessageRoundedCheck style={{ marginRight: "5px" }} size={25} />Messages</li>
                        <li><FontAwesomeIcon className="heart" icon={faRegularHeart} />Notifications</li>
                        <li><FontAwesomeIcon className="heart" icon={faSquarePlus} />Create</li>
                        <li><CgProfile style={{ marginRight: "12px" }} size={25} />Profile</li>
                    </ul>
                </div>
                <div className="bottom_navs">
                    <div className="threads"><FaThreads style={{ marginRight: "12px" }} size={25} />Threads</div>
                    <div className="more"><HiBars3 style={{ marginRight: "15px" }} size={28} />More</div>
                </div>
            </div>

            <div className="second_container">
                <div className="popup-content_messagers">
                    <div style={{ position: "fixed" }} className="name_and_pro"></div>
                    <div className="following-list">
                        {followingUsers.map((user, index) => (
                            <div key={index} className="following-item">
                                <img
                                    src={user.profilePic || "/default-profile.png"}
                                    alt={user.username}
                                    className="profile-pic_following"
                                />
                                <Link className="name_of_f" to={`/message/${user.objid}/${loginid}`}>
                                    <p>{user.username}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="message-container_new">
                    <div className="profile_new1">
                        <div className="profile-header">
                            <div style={{ marginRight: "210px" }} className="profile-pic2_box">
                                <img className="profile_pic3" src={profilePic || pro_img} alt="Profile" />
                            </div>
                            <div className="profile-info_mess2">
                                <h2>{username}</h2>
                                <button style={{
                                    backgroundColor: "grey",
                                    width: "100px",
                                    padding: "10px",
                                    marginLeft: "30px"
                                }}>View profile</button>
                            </div>
                        </div>
                    </div>
                    <div className="messages-lst">
                        <div className="mes_box_con">
                            {isLoading ? (
                                <p>Loading messages...</p>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={index} className="con_mess">
                                        <div className={`message ${msg.senderId === Number(loginid) ? "received" : "sent"}`}>
                                            <span className="mess">{msg.content}</span>
                                        </div>
                                        <span className={`message ${msg.senderId === Number(loginid) ? "receivedt" : "sentt"}`}
                                            style={{ fontSize: "12px" }}>
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                        <form style={{ backgroundColor: "black", width: "50%", height: "40px" }}
                            className="message-input"
                            onSubmit={handleSendMessage}>
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
