import React from 'react';
import Meni from './Meni';
import StavkaModal from './StavkaModal';



function PrikazIzmenaStavke({stavkaIzmeni , showModal1} ) {
  return (
  <div>
  <Meni></Meni>
  <StavkaModal   stavkaIzmeni={stavkaIzmeni} showModal1={showModal1}     ></StavkaModal>  </div>
  )
}

export default PrikazIzmenaStavke