import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Porudzbine() {
   

 
  return (<>
  <div style={{maxHeight:'20px'}}>
 <h3 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center', color:'#1D5D9B'}}>PORUDZBINE</h3>
 </div>
    <table id="tablePorudzbine" class="display" style={{backgroundColor: '#E4F1FF'}} >
    <thead><tr>
      <th id="idStavke">Rbr</th>
        <th>Datum i vreme</th>
        <th>Ime gosta</th>
        <th>Prezime gosta</th>
        <th>Popust</th>
        <th>Cena</th>
        <th>Placeno</th>
        <th>Konobar</th>
        <th>Naplati</th>
        <th>Prikazi</th>
        </tr>
        </thead>

    
</table>


</>
  )
}

export default Porudzbine