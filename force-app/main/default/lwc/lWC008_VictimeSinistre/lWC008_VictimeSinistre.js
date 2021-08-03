import { api, LightningElement, track} from 'lwc';
import getVictimeSinistre from '@salesforce/apex/DM008_VictimeSinistre.getVictimeSinistre'
import getDossierJudiciaire from '@salesforce/apex/DM008_VictimeSinistre.getDossierJudiciaire'
import { updateRecord } from 'lightning/uiRecordApi';

export default class LWC008_VictimeSinistre extends LightningElement {

  @api recordId;
  @track VictimeS = [];
  @track dossierInterId;


  getData(){
    getDossierJudiciaire({'dossierId':this.recordId}).then(result=>
      {
        console.log(result);
        this.dossierInterId=result.Sinistre__c;
        this.getData1(result.Sinistre__c);
      })
  }

  getData1(DossierInterneId){
    getVictimeSinistre({'DossierInterneID' : DossierInterneId})
    .then(resultVictime=> {
      console.log('Dossier Interne ID: ' + this.dossierInterId);
      this.VictimeS = resultVictime;
      console.log(resultVictime);
    })
  }

  AffecterVS(event){
    let targetId = event.target.dataset.id;
    console.log(targetId);
    var fields = {};
    fields['DossierJudiciaire__c']= this.recordId;
    fields['Id']= targetId;
    const recordInput = {fields};
    updateRecord(recordInput).then(() =>{
      console.log('Update Successful');
    })
    .catch(error=>{
        console.log('UpdateError : ', error.message);
    });
  }

  RetirerVS(event){
    let targetId = event.target.dataset.id;
    console.log(targetId);
    var fields = {};
    fields['DossierJudiciaire__c']= null;
    fields['Id']= targetId;
    const recordInput = {fields};
    console.log('TO UPDATE !');
    updateRecord(recordInput).then(() =>{
      console.log('Update Successful');
    })
    .catch(error=>{
        console.log('UpdateError : ', error.message);
    });
  }
  
  connectedCallback() { 
    console.log('connectedCallback Entered');
    this.getData();
  }
  /*
  renderedCallback() { 
    //console.log('renderedCallback Entered');
    //this.getData();
  }
  */
}