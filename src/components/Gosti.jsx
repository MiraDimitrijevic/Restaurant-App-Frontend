import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Gosti() {
   

 
  return (<>
 
    <table id="tableGosti" class="display" >
    <thead><tr>
      <th id="idStavke">ID gost</th>
        <th>ID user</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Godiste</th>
        <th>Popust</th>
        <th>Zaduzenje</th>
        <th>Daj popust (20%)</th>
        </tr>
        </thead>

    
</table>


</>
  )
}

export default Gosti