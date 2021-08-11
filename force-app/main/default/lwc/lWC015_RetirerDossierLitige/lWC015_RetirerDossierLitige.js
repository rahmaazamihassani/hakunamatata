import { LightningElement,api,track,wire } from 'lwc';
import DossierInterneIsNull from '@salesforce/apex/DM010_DossierJudiciaire.DossierInterneIsNull';
import AffecterToDJ from '@salesforce/apex/DM007_DossierInterne.AffecterToDJ';

export default class LWC012_RetirerSinistre extends LightningElement {
    @api recordId;
    @track RetirerDossierLitigeModal = false; 
    showRetirerDossierLitige() { 
        this.RetirerDossierLitigeModal = true;
    }
    hideRetirerDossierLitige() {        
        this.RetirerDossierLitigeModal = false;
    }

    @track showButton = true; 
    @wire  (DossierInterneIsNull, { id: '$recordId' }) IsNull({error, data}){

        that = this;

        let myPromise = new Promise(function(myResolve, myReject) {
         
            if (data) {
              myResolve(data);
            } else {
              myReject(error);
            }
          });

          myPromise.then(
            function(value) {
                console.log('done');
                console.log('DossierInterneIsNull     : '+value);
            if(value == 1){that.showButton=false;}
                
            },
            function(error) {console.log('DossierInterneIsNull Error :' , error);}
          );

    }


    clearDossier(){
      
      AffecterToDJ({
      DI: null,
      DJ: this.recordId
  })
  .then(result =>{
      console.log(result);
  })
  .catch(error => {
      console.log(error);

  })
      
  }
}