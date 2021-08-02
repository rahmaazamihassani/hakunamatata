public class DM001_Jugement {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Jugement__c');
    
    @AuraEnabled
    public static List<Jugement__c> getJugementPenal(String dossierId){

        String query = 'select '+ ALL_FIELDS +' FROM Jugement__c WHERE RecordType.DeveloperName = \'JugementPlanPenal\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<Jugement__c> listJugementPenal = new List<Jugement__c>();
        listJugementPenal = Database.query(query); 

        return listJugementPenal;
    }
}