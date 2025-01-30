// import React, { useState } from "react";
// import axios from "axios";

// const AudioUpload = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [audioList, setAudioList] = useState([]);
//   const [selectedAudio, setSelectedAudio] = useState(null);

//   // Handle file upload
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("audio", audioFile);
//     formData.append("title", title);
  
//     try {
//       const response = await axios.post("http://localhost:3000/upload-audio", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       // Check response for the ID
//       if (response.data.id) {
//         alert(response.data.message);
//         const newAudio = { id: response.data.id, title };
//         setAudioList((prevList) => [...prevList, newAudio]);
//       } else {
//         alert("Error: Missing ID in response");
//       }
  
//       setTitle("");
//       setAudioFile(null);
//     } catch (err) {
//       console.error(err);
//       alert("Error uploading audio");
//     }
//   };
  

//   // Play audio

//  const playAudio = async (id) => {
//   if (!id) {
//     alert("Invalid audio ID");
//     return;
//   }

//   try {
//     const response = await axios.get(`http://localhost:3000/audio/${id}`, {
//       responseType: 'blob', // Expect a binary response
//     });

//     const audioUrl = URL.createObjectURL(response.data); // Convert blob to URL
//     setSelectedAudio(audioUrl);
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     alert("Error fetching audio");
//   }
// };


//   return (
//     <div>
//       <h1>Audio Uploader and Player</h1>

//       {/* Audio Upload Form */}
//       <form onSubmit={handleUpload}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Audio File:</label>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setAudioFile(e.target.files[0])}
//             required
//           />
//         </div>
//         <button type="submit">Upload Audio</button>
//       </form>

//       {/* Audio Player */}
//       <h2>Audio List</h2>
//       <ul>
//         {audioList.map((audio, index) => (
//           <li key={index}>
//             {audio.title}{" "}
//             <button onClick={() => playAudio(audio.id)}>Play</button>
//           </li>
//         ))}
//       </ul>

//       {/* Selected Audio Player */}
//       {selectedAudio && (
//         <audio controls src={selectedAudio}></audio>
//       )}
//     </div>
//   );
// };

// export default AudioUpload;



import React, { useState } from "react";
import axios from "axios";

const AudioUpload = () => {
    
  const [audioFile, setAudioFile] = useState(null);
  const [title, setTitle] = useState("");
  const [audioList, setAudioList] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);

  // Handle audio upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("title", title);
  
    try {
      const response = await axios.post("http://localhost:3000/upload-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Check if the response contains the ID
      if (response.data.id) {
        alert(response.data.message); // Show success message
        const newAudio = { id: response.data.id, title }; // Store the ID and title
        setAudioList((prevList) => [...prevList, newAudio]); // Add to the audio list
      } else {
        alert("Error: Missing ID in response");
      }
  
      setTitle("");
      setAudioFile(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading audio");
    }
  };
  

  // Play audio
  const playAudio = async (id) => {
    if (!id) {
      alert("Invalid audio ID");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/audio/${id}`, {
        responseType: "blob", // Expect binary data
      });

      const audioUrl = URL.createObjectURL(response.data); // Convert blob to URL
      setSelectedAudio(audioUrl);
    } catch (err) {
      console.error(err);
      alert("Error fetching audio");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Audio Uploader and Player</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Audio File:</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Upload Audio
        </button>
      </form>

      {/* Audio List */}
      <h2>Audio List</h2>
      <ul>
        {audioList.map((audio) => (
          <li key={audio.id}>
            {audio.title}{" "}
            <button onClick={() => playAudio(audio.id)} style={{ marginLeft: "10px" }}>
              Play
            </button>
          </li>
        ))}
      </ul>

      {/* Audio Player */}
      {selectedAudio && (
        <div style={{ marginTop: "20px" }}>
          <h3>Playing:</h3>
          <audio controls src={selectedAudio}></audio>
        </div>
      )}
    </div>
  );
};


export default AudioUpload;
