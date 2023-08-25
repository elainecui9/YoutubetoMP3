import './App.css';
import React, {useState} from 'react';

const inputStyle = {
  margin: "15px",
  width: '400px',
  height: "35px",
  border: '4px solid coral'
};

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mp3DownloadLink, setMp3DownloadLink] = useState('');

  const handle = async () => {
    console.log('Button clicked');
    const response = await fetch('/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ youtubeUrl }),
    });

    const data = await response.json();
    setMp3DownloadLink(data.mp3DownloadLink);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Youtube to MP3 Converter</h1>
        <label className="App-input">
          Enter URL:
          <input type="text" value={youtubeUrl} style={inputStyle}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </label>
        <button type="button" onClick={handle}>
          Convert to MP3
        </button>
        {mp3DownloadLink && <a href={mp3DownloadLink}>Download MP3</a>}
      </header>
    </div>
  );

}

export default App;
