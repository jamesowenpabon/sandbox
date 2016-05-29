_satellite.pushAsyncScript(function(event, target, $variables){
  ////////////////////////////////////////////////////////////
//Place this in a global page top rule in custom conditions 
//
// DTM Rule Stack Debugging Code
//rename the notify function
_satellite._notify=_satellite.notify;
//redefine the notify function
_satellite.notify= function (e,t) {
  //call the old function
	_satellite._notify(e,t);
  //Inspect the text of the call
	if (((e.indexOf("Rule ") == 0) || (e.indexOf("Direct call Rule ") == 0) )&& (e.indexOf(" fired.") != -1)){
		if (typeof _satellite.dtmRuleStackArray == "undefined" ) {
			_satellite.dtmRuleStackArray=[];
		}
		var thisRule=e.match(/\".+\"/)[0].replace(/\"/g,"").replace(/\|/g,"");

		//Assumning that this rule is named DTMRuleStackPageTopGlobal
		//Also assuming that we do not want to see it in the rule stack..
		if (thisRule.indexOf("DTMRuleStackPageTopGlobal") == -1 ) {
			_satellite.dtmRuleStackArray.push(thisRule);
		}
	}
}
return true;
});
