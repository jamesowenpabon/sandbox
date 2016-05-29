var sc_bc_vids = {};
window.onBCTemplateReady = function(evt){
	//_satellite.notify("got here: onBCTemplateReady",1);
  var player = brightcove.api.getExperience(evt.target.experience.id),
      videoPlayer = player.getModule('videoPlayer');
	//_satellite.notify("player: "+player,1);
	//_satellite.notify("videoPlayer: "+videoPlayer,1);
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, function(v){
    var name = v.media.displayName;
    s.Media.open(name,v.duration,'brightcove');
    s.Media.play(name,v.position);
    if(!sc_bc_vids[name]){
      sc_bc_vids[name]={};
    }
		if (jQuery('object').closest('div.popup-holder').length == 0) {
			s.eVar24='inline';
  	}
    sc_bc_vids[name].started = true;
    //_satellite.notify('Brightcove Video : '+v.media.displayName+' : start',1);
  });
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, function(v){
    var name = v.media.displayName;
    s.Media.stop(v.media.displayName,v.position);
    //_satellite.notify('Brightcove Video : '+v.media.displayName+' : stop',1);
  });
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(v){
    var name = v.media.displayName;
    if(!sc_bc_vids[name]){
      sc_bc_vids[name]={};
    }
    if(sc_bc_vids[name].started===true){
      s.Media.play(v.media.displayName,v.position);
      //_satellite.notify('Brightcove Video : '+v.media.displayName+' : play',1);
    }
  });
};

window.onBCTemplateLoad = function(evt){
  //console.log('templateLoad',evt);
}
