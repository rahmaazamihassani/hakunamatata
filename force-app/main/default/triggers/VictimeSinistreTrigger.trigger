/**
 * @description       : 
 * @author            : Ahmed HILALI
 * @group             : 
 * @last modified on  : 07-15-2021
 * @last modified by  : Ahmed HILALI
 * Modifications Log 
 * Ver   Date         Author         Modification
 * 1.0   07-15-2021   Ahmed HILALI   Initial Version
**/
trigger VictimeSinistreTrigger on VictimeSinistre__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    if (Trigger.isBefore ) { 
        if (Trigger.isInsert) {
             
        }
        
        if(Trigger.isUpdate){
            VictimeSinistreTriggerHandler.checkFieldsBeforeUpdate(Trigger.new , Trigger.old );
        }
    }
    if(Trigger.isAfter){
        if (Trigger.isInsert || Trigger.isUpdate ) {

        }
        
        if(Trigger.isUpdate){            
                
        }

    }
}