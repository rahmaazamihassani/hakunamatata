public class DM004_AuxiliaireExpert {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Auxiliaire__c');
    private static final String ALL_FIELDS_AffAux = APU001_ObjectDescriber.constructFieldListForQueryFrom('AffectationDesAuxiliaires__c');
    
    @AuraEnabled
    public static List<AffectationDesAuxiliaires__c> getAuxiliaireExpert(String dossierId){

        String query = 'select '+ ALL_FIELDS_AffAux +' FROM AffectationDesAuxiliaires__c WHERE TypeAuxiliaire__c = \'Expert\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<AffectationDesAuxiliaires__c> listAuxiliaireExpert = new List<AffectationDesAuxiliaires__c>();
        listAuxiliaireExpert = Database.query(query); 

        return listAuxiliaireExpert;
    }
    @AuraEnabled
    public static void CreateRecordAffAux(Id AuxId, Id DjId, String AuxName){
        AffectationDesAuxiliaires__c AffectationDesAuxiliaire = new AffectationDesAuxiliaires__c();
        AffectationDesAuxiliaire.DossierJudiciaire__c = DjId;
        AffectationDesAuxiliaire.Auxiliaire__c = AuxId;
        AffectationDesAuxiliaire.Name = AuxName;
        insert AffectationDesAuxiliaire; 
    }
}