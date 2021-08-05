import { LightningElement, api, wire } from 'lwc';
import getFieldSetMember from '@salesforce/apex/FieldSetController.getFieldSetMember';

export default class LWC009_Auxiliare extends LightningElement {

    fields=[];
    v=true;
    @api fieldSetName;
    @api objectApiName;

    @wire(getFieldSetMember, {objectName: '$objectApiName', fieldSetName: '$fieldSetName'})
    wiredFieldsToFetchFieldSet({error,data}) 
    {

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
}