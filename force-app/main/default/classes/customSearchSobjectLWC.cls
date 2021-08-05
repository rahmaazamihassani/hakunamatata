public with sharing class customSearchSobjectLWC {

    @AuraEnabled(cacheable=true)  //valuekey = ville    ----    value2key = TypeExpert
    public static list<Auxiliaire__c> getAuxiliaireList(String valuekey,String recordType ,String value2key , String searchKey, ID id)  {
        List<Auxiliaire__c> auxiliaireListRecord = new List<Auxiliaire__c>();
        string searchKeyword1 = '\'' + searchKey + '%\'';
        string searchKeyword2 = '\'% ' + searchKey + '%\'';
        
        string soql = 'Select Name,Ville__c,TypeExpert__c,RecordType.DeveloperName From Auxiliaire__c WHERE Id NOT IN ( select Auxiliaire__c  from AffectationDesAuxiliaires__c Where DossierJudiciaire__c =\''+id+'\') AND (Name LIKE ' + searchKeyword1 + ' OR Name LIKE '+ searchKeyword2 +') ';
         
         if(valuekey != null && valuekey !=''){soql = soql + ' AND Ville__c=: valuekey';}
         if(value2key != null && value2key !='' && recordType=='Expert'){soql = soql + ' AND TypeExpert__c =:value2key AND RecordType.DeveloperName = \'Expert\'';}
         if(recordType=='Expert' && (value2key == null || value2key =='')){soql = soql +' AND RecordType.DeveloperName = \'Expert\'';}
         if(recordType=='Avocat'){soql = soql +' AND RecordType.DeveloperName = \'Avocat\'';}
         for(Auxiliaire__c auxObj : Database.query(soql)){
  
            auxiliaireListRecord.add(auxObj);
         }
        return auxiliaireListRecord;
    }
}