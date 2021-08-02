import { api, LightningElement, track } from 'lwc';
import getMissionAvocat from '@salesforce/apex/DM005_MissionAvocat.getMissionAvocat'


export default class LWC005_MissionAvocat extends LightningElement {
  @api recordId;
  @track MissionAvocat = [];
  
  getData(){
    getMissionAvocat({dossierId:this.recordId}).then(result=>
      {
        this.MissionAvocat=result;
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