import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Porudzbina() {
   

 
  return (<>
 
    <table id="tableSP" className="display" >
    <thead><tr>
      <th id="idStavke">Rbr</th>
      <th>Naziv</th>
      <th>Kolicina</th>

        </tr>
        </thead>

    
</table>


</>
  )
}

export default Porudzbina