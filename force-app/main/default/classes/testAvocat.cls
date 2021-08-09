public with sharing class testAvocat {

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