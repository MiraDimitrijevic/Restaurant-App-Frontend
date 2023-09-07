import React from 'react';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {

  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';


function StavkaPorudzbine({stavka, obrisiStavku} ) {
  const[visible, setVisible]= useState('normal');

  return (
    
 
    <MDBContainer fluid className={visible}   >

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>
            <MDBRow>
            <MDBCol><p>{stavka.naziv}</p></MDBCol>
            <MDBCol><p>{stavka.kolicina}</p></MDBCol>
            <MDBCol>                 <div className="d-flex justify-content-end pt-3">
                  <button className='btnForma' color='warning' size='lg' onClick={()=>{obrisiStavku(stavka.stavka_menija_id);
                if(stavka.kolicina==0) setVisible('ghost'); }}>-</button>
                </div>
            </MDBCol>
            </MDBRow>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
  )
}

export default StavkaPorudzbine