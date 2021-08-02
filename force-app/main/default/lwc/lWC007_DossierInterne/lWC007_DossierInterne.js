/**
 * @description       : 
 * @author            : Ahmed HILALI
 * @group             : 
 * @last modified on  : 07-15-2021
 * @last modified by  : Ahmed HILALI
 * Modifications Log 
 * Ver   Date         Author         Modification
 * 1.0   07-15-2021   Ahmed HILALI   Initial Version
**/
import { api, LightningElement, track} from 'lwc';
import getDossierLitige from '@salesforce/apex/DM007_DossierInterne.getDossierLitige'
import getSinistre from '@salesforce/apex/DM007_DossierInterne.getSinistre'
import getDossierJudiciaire from '@salesforce/apex/DM007_DossierInterne.getDossierJudiciaire'
import { updateRecord } from 'lightning/uiRecordApi';


const columns = [
    { label: 'Référence du dossier', fieldName: 'Name'}
];

export default class LWC007_DossierInterne extends LightningElement {
  @api recordId;
  @track data = [];
  columns = columns;
  @track dossierI = [];
  @track recordDossType = '';
  
  getData(){
    getDossierJudiciaire({'dossierId':this.recordId}).then(result=>
      { 
        if(result.Entite__c ==='Resources humaines (social)' || result.Entite__c ==='Recouvrement' || result.Entite__c ==='Affaires juridiques'){
          getDossierLitige().then(resultLitige => {
            this.data = resultLitige;
            this.dossierI = resultLitige;
            this.recordDossType = this.dossierI[0].RecordType.Name;
            // console.log(resultLitige);
            //console.log(this.recordDossType);
          })
        }else{
          getSinistre().then(resultSinistre => {
            this.data = resultSinistre;
            this.dossierI = resultSinistre;
            this.recordDossType = this.dossierI[0].RecordType.Name;
            //console.log(this.recordDossType);
            //console.log(resultSinistre);
          })
        }
      })
  }

  AffecterDI(event){
    let targetId = event.target.dataset.id;
    console.log(targetId);
    var fields = {};
    fields['DossierInterne__c']= targetId;
    fields['Id']= this.recordId;
    const recordInput = {fields};
    updateRecord(recordInput).then(() =>{
      console.log('Update Succesful');
      this.AffecterDI2(targetId);
    })
    .catch(error=>
      {
        console.log('UpdateError : ', error.message);
      });
  }

  AffecterDI2(targetId){
    var fields = {};
    fields['DossierJudiciaire__c']= this.recordId;
    fields['Id']= targetId ;
    const recordInput = {fields};
    updateRecord(recordInput).then(() =>{
      console.log('Update Succesful 2');
    })
    .catch(error=>
      {
        console.log('UpdateError 2: ', error.message);
      });
  }


  connectedCallback() { 
    this.getData();
  }
  renderedCallback() { 
    //this.getData();
  }
}