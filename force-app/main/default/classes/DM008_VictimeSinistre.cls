public with sharing class DM008_VictimeSinistre {
    private static final String ALL_FIELDSV = APU001_ObjectDescriber.constructFieldListForQueryFrom('AffectationDesVictimesDI__c');
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
    public static List<AffectationDesVictimesDI__c> getVictimeDossier(String DossierInterneID, String DossierJudiID){
        System.debug('DossierInterneID ' + DossierInterneID);
        String query = 'select '+ALL_FIELDSV+' from AffectationDesVictimesDI__c where DossierInterne__c = :DossierInterneID and Id not in (select VictimeSinistre__c from AffectationDesVictimes__c where DossierJudiciaire__c = :DossierJudiID)';
        List<AffectationDesVictimesDI__c> listVictimeSinistre = new list<AffectationDesVictimesDI__c>();
        listVictimeSinistre = Database.query(query);
        System.debug('listVictimeSinistre ' + listVictimeSinistre);
        return listVictimeSinistre;
    }

    @AuraEnabled   
    public static List<DossierJudiciaire__c> getDossierId(String dossierJudi){
        String query = 'select DossierInterne__c from DossierJudiciaire__c  WHERE Id = :dossierJudi';
        List<DossierJudiciaire__c> result = new list<DossierJudiciaire__c>();
        result = Database.query(query); 
        System.debug('doss ' + result);
        return result;
    }

    @AuraEnabled
    public static list<AffectationDesVictimesDI__c> getVictimeSearchList(String searchKey,String DossierInterneID, String DossierJudiID)  {
        List<AffectationDesVictimesDI__c> victimeListRecord = new List<AffectationDesVictimesDI__c>();
        string searchKeyword1 = '\'' + searchKey + '%\'';
        string searchKeyword2 = '\'% ' + searchKey + '%\'';
        if(searchKey!=null && searchKey!=''){
            string soql = 'Select '+ALL_FIELDSV+' From AffectationDesVictimesDI__c WHERE DossierInterne__c = :DossierInterneID and Id not in (select VictimeSinistre__c from AffectationDesVictimes__c where DossierJudiciaire__c = :DossierJudiID) AND (Name LIKE ' + searchKeyword1 + ' OR Name LIKE '+ searchKeyword2+')';
            for(AffectationDesVictimesDI__c victimeObj : Database.query(soql)){
                victimeListRecord.add(victimeObj);
            }
        }
        
        return victimeListRecord;
    }

    @AuraEnabled
    public static void CreateRecordAffVic(Id VicId, Id DjId, String VicName){
        AffectationDesVictimes__c AffectationDesVictimes = new AffectationDesVictimes__c();
        AffectationDesVictimes.DossierJudiciaire__c = DjId;
        AffectationDesVictimes.VictimeSinistre__c = VicId;
        AffectationDesVictimes.Name = VicName;
        insert AffectationDesVictimes; 
    }
}