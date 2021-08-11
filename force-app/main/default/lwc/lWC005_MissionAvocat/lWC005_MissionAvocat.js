import { api, LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getMissionAvocat from '@salesforce/apex/DM005_MissionAvocat.getMissionAvocat'
import DATE_FIELD from '@salesforce/schema/Mission__c.DateMissionnement__c'
import ETAT_FIELD from '@salesforce/schema/Mission__c.EtatMissionnement__c'
import MISSION_OBJECT from '@salesforce/schema/Mission__c'
import AVOCAT_FIELD from '@salesforce/schema/Mission__c.Avocat__c'
import TYPE_FIELD from '@salesforce/schema/Mission__c.TypeMissionnement__c'


export default class LWC005_MissionAvocat extends LightningElement {
  @api recordId;
  @track MissionAvocat = [];
  @api missionObject;

  
  fields = [AVOCAT_FIELD,ETAT_FIELD, DATE_FIELD,TYPE_FIELD];

  @track recordTypeId;

@wire(getObjectInfo, { objectApiName: MISSION_OBJECT })
handleObjectInfo({error, data}) {
    if (data) {
      
        console.log("data is here");
        console.log(data);
        
        const rtis = data.recordTypeInfos;
        this.recordTypeId = Object.keys(rtis).find(rti => rtis[rti].name === 'Avocat');
        console.log(rtis);
        console.log(this.recordTypeId);
    }
    else if ( error ) {
      console.log( "error is here");
  }
    
}
  
  // getData(){
  //   getMissionAvocat({dossierId:this.recordId}).then(result=>
  //     {
  //       this.MissionAvocat=result;
  //       console.log(this.recordId);
  //       console.log(this.data);
  //     })
  //     .catch(error=>{console.log(error)});
  // }
  // // eslint-disable-next-line @lwc/lwc/no-async-await
  // connectedCallback() {
  //     this.getData(this.recordId);
  // }
}