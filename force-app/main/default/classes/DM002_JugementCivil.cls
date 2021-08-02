public class DM002_JugementCivil {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Jugement__c');
    
    @AuraEnabled
    public static List<Jugement__c> getJugementCivil(String dossierId){

        String query = 'select '+ ALL_FIELDS +' FROM Jugement__c WHERE RecordType.DeveloperName = \'JugementPlanCivil\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<Jugement__c> listJugementCivil = new List<Jugement__c>();
        listJugementCivil = Database.query(query); 

        return listJugementCivil;
    }
}