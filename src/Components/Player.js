import React, { useState, useEffect } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const savedTrackIndex = localStorage.getItem('currentTrackIndex');
    if (savedTrackIndex !== null) {
      setCurrentTrackIndex(parseInt(savedTrackIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [currentTrackIndex]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newPlaylist = [...playlist];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        newPlaylist.push({ name: file.name, url: event.target.result });
        setPlaylist(newPlaylist);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0); // Loop back to the first track
    }
  };

  return (
    <div className='totalAudio'>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} className='input' multiple />
      <div className='playlist'>
        {playlist.map((track, index) => (
          <div className='eachItem' key={index}>
            
            <button onClick={() => handlePlay(index)}>{track.name}</button>
            {currentTrackIndex === index && <span className='now playing'> Playing Now</span>}
            
          </div>
          
        ))}
      </div>
      {playlist.length > 0 && (
        <div>
          <p>Now Playing: {playlist[currentTrackIndex].name}</p>
          <audio  className='audio' controls autoPlay src={playlist[currentTrackIndex].url} onEnded={handleEnded} />
        </div>
      )}
    </div>
  );
}

export default App;
