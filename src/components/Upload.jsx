import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";

const Upload = () => { 
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPopupReels , setshowPopupReels] = useState(true);
      const [selectedFile, setSelectedFile] = useState(null);
      const [error, setError] = useState(null);
        const [media, setMedia] = useState([]);
          const [loading, setLoading] = useState(false);
    
      const handleFileSelect2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setError('File size too large. Please select a file under 50MB.');
        event.target.value = null;
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please select an image (JPEG, PNG, GIF) or video (MP4, WEBM, MOV).');
        event.target.value = null;
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

    const handleUploadReels = async () => {
   
        if (!selectedFile) {
          setError('Please select a file first.');
          return;
        }
    
        const formData = new FormData();
        formData.append('media', selectedFile);
    
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(`http://localhost:3000/api/upload_reel/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
          setMedia((prevMedia) => [response.data.media, ...prevMedia]);
          setSelectedFile(null);
          setshowPopupReels(false);
          
          document.querySelector('input[type="file"]').value = null;
          navigate('/reels');
        } catch (error) {
          let errorMessage = 'Error uploading file. Please try again.';
          if (error.response) errorMessage = error.response.data.message || errorMessage;
          else if (error.request) errorMessage = 'Server not responding. Please try again later.';
          setError(errorMessage);
          console.error('Upload error:', error);
        } finally {
          setLoading(false);
        }
      };
    
    
      const Handlepopups = ()=>{
    setShowPopup(false);
    setshowPopupReels(true);
      }
    



  return (
    <div>Upload

 {showPopupReels && (
<main>
        <div style={{backgroundColor:"black" , flexDirection:"row" , gap:"50px"} } className="popup-overlay_new">
          <input type="file" accept="image/*, video/mp4, video/webm, video/quicktime" onChange={handleFileSelect2} className="file-input" />
          <button onClick={handleUploadReels} disabled={loading || !selectedFile} className="upload-button">
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <div className="error-message">{error}</div>}
          <button onClick={()=>setshowPopupReels(false)}>close</button>
        </div>
      </main>

)}
    </div>
  )
}

export default Upload
