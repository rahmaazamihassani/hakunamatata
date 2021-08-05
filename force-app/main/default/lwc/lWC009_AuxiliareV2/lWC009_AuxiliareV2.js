import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { api, LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getFieldSetMember from '@salesforce/apex/FieldsetsController.getFieldSetMember';
import  OPPORTUNITY  from '@salesforce/schema/Opportunity';
import OPPORTUNITY_TYPE from '@salesforce/schema/Opportunity.Type';
export default class LWC009_AuxiliareV2 extends LightningElement {
   
v=true;
    @api fieldSetName;
    @api objectApiName;
    fields = [];
    @wire(getFieldSetMember, {objectName: '$objectApiName', fieldSetName: '$fieldSetName'})
    wiredFieldsToFetchFieldSet({data,error})
    {
        console.log(data)
        if (data) {
            console.log('dataaaa')
            console.log(data)
            const f =[];

            data.forEach(function(item) {
               f.push(item.fieldAPIName);
            });
            this.fields = f;
            console.log(this.fields);
        
        } else if (error) {
            console.log('errrrrrrrrr')
            console.log(error);
        }
    }

    @wire(getObjectInfo, { objectApiName: OPPORTUNITY })
    auxiliaireObject;
    @wire(getPicklistValues,

        {

            recordTypeId: '$auxiliaireObject.data.defaultRecordTypeId', 

            fieldApiName: OPPORTUNITY_TYPE

        }

    )    
     pickValues;

     handleChange(event) {
       this.value = event.detail.value;
       console.log(wiredFieldsToFetchFieldSet);
     }
}