import { api, LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import AYANTDROIT_OBJECT from '@salesforce/schema/AyantDroit__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAyantDroitList from '@salesforce/apex/test_ayant_droit.getAyantDroitList';

import getAyantDroit from '@salesforce/apex/test_ayant_droit.getAyantDroit';
import CreateRecordAffAyd from '@salesforce/apex/test_ayant_droit.CreateRecordAffAyd';

export default class LWC014_AyantDroit extends LightningElement {
  @api recordId;

  @track Record=[];
  @track AyantDroit = [];
  @track tableData;
  @track datahere=true;

  searchValue = '';
  searchValue1 = '';

  columns = [
    { label: 'Nom', fieldName: 'Name' },
    { label: 'CIN', fieldName: 'CINAyantDroit__c'  },
    { label: 'Civilité', fieldName: 'Civilite__c' },
    { label: 'Victime Sinistre', fieldName: 'Nom_Victime_Sinistre__c'  },
    { label: 'Age', fieldName: 'AgeRevolu__c'  }
];

  @wire(getObjectInfo, { objectApiName: AYANTDROIT_OBJECT })
  ADMetadata;

  searchKeyword(event) {
    this.searchValue = event.target.value;
  }
  searchKeyword1(event) {
    this.searchValue1 = event.target.value;
  }

  handleSearchKeyword() {
    getAyantDroitList({
        searchKey: this.searchValue,
        searchKey1: this.searchValue1,
        id:this.recordId
      }).then(result => {
        this.Record = result;
        this.datahere = false;
        if(this.Record.length ==0){
            this.datahere=true;
        }
        console.log(result);
      }).catch(error => {
        this.datahere = true;
        this.Record = undefined;
        console.log(error);
        const event = new ShowToastEvent({
          title: 'Error',
          variant: 'error',
          message: error.body.message,
        });
        this.dispatchEvent(event);
        this.Record = null;
      });
  }

  @track preselectedIds = [];
  getSelectedAux() {
    let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
    let rowsObject = JSON.parse(JSON.stringify(selectedRows));
    console.log(rowsObject);
    rowsObject.forEach(element => {
      let targetId = element.Id;
      let targetName = element.Name;
      CreateRecordAffAyd({AydId:targetId,DjId:this.recordId,AydName:targetName})
      .then(data=>{
        console.log("Tiw 3lik", data);
        this.Record=undefined;
        this.customHideModalPopup();
        const event = new ShowToastEvent({
          title: 'Ayant Droit affecté avec succès.',
          variant: 'success'
        });
        this.dispatchEvent(event);
        window.location.reload();
      })
      .catch(error =>{
        console.log(error);
      });
    });
  }
  @track customFormModal = false; 
    
  customShowModalPopup() {            
      this.customFormModal = true;
  }

  customHideModalPopup() {    
    this.customFormModal = false;
  }

//Display Auxiliaires Affectés in a table
  
  getData(){
    getAyantDroit({dossierId:this.recordId}).then(result=>
      {
        this.AyantDroit = result;
        console.log('Hello' + this.AyantDroit);
      })
      .catch(error=>{console.log(error)});
  }

  connectedCallback() {
      this.getData(this.recordId);
  }
}