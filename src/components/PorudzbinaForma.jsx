import React from 'react';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StavkaPorudzbine  from './StavkaPorudzbine';

import {

  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';



function PorudzbinaForma({stavkePorudzbine , showModal2 , obrisiStavku, poruci} ) {
 let navigate=useNavigate();

 

  return (
    
   
    <MDBContainer fluid  className={showModal2}>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>
        <div className="stavkePor">
         
          
         { !Array.isArray(stavkePorudzbine) ? <p>Trenutno nema stavki!</p> : stavkePorudzbine.map((stavka) => (
       <StavkaPorudzbine stavka={stavka} obrisiStavku={obrisiStavku} />
       
     ))}
        <MDBRow className='g-0'>
        <button  type='submit' size='lg' onClick={poruci}>Poruci</button>
          </MDBRow>
          </div>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
  )
}

export default PorudzbinaForma