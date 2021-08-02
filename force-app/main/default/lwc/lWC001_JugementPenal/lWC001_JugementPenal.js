import { api, LightningElement, track } from 'lwc';
import getJugementPenal from '@salesforce/apex/DM001_Jugement.getJugementPenal'

const columns = [
    { label: 'Réference du jugement', fieldName: 'Name' },
    { label: 'Statut', fieldName: 'Statut__c'},
    { label: 'Date du jugement', fieldName: 'DateJugement__c'}
];

export default class LWC001_JugementPenal extends LightningElement {
  @api recordId;
  @track data = [];
  columns = columns;
  getData(){
    getJugementPenal({dossierId:this.recordId}).then(result=>
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