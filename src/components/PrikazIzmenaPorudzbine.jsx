import React from 'react';
import Naplata from './Naplata';
import Porudzbine from './Porudzbine';



function PrikazIzmenaPorudzbine({showModal3 , porudzbinaIzmeni} ) {
  return (
  <div>
  <Porudzbine></Porudzbine>
  <Naplata   porudzbinaIzmeni={porudzbinaIzmeni} showModal3={showModal3}    ></Naplata> 
   </div>
  )
}

export default PrikazIzmenaPorudzbine