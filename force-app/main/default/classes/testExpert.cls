public with sharing class testExpert {

    @AuraEnabled(cacheable=true)  //valuekey = ville    ----    value2key = TypeExpert
    public static list<Auxiliaire__c> getExpertList(String value2key,String valuekey, String searchKey, ID id)  {
        List<Auxiliaire__c> expertListRecord = new List<Auxiliaire__c>();
        string searchKeyword1 = '\'' + searchKey + '%\'';
        string searchKeyword2 = '\'% ' + searchKey + '%\'';
        
        string soql = 'Select Name,Ville__c,TypeAuxiliaire__c,TypeExpert__c From Auxiliaire__c WHERE TypeAuxiliaire__c = \'Expert\' AND Id NOT IN ( select Auxiliaire__c  from AffectationDesAuxiliaires__c Where DossierJudiciaire__c =\''+id+'\'AND TypeAuxiliaire__c = \'Expert\') AND (Name LIKE ' + searchKeyword1 + ' OR Name LIKE '+ searchKeyword2 +') ';
        if(value2key != null && value2key !=''){soql = soql + ' AND TypeExpert__c=: value2key';}
        if(valuekey != null && valuekey !=''){soql = soql + ' AND Ville__c=: valuekey';}
         for(Auxiliaire__c auxObj : Database.query(soql)){
            expertListRecord.add(auxObj);
        }
        return expertListRecord;
    }
}