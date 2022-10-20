import { useState } from 'react';
import axios from 'axios';
import './jokes.css';

export const Jokes = () => {
  const [jokes, setJokes] = useState('');
  const [punchline, setPunchline] = useState('');
  const [loading, setLoading] = useState(false); // for Loading jokes
  const [error, setError] = useState(false);
  const [state, setState] = useState(false);
  const [punchlineToggle, setPunchlineToggle] = useState(false);

  const getJokesHandler = async () => {
    setLoading(true);
    setPunchlineToggle(false);
    try {
      const res = await axios.get(
        'https://karljoke.herokuapp.com/jokes/random'
      );
      if (res.status === 200) {
        setLoading(false);
        setError(false);
        setState(true);
        setJokes(res.data.setup);
        setPunchline(res.data.punchline);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  const punchlineHandler = () => {
    setPunchlineToggle(!punchlineToggle);
  };

  return (
    <>
      <div className='upper-text'>
        <div className='btn'>
          <button className='get-jokes-btn' onClick={getJokesHandler}>
            Get A New Random Joke
          </button>
        </div>
        <div className='link-text'>
          <a href='https://karljoke.herokuapp.com/' target='_blank'>
            View API Docs
          </a>
        </div>
      </div>

      {!loading && !error && state && (
        <>
          <div className='joke'>
            <p>{jokes}</p>
          </div>
          <div className='Punchline-btn'>
            <button onClick={punchlineHandler}>
              {punchlineToggle ? 'Hide Punchline' : 'Show Punchline'}
            </button>
          </div>
          {punchlineToggle && (
            <div className='Punchline-text'>
              <p>{punchline}</p>
            </div>
          )}
        </>
      )}
      {loading && (
        <div className='loading-text'>
          <p className='loading'> LOADING YOUR JOKE...</p>
        </div>
      )}
      {error && (
        <div className='loading-text'>
          <p className='error-text'>THERE WAS AN ERROR LOADING YOUR JOKE.</p>
        </div>
      )}
    </>
  );
};
