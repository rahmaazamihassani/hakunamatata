public class DM006_MissionExpert {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Mission__c');
    
    @AuraEnabled
    public static List<Mission__c> getMissionExpert(String dossierId){

        String query = 'select '+ ALL_FIELDS +', Expert__r.Name FROM Mission__c WHERE RecordType.DeveloperName = \'Expert\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<Mission__c> listMissionExpert = new List<Mission__c>();
        listMissionExpert = Database.query(query);

        return listMissionExpert;
    }
}