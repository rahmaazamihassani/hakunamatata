import { api, LightningElement, track, wire } from 'lwc';
import getAuxiliaireExpert from '@salesforce/apex/DM004_AuxiliaireExpert.getAuxiliaireExpert';
import CreateRecordAffAux from '@salesforce/apex/DM004_AuxiliaireExpert.CreateRecordAffAux';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import VILLE_FIELD from '@salesforce/schema/Auxiliaire__c.Ville__c';
import TYPE_EXPERT from '@salesforce/schema/Auxiliaire__c.TypeExpert__c'
import AUXILIAIRE_OBJECT from  '@salesforce/schema/Auxiliaire__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getExpertList from '@salesforce/apex/DM004_AuxiliaireExpert.getExpertList';


export default class LWC004_AuxiliaireExpert extends LightningElement {
  value ='';
  value2 = '';
  valueType = '';
  @track auxRecord=[];
  @track allRecord;
  @track Expert = [];
  @api recordId;
  optionsv = [];
  picklistOptions = [];
  selectedValue;
  //@track openModal = false;
  optionsT = [];
  picklistOptionsT = [];
  selectedValueT;
  searchValue = '';
  columns = [
    { label: 'Nom', fieldName: 'Name' },
    { label: 'Ville', fieldName: 'Ville__c'  },
    { label: "Type d'expert", fieldName: 'TypeExpert__c' }
  ];
  type=true;
  typeExpert=true;
  // get options() {  
  //   return [
  //     { label: '-Aucun-', value: '-Aucun-' },
  //     { label: 'Avocat', value: 'Avocat' },
  //     { label: 'Expert', value: 'Expert' },     
  //   ];
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
  @wire(getPicklistValues,{recordTypeId: '$auxMetadata.data.defaultRecordTypeId',fieldApiName: TYPE_EXPERT})
  wiredDatai( { error, data } ) {
    if ( data ) {
      var a = {label:"-Aucun-",value:"-Aucun-"};
      this.optionsT = data.values.map( objPL => {
        return {
          label: `${objPL.label}`,
          value: `${objPL.value}`
        };
      });
      this.optionsT.unshift(a);
      console.log(this.optionsT);
    } else if ( error ) {
      console.log( error);
    }
  }
  // on select picklist value to show the selected value
  handleChange(event) {
    this.value = event.detail.value;
  }
  // handleChangeType(event) {
  //   this.valueType = event.detail.value;
  //   if(this.valueType=='-Aucun-'){
  //     this.valueType = '';
  //   }
  //   if(this.valueType=='Expert'){
  //     this.typeExpert = true;
        
  //   }
  //   else{
  //     this.typeExpert = false;
  //   }
  // }
  handleChange2(event) {
    this.value2 = event.detail.value;
    if(this.value2=='-Aucun-'){
      this.value2 = '';
    }
  }
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
  searchValue2Key(event) {
    this.value2 = event.target.value;
    console.log(this.value2);
  }
  @track tableData;
  @track expertOrAvocat
  @track datahere=true;
  // call apex method on button click 
  handleSearchKeyword() {
    if(this.value!==''||this.valueType!==''||this.value2!==''||this.searchValue!==''){
      getExpertList({
        valuekey: this.value,
        recordType: this.valueType,
        value2key:this.value2,
        searchKey: this.searchValue,
        id:this.recordId
      }).then(result => {
        this.auxRecord = result;
    
        //                 let newArray = [];
        //                     this.auxRecord.forEach(tracking => {
        //                         let newTracking = {};
        //                         newTracking.Name = tracking.Name;
        //                         newTracking.recordTypeName = tracking.RecordType.DeveloperName;
        //                         newTracking.Ville__c = tracking.Ville__c;
        //                         newTracking.TypeExpert__c = tracking.TypeExpert__c;
                              
        //     // and so on for other fields
        //     newArray.push(newTracking);
        // });
        // this.auxRecord = newArray;
                        // this.auxRecord.forEach(r =>{
                        //     if(r.recordTypeId == '0124L000000Y1fCQAS'){
                        //         expertOrAvocat = 'Expert';
                        //         console.log(expertOrAvocat);
                        //     }
                        //     else{
                        //         expertOrAvocat ='Avocat';
                        //         console.log(expertOrAvocat);
                        //     };
                            
                        // })
        this.datahere = false;
        if(this.auxRecord.length ==0){
            this.datahere=true;
        }
        console.log(result);
      }).catch(error => {
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
    }else{
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
          title: 'Expert affect?? avec succ??s.',
          variant: 'success'
        });
        this.dispatchEvent(event);
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

//Display Auxiliaires Affect??s in a table

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