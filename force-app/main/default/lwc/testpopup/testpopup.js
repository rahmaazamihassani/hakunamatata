import { LightningElement, wire, track, api } from 'lwc';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import VILLE_FIELD from '@salesforce/schema/Auxiliaire__c.Ville__c';
import TYPE_EXPERT from '@salesforce/schema/Auxiliaire__c.TypeExpert__c'
import AUXILIAIRE_OBJECT from  '@salesforce/schema/Auxiliaire__c';

import CreateRecordAffAux from '@salesforce/apex/DM003_AuxiliaireAvocat.CreateRecordAffAux';
import getAuxiliaireList from '@salesforce/apex/customSearchSobjectLWC.getAuxiliaireList';

export default class Testpopup extends LightningElement {
    value ='';
    value2 = '';
    valueType = '';
    @track auxRecord=[];
    @track allRecord;
    @api recordId;

    searchValue = '';

    columns = [
        { label: 'Nom', fieldName: 'Name' },
        { label: 'Type Expert', fieldName: 'TypeExpert__c' },
        { label: 'Ville', fieldName: 'Ville__c'  },
        { label: 'Type Auxiliaire', fieldName: 'RecordType.DeveloperName' },
    ];
    type=true;
    typeExpert=false;
    get options() {
        return [
            { label: 'Sélectionner un choix', value: 'Sélectionner un choix' },
            { label: 'Avocat', value: 'Avocat' },
            { label: 'Expert', value: 'Expert' },     
        ];
    }

    @wire(getObjectInfo, { objectApiName: AUXILIAIRE_OBJECT })
    auxMetadata;

    @wire(getPicklistValues,{recordTypeId: '$auxMetadata.data.defaultRecordTypeId', fieldApiName: VILLE_FIELD})
    villeAux;

    @wire(getPicklistValues,{recordTypeId: '$auxMetadata.data.defaultRecordTypeId',fieldApiName: TYPE_EXPERT})
    typeExpertAux;
    // on select picklist value to show the selected value
    handleChange(event) {
        this.value = event.detail.value;
    }
    handleChangeType(event) {
        this.valueType = event.detail.value;
        if(this.valueType=='Expert'){
            this.typeExpert = true;
            
        }
        else{
            this.typeExpert = false;
        }


    }
    handleChange2(event) {

        this.value2 = event.detail.value;
    }
   
    
    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }

    searchValueKey(event) {
        this.value = event.target.value;
        console.log(this.value);
    }

    searchValue2Key(event) {
        this.value2 = event.target.value;
        console.log(this.value2);

    }


    @track datahere=true;
    // call apex method on button click 
    handleSearchKeyword() {
      
        getAuxiliaireList({
                valuekey: this.value,
                recordType: this.valueType,
                value2key:this.value2,
                searchKey: this.searchValue,
                id:this.recordId
            })

                .then(result => {
                    this.auxRecord = result;

                    this.datahere = false;
                    if(this.auxRecord.length ==0){
                        this.datahere=true;
                    }
                    console.log(result);
                })
                .catch(error => {
                    this.datahere = true;
                    this.auxRecord = undefined;
                    console.log(error);
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.auxRecord = null;
                });
        
    }

   
    @track preselectedIds = [];
getSelectedAux() {
    let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
    let rowsObject = JSON.parse(JSON.stringify(selectedRows));
    console.log(rowsObject)
    rowsObject.forEach(element => {
        let targetId = element.Id;
        let targetName = element.Name;
        let targetType = element.RecordType.DeveloperName;
        console.log(targetType);
        CreateRecordAffAux({AuxId:targetId,DjId:this.recordId,AuxName:targetName,AuxType:targetType})
        .then(data=>{
            console.log(data);
        })
        .catch(error =>{
            console.log(error);
        });
    });

}

@track customFormModal = false; 
    
customShowModalPopup() {            
    this.customFormModal = true;
}

customHideModalPopup() {    
    
    this.customFormModal = false;
}

}