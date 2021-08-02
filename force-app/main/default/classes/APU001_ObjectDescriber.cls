global class APU001_ObjectDescriber {
    global static final Map <String, Schema.SObjectType> schemaMap;
    

    global class Pair {
        public String key {get; set;}
        public String val {get; set;}
    }

    static {
        schemaMap = Schema.getGlobalDescribe();
    }

	
    /**
     * @author Oumaima BARBACHE
     * @date Création 17/06/2020
     * @date Modification 
     * @description Méthode permettant de retourner une liste de champs pour un objet donné
     * @param sObjectName String Nom du sObject
     * @return List<String> liste des champs du sObject en paramètre
     */
    global static List<String> getFieldsListFor(String sObjectName) {
        system.debug('## sObject : ' + sObjectName);
        Map <String, Schema.SObjectField> fieldMap = schemaMap.get(sObjectName).getDescribe().fields.getMap();
        List<String> fieldsList = new List<String>();
        for (Schema.SObjectField sfield : fieldMap.Values()) {
            schema.describefieldresult dfield = sfield.getDescribe();
            Pair field = new Pair();
            field.key = dfield.getname();
            fieldsList .add(field.key);
        }
        return fieldsList;
    }

    /**
     * @author Oumaima BARBACHE
     * @date Création 17/06/2020
     * @date Modification 
     * @description Méthode permettant de retourner une liste de champs pour un objet donné
     * @param sObjectName String Nom du sObject
     * @return String liste des champs du sObject en paramètre
     */
    global static String constructFieldListForQueryFrom(String sObjectName) {
        return const1VznyypTWrzvnje2KeKD12USGUkQ6P1erD(sObjectName, '');
    }
  /**
     * @author Oumaima BARBACHE
     * @date Création 17/06/2020
     * @date Modification 
     * @description Returns all fields EXCEPT those ending with the specified string 
     * @param sObjectName String Nom du sObject
     * @param notEndingFilter String specifies the endding name of the fields to omit
     * @return String liste des champs du sObject en paramètre
     */
  
    global static String const1VznyypTWrzvnje2KeKD12USGUkQ6P1erD(String sObjectName, String notEndingFilter) {
        List<String> fieldsList = getFieldsListFor(sObjectName);
        String fieldsQuery = '';
        system.debug('## fieldsList : ' + fieldsList);
        for (String field : fieldsList) {
            if (String.isEmpty(notEndingFilter) || !field.endsWith(notEndingFilter)) {
                fieldsQuery = fieldsQuery + '' + field + ',';
            }
        }

        return fieldsQuery.replace(fieldsQuery, fieldsQuery.substring(0, fieldsQuery.length() - 1));
    }

    /**
     * @author Oumaima BARBACHE
     * @date Création 22/07/2020
     * @date Modification
     * @description
     */

    public static Object getRecordByIdAndObjApiName(Id recordId , String objectApiName){
        String soqlQuery = 'SELECT Id,Name FROM '+objectApiName+' WHERE Id = :recordId Limit 1';
        return (Object)Database.query(soqlQuery);
    }
    
    public static String getRecordTypeNameById(String objectName, Id strRecordTypeId)
    {
        return Schema.getGlobalDescribe().get(objectName).getDescribe().getRecordTypeInfosById().get(strRecordTypeId).getName();
    } 
}
///////////////DM008_Contract//////////////////////
  //  private static final String ALL_FIELDS = DM000_sObjectDescriber.constructFieldListForQueryFrom('');

///////////////// query///////////////
  // String soqlQuery = 'SELECT ' + ALL_FIELDS + ' FROM Account' ;