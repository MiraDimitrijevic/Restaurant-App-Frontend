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
    

    <MDBContainer fluid  className={showModal2}  style={{textAlign:'center', justifyContent:'center'}}>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>
        <MDBCardBody className='text-black d-flex flex-column justify-content-center' style={{backgroundColor:'#A0BFE0'}}>
                  <h5 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center'}}>Stavke porudzbine</h5>
        <div className="stavkePor">
         
          
         { !Array.isArray(stavkePorudzbine) ? <p>Trenutno nema stavki!</p> : stavkePorudzbine.map((stavka) => (
       <StavkaPorudzbine stavka={stavka} obrisiStavku={obrisiStavku} />
       
     ))}
        <MDBRow className='g-0'>
        <button  type='submit' size='lg' className='ms-2' style={{backgroundColor:'white', color:'#4A55A2', width:'250px', fontWeight:'bold' ,borderColor:'white'}} onClick={poruci}>Poruci</button>
          </MDBRow>
          </div>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
  )
}

export default PorudzbinaForma