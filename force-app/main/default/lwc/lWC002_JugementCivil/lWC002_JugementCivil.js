import { api, LightningElement, track } from 'lwc';
import getJugementCivil from '@salesforce/apex/DM002_JugementCivil.getJugementCivil';

const columns = [
    { label: 'Réference du jugement', fieldName: 'Name' },
    { label: 'Statut', fieldName: 'Statut__c'},
    { label: 'Date du jugement', fieldName: 'DateJugement__c'}
];

export default class LWC001_JugementCivil extends LightningElement {
  @api recordId;
  @track data = [];
  columns = columns;
  getData(){
    getJugementCivil({dossierId:this.recordId}).then(result=>
      {
        this.data=result;
        console.log(this.recordId);
        console.log(this.data);
      })
      .catch(error=>{console.log(error)});
  }
  // eslint-disable-next-line @lwc/lwc/no-async-await
  connectedCallback() {
      this.getData(this.recordId);
  }
}