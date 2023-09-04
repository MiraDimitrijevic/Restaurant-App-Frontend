import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Meni() {
   

 
  return (<>
 
    <table id="tableMeni" class="display" >
    <thead><tr>
      <th id="idStavke">Rbr</th>
        <th>Naziv</th>
        <th>Cena</th>
        <th>Opsirnije</th>
        <th>Napomene</th>
        <th>Jedinica mere</th>
        <th>Vrsta</th>
        <th>Poruci</th>
        <th>Izmeni</th>
        <th>Obrisi</th>
        </tr>
        </thead>

    
</table>


</>
  )
}

export default Meni