import { useEffect, useState } from 'react';
import config from './config';

function Tribes() {
  const colors = ['#b71c1c', '#880E4F', '#6A1B9A', '#4527A0', '#283593', 
  '#1565C0', '#006064', '#004D40', '#2E7D32', '#558B2F',
  '#9E9D24', '#FBC02D', '#FFA000', '#E64A19', '#D84315',
  '#4E342E', '#616161', '#455A64', '#00838F', '#C62828']


  const [tribes, setTribes] = useState([]);
  const [listview, setListView] = useState(false);
  const [colorobj, setColorobj] = useState(colors);

  useEffect(() => {
    fetch(`${config.serverName}/tribes/`)
      .then(response => response.json())
      .then(data => {
        setTribes(data)
        let curcolor = 0
        let newobj = {}
        data.forEach(element => {

          if (!(element.pick1 in newobj)) {
            newobj[element.pick1] = colors[curcolor]
            curcolor++
          }
          if (!(element.pick2 in newobj)) {
            newobj[element.pick2] = colors[curcolor]
            curcolor++
          }
          if (!(element.pick3 in newobj)) {
            newobj[element.pick3] = colors[curcolor]
            curcolor++
          }

        }

        );
        setColorobj(newobj)
        console.log('gg:')
        console.log(newobj)
      })
      .catch(error => console.error(error));
  }, []);

  const toggleListView = () => {
    setListView(!listview);
  };

  return (
    <div className='bubblebox'>
      <h2 className='sofaheader'>
        Tribes:{' '}
        <button onClick={toggleListView} className='bg-slate-300 rounded hover:bg-slate-400'>
          {listview ? 'Show Tribe Photo' : 'Show Colorful List'}
        </button>
      </h2>

      {listview ? (
        <div className='bg-slate-400 rounded-sm p-4 grid grid-cols-1'>
          {tribes.map((tribe, index) => (

            <div className='grid grid-cols-5'>
              <div className='col-span-2'>{tribe.tribename}</div>
              
                {[tribe.pick1, tribe.pick2, tribe.pick3].map((item, index) => {
                  return (<div className='p-2 font-semibold' key={item}> <font color={colorobj[item]}> {item}  </font></div>)
                })}
            

            </div>

          ))}
        </div>
      ) : (
        <ul>
          {tribes.map((tribe, index) => (
            <li key={index} className='lilbubble max-h-50'>
              <div className='grid grid-cols-1 md:grid-cols-2 inline-block align-middle'>
                <div>
                  <strong>{tribe.tribename}</strong> - {tribe.catchphrase}
                  <br />
                  [{tribe.pick1}, {tribe.pick2}, {tribe.pick3}] <br />
                </div>

                <div className='grid grid-cols-3 border-yellow-300 border-4 p-1'>
                  <div className='image-container'>
                    <img
                      className='w-full h-auto'
                      src={'/images/' + tribe.pick1 + '.jpg'}
                      alt={tribe.pick1}
                    />
                    {tribe.pick1_votedOff === 1 && (
                      <div className='overlay'></div>
                    )}
                  </div>

                  <div className='image-container'>
                    <img
                      className='w-full h-auto'
                      src={'/images/' + tribe.pick2 + '.jpg'}
                      alt={tribe.pick2}
                    />
                    {tribe.pick2_votedOff === 1 && (
                      <div className='overlay'></div>
                    )}
                  </div>

                  <div className='image-container'>
                    <img
                      className='w-full h-auto'
                      src={'/images/' + tribe.pick3 + '.jpg'}
                      alt={tribe.pick3}
                    />
                    {tribe.pick3_votedOff === 1 && (
                      <div className='overlay'></div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tribes;
