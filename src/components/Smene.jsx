import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Smene() {
   

 
  return (<>
 
    <table id="tableSmene" class="display" >
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