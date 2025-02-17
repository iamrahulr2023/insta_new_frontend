import React from 'react'
import Logo_page from './components/Logo_page'
import { Route ,Routes } from 'react-router-dom'
import Home from './components/Home'
import Sign_up from './components/Sign_up'
import Log_in from './components/Log_in'
import Profile from './components/Profile'
import { useState } from 'react'
import Profile_frds from './components/Profile_frds'
import Message_p from './components/Message_p'
import AudioUpload from './components/AudioUpload'
import Stories from './components/Stories'
import Reels from './components/Reels'
import Upload from './components/Upload'

const App = () => {
 const [id , setId] = useState();

  const Getid = (id)=>{
    setId(id);
  }

  return (
    <div>
  
  
   <Routes>
  <Route path="/" element={<Logo_page />} />
  <Route path="/home" element={<Home Getid={Getid} />} />
  <Route path="/sigin" element={<Sign_up />} /> 
  <Route path="/login" element={<Log_in />} />
  {/* <Route path="/profile" element={<Profile id={id}/>} /> */}
  <Route path="/profile/:id" element={<Profile />} />
  <Route path="/profile_frds/:id/:loginid" element={<Profile_frds />} />
  <Route path="/message/:id/:loginid" element={<Message_p />} />  
  <Route path="/k" element={<AudioUpload />} />
  <Route path="/stories/:id" element={<Stories />} />
  <Route path="/reels" element={<Reels />} />
  <Route path="/upload/:id" element={<Upload />} />

</Routes> 
    </div>
  )
}

export default App