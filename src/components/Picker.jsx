import React, { useState } from 'react';

function Picker(props) {
  const [picks, setPicks] = useState([]);

  function handlePick(contestant) {
    // check if the contestant has been voted off
    if (contestant.votedOff === 1) {
      return;
    }
  
    const index = picks.findIndex(p => p.id === contestant.id);
    let newPicks;
    if (index === -1) {
      newPicks = [...picks, contestant];
    } else {
      newPicks = picks.filter(p => p.id !== contestant.id);
    }
    if (newPicks.length > 3) {
      newPicks.shift();
    }
    setPicks(newPicks);
    props.OnPick(newPicks);
  }
  
  

  return (
    <div className='lilbubble'>
      <h2>Pick 3 contestants:</h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6 xl:grid-cols-9">
        {props.contestants.map((contestant) => (
          <div
            key={contestant.id}
            className={
              picks.includes(contestant)
                ? 'picked'
                : 'pickreg'
            }
            onClick={() => handlePick(contestant)}
          >
            <div className="image-container">
              <img className="w-full h-auto" src={'/images/'+contestant.name + '.jpg'} alt={contestant.name} />
              {contestant.votedOff === 1 && <div className="overlay"></div>}
            </div>
            
            <p className="text-center">{contestant.name}</p>
          </div>
        ))}
      </div>
      {picks.length === 3 ? null : <p className="text-red-600">Pick {3 - picks.length} more contestants</p>}
    </div>
  );
}

export default Picker;
