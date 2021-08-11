import { LightningElement,api,track,wire } from 'lwc';
import DossierInterneIsNull from '@salesforce/apex/DM010_DossierJudiciaire.DossierInterneIsNull';
import AffecterToDJ from '@salesforce/apex/DM007_DossierInterne.AffecterToDJ';
import NbrVictimeSinistre from '@salesforce/apex/DM010_DossierJudiciaire.NbrVictimeSinistre';


export default class LWC012_RetirerSinistre extends LightningElement {
    @api recordId;
    @track RetirerSinistreModal = false; 
    showRetirerSinistre() { 
        this.RetirerSinistreModal = true;
    }
    hideRetirerSinistre() {        
        this.RetirerSinistreModal = false;
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

        NbrVictimeSinistre({
            id: this.recordId
        }).then(result =>{
            console.log(result);
            if (result == 0 ) {
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
            else{
                console.log("r");
            }
        })
        .catch(error => {
            console.log(error);

        })
        
    }
}