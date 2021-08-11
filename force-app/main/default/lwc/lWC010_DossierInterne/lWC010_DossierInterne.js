import { LightningElement,track,api,wire } from 'lwc';
import getDossierInterne from '@salesforce/apex/customSearchSobjectLWC.getDossierInterne';
import AffecterToDJ from '@salesforce/apex/DM007_DossierInterne.AffecterToDJ';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DossierInterneIsNull from '@salesforce/apex/DM010_DossierJudiciaire.DossierInterneIsNull';

export default class LWC010_DossierInterne extends LightningElement {


    @api recordId;
    @track showButton = false; 
    return = 0;

    

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
            if(value == 1){that.showButton=true;}
                
            },
            function(error) {console.log('DossierInterneIsNull Error :' , error);}
          );

    }


    
    Societaire='';
    Police='';
    Date;
    Reference='';
    result;



    sinistreRecords ;
    litigeRecords ;

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
            Type:'Sinistre'
        })
        .then(sinistreRecords =>{
            this.sinistreRecords = sinistreRecords;
        })
        .catch(error => {
            this.sinistreRecords = undefined;
            console.log('r');

        })
    }

    

    getDossier(){
        var el = this.template.querySelector('lightning-datatable');
        //console.log(el);
        var selected = el.getSelectedRows();
        //console.log(selected);
        let rowsObject = JSON.parse(JSON.stringify(selected));
        //console.log(rowsObject);
        console.log('ID:    '+rowsObject[0].Id);
        var idd = rowsObject[0].Id;
        var record = this.recordId;
        console.log('recordId:   '+this.recordId);
            AffecterToDJ({
                DI: idd,
                DJ: record
            }).then(result =>{
                this.result = result;
                this.customHideModalPopup();
                const event = new ShowToastEvent({
                title: 'Sinistre affecté avec succès.',
                variant: 'success'
        });
        this.dispatchEvent(event);
                console.log('resultat:   '+result);
            })
            .catch(error => {
                this.result = 0;
                console.log('r');
    
            }) 
            
    }



    @track customFormModal = false; 
    customShowModalPopup() {   
        this.Societaire='';
    this.Police='';
    this.Date = null;
    this.Reference='';        
        getDossierInterne({
            Societaire: this.Societaire,
            Police: this.Police,
            DateOuverture:this.Date,
            Name: this.Reference,
            Type:'Sinistre'
        })
        .then(sinistreRecords =>{
            this.sinistreRecords = sinistreRecords;
        })
        .catch(error => {
            this.sinistreRecords = undefined;
            console.log('r');

        }) 
        this.customFormModal = true;
    }
    customHideModalPopup() {        
        this.customFormModal = false;
    }

   


    
}