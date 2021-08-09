public class DM003_AuxiliaireAvocat {
    
    private static final String ALL_FIELDS = APU001_ObjectDescriber.constructFieldListForQueryFrom('Auxiliaire__c');
    private static final String ALL_FIELDS_AffAux = APU001_ObjectDescriber.constructFieldListForQueryFrom('AffectationDesAuxiliaires__c');

    
    @AuraEnabled
    public static List<AffectationDesAuxiliaires__c> getAuxiliaireAvocat(String dossierId){

        String query = 'select '+ ALL_FIELDS_AffAux +' FROM AffectationDesAuxiliaires__c WHERE TypeAuxiliaire__c = \'Avocat\' AND DossierJudiciaire__c = \'' + dossierId +  '\'';
        List<AffectationDesAuxiliaires__c> listAuxiliaireAvocat = new List<AffectationDesAuxiliaires__c>();
        listAuxiliaireAvocat = Database.query(query); 

        return listAuxiliaireAvocat;
    }
    @AuraEnabled
    public static void CreateRecordAffAux(Id AuxId, Id DjId, String AuxName){
        AffectationDesAuxiliaires__c AffectationDesAuxiliaire = new AffectationDesAuxiliaires__c();
        AffectationDesAuxiliaire.DossierJudiciaire__c = DjId;
        AffectationDesAuxiliaire.Auxiliaire__c = AuxId;
        AffectationDesAuxiliaire.Name = AuxName;
        insert AffectationDesAuxiliaire; 
    }

    @AuraEnabled(cacheable=true)  //valuekey = ville    ----    value2key = TypeExpert
    public static list<Auxiliaire__c> getAvocatList(String valuekey, String searchKey, ID id)  {
        List<Auxiliaire__c> auxiliaireListRecord = new List<Auxiliaire__c>();
        string searchKeyword1 = '\'' + searchKey + '%\'';
        string searchKeyword2 = '\'% ' + searchKey + '%\'';
        
        string soql = 'Select Name,Ville__c,TypeAuxiliaire__c From Auxiliaire__c WHERE TypeAuxiliaire__c = \'Avocat\' AND Id NOT IN ( select Auxiliaire__c  from AffectationDesAuxiliaires__c Where DossierJudiciaire__c =\''+id+'\') AND (Name LIKE ' + searchKeyword1 + ' OR Name LIKE '+ searchKeyword2 +') ';
            if(valuekey != null && valuekey !=''){soql = soql + ' AND Ville__c=: valuekey';}
            for(Auxiliaire__c auxObj : Database.query(soql)){
                auxiliaireListRecord.add(auxObj);
            }
        return auxiliaireListRecord;
    }
    
}