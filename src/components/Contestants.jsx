import { useEffect, useState } from 'react';
import config from './config';
function Contestants() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`${config.serverName}/stats`)
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='bubblebox'>
      <h2 className=''>Contestants:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {stats.map((person, index) => (
          <div key={index} className='lilbubble'>
            <div className="image-container">
              <img className="w-full h-auto" src={'/images/'+person.name + '.jpg'} alt={person.name} />
              {person.votedOff === 1 && <div className="overlay"></div>}
            </div>
            <div className='grid grid-cols-1'>
              <div className='font-bold'>{person.name}: {person.count} selection{person.count > 1 && <text>s</text>}</div>
              <div>
  {person.tribes.length > 0 ? (
    person.tribes.map((item) => <div key={item} className='text-xs'>{item}</div>)
  ) : (
    <div />
  )}
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contestants;
