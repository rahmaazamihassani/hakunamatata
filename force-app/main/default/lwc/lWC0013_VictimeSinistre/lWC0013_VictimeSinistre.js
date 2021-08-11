import { LightningElement, track } from 'lwc';

export default class LWC0013_VictimeSinistre extends LightningElement {
    @track customFormModal = false; 
    searchValue='';
    @track victimes=[];
    columns = [
        { label: 'Nom de la victime', fieldName: 'Name' },
        { label: 'Civilité', fieldName: 'Civilite__c'  },
        { label: 'Etat de santé', fieldName: 'EtatSante__c'  },
        { label: 'CIN', fieldName: 'CINVictime__c'  },
     //   { label: 'Age', fieldName: 'Civilite__c'  },
    ];

   customShowModalPopup() {            
      this.customFormModal = true;
  }

  customHideModalPopup() {    
    this.customFormModal = false;
  }
  searchKeyword(event) {
    this.searchValue = event.target.value;
  }
}