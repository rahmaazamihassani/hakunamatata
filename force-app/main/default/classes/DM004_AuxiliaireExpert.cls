public class DM004_AuxiliaireExpert {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Auxiliaire__c');
    private static final String ALL_FIELDS_AffAux = APU001_ObjectDescriber.constructFieldListForQueryFrom('AffectationDesAuxiliaires__c');
    
    @AuraEnabled
    public static List<Auxiliaire__c> getAuxiliaireExpert(){

        String query = 'select RecordType.DeveloperName, '+ ALL_FIELDS +' FROM Auxiliaire__c WHERE RecordType.DeveloperName = \'Expert\'';
        List<Auxiliaire__c> listAuxiliaireExpert = new List<Auxiliaire__c>();
        listAuxiliaireExpert = Database.query(query); 

        return listAuxiliaireExpert;
    }
    @AuraEnabled
    public static void CreateRecordAffAux(Id AuxId, Id DjId, String AuxName, String AuxType){
        AffectationDesAuxiliaires__c AffectationDesAuxiliaire = new AffectationDesAuxiliaires__c();
        AffectationDesAuxiliaire.DossierJudiciaire__c = DjId;
        AffectationDesAuxiliaire.Auxiliaire__c = AuxId;
        AffectationDesAuxiliaire.Name = AuxName;
        AffectationDesAuxiliaire.Type__c = AuxType;
        insert AffectationDesAuxiliaire; 
    }
}