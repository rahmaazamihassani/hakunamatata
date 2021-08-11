import { api, LightningElement, track, wire } from 'lwc';
import getVictimeDossier from '@salesforce/apex/DM008_VictimeSinistre.getVictimeDossier';
import DossierInterne from '@salesforce/schema/DossierJudiciaire__c.DossierInterne__c';
import { getRecord } from 'lightning/uiRecordApi';
import getDossierId from '@salesforce/apex/DM008_VictimeSinistre.getDossierId';
import getVictimeSearchList from '@salesforce/apex/DM008_VictimeSinistre.getVictimeSearchList';
import CreateRecordAffVic from '@salesforce/apex/DM008_VictimeSinistre.CreateRecordAffVic';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LWC013_VictimeSinistre extends LightningElement {
    @track customFormModal = false; 
    searchValue='';
    @track victimes=[];
    @api recordId;
    @track datahere=true;
    @wire(getRecord, { recordId: '$recordId', fields: [DossierInterne] })
    dossierI;
    columns = [
        { label: 'Nom de la victime', fieldName: 'Name' },
        { label: 'Civilité', fieldName: 'Civilite__c'  },
        { label: 'Etat de santé', fieldName: 'EtatSante__c'  },
        { label: 'CIN', fieldName: 'CIN__c'  },
        { label: 'Age', fieldName: 'Age__c'  },
    ];
  
   customShowModalPopup() {            
      this.customFormModal = true;
      this.getVictime();
  }

  customHideModalPopup() {    
    this.customFormModal = false;
  }
  searchKeyword(event) {
    this.searchValue = event.target.value;
  }

  IdD='';
  getIdDossier() {
    getDossierId({dossierJudi: this.recordId})
    .then(result => {
       this.IdD = result[0].DossierInterne__c;
      }).catch(error => {
        console.log('errrrrrrrrror111');
        console.log(error);
      });
    }

  getVictime() {
    this.getIdDossier();
    console.log(this.IdD);
    getVictimeDossier({DossierInterneID: this.IdD,DossierJudiID:this.recordId})
    .then(result => {
        console.log('result victime')
        this.victimes = result;
        this.datahere = false;
        console.log(result);
      }).catch(error => {
        console.log('errrrrrrrrror');
        console.log(error);
        this.datahere = true;
      });
    }

    handleSearchKeyword(){
      this.getIdDossier();
      if(this.searchValue !=''){
        getVictimeSearchList({searchKey: this.searchValue,DossierInterneID: this.IdD,DossierJudiID:this.recordId})
        .then(result => {
        this.victimes = result;
        this.datahere = false;
        if(this.victimes.length ==0){
          this.datahere=true;
      }
        }) 
        .catch(error =>{
          console.log(error);
          this.datahere = true;
        });
      }
      else {
        this.getVictime();
      }
    
      }

      

  @track preselectedIds = [];
  getSelectedVic() {
    let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
    let rowsObject = JSON.parse(JSON.stringify(selectedRows));
    console.log('roooooows')
    console.log(rowsObject);
    rowsObject.forEach(element => {
      let targetId = element.Id;
      let targetName = element.Name;
      CreateRecordAffVic({VicId:targetId,DjId:this.recordId,VicName:targetName})
      .then(data=>{
        console.log("Tiw 3lik", data);
        this.victimes=undefined;
        this.customHideModalPopup();
        const event = new ShowToastEvent({
          title: 'Victime affectée avec succès.',
          variant: 'success'
        });
        this.dispatchEvent(event);
      })
      .catch(error =>{
        console.log(error);
      });
    });
  }

  connectedCallback(){
    this.getIdDossier();
   // this.getVictime();
   this.getVictime(this.IdD,this.recordId);

 }
}