trigger CheckDuplicatesVSDJ on AffectationDesVictimes__c (before insert, before update) {

    List<AffectationDesVictimes__c> VSDJ = new List<AffectationDesVictimes__c>([Select VictimeSinistre__c, DossierJudiciaire__c from AffectationDesVictimes__c]);

    For(AffectationDesVictimes__c vsdj:trigger.new){
        
        if(vsdj.DossierJudiciaire__c==VSDJ.DossierJudiciaire__c){
            if(vsdj.VictimeSinistre__c==VSDJ.VictimeSinistre__c){
                  vsdj.addError('La victime choisie est déjà affectée. Veuillez choisir une autre victime.');
            }
         }
    
    }

}