import { useState } from 'react';
import './App.css';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  function Display() {

    const [username, setUsername] = useState("");

    return (
      <>
        <h2>Please enter the username below : </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          type="button"
          onClick={() => Search(username)}
        >
          Submit
        </button>
      </>
    );
  }

  function SuccessPage() {
    return (
      <>
        <h2>Found user succesfully, here are the details :</h2>
        <p>Login name : {user.login}</p>
        <p>Login ID : {user.id}</p>
        <p>Name : {user.name}</p>
      </>
    );
  }

  function FailedPage() {
    return (
      <>
        <p>User not found.</p>
      </>
    );
  }

  function LoadingPage() {
    return (
      <>
        <p>Please wait, fetching the details.</p>
      </>
    );
  }

  async function Search(username) {

    setLoading(true);
    setFailed(false);
    setSuccess(false);

    console.log("search started")
    const data = await fetch(
      `https://api.github.com/users/${username}`
    );

    setLoading(false);
    console.log(data.ok)
    if (!data.ok) {

      setFailed(true);
      setSuccess(false);

    } else {
      const userData = await data.json();
      setUser(userData);
      
      setSuccess(true);
      setFailed(false);

      
    }
  }

  return (
    <>
      <h1>Github User Search System</h1>
      <h1></h1>
      <Display />
      <h1></h1>

      {loading && <LoadingPage />}

      {failed && <FailedPage />}

      {success && <SuccessPage />}
    </>
  );
}

export default App;