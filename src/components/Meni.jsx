import React from 'react';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";




function Meni() {
   

 
  return (<>
 <div style={{maxHeight:'20px'}}>
 <h3 className="mb-5 text-uppercase fw-bold" style={{textAlign:'center', color:'#1D5D9B'}}>MENI</h3>
 </div>
    <table id="tableMeni" class="display" style={{backgroundColor: '#E4F1FF'}} >
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
        <th >Obrisi</th>
        </tr>
        </thead>

    
</table>


</>
  )
}

export default Meni