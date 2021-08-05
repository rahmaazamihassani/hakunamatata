/**
 * @description       : 
 * @author            : Ahmed HILALI
 * @group             : 
 * @last modified on  : 07-16-2021
 * @last modified by  : Ahmed HILALI
 * Modifications Log 
 * Ver   Date         Author         Modification
 * 1.0   07-15-2021   Ahmed HILALI   Initial Version
**/
public with sharing class DM009_AyantDroit {

    private static final String AYANT_DROIT_ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('AyantDroit__c');

    public static List<AyantDroit__c> getAyantDroitByVictimeSinistreId(Id victimeSinistre){
        System.debug('ID Victime Sinistre ' + victimeSinistre);
        String query = 'select '+ AYANT_DROIT_ALL_FIELDS +' FROM AyantDroit__c WHERE VictimeSinistre__c = :victimeSinistre';
        return Database.query(query); 
    }
}