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
            <MDBRow >
            <MDBCol  style={{textAlign:'center', backgroundColor:'#A0BFE0',fontWeight:'bold'}}><p>{stavka.naziv}</p></MDBCol>
            <MDBCol  style={{textAlign:'center', backgroundColor:'#A0BFE0',fontWeight:'bold',
             fontSize:20, padding:'10px'}}><p>{stavka.kolicina}</p></MDBCol>
            <MDBCol  style={{textAlign:'center', backgroundColor:'#A0BFE0',fontWeight:'bold'}}>               
               <div className="d-flex justify-content-end pt-3">
                  <button className='btnForma'  style={{backgroundColor:'white', color:'#4A55A2', fontWeight:'bold' ,borderColor:'white'}}
                   size='lg' onClick={()=>{obrisiStavku(stavka.stavka_menija_id);
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