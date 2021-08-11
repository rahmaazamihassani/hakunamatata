public with sharing class test_ayant_droit {
    private static final String AYANT_DROIT_ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('AyantDroit__c');
    private static final String ALL_FIELDS_AffAux = APU001_ObjectDescriber.constructFieldListForQueryFrom('AffectationDesAyantsDroit__c');

    @AuraEnabled(cacheable=true)
    public static list<AyantDroit__c> getAyantDroitList(String searchKey,String searchKey1,ID id)  {
        List<AyantDroit__c> ayantDroitListRecord = new List<AyantDroit__c>();
        string searchKeyword = '\'%' + searchKey + '%\'';
        string searchKeyword1 = '\'%' + searchKey1 + '%\'';
        string soql = 'select '+ AYANT_DROIT_ALL_FIELDS +' FROM AyantDroit__c WHERE VictimeSinistre__r.EtatSante__c =\'Décès\' AND Id NOT IN ( select AyantDroit__c  from AffectationDesAyantsDroit__c Where DossierJudiciaire__c =\''+id+'\') AND (Name LIKE ' + searchKeyword+') AND VictimeSinistre__r.Name LIKE '+ searchKeyword1+'' ;
         for(AyantDroit__c aydObj : Database.query(soql)){
  
            ayantDroitListRecord.add(aydObj);
         }
        return ayantDroitListRecord;
    }
    

    @AuraEnabled
    public static List<AffectationDesAyantsDroit__c> getAyantDroit(String dossierId){

        String query = 'select '+ ALL_FIELDS_AffAux +' FROM AffectationDesAyantsDroit__c WHERE DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<AffectationDesAyantsDroit__c> listAyantDroit = new List<AffectationDesAyantsDroit__c>();
        listAyantDroit = Database.query(query); 

        return listAyantDroit;
    }

    @AuraEnabled
    public static void CreateRecordAffAyd(Id AydId, Id DjId, String AydName){
        AffectationDesAyantsDroit__c AffectationDesAyantDroit = new AffectationDesAyantsDroit__c();
        AffectationDesAyantDroit.DossierJudiciaire__c = DjId;
        AffectationDesAyantDroit.AyantDroit__c = AydId;
        AffectationDesAyantDroit.Name = AydName;
        insert AffectationDesAyantDroit; 
    }
}