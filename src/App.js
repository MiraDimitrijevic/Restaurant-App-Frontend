import './App.css';
import LoginPage from './components/LoginPage';
import GuestRegisterPage from './components/GuestRegisterPage';
import React from "react";
import { Routes, Route}  from "react-router-dom";
import NavBar from './components/NavBar';
import Gosti from './components/Gosti';
import MojProfil from './components/MojProfil';
import Porudzbina from './components/Porudzbina';
import Smene from './components/Smene';
import PrikazIzmenaStavke from './components/PrikazIzmenaStavke';
import AddStavkaMenija from './components/AddStavkaMenija';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import PrikazIzmenaPorudzbine from './components/PrikazIzmenaPorudzbine';
import ZaposleniRegisterPage from './components/ZaposleniRegisterPage';


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
  const[showModal3, setShowModal3]= useState('ghost');
  const[stavkePorudzbine, setStavkePorudzbine]=useState([]);
  const[vrsteSM, setVrsteSM]= useState();
  const[gosti, setGosti]=useState();
  const[smene, setSmene]=useState();
  const[porudzbine, setPorudzbine]=useState();
  const[porudzbinaIzmeni, setPorudzbinaIzmeni]=useState();



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
      window.sessionStorage.setItem("userType_id", 0);
      window.sessionStorage.setItem("user_id", 0 );
      window.sessionStorage.setItem("token_reg","");
      navigate("/login");

  };

  const [podaciZaPrijavu, setPodaciZaPrijavu]=useState({
    email: "",
    password: ""
    
  });

  const [podaciUser, setPodaciUser]=useState();

  function dodajUsername(e){
    let data=podaciZaPrijavu;
    data[e.target.name]=e.target.value;
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
window.sessionStorage.setItem("userType_id", res.data.ostalo.id);
window.sessionStorage.setItem("user_id", res.data.user_id);
navigate("/meni");
  } else {
    alert("Pogresi kredencijali! Pokusajte ponovo");
 
  }
}).catch((e)=>{
  console.log(e);
});
  }

 const obrisiStavku =(id)=>{


    for(var i=0; i<stavkePorudzbine.length;i++){
    if(stavkePorudzbine[i].stavka_menija_id===id) {
      let kolicina=stavkePorudzbine[i].kolicina-1;
      if(kolicina===0){
       var stavke=[];
        for(var j=0;j<stavkePorudzbine.length;j++){
          if(j!=i)
          stavke.push(stavkePorudzbine[j]);
        }
        setStavkePorudzbine(stavke);
        console.log(stavkePorudzbine);
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
setStavkePorudzbine([...stavkePorudzbine ,{"stavka_menija_id":stavka.id,"naziv":stavka.naziv, "kolicina":1}] ) ;
    
  }

  function poruci(){
    var data={"stavke": stavkePorudzbine, "gost_id":window.sessionStorage.getItem('userType_id')};
    axios.post("http://127.0.0.1:8000/api/porudzbina", data , {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
      if(res.data.success === true) {
        alert("Porucivanje uspesno! BROJ PORUDZBINE: "+res.data.porudzbina_id);
        window.location.reload(true);
 } else {
        alert("Neuspesno porucivanje, pokusajte ponovo." );
      }
    }).catch((error)=>{
      console.error(error.response.data);
    
      
    });
    
  }

  const deleteStavka = async (stavkaID) => {
    var config = {method: "delete",
    url: "http://127.0.0.1:8000/api/stavkaMenija/"+stavkaID,
    headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,},};
    const res = await axios(config);
    if (res.data.success===true) {alert("Stavka menija je uspesno obrisana!" );
    window.location.reload(true);
    }
    else {alert("Doslo je do greske, stavka menija nije obrisana!" );}};



    function dajPopust(gost){
    axios.put("http://127.0.0.1:8000/api/gost/"+gost.id, gost,{
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
       if(res.data.success=== true) {
      alert("Gost je dobio popust od 20%!" );
window.location.reload(true);
    } else {      alert("Gost ne moze dobiti popust zbog zaduzenja!" );
  }
    }).catch((error)=>{
      console.error(error.response.data);

      
    });
    }

    function prikaziStavke(porudzbina){
      axios.get("http://127.0.0.1:8000/api/porudzbina/"+porudzbina.id+"/stavkePorudzbine" , {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  }).then((res) =>{
    
    setStavkePorudzbine(res.data.stavke);
});
navigate("/porudzbina");
    }

    function zakljuciSmenu(){
console.log(window.sessionStorage.getItem("userType_id"));
var konobar_id= window.sessionStorage.getItem("userType_id");
      axios.post("http://127.0.0.1:8000/api/radnaSmena",{konobar_id}, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      }).then((res) =>{
        console.log(res.data);
        if(res.data.success === true) {
          alert("Smena uspesno zakljucena!");
          window.location.reload(true);
   }
    else {
    alert("Smena je vec zakljucena!");
        }
      }).catch((error)=>{
        console.error(error.response);
      
        
      });
    }

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
                {"data":null , defaultContent:"<button class='btn1' variant='primary' style='background-color:white;text-align:center;width:30px;'>+</button> ",
                visible: window.sessionStorage.getItem("userType")==="g" ? true :false},
                {"data":null , defaultContent:"<button class='btn2' variant='primary'  style='background-color:white;text-align:center;width:70px;font-size:18px;'>izmeni</button> " ,
                visible: window.sessionStorage.getItem("userType")==="m" ? true :false},
                {"data":null , defaultContent:"<button class='btn3' variant='primary'  style='background-color:white;text-align:center;width:70px;font-size:18px;'>obrisi</button> ",
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

  $(document).ready( 
    function () {
        
        $('#tableGosti').DataTable( {
  
            "bDestroy": true,
            columnDefs: [{
                "defaultContent": "-",
                "targets": "_all"
              }],
              buttons: [
                'copy', 'excel', 'pdf'
            ],
            data: gosti,
            columns: [
              {"data":"id", visible:false},
              {"data":"licniPodaci.id", visible:false},
                { "data": "licniPodaci.ime" },
                { "data": "licniPodaci.prezime"},
                { "data": "licniPodaci.godinaRodjenja" , visible:false},
                { "data": "imaPopust" },
                { "data": "zaduzenje" },
                {"data":null , defaultContent:"<button class='btn2' variant='primary'  style='background-color:white;text-align:center;width:100px;font-size:18px;'>popust</button> " ,
                visible: window.sessionStorage.getItem("userType")==="k" ? true :false}, ]},
        );
  $('#tableGosti .btn2 ').on('click', function(){
    if(window.sessionStorage.getItem("userType")==="m" || window.sessionStorage.getItem("userType")==="g")
      { alert("Nisu vam dostupne ove opcije");}  else{
    let gost = $('#tableGosti').DataTable().row($(this).closest('tr')).data();
    if(gost.imaPopust==1){alert("Ovaj gost vec ima popust!");}
    else
     dajPopust(gost);
   }});
  
  } );

  $(document).ready( 
    function () {
        
        $('#tableSmene').DataTable( {
  
            "bDestroy": true,
            columnDefs: [{
                "defaultContent": "-",
                "targets": "_all"
              }],
              buttons: [
                'copy', 'excel', 'pdf'
            ],
            data: smene,
            columns: [
              {"data":"id", visible:false},
              {"data":"datum"},
              { "data": "smena" },
              { "data": "ukupanPromet" },
              { "data": "konobar.licniPodaci.ime"},
              { "data": "konobar.licniPodaci.prezime"},
            ]   
  } ); });


  $(document).ready( 
    function () {
        
        $('#tablePorudzbine').DataTable( {
  
            "bDestroy": true,
            columnDefs: [{
                "defaultContent": "-",
                "targets": "_all"
              }],
              buttons: [
                'copy', 'excel', 'pdf'
            ],
            data: porudzbine,
            columns: [
              {"data":"id", visible:false},
              {"data":"datumVremePorudzbine"},
                { "data": "gost.licniPodaci.ime" },
                { "data": "gost.licniPodaci.prezime"},
                { "data": "saPopustom" },
                { "data": "ukupnaCena" },
                { "data": "placeno" },
                { "data": "konobar.licniPodaci.korisnickoIme" },
                {"data":null , defaultContent:"<button class='btn2' variant='primary'  style='background-color:white;text-align:center;width:70px; font-size:18px;'>naplati</button> " ,
                visible: window.sessionStorage.getItem("userType")==="k" ? true :false},
                {"data":null , defaultContent:"<button class='btn3' variant='primary'  style='background-color:white;text-align:center;width:70px;font-size:18px;'>prikazi</button> " ,
                visible: window.sessionStorage.getItem("userType")==="k" ? true :false},
               ]},
        );
  $('#tablePorudzbine .btn2 ').on('click', function(){
    if(window.sessionStorage.getItem("userType")==="m" || window.sessionStorage.getItem("userType")==="g")
      { alert("Nisu vam dostupne ove opcije");}  else{
    let porudzbina = $('#tablePorudzbine').DataTable().row($(this).closest('tr')).data();
    if(porudzbina.placeno==1){alert("Porudzbina je vec placena!");}
    else{
      setPorudzbinaIzmeni(porudzbina);
    setShowModal3('normal');
    }
   }});
   $('#tablePorudzbine .btn3 ').on('click', function(){
    if(window.sessionStorage.getItem("userType")==="m" || window.sessionStorage.getItem("userType")==="g")
      { alert("Nisu vam dostupne ove opcije");}  else{
    let porudzbina = $('#tablePorudzbine').DataTable().row($(this).closest('tr')).data();

     prikaziStavke(porudzbina);
   }});
  
  } );

  $(document).ready( 
    function () {
        
        $('#tableSP').DataTable( {
  
            "bDestroy": true,
            columnDefs: [{
                "defaultContent": "-",
                "targets": "_all"
              }],
              buttons: [
                'copy', 'excel', 'pdf'
            ],
            data: stavkePorudzbine,
            columns: [
              {"data":"id", visible:false},
              {"data":"stavkaMenija.naziv"},
                { "data": "kolicina" },

               ]},
        );
  
  } );


  useEffect(()=>{
    if( window.sessionStorage.getItem("token") !== "" && window.sessionStorage.getItem("token") !== null){
      if(podaciUser == null) {
        axios.get("http://127.0.0.1:8000/api/user/"+window.sessionStorage.getItem("user_id") , {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
          },
        }).then((res) =>{
          setPodaciUser(res.data.user);
          
  
     }, [podaciUser] ); }
 
      if(meni == null) {
        console.log("Usao u meni");
        axios.get("http://127.0.0.1:8000/api/stavkaMenija" , {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
          },
        }).then((res) =>{
          setMeni(res.data.stavkeMenija);
          
  
     }, [meni] ); }

   
     if(window.sessionStorage.getItem("userType") !== null && window.sessionStorage.getItem("userType") === "m"){

     if(vrsteSM == null) {
      axios.get("http://127.0.0.1:8000/api/vrstaStavkeMenija" , {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      }).then((res) =>{
        setVrsteSM(res.data.vrste);
        

   }, [vrsteSM] ); }

   if(smene == null) {
    console.log("Usao u metodu");
    axios.get("http://127.0.0.1:8000/api/radnaSmena" , {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
      setSmene(res.data.smene);
      console.log(res);
  
  }, [smene] ); }

  }
if(window.sessionStorage.getItem("userType") !== null && window.sessionStorage.getItem("userType") === "k"){


   if(gosti == null) {
    axios.get("http://127.0.0.1:8000/api/gost" , {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
      },
    }).then((res) =>{
      setGosti(res.data.gosti);
      

 }, [gosti] ); }



 if(porudzbine == null) {
  
  axios.get("http://127.0.0.1:8000/api/porudzbina" , {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  }).then((res) =>{
    setPorudzbine(res.data.porudzbine);
    

}, [porudzbine] ); }



}
   
//end of use-effect
    }
  });
  return (
    <>
      <Routes>
      <Route path='/login' element={ <LoginPage addToken={addToken}  dodajLozinku={dodajLozinku}  dodajUsername = {dodajUsername} login={login}  podaciZaPrijavu={podaciZaPrijavu}/>}></Route>
      
      <Route path='/register' element={<GuestRegisterPage/>}></Route>
      <Route path='/' element={<NavBar token={token} logout={logout} userType={userType} zakljuciSmenu={zakljuciSmenu}/>}>
      
      <Route path='meni' element={<PrikazIzmenaStavke showModal1={showModal1} showModal2={showModal2}
       stavkaIzmeni={stavkaIzmeni} stavkePorudzbine={stavkePorudzbine} obrisiStavku={obrisiStavku} poruci={poruci}></PrikazIzmenaStavke>}></Route>
        <Route path='addStavkaMenija' element={<AddStavkaMenija  vrsteSM={vrsteSM}></AddStavkaMenija>}></Route>
        <Route path='gosti' element={<Gosti ></Gosti>}></Route>
        <Route path='porudzbine' element={<PrikazIzmenaPorudzbine  porudzbinaIzmeni={porudzbinaIzmeni} showModal3={showModal3}></PrikazIzmenaPorudzbine>}></Route>
        <Route path='porudzbina' element={<Porudzbina ></Porudzbina>}></Route>
        <Route path='smene' element={<Smene ></Smene>}></Route>
        <Route path='profil' element={<MojProfil podaciUser={podaciUser} ></MojProfil>}></Route>
        <Route path='registerZ' element={<ZaposleniRegisterPage ></ZaposleniRegisterPage>}></Route>

 </Route>
      
      </Routes>
    
    </>
  );
}
export default App;
