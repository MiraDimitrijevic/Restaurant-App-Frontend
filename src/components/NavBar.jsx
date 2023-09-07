import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';


function NavBar(props) {
  const[tok,setTok]=useState(props.token);
    
    

    function setToken(){
    setTok(window.sessionStorage.getItem("token"));
    window.location.reload(false);
    }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">BarManagement</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
        { "" != window.sessionStorage.getItem("token") ?
         ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/meni">Meni</a> ) :  
         ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/meni">Meni</a> ) }
          </li>
     ,     <li className="nav-item">
        { "" != window.sessionStorage.getItem("token") ? 
        ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/profil">Moj profil</a> )
         :  ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/profil">Moj profil</a> ) }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="m" ?
           ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/addStavkaMenija">Dodaj stavku u meni</a>)
             :    ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/addStavkaMenija">Dodaj stavku u meni</a>)  }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="k" ?
           ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/porudzbine">Porudzbine</a>)  : 
              ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/porudzbine">Porudzbine</a>)  }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="k" ?
           ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/gosti">Gosti</a>)  : 
              ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/gosti">Gosti</a>)  }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="m" ? 
          ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/smene">Pregled radnih dana</a>) 
           :    ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/smene">Smena</a>)  }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="k" ? 
          ( <a className="nav-link active"  onClick={props.zakljuciSmenu} aria-current="page"/* href="/meni"*/>Zakljuci smenu</a>) 
           :    ( <a  className="nav-link disabled"  onClick={props.zakljuciSmenu} aria-current="page"  tabindex="-1" aria-disabled="true" href="/meni">Zakljuci smenu</a>)  }
          </li>
          <li className="nav-item">
          { "" != window.sessionStorage.getItem("token") && window.sessionStorage.getItem("userType")=="m" ? 
          ( <a className="nav-link active"  onClick={setToken} aria-current="page" href="/registerZ">Zaposleni</a>) 
           :    ( <a  className="nav-link disabled"  onClick={setToken} aria-current="page"  tabindex="-1" aria-disabled="true" href="/registerZ">Zaposleni</a>)  }
          </li>
          
          <li className="nav-item">
          {("" == window.sessionStorage.getItem("token") || window.sessionStorage.getItem("token")==null)
           ? (<a className="nav-link" href="/login" >Login</a>) :
            (<a className="nav-link"  onClick={props.logout} href="/login">Logout</a> )}          </li>
          <li className="nav-item dropdown">
            
            
          </li>
          <li className="nav-item">
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <Outlet/>{("" == window.sessionStorage.getItem("token")) ? (<div>Kako biste pristupili funkcionalnostima BarManagement aplikacije, ulogujte se!</div>) : (<></> )}</div>
 
  )
}

export default NavBar