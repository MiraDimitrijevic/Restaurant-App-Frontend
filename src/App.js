import './App.css';
import LoginPage from './components/LoginPage';
import GuestRegisterPage from './components/GuestRegisterPage';
import React from "react";
import { Routes, Route}  from "react-router-dom";
import NavBar from './components/NavBar';
import Meni from './components/Meni';
import PrikazIzmenaStavke from './components/PrikazIzmenaStavke';
import AddStavkaMenija from './components/AddStavkaMenija';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import StavkaPorudzbine from './components/StavkaPorudzbine';


function App() {
  const navigate=useNavigate();
  const[token, setToken]= useState();
  const[dayOfWeek, setDayOfWeek]=useState(0);
  const[userType , setUserType]= useState('g');
  const[meni, setMeni]= useState();
  const[user_id, setUser_id]= useState(0);
  const[stavkaIzmeni, setStavkaIzmeni]= useState();
  const[showModal1, setShowModal1]= useState('ghost');
  const[showModal2, setShowModal2]= useState('ghost');
  const[stavkePorudzbine, setStavkePorudzbine]=useState([]);
  const[vrsteSM, setVrsteSM]= useState();



  function  addToken(token){
    setToken(window.sessionStorage.getItem("token"));
  }

  const logout = () => {

    axios.post("http://127.0.0.1:8000/api/logout", "", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      }).then(function () {
       
      })
      .catch(function (error) {
        console.log(error);
      });
      setToken(null);
      window.sessionStorage.setItem("token","");
      window.sessionStorage.setItem("userType", "g");
      window.sessionStorage.setItem("user_id", 0 );
      window.sessionStorage.setItem("token_reg","");
      navigate("/login");

  };

  const [podaciZaPrijavu, setPodaciZaPrijavu]=useState({
    email: "",
    password: ""
    
  });

  const [podaciUser, setPodaciUser]=useState({
    ime:"",
    prezime:"",
    godinaRodjenja:"",
    korisnickoIme:"",
    brojTelefona:"",
    email: "",
    password: "",
    userType:"",
    imaPopust:false,
   /* zaduzenje:0,
    datumZaposlenja:"",
    plata:0,
    napomena:"",
    naOdmoru:false,
    naBolovanju:false,
    nadredjeni_id:""
*/
  });

  function dodajUsername(e){
    let data=podaciZaPrijavu;
    data[e.target.name]=e.target.value;
    console.log(data);
    setPodaciZaPrijavu(data);
  }
  function dodajLozinku(e){
    let data=podaciZaPrijavu;
    data[e.target.name]=e.target.value;
 setPodaciZaPrijavu(data);
  }

  function login(e){
    e.preventDefault();
axios.post("http://127.0.0.1:8000/api/login", podaciZaPrijavu).then((res) =>{
  if(res.data.success=== true) {
window.sessionStorage.setItem("token", res.data.access_token );
addToken(res.data.access_token);
setUser_id(res.data.user_id);
window.sessionStorage.setItem("userType", res.data.userType);
window.sessionStorage.setItem("user_id", res.data.user_id);
setPodaciUser(res.data.user);
console.log(podaciUser);
navigate("/meni");
  } else {
    alert("Pogresi kredencijali! Pokusajte ponovo");

  }
}).catch((e)=>{
  console.log(e);
});
  }

 const obrisiStavku =(id)=>{
  console.log("usao u metodu");
  console.log("stavke porudzbine pre smanjivanja: "+ stavkePorudzbine);
  console.log("stavke za smanjenje: "+ id);

    for(let i=0; i<stavkePorudzbine.length;i++){
    if(stavkePorudzbine[i].stavka_menija_id===id) {
      let kolicina=stavkePorudzbine[i].kolicina-1;
      if(kolicina===0){
        setStavkePorudzbine([stavkePorudzbine.splice(i,1)]);
        if(stavkePorudzbine.length==0){
          setStavkePorudzbine([]);
          setShowModal2(false);
        }
  } else{
     var stavke=Array.from(stavkePorudzbine);
      stavke[i].kolicina=kolicina;
      setStavkePorudzbine(stavke);

    }
    break;
    }
    }
  }

 function dodajStavkuPorudzbine (stavka) {
  var stavke;
  var stavkaPostoji=false;
  for(var i=0;i<stavkePorudzbine.length;i++){
  if(stavkePorudzbine[i].stavka_menija_id===stavka.id){
    var kolicina=stavkePorudzbine[i].kolicina+1;
    stavke=Array.from(stavkePorudzbine);
    stavke[i].kolicina=kolicina;
    setStavkePorudzbine(stavke);
  stavkaPostoji=true;
  break;
  }
  };
if(stavkaPostoji==false)
setStavkePorudzbine([...stavkePorudzbine ,{"stavka_menija_id":stavka.id,"naziv":stavka.naziv, "kolicina":1,"iznos":0}] ) ;
    
  }

  function poruci(){
    console.log(stavkePorudzbine);
    var data={"stavke": stavkePorudzbine, "gost_id":window.sessionStorage.getItem("user_id")};
    console.log(data);
    axios.post("http://127.0.0.1:8000/api/porudzbina", data , {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
      console.log(res.data);
      if(res.data.success === true) {
        alert("Porucivanje uspesno! BROJ PORUDZBINE: "+res.data.porudzbina_id);
        window.location.reload(true);
 } else {
        alert("Neuspesno porucivanje, pokusajte ponovo." );
         console.log(res);
      }
    }).catch((error)=>{
      console.error(error.response.data);
    
      
    });
    
  }

  const deleteStavka = async (stavkaID) => {
    console.log(stavkaID);
    var config = {method: "delete",
    url: "http://127.0.0.1:8000/api/stavkaMenija/"+stavkaID,
    headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,},};
    const res = await axios(config);
    if (res.data.success===true) {alert("Stavka menija je uspesno obrisana!" );
    window.location.reload(true);
    //navigate("/");   
    console.log(res.data);}
    else {alert("Doslo je do greske, stavka menija nije obrisana!" );}};

  $(document).ready( 
    function () {
        
        $('#tableMeni').DataTable( {
  
            "bDestroy": true,
            columnDefs: [{
                "defaultContent": "-",
                "targets": "_all"
              }],
              buttons: [
                'copy', 'excel', 'pdf'
            ],
            data: meni,
            columns: [
              {"data":"id"},
                { "data": "naziv" },
                { "data": "cena"},
                { "data": "opsirnije" },
                { "data": "napomene" },
                { "data": "jedinicaMere" },
                { "data": "vrsta.naziv" },
                {"data":null , defaultContent:"<button class='btn1' variant='primary'>+</button> ",
                visible: window.sessionStorage.getItem("userType")==="g" ? true :false },
                {"data":null , defaultContent:"<button class='btn2' variant='primary'>izmeni</button> " ,
                visible: window.sessionStorage.getItem("userType")==="m" ? true :false},
                {"data":null , defaultContent:"<button class='btn3' variant='primary'>obrisi</button> ",
                visible: window.sessionStorage.getItem("userType")==="m" ? true :false }
               
          ]},
        );
        $('#tableMeni .btn1 ').on('click', function(){
          if(window.sessionStorage.getItem("userType")==="k" || window.sessionStorage.getItem("userType")==="m") 
           { alert("Nisu vam dostupne ove opcije");}  else{
          let stavka = $('#tableMeni').DataTable().row($(this).closest('tr')).data();
           dodajStavkuPorudzbine(stavka);
       setShowModal2('normal');
         }});
  $('#tableMeni .btn2 ').on('click', function(){
    if(window.sessionStorage.getItem("userType")==="k" || window.sessionStorage.getItem("userType")==="g")
      { alert("Nisu vam dostupne ove opcije");}  else{
    let stavka = $('#tableMeni').DataTable().row($(this).closest('tr')).data();
    console.log(stavka);
    setStavkaIzmeni(stavka);
    setShowModal1('normal');
   }});
    $('#tableMeni .btn3 ').on('click', function(){
      if(window.sessionStorage.getItem("userType")==="k" || window.sessionStorage.getItem("userType")==="g") 
       { alert("Nisu vam dostupne ove opcije");}  else{
      let stavka = $('#tableMeni').DataTable().row($(this).closest('tr')).data();
      deleteStavka(stavka.id);
     }});   
  
  } );


  useEffect(()=>{
    if( window.sessionStorage.getItem("token") !== "" && window.sessionStorage.getItem("token") !== null){

 
      if(meni == null) {
        axios.get("http://127.0.0.1:8000/api/stavkaMenija" , {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
          },
        }).then((res) =>{
          console.log(res);
          setMeni(res.data.stavkeMenija);
          
  
     }, [meni] ); }

     if(vrsteSM == null) {
      axios.get("http://127.0.0.1:8000/api/vrstaStavkeMenija" , {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      }).then((res) =>{
        console.log(res);
        setVrsteSM(res.data.vrste);
        

   }, [vrsteSM] ); }

   

    }
  })
  return (
    <>
      <Routes>
      <Route path='/login' element={ <LoginPage addToken={addToken}  dodajLozinku={dodajLozinku}  dodajUsername = {dodajUsername} login={login}  podaciZaPrijavu={podaciZaPrijavu}/>}></Route>
      
      <Route path='/register' element={<GuestRegisterPage/>}></Route>
      <Route path='/' element={<NavBar token={token} logout={logout} userType={userType}/>}>
      
      <Route path='meni' element={<PrikazIzmenaStavke showModal1={showModal1} showModal2={showModal2}
       stavkaIzmeni={stavkaIzmeni} stavkePorudzbine={stavkePorudzbine} obrisiStavku={obrisiStavku} poruci={poruci}></PrikazIzmenaStavke>}></Route>
        <Route path='addStavkaMenija' element={<AddStavkaMenija  vrsteSM={vrsteSM}></AddStavkaMenija>}></Route>

 </Route>
      
      </Routes>
    
    </>
  );
}
export default App;
