public class DM005_MissionAvocat {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Mission__c');
    
    @AuraEnabled
    public static List<Mission__c> getMissionAvocat(String dossierId){

        String query = 'select '+ ALL_FIELDS +', Avocat__r.Name FROM Mission__c WHERE RecordType.DeveloperName = \'Avocat\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<Mission__c> listMissionAvocat = new List<Mission__c>();
        listMissionAvocat = Database.query(query);

        return listMissionAvocat;
    }
}