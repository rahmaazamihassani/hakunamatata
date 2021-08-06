import { api, LightningElement, track } from 'lwc';
import getAuxiliaireExpert from '@salesforce/apex/DM004_AuxiliaireExpert.getAuxiliaireExpert';
import CreateRecordAffAux from '@salesforce/apex/DM004_AuxiliaireExpert.CreateRecordAffAux';


export default class LWC004_AuxiliaireExpert extends LightningElement {

  @track Expert = [];
  @api recordId;
  @track openModal = false;

  getData(){
    getAuxiliaireExpert({dossierId:this.recordId}).then(result=>
      {
        this.Expert = result;
        console.log('Hellooo' + this.Expert);
      })
      .catch(error=>{console.log(error)});
  }

  // closeModal() {
  //     this.openModal = false;
  // }

  // AffecterAux(event){
  //   let targetId = event.target.dataset.id;
  //   let targetName = event.target.dataset.name;
  //   let targetType = event.target.dataset.type;
  //   console.log(targetId);
  //   console.log(targetName);
  //   console.log(targetType);
  //   console.log(this.recordId);
  //   CreateRecordAffAux({AuxId:targetId, DjId:this.recordId, AuxName:targetName, AuxType:targetType}).then(resultAff=>{});
  //   this.openModal = true;
  // }

  connectedCallback() {
      this.getData();
  }
}