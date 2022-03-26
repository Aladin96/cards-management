import React from 'react';

const TotalCards = () => {
    return (
        <>
        <div className="col-lg-7">
            <div className="row">
              <div class="col-md-6 mt-5 mb-3">
                    <div class="card">
                        <div class="seo-fact sbg2">
                            <div class="p-4 d-flex justify-content-between align-items-center">
                                <div class="seofct-icon"><i class="ti-thumb-up"></i>Nombre des cartes d'entrées</div>
                                <h2>2,315</h2>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mt-md-5 mb-3">
                    <div class="card">
                        <div class="seo-fact sbg3">
                            <div class="p-4 d-flex justify-content-between align-items-center">
                                <div class="seofct-icon"><i class="ti-share"></i> Nombre des cartes Sorties</div>
                                <h2>3,984</h2>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
 </>);
}
 
export default TotalCards;