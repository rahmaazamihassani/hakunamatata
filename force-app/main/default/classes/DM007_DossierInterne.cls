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

    @AuraEnabled 
    public static integer AffecterToDJ(ID DI, ID DJ){
        System.debug('ID1 :'+DI);
        System.debug('ID2 :'+DJ);

        List<DossierJudiciaire__c> Dossiers=[select Id,DossierInterne__c from DossierJudiciaire__c where ID = :DJ  limit 1];
            if (!Dossiers.isEmpty()){
                try{
                    DossierJudiciaire__c dossier=Dossiers[0];
                    dossier.DossierInterne__c = DI;
                    update dossier;
                    return 1;
                }  catch (Exception e){
                    system.debug(e);
                    return 0;}
            }
            return 0;
        }

}