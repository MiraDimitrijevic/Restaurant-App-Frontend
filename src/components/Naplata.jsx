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



function Naplata({showModal3 , porudzbinaIzmeni} ) {
 let navigate=useNavigate();
 const[iznos, setIznos]=useState(0);

 function dodaj(e){
    setIznos(e.target.value);
 
  }


  function naplati(e){
    var data={"iznos":iznos, "konobar_id":window.sessionStorage.getItem("userType_id")};
    e.preventDefault();
   let t= window.sessionStorage.getItem("token");
    axios.put("http://127.0.0.1:8000/api/porudzbina/"+porudzbinaIzmeni.id, data, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    }).then((res) =>{
       if(res.data.success=== true) {
      alert("Porudzbina je naplacena!" );
window.location.reload(true);
       

      } 
    }).catch((error)=>{
      console.error(error.response.data);
      alert("Porudzbina nije naplacena!" );

      
    });


    }

  return (
    
   
    <MDBContainer fluid  className={showModal3}>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol>

        <MDBCard className='my-4'>

          <MDBRow className='g-0'>

            <MDBCol md='6' className="d-none d-md-block">
              <MDBCardImage src="../pics/coins.jpg" alt="Sample photo" width={500+'px'} className="rounded-start" fluid/>
            </MDBCol>

            <MDBCol md='6'>

              <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                <h3 className="mb-5 text-uppercase fw-bold">Forma za naplatu porudzbine</h3>

                <MDBInput wrapperClass='mb-4'  label='Placeni iznos:'  onInput={dodaj} name= "iznos" size='lg' id='form1' type='number' />

                 <div className="d-flex justify-content-center pt-3">
                  <button className='ms-2'  size='lg' style={{backgroundColor:'white', color:'#4A55A2', width:'500px', fontWeight:'bold' ,borderColor:'#4A55A2'
                , fontFamily:'sans-serif', borderRadius:'8px'}} onClick={naplati}>Naplati</button>
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

export default Naplata