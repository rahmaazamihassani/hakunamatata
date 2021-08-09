import { LightningElement, wire, track, api } from 'lwc';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import VILLE_FIELD from '@salesforce/schema/Auxiliaire__c.Ville__c';
import AUXILIAIRE_OBJECT from  '@salesforce/schema/Auxiliaire__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CreateRecordAffAux from '@salesforce/apex/DM003_AuxiliaireAvocat.CreateRecordAffAux';
import getAvocatList from '@salesforce/apex/testAvocat.getAvocatList';

export default class Test_aux_avocat extends LightningElement {
    value ='';
    // value2 = '';
    // valueType = '';
    @track auxRecord=[];
    @track allRecord;
    @api recordId;
    optionsv = [];
    picklistOptions = [];
    selectedValue;

    // optionsT = [];
    // picklistOptionsT = [];
    // selectedValueT;

    searchValue = '';

    columns = [
        { label: 'Nom', fieldName: 'Name' },
        { label: 'Ville', fieldName: 'Ville__c'  },
        { label: "Type d'auxiliaire", fieldName: 'TypeAuxiliaire__c' },
        // { label: "Type d'expert", fieldName: 'TypeExpert__c' }
    ];
    type=true;
    typeExpert=false;
    // get options() {  
    //     return [
    //         { label: '-Aucun-', value: '-Aucun-' },
    //         { label: 'Avocat', value: 'Avocat' },
    //         { label: 'Expert', value: 'Expert' },     
    //     ];
    // }

   

    @wire(getObjectInfo, { objectApiName: AUXILIAIRE_OBJECT })
    auxMetadata;

    @wire(getPicklistValues,{recordTypeId: '$auxMetadata.data.defaultRecordTypeId', fieldApiName: VILLE_FIELD})
     wiredData( { error, data } ) {

        if ( data ) {
            var a = {label:"-Aucun-",value:"-Aucun-"};
            this.optionsv = data.values.map( objPL => {
 
                return {
                    label: `${objPL.label}`,
                    value: `${objPL.value}`
                };
            });
            this.optionsv.unshift(a);
            console.log(this.optionsv);
            
        } else if ( error ) {
            console.log( error);
        }

    }
    
    // @wire(getPicklistValues,{recordTypeId: '$auxMetadata.data.defaultRecordTypeId',fieldApiName: TYPE_EXPERT})
    // wiredDatai( { error, data } ) {

    //     if ( data ) {
    //         var a = {label:"-Aucun-",value:"-Aucun-"};
    //         this.optionsT = data.values.map( objPL => {
 
    //             return {
    //                 label: `${objPL.label}`,
    //                 value: `${objPL.value}`
    //             };
    //         });
    //         this.optionsT.unshift(a);
    //         console.log(this.optionsT);
            
    //     } else if ( error ) {
    //         console.log( error);
    //     }

    // }
    // on select picklist value to show the selected value
    handleChange(event) {
        this.value = event.detail.value;
        
    }
    // handleChangeType(event) {
    //     this.valueType = event.detail.value;
    //     if(this.valueType=='-Aucun-'){
    //         this.valueType = '';
    //     }
    //     if(this.valueType=='Expert'){
    //         this.typeExpert = true;
            
    //     }
    //     else{
    //         this.typeExpert = false;
    //     }


    // }
    // handleChange2(event) {

    //     this.value2 = event.detail.value;
    //     if(this.value2=='-Aucun-'){
    //         this.value2 = '';
    //     }
    // }
   
    
    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }

    searchValueKey(event) {
        this.value = event.target.value;
        if(this.value=='-Aucun-'){
            this.value = '';
        }
        console.log(this.value);
    }

    // searchValue2Key(event) {
    //     this.value2 = event.target.value;
    //     console.log(this.value2);

    // }
    @track tableData;
    @track datahere=true;
    // call apex method on button click 
    handleSearchKeyword() {
        if(this.value!==''||this.searchValue!==''){
        getAvocatList({
                valuekey: this.value,
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
           else{
               this.auxRecord=undefined;
           }
    }
   
    @track preselectedIds = [];
getSelectedAux() {
    let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
    let rowsObject = JSON.parse(JSON.stringify(selectedRows));
    console.log(rowsObject);
    rowsObject.forEach(element => {
        let targetId = element.Id;
        let targetName = element.Name;
        CreateRecordAffAux({AuxId:targetId,DjId:this.recordId,AuxName:targetName})
        .then(data=>{
            console.log(data);
            this.auxRecord=undefined;
            this.customHideModalPopup();
            const event = new ShowToastEvent({
                title: 'Avocat affecté avec succès.',
                variant: 'success'
               
            });
            this.dispatchEvent(event);
            window.location.reload();

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