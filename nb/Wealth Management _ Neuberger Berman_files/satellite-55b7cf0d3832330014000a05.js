_satellite.pushAsyncScript(function(event, target, $variables){
  //send names of all AJAX events to _satellite.notify() 
//Replace commented out code to call direct calls based on these AJAX success events
if(typeof jQuery!="undefined")
{
jQuery( document ).ready(function(){
  jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
    _satellite.notify('AJAX Request: ' + settings.url,1);
  
  if ( settings.url == "/_layouts/WWW/Service/MFWebService.aspx/ChartProductLoad" ) {
      _satellite.setVar("localDropdownSelect",JSON.parse(settings.data.replace(/'/g, '"')).shareClass);
      _satellite.track('fundDropdown');
    }
    
    if(settings.url=='/_Layouts/WWW/WebMethods.aspx/GetTermsAndConditions' && xhr.responseText.length>10) {
     _satellite.track('termsAndConditions'); 
    }
    
    if(settings.url=='/_layouts/WWW/Service/dsvc.aspx/FilterAggContentWithFilters'&&document.location.href.indexOf('nb.com/pages/public/en-gb/insights.aspx?f3=blog%20post')>=0) {
      _satellite.track('filterDropdown');
      _satellite.notify('event: ');
      console.log(event);
      _satellite.notify('xhr: ');
      console.log(xhr);
      _satellite.notify('settings: ');
      console.log(settings);
    }
    
  });
});
}
});
