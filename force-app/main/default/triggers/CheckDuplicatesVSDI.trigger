trigger CheckDuplicatesVSDI on AffectationDesVictimesDI__c (before insert, before update) {

    List<AffectationDesVictimesDI__c> VSDI = new List<AffectationDesVictimesDI__c>([Select  VictimeSinistre__c, DossierInterne__c from AffectationDesVictimesDI__c]);

    For(AffectationDesVictimesDI__c vsdi:trigger.new){
        
        if(vsdi.VictimeSinistre__c==VSDI.VictimeSinistre__c && vsdi.DossierInterne__c==VSDI.DossierInterne__c){
    
                  vsdi.addError('La victime choisie est déjà affectée. Veuillez choisir une autre victime.');
    
         }
    
    }

}