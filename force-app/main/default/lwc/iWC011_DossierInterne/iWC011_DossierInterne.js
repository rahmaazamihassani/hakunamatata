import { LightningElement,track } from 'lwc';
import getDossierInterne from '@salesforce/apex/customSearchSobjectLWC.getDossierInterne';

export default class LWC011_DossierInterne extends LightningElement {
    Societaire='';
    Police='';
    Date;
    Reference='';

    DossierLitigeRecords ;

    columns = [
        { label: "Référence", fieldName: 'Name' },
        { label: 'Sociétaire', fieldName: 'Societaire__c' },
        { label: 'Police', fieldName: 'Police__c'  },
        { label: "Date d'ouverture", fieldName: 'DateOuverture__c' }      
    ];


    searchSocietaire(event) {
        this.Societaire = event.target.value;
        console.log(this.Societaire);
    }

    searchPolice(event) {
        this.Police = event.target.value;
        console.log(this.Police);
    }

    searchDate(event) {
        this.Date = event.target.value;
        console.log(this.Date);
    }

    searchReference(event) {
        this.Reference = event.target.value;
        
    }


    handleSearchKeyword(){

        getDossierInterne({
            Societaire: this.Societaire,
            Police: this.Police,
            DateOuverture:this.Date,
            Name: this.Reference,
            Type:'DossierLitige'
        })
        .then(sinistreRecords =>{
            this.DossierLitigeRecords = DossierLitigeRecords;
        })
        .catch(error => {
            this.DossierLitigeRecords = undefined;
            console.log('r');

        })
    }



    @track customFormModal = false; 
    customShowModalPopup() {            
        this.customFormModal = true;
    }
    customHideModalPopup() {        
        this.customFormModal = false;
    }
    
}