import { api, LightningElement, track } from 'lwc';
import getMissionExpert from '@salesforce/apex/DM006_MissionExpert.getMissionExpert'

export default class LWC006_MissionExpert extends LightningElement {
  @api recordId;
  @track MissionExpert = [];

  getData(){
    getMissionExpert({dossierId:this.recordId}).then(result=>
      {
        this.MissionExpert=result;
        console.log(this.recordId);
        console.log(this.MissionExpert);
      })
      .catch(error=>{console.log(error)});
  }
  // eslint-disable-next-line @lwc/lwc/no-async-await
  connectedCallback() {
      this.getData(this.recordId);
  }
}