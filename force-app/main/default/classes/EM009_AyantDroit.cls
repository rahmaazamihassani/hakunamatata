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
public with sharing class EM009_AyantDroit {

    @AuraEnabled
    public static List<AyantDroit__c> getAyantDroitByVictimeSinistreId(Id victimeSinistre){
        return DM009_AyantDroit.getAyantDroitByVictimeSinistreId(victimeSinistre);
    }

}