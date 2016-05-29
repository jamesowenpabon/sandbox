_satellite.pushBlockingScript(function(event, target, $variables){
  /*
*jquery viewport plugin
*/
(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);

/*
*viewport check
*/
jQuery(function(){
	jQuery('div.box a:in-viewport,div.slideShow a:in-viewport').addClass('in-viewp');
});

/*
*location assignments
*/
(function() {
  
  var startX, startY, currRow, currCol, currY;

  jQuery('.main-content-page .box, .main-content-page .slideShow').each(function(num,elm){
      var currElm = jQuery(elm);

      if(num === 0){
          startX = currElm.position().left; 
          startY = currElm.position().top;
          currY = 0;
          currRow = 1;
          currCol = 1;
      }

      var elmX = jQuery(this).position().left - startX,
          elmY = jQuery(this).position().top - startY;

    if(elmY>currY){
      currRow++;
      currCol = 1;
      currY = elmY;
    }
    currElm.find('a').each(function(num,elma){
      jQuery(elma).data('location','r'+currRow+'c'+currCol);
    });	

    currCol++;

  });
})();
});
