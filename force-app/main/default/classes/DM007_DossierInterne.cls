public class DM007_DossierInterne {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('DossierInterne__c');
    private static final String ALL_FIELDS_DJ = APU001_ObjectDescriber.constructFieldListForQueryFrom('DossierJudiciaire__c');

    
    @AuraEnabled
    public static List<DossierInterne__c> getDossierLitige(){
        
        String query = 'select '+ ALL_FIELDS +', RecordType.Name FROM DossierInterne__c WHERE RecordType.DeveloperName = \'DossierLitige\'';
        List<DossierInterne__c> listDossierLitige= new List<DossierInterne__c>();
        listDossierLitige = Database.query(query);

        return listDossierLitige;
    }
    @AuraEnabled
    public static List<DossierInterne__c> getSinistre(){
        
        String query = 'select '+ ALL_FIELDS +', RecordType.Name FROM DossierInterne__c WHERE RecordType.DeveloperName = \'Sinistre\'';
        List<DossierInterne__c> listSinistre= new List<DossierInterne__c>();
        listSinistre = Database.query(query);

        return listSinistre;
    }
    @AuraEnabled
    public static DossierJudiciaire__c getDossierJudiciaire(String dossierId){
        
        String query = 'select '+ ALL_FIELDS_DJ +' FROM DossierJudiciaire__c WHERE Id = \'' + dossierId +  '\'';
        DossierJudiciaire__c DossierJudiciaireRecord = Database.query(query);

        return DossierJudiciaireRecord;
    }

    @AuraEnabled 
    public static void AffecterDI(String DJid, String DIid){

        String DJquery = 'select '+ ALL_FIELDS_DJ +' FROM DossierJudiciaire__c WHERE Id = \'' + DJid +  '\'';
        String DIquery = 'select '+ ALL_FIELDS +' FROM DossierInterne__c WHERE Id = \'' + DIid +  '\'';



    }

}