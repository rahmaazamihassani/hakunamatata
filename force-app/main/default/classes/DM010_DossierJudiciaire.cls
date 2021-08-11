public with sharing class DM010_DossierJudiciaire {
    
    @AuraEnabled(cacheable=true)
    public static integer DossierInterneIsNull(ID id){

       List<DossierJudiciaire__c> L = [select Id,DossierInterne__c from DossierJudiciaire__c where ID = :id  limit 1];

       if (!L.isEmpty()){
        DossierJudiciaire__c dossier=L[0];
        if(dossier.DossierInterne__c == null){return 1;}else{return 0;}
       }

       return -1;

    }

    @AuraEnabled(cacheable=true)
    public static integer NbrVictimeSinistre(ID id){
         integer Nbr = [SELECT COUNT() FROM AffectationDesVictimes__c WHERE DossierJudiciaire__c = :id];
         return Nbr;

    }



}