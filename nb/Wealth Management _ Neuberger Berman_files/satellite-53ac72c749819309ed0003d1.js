_satellite.pushAsyncScript(function(event, target, $variables){
  /*
 * AddThis
 * 
 * This Adobe DTM snippet will allow you to capture when a visitor shares a page on your site using
 * the AddThis sharing widget.  It utilizes the AddThis JavaScript Events listener code.  You can find
 * all documentation for this at:
 * http://support.addthis.com/customer/portal/articles/1365497-addthis-javascript-events
 * To use this code, add the below code as a 3rd party script in a page load rule that loads on the pages
 * you want to track.  Typically this will be all pages.  The page load rule can be triggered at page top,
 * page bottom, DOM ready, or onload.
 *
 * When a user shares the page with AddThis, it will trigger the direct call rule named "AddThis Share".
 * This direct call rule can be defined to capture and send what is needed.  The share will also set the
 * following data elements, which can and should be used in the direct call rule:
 *   addthis service
 *   addthis url
 * 
 * The data elements will not autopopulate in the dropdown in DTM, but they can still be used as long as
 * they are in the correct format.  Just ensure they are entered as either %addthis service% or 
 * %addthis url% and the data will be captured correctly.
 */

_satellite.addthis = {
  ready: function(){
    addthis.addEventListener('addthis.menu.share', _satellite.addthis.handler);
    //addthis.addEventListener('addthis.user.clickback', _satellite.addthis.handler);
  },
  handler: function(evt){
    // set the share info in data elements
    _satellite.setVar({
      'addthis service': evt.data.service,
      'addthis url': evt.data.url
    });
    _satellite.track('AddThis Share');
  },
  init: function(){
    // trigger the ready function to setup the listener
    window.addthisReady = function(){
      _satellite.addthis.ready();
    };
    // if addthis is already ready, setup the listener
    if(typeof window.addthis != 'undefined' && window.addthis.ost===1){
      _satellite.addthis.ready();
    }
  }
};
_satellite.addthis.init();
});
