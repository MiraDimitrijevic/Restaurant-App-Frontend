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
  MDBRadio
}
from 'mdb-react-ui-kit';

function MojProfil({podaciUser}) {
 
 function dodaj(e){
    podaciUser[e.target.name]=e.target.value;
 
console.log(podaciUser);
  }
  let navigate=useNavigate();

  function izmeniUsera(e){
    e.preventDefault();
   var t=window.sessionStorage.getItem("token");
axios.put("http://127.0.0.1:8000/api/user/"+ window.sessionStorage.getItem("user_id"), podaciUser, {
  headers: {
    Authorization: `Bearer ${t}`,
  },
}).then((res) =>{
  console.log(res.data);
  if(res.data.success === true) {
    alert("Podaci uspesno izmenjeni!" );
    navigate("/meni");

  } else {
    alert("Neuspesna izmena, pokušajte ponovo" );

  }
}).catch((e)=>{
  console.log(e.response.data);
  
});
  }
  return (
    <MDBContainer fluid className='bg-dark'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>

          <MDBCard className='my-4'>

            <MDBRow className='g-0'>

              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src="../pics/bm_logo.png" alt="Sample photo" width={900+'px'} className="rounded-start" fluid/>
              </MDBCol>

              <MDBCol md='6'>

                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Vasi podaci</h3>
                  <MDBRow>

                            <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Ime'  onInput={dodaj} name= "ime" size='lg' id='form5' type='text' />
                            </MDBCol>
                            <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Prezime'  onInput={dodaj} name= "prezime" size='lg' id='form6' type='text'/>
                          </MDBCol>
                  </MDBRow>
                  <MDBRow>

                          <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Godina rodjenja'  onInput={dodaj} name= "godinaRodjenja" size='lg' id='form7' type='number'/>
                          </MDBCol>
                          <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Broj telefona'  name= "brojTelefona"  onInput={dodaj} size='lg' id='form3' type='number'/>
                          </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Korisnicko ime'  name= "korisnickoIme"  onInput={dodaj} size='lg' id='form1' type='text' />
                          </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Email'  name= "email"  onInput={dodaj} size='lg' id='form2' type='email' />
                          </MDBCol>
                 </MDBRow>
                      <MDBInput wrapperClass='mb-4' label='Lozinka'  name= "password"  onInput={dodaj} size='lg' id='form4' type='password' />
          


                  <div className="d-flex justify-content-end pt-3">
                    <button className='ms-2' color='warning' size='lg' onClick={izmeniUsera}>Izmeni podatke</button>
                  </div>


                </MDBCardBody>

              </MDBCol>
            </MDBRow>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}



export default MojProfil