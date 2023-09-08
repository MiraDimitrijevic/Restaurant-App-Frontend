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

function ZaposleniRegisterPage() {
 const [podaciZaRegistraciju, setPodaciZaRegistraciju]=useState({
    ime:"",
    prezime:"",
    godinaRodjenja:"",
    korisnickoIme:"",
    email: "",
    brojTelefona:"",
    password: "",
    userType:"m"
 });
 function dodaj(e){
    let data=podaciZaRegistraciju;
    data[e.target.name]=e.target.value;
    setPodaciZaRegistraciju(data);

  }
  let navigate=useNavigate();

  function register(e){
    e.preventDefault();
    if(podaciZaRegistraciju.userType=="m"){
axios.post("http://127.0.0.1:8000/api/menadzerRegister", podaciZaRegistraciju , {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  }).then((res) =>{
  if(res.data.success === true) {
alert("Uspesno ste registrovali menadzera!");
  } else {
    alert("Neuspesna registracija, pokušajte ponovo" );

  }
}).catch((e)=>{

  
});
  } else {
    axios.post("http://127.0.0.1:8000/api/konobarRegister", podaciZaRegistraciju, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      }).then((res) =>{
  if(res.data.success === true) {
alert("Uspesno ste registrovali konobara!");
  } else {
    alert("Neuspesna registracija, pokušajte ponovo" );

  }
}).catch((e)=>{

  
});
  }
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
                  <h3 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center'}}>Forma za registraciju zaposlenog</h3>
                  <MDBRow>

                            <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Ime'  onInput={dodaj} name= "ime" size='lg' id='form5' type='text'/>
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
                      <MDBInput wrapperClass='mb-4' label='Korisnicko ime'  name= "korisnickoIme"  onInput={dodaj} size='lg' id='form1' type='text'/>
                          </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Email'  name= "email"  onInput={dodaj} size='lg' id='form2' type='email'/>
                          </MDBCol>
                 </MDBRow>
                      <MDBInput wrapperClass='mb-4' label='Lozinka'  name= "password"  onInput={dodaj} size='lg' id='form4' type='password'/>
                      <select class="form-select"  id= "form8" onChange={dodaj} name= "userType" >
                <option value="m">Menadzer</option>
                  <option value="k">Konobar</option>
                  </select>
                    <div className="d-flex justify-content-center pt-3" >
                    <button  className='ms-2'  size='lg' style={{backgroundColor:'white', color:'#606C5D', width:'4000px', fontWeight:'bold' ,borderColor:'#606C5D', fontFamily:'sans-serif', borderRadius:'8px'}} onClick={register}>Registruj zaposlenog</button>
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



export default ZaposleniRegisterPage