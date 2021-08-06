import { LightningElement,api } from 'lwc';

export default class Pagination extends LightningElement {
    totalAuxs;
    recordSize = 5;
    @api 
    set records(data){
        if(data){
            this.totalAuxs = data;
            this.visibleRecords = data.slice(0,this.recordSize);
        }
    }

    previousHandler(){

    }
    nextHandler(){
        
    }
}