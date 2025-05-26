import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import SignUp from './signUp';
import Login from './login';

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [step, setStep] = useState("login"); 
  const searchLyrics = () => {
    if (!artist || !song) return;
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then(res => setLyrics(res.data.lyrics))
      .catch(() => setLyrics("Lyrics not found."));
  };

  if (step === "signup") {
    return <SignUp onSignUp={() => setStep("login")} />;
  }

  if (step === "login") {
    return <Login onLogin={() => setStep("app")} />;
  }

  // Main app (lyrics search) after login
  return (
    <div className="App">
      <h1>Lyrics Finder</h1>
      <input
        className="inp"
        type="text"
        placeholder="Artist name"
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => setSong(e.target.value)}
      />
      <button className="btn" onClick={searchLyrics}>Search</button>
      <hr />
      <pre>{lyrics}</pre>
    </div>
  );
}

export default App;
