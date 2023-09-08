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



function AddStavkaMenija({vrsteSM}) {
 let navigate=useNavigate();
 const [stavkaMenija, setStavkaMenija]=useState({
    naziv:"",
    cena: 0,
    opsirnije: "",
    napomene:"",
    jedinicaMere:"",
    vrstaStavkeMenija_id:1
    
  });

 function dodaj(e){
    var data=stavkaMenija;
    data[e.target.name]=e.target.value;
    setStavkaMenija(data);
  }

  function dodajStavku(e){
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/stavkaMenija", stavkaMenija, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
      if(res.data.success === true) {
        alert("Uspesan unos stavke menija!" );
} else {
        alert("Neuspesan unos stavke menija, pokušajte ponovo" );
    
      }
    }).catch((e)=>{
    
      
    });
  }


    

  return (
    
   
    <MDBContainer fluid  className='normal'>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>

          <MDBRow className='g-0'>

            <MDBCol md='6' className="d-none d-md-block">
              <MDBCardImage src="../pics/rest.png" alt="Sample photo" width={700+'px'} height={700+'px'}   className="rounded-start" fluid/>
            </MDBCol>

            <MDBCol md='6'>

              <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                <h3 className="mb-5 text-uppercase fw-bold">Forma za unos nove stavke u meni</h3>

                <MDBInput wrapperClass='mb-4'  label='Naziv stavke:'  onInput={dodaj} name= "naziv" size='lg' id='form1' type='text' />
                <MDBInput wrapperClass='mb-4'  label='Cena stavke:'  onInput={dodaj} name= "cena" size='lg' id='form2' type='number' />
                <MDBInput wrapperClass='mb-4'  label='Opsirnije o stavci:'  onInput={dodaj} name= "opsirnije" size='lg' id='form3' type='text'  />
                <MDBInput wrapperClass='mb-4'  label='Napomena:'  onInput={dodaj} name= "napomene" size='lg' id='form4' type='text' />
                <MDBRow className='g-0'>
                <select class="form-select"  id= "form5" onChange={dodaj} name= "jedinicaMere" >
                  <option disabled='true' selected>Izaberite jedinicu mere</option><option value="ml">ml</option>
                  <option value="l">l</option><option value="g">g</option><option value="kg">kg</option></select>
                  </MDBRow >
                  <MDBRow className='g-0'>

                <select class="form-select" style={{marginTop:'50px'}} id= "form6" onChange={dodaj} name= "vrstaStavkeMenija_id" >
                { !Array.isArray(vrsteSM) ? <p>Ne postoji nijedna vrsta stavke menija!</p> : vrsteSM.map((vrsta) => (
       <option value={vrsta.id}>{vrsta.naziv}</option>
     ))} </select>
     </MDBRow>
                 <div className="d-flex justify-content-end pt-3">
                  <button className='ms-2'  size='lg' style={{padding:'2px', margin:'25px', backgroundColor:'white', color:'#606C5D', width:'700px', fontWeight:'bold' ,borderColor:'#606C5D', fontFamily:'sans-serif', borderRadius:'8px'}}
                   onClick={dodajStavku}>Dodaj stavku menija</button>
                </div>


              </MDBCardBody>

            </MDBCol>
          </MDBRow>

        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
  )

  }
export default AddStavkaMenija