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



function StavkaModal({stavkaIzmeni , showModal1} ) {
 let navigate=useNavigate();

 function dodaj(e){
    stavkaIzmeni[e.target.name]=e.target.value;
   

  }


  function izmeniStavku(e){
    //validacija
    e.preventDefault();
   let t= window.sessionStorage.getItem("token");
   console.log(stavkaIzmeni);
    axios.put("http://127.0.0.1:8000/api/stavkaMenija/"+stavkaIzmeni.id, stavkaIzmeni, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    }).then((res) =>{
      console.log(res);
       if(res.data.success=== true) {
      alert("Stavka je uspesno izmenjena!" );
window.location.reload(true);
         console.log(res.data);
       

      } 
    }).catch((e)=>{
      console.log(e);
      alert("Stavka nije izmenjena!" );

      
    });


    }

  return (
    
   
    <MDBContainer fluid  className={showModal1}>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>

          <MDBRow className='g-0'>

            <MDBCol md='6' className="d-none d-md-block">
              <MDBCardImage src="../slike/s2.jpg" alt="Sample photo" width={500+'px'} className="rounded-start" fluid/>
            </MDBCol>

            <MDBCol md='6'>

              <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                <h3 className="mb-5 text-uppercase fw-bold">Forma za izmenu podataka o stavki menija</h3>

                <MDBInput wrapperClass='mb-4'  label='Naziv stavke:'  onInput={dodaj} name= "naziv" size='lg' id='form1' type='text' value={stavkaIzmeni?.naziv}/>
                <MDBInput wrapperClass='mb-4'  label='Cena stavke:'  onInput={dodaj} name= "cena" size='lg' id='form2' type='number' value={stavkaIzmeni?.cena}/>
                <MDBInput wrapperClass='mb-4'  label='Opsirnije o stavci:'  onInput={dodaj} name= "opsirnije" size='lg' id='form3' type='text'  value={stavkaIzmeni?.opsirnije}/>
                <MDBInput wrapperClass='mb-4'  label='Napomena:'  onInput={dodaj} name= "napomene" size='lg' id='form4' type='text'  value={stavkaIzmeni?.napomene}/>
                <select class="form-select"  id= "form5" onChange={dodaj} name= "jedinicaMere" >
                  <option disabled='true' selected>Izaberite jedinicu mere</option><option value="ml">ml</option>
                  <option value="l">l</option><option value="g">g</option><option value="kg">kg</option></select>

                 <div className="d-flex justify-content-end pt-3">
                  <button className='btnForma' color='warning' size='lg' onClick={izmeniStavku}>Izmeni stavku menija</button>
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

export default StavkaModal