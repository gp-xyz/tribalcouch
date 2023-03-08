import { useEffect, useState } from 'react';
import config from './config';

function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`${config.serverName}/stats`)
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='bubblebox'>
      {/* <h2>Stats:</h2>
      <ul>
        {stats.map((person, index) => (
          <li key={index} className='lilbubble'>
            <strong>{person.name}</strong><br />
            Count: {person.count}<br />
            Voted Off: {person.votedOff ? 'Yes' : 'No'}
          </li>
        ))}
      </ul> */}
      <h1 className='sofaheader'>COMING SOON</h1>
    </div>
  );
}

export default Stats;
