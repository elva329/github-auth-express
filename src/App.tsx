import { useEffect, useState } from 'react';
import type { GithubUser } from './types/types';
import './index.css';

const App = () => {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState<GithubUser>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if (codeParam && !localStorage.getItem('accessToken')) {
      const getAccessToken = async () => {
        try {
          const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`);
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setRerender((prev) => !prev);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      };
      getAccessToken();
    }

    if (localStorage.getItem('accessToken')) {
      getUserData();
    }
  }, [rerender]);

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getUserData', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      const data = await response.json();
      console.log('userData', data)
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleGithubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
    );
  };

  return (
    <>
      {localStorage.getItem('accessToken') ? (
        <div className="absolute top-10 right-6 flex items-center gap-1">
          <img src={userData?.avatar_url} alt="Avatar" className='w-6 h-6 rounded-full' />
          <h1 className='text-sm font-medium'>{userData?.login || 'User'}</h1>
          <div
            onClick={() => {
              localStorage.removeItem('accessToken');
              setRerender((prev) => !prev);
            }}
            className='underline text-blue-500 text-sm ml-2 cursor-pointer font-bold'
          >
            Log out
          </div>
        </div>
      ) : (
        <div className="text-red-400" onClick={handleGithubLogin}>
          Login with github
        </div>
      )}
    </>
  );
};

export default App;