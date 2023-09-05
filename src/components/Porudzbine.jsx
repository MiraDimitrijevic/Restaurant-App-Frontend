import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Porudzbine() {
   

 
  return (<>
 
    <table id="tablePorudzbine" class="display" >
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