import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Porudzbina() {
   

 
  return (<>
  <div style={{maxHeight:'20px'}}>
 <h3 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center', color:'#1D5D9B'}}>PORUDZBINA</h3>
 </div>
    <table id="tableSP" className="display" style={{backgroundColor: '#E4F1FF'}}>
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