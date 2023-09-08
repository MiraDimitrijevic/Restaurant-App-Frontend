import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Smene() {
   

 
  return (<>
  <div style={{maxHeight:'20px'}}>
 <h3 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center', color:'#1D5D9B'}}>SMENE</h3>
 </div>
    <table id="tableSmene" class="display" style={{backgroundColor: '#E4F1FF'}}>
    <thead><tr>
      <th id="idStavke">Rbr</th>
        <th>Datum</th>
        <th>Smena</th>
        <th>Ukupan promet</th>
        <th>Ime konobara</th>
        <th>Prezime konobara</th>
        </tr>
        </thead>

    
</table>


</>
  )
}

export default Smene