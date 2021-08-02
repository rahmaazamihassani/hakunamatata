public with sharing class DM008_VictimeSinistre {

    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('VictimeSinistre__c');
    private static final String ALL_FIELDS_DJ = APU001_ObjectDescriber.constructFieldListForQueryFrom('DossierJudiciaire__c');

    @AuraEnabled
    public static List<VictimeSinistre__c> getVictimeSinistre(String DossierInterneID){

        System.debug('DossierInterneID ' + DossierInterneID);
        String query = 'select '+ ALL_FIELDS +' FROM VictimeSinistre__c WHERE DossierInterne__c = :DossierInterneID';
        List<VictimeSinistre__c> listVictimeSinistre = new list<VictimeSinistre__c>();
        listVictimeSinistre = Database.query(query); 
        System.debug('listVictimeSinistre ' + listVictimeSinistre);
        return listVictimeSinistre;
    }

    @AuraEnabled
    public static DossierJudiciaire__c getDossierJudiciaire(String dossierId){
        
        String query = 'select '+ ALL_FIELDS_DJ +' FROM DossierJudiciaire__c WHERE Id = :dossierId';
        DossierJudiciaire__c DossierJudiciaireRecord = Database.query(query);

        return DossierJudiciaireRecord;
    }

    @AuraEnabled 
    public static void AffecterVS(String DJid, String VIid){

        String DJquery = 'select '+ ALL_FIELDS_DJ +' FROM DossierJudiciaire__c WHERE Id = \'' + DJid +  '\'';
        String VSquery = 'select '+ ALL_FIELDS +' FROM VictimeSinistre__c WHERE Id = \'' + VSid +  '\'';
    }

}
