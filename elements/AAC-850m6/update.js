function(instance, properties, context) {
    var newValue = properties.original_text;
    var listNotEmpty = (properties.values_to_find.length() > 0) ? true : false;
    var listLengthMatches = (properties.values_to_find.length() === properties.values_to_replace.length()) ? true : false;
    if (listNotEmpty && listLengthMatches) {
        var findArrayLength = properties.values_to_find.length();
        var replaceArrayLength = properties.values_to_replace.length();
        var findArray = properties.values_to_find.get(0, findArrayLength);
        var replaceArray = properties.values_to_replace.get(0, replaceArrayLength);
        for (var i = 0; i < findArrayLength; i++) {
            var findValue = new RegExp(findArray[i],"g");
            newValue = newValue.replaceAll(findValue, replaceArray[i]);
            // console.log(newValue);
        }
    }
    else if (listNotEmpty && !listLengthMatches) {
        console.error("Couldn't replace list of values. Values to Find length is " + properties.values_to_find.length().toString() + ". Values to Replace length is " + properties.values_to_replace.length().toString());
    }
    instance.publishState("replaced_text", newValue);
    instance.triggerEvent("updated", function(err){
        console.error(err);
    });
}