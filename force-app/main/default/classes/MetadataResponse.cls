public class MetadataResponse {
@AuraEnabled
        public String recordTypeId;

        @AuraEnabled
        public String fieldSetLabel;

        @AuraEnabled
        public String sObjectName;

        @AuraEnabled
        public List<String> fieldsMetadata;
}