import { api, LightningElement, track } from 'lwc';
import getAuxiliaireAvocat from '@salesforce/apex/DM003_AuxiliaireAvocat.getAuxiliaireAvocat';
import CreateRecordAffAux from '@salesforce/apex/DM003_AuxiliaireAvocat.CreateRecordAffAux';

export default class LWC003_AuxiliaireAvocat extends LightningElement {

  @track Avocat = [];
  @api recordId;
  @track openModal = false;

  getData(){
    getAuxiliaireAvocat().then(result=>
      {
        this.Avocat = result;
        console.log('Hello' + this.Avocat);
      })
      .catch(error=>{console.log(error)});
  }

  AffecterAux(event){
    let targetId = event.target.dataset.id;
    let targetName = event.target.dataset.name;
    let targetType = event.target.dataset.type;
    console.log(targetId);
    console.log(targetName);
    console.log(targetType);
    console.log(this.recordId);
    CreateRecordAffAux({AuxId:targetId, DjId:this.recordId, AuxName:targetName, AuxType:targetType}).then(resultAff=>{});
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  connectedCallback() {
      this.getData(this.recordId);
  }
}