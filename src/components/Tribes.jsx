import { useEffect, useState } from 'react';
import config from './config';
function Tribes() {
  const [tribes, setTribes] = useState([]);

  useEffect(() => {
    fetch(`${config.serverName}/tribes/`)
      .then(response => response.json())
      .then(data => setTribes(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='bubblebox'>
      <h2 className='sofaheader'>Tribes:</h2>
      <ul>
        {tribes.map((tribe, index) => (
          <li key={index} className='lilbubble max-h-50'>
            <div className='grid grid-cols-1 md:grid-cols-2 inline-block align-middle'>

              <div className=''>
                <strong>{tribe.tribename}</strong> - {tribe.catchphrase}<br />
                [{tribe.pick1}, {tribe.pick2}, {tribe.pick3}] <br />
                
              </div>

              <div className='grid grid-cols-3 border-yellow-300 border-4 p-1'>

              <div className="image-container">
              <img className="w-full h-auto" src={'/images/'+tribe.pick1 + '.jpg'} alt={tribe.pick1} />
              {tribe.pick1_votedOff === 1 && <div className="overlay"></div>}
            </div>

            <div className="image-container">
              <img className="w-full h-auto" src={'/images/'+tribe.pick2 + '.jpg'} alt={tribe.pick2} />
              {tribe.pick2_votedOff === 1 && <div className="overlay"></div>}
            </div>

            <div className="image-container">
              <img className="w-full h-auto" src={'/images/'+tribe.pick3 + '.jpg'} alt={tribe.pick3} />
              {tribe.pick3_votedOff === 1 && <div className="overlay"></div>}
            </div>
            
                
        
                
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tribes;
