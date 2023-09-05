import React from 'react';
import Meni from './Meni';
import StavkaModal from './StavkaModal';
import PorudzbinaForma  from './PorudzbinaForma';



function PrikazIzmenaStavke({stavkaIzmeni , showModal1, showModal2, stavkePorudzbine , obrisiStavku, poruci} ) {
  return (
  <div>
  <Meni></Meni>
  <StavkaModal   stavkaIzmeni={stavkaIzmeni} showModal1={showModal1}     ></StavkaModal> 
  <PorudzbinaForma stavkePorudzbine={stavkePorudzbine} showModal2={showModal2} obrisiStavku={obrisiStavku} poruci={poruci}  ></PorudzbinaForma>
   </div>
  )
}

export default PrikazIzmenaStavke