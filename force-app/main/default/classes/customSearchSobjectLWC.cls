public with sharing class customSearchSobjectLWC {

    @AuraEnabled(cacheable=true)  //valuekey = ville    ----    value2key = TypeExpert
    public static list<Auxiliaire__c> getAuxiliaireList(String valuekey,String recordType ,String value2key , String searchKey, ID id)  {
        List<Auxiliaire__c> auxiliaireListRecord = new List<Auxiliaire__c>();
        string searchKeyword1 = '\'' + searchKey + '%\'';
        string searchKeyword2 = '\'% ' + searchKey + '%\'';
        
        string soql = 'Select ID, Name,Ville__c,TypeExpert__c,RecordType.DeveloperName,TypeAuxiliaire__c From Auxiliaire__c WHERE Id NOT IN ( select Auxiliaire__c  from AffectationDesAuxiliaires__c Where DossierJudiciaire__c =\''+id+'\') AND (Name LIKE ' + searchKeyword1 + ' OR Name LIKE '+ searchKeyword2 +') ';
         
         if(valuekey != null && valuekey !=''){soql = soql + ' AND Ville__c =:valuekey';}
         if(value2key != null && value2key !='' && recordType=='Expert'){soql = soql + ' AND TypeExpert__c =:value2key AND RecordType.DeveloperName = \'Expert\'';}
         if(recordType=='Expert' && (value2key == null || value2key =='')){soql = soql +' AND RecordType.DeveloperName = \'Expert\'';}
         if(recordType=='Avocat'){soql = soql +' AND RecordType.DeveloperName = \'Avocat\'';}
         for(Auxiliaire__c auxObj : Database.query(soql)){
  
            auxiliaireListRecord.add(auxObj);
         }
        return auxiliaireListRecord;
    }


    @AuraEnabled(cacheable=true)   // Societaire__c   --   Police__c   ----   DateOuverture__c   --  Name   --   Type
    public static list<DossierInterne__c> getDossierInterne(String Societaire ,String Police ,Date DateOuverture , String Name, String Type)  {
        List<DossierInterne__c> DossierInterneListRecord = new List<DossierInterne__c>();
        Name = '\'' + Name + '%\'';
        Police = '\'' + Police + '%\'';
        String Societaire1 = '\'' + Societaire + '%\'';
        String Societaire2 = '\'% ' + Societaire + '%\'';

        string soql = 'Select Name,Societaire__c,Police__c,DateOuverture__c From DossierInterne__c WHERE Name LIKE ' + Name + ' ';

        if(Societaire != null && Societaire !=''){soql = soql + ' AND ( Societaire__c like '+Societaire1+' OR Societaire__c like '+Societaire2+')';}
        if(Police != null && Police !=''){soql = soql + ' AND Police__c like '+Police;}
        if(DateOuverture != null ){soql = soql + ' AND DateOuverture__c =:DateOuverture';}
        if(Type != null && Type !=''){soql = soql + ' AND RecordType.DeveloperName =:Type';}


        for(DossierInterne__c auxObj : Database.query(soql)){
  
            DossierInterneListRecord.add(auxObj);
         }
        return DossierInterneListRecord;
    }
}