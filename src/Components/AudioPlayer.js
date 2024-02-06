
import React, { useState, useEffect } from 'react';

function AudioPlayer() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
 
  const[nowPlay,setNowPlay]=useState(false);
  const styles={
    
    backgroundColor: nowPlay ? 'green':'white',
  
};

  useEffect(() => {
    // Load playlist from localStorage if available
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
      const lastPlayedIndex = parseInt(localStorage.getItem('currentTrackIndex'), 10);
      setCurrentTrackIndex(lastPlayedIndex || 0);
    }
  }, []);

  useEffect(() => {
    // Save playlist and currentTrackIndex to localStorage
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('audio/')) {
        setPlaylist(prevPlaylist => [...prevPlaylist, file]);
      }
    }
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
    
    setNowPlay(true);
    
   
   
  };
 

  

 
  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  return (
    <div className='totalAudio'>
      <input type="file" accept="audio/*" onChange={handleFileChange} multiple className='input'/>
      <ul className='playlist'>
        {playlist.map((track, index) => (
          <li   key={index}>
            <button  onClick={() => handlePlay(index)}>{track.name}</button>
          </li>
        ))}
      </ul>
      {playlist.length > 0 && (
        <audio
          controls
          autoPlay
          onEnded={handleEnded} className='audio'
          src={URL.createObjectURL(playlist[currentTrackIndex])}
          
        />
        
      )}
      
    </div>
  );
}

export default AudioPlayer;
