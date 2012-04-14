/*
 * jQuery UI iPicture 1.0.0
 *
 * Copyright 2011 D'Alia Sara
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.draggable.js
 *	jquery.ui.droppable.js
 *  jquery.ui.effects.core.js
 */
 
 (function( $ ) {

  $.widget( "justmybit.iPicture", {
	options: {
		animation:false,
		animationBg: "bgblack",
		animationType:"ltr-slide",
		button: "moreblack",
		modify:false,
		initialize: false,
		moreInfos: {},
		pictures: []     
	},

	// Set up the widget
	_create: function() {
		var self = this;
		if(self.options.initialize){
			this.initialization();
		}else{
		
		//each picture
		$.each(self.options.pictures, function( index, value ) {
			var picture = $( '#'+value );
			var info = (self.options.moreInfos[value]);
			if(info!=undefined){
				// each more infos on that picture
				$.each(info, function( index, value ){
					var div = $('<div id="'+value.id+'" class="more more32"></div>' )
						.css('top',value.top).css('left',value.left).appendTo(picture);
					var imgButton;
					if(self.options.modify){
					  imgButton = $('<div class="imgButtonDrag '+self.options.button+'" title="drag in the picture"></div>').appendTo(div);
					  var divInput = $('<div class="inputDiv"></div>').insertAfter(imgButton);
					  var input = $('<input type="text" title="type here this tooltip" value="'+value.descr+'" />').appendTo(divInput);
					  $('<p class="pDelete" title="delete this tooltip"></p>').insertAfter(input).bind('click', function() {
					    $(div).remove();
					  });
					}else{
					  imgButton = $('<div class="imgButton '+self.options.button+'"></div>').appendTo(div);
					  $('<span class="descr">'+value.descr+'</span>').appendTo(div);
					}
					// href populating
					if(value.href){
						$('#'+value.id+' a').attr('href',value.href);
					}
					    
					//modify option management
					if(self.options.modify){
						var descr;
						$('#'+value.id).draggable({
						  //containment: picture,
						});
					}
				});
			}
		});
		//move option management
		if(self.options.modify){
		  
	    //add selected animationBg if animation set true
	    if(self.options.animation){
	      $(".more").addClass(self.options.animationBg);
	    }else{
	      $(".more").addClass('noAnimation');
	    }
	    //workaround for firefox issue on trimming border-radius content
		  $(".more32").css('overflow','visible');
			this.initialization();
			return;
		}
		//set animation
		if (self.options.animation) {
			this.animation();
		}
		}
	},

//animation for tooltips
	animation: function() {
		var self = this;
		switch( self.options.animationType ) {
			case "ltr-slide":
			$(".more").addClass('ltr-slide '+self.options.animationBg);
			//Animation function left to right sliding
			$(".more").hover(function(){  
				$(this).stop().animate({width: '225px'}, 200).css({'z-index' : '10'});  
			}, function () {  
				$(this).stop().animate({width: '32px' }, 200).css({'z-index' : '1'});  
			});
			break;
		}
	},
	
	initialization: function(){
		var self = this;
		
		$.each(self.options.pictures, function( index, value ) {
			var picture = $( '#'+value );

			// list of buttons to change tooltip color
			var listContainer = $('<div class="listContainer"><ul><li class="'+value+'-button '+self.options.button+'" title="drag in the picture"></li></ul><div class="bgList" title="choose another background for tooltips"></div><div class="buttonsList" title="choose another color for tooltips"></div></div>').appendTo('#'+value);
			var buttonsDropp = $('<div class="buttonsDropp"></div>').insertAfter(listContainer);
			$('<ul class="inline buttons">'
				+'<li id="moregold" class="moregold"></li>'
			  +'<li id="moregrey" class="moregrey"></li>'
				+'<li id="moreblack" class="moreblack"></li>'
				+'<li id="moredarkblue" class="moredarkblue"></li>'
				+'<li id="moreblue" class="moreblue"></li>'
				+'<li id="morelightblue" class="morelightblue"></li>'
				+'<li id="morelightblue2" class="morelightblue2"></li>'
				+'<li id="morewatergreen" class="morewatergreen"></li>'
				+'<li id="morelightgreen" class="morelightgreen"></li>'
				+'<li id="moregreen" class="moregreen"></li>'
				+'<li id="moreyellow" class="moreyellow"></li>'
				+'<li id="moreorange" class="moreorange"></li>'
				+'<li id="morered" class="morered"></li>'
				+'<li id="morepurple" class="morepurple"></li>'
				+'<li id="moreviolet" class="moreviolet"></li>'
				+'<li id="morelightviolet" class="morelightviolet"></li>'
				+'<li id="morefucsia" class="morefucsia">'
				+'<li id="beadgold" class="beadgold"></li>'
				+'<li id="beadgrey" class="beadgrey"></li>'
				+'<li id="beadblack" class="beadblack"></li>'
				+'<li id="beaddarkblue" class="beaddarkblue"></li>'
				+'<li id="beadblue" class="beadblue"></li>'
				+'<li id="beadlightblue" class="beadlightblue"></li>'
				+'<li id="beadlightblue2" class="beadlightblue2"></li>'
				+'<li id="beadwatergreen" class="beadwatergreen"></li>'
				+'<li id="beadlightgreen" class="beadlightgreen"></li>'
				+'<li id="beadgreen" class="beadgreen"></li>'
				+'<li id="beadyellow" class="beadyellow"></li>'
				+'<li id="beadorange" class="beadorange"></li>'
				+'<li id="beadred" class="beadred"></li>'
				+'<li id="beadpurple" class="beadpurple"></li>'
				+'<li id="beadviolet" class="beadviolet"></li>'
				+'<li id="beadlightviolet" class="beadlightviolet"></li>'
				+'<li id="beadfucsia" class="beadfucsia"></li>'
			  +'</ul>').appendTo(buttonsDropp);
			chooseButtons = $('ul.buttons').find('li');
			$.each(chooseButtons, function( index, button ){
				$(button).bind('click', function(){
				  $.each(self.options.pictures, function( index, pic ) {
				    $('.'+pic+'-button').removeClass(self.options.button);
					  $('.'+pic+'-button').addClass(button.id);
				  });
					$(buttonsDropp).css('display','none');
					buttons = self.element.find('.imgButtonDrag');
					$.each(buttons, function( index, value ){
						$(value).removeClass(self.options.button);
						$(value).addClass(button.id);
					});
					self.options.button=button.id;
					clickCounter=0;
					return false;
				});
				$(button).bind('mouseover', function(){
					$(button).css('width','36');
					$(button).css('height','36');
					$(button).css('background-size','36px');
					$(button).css('z-index','10');
				});
				$(button).bind('mouseout', function(){
				  $(button).css('width','32');
					$(button).css('height','36');
					$(button).css('background-size','32px');
					$(button).css('z-index','1');
				});
			});
			var clickCounter=0;
			$('#'+value +' .buttonsList').bind('click', function(){
			  if(clickCounter==0){
			   $(buttonsDropp).css('display','block');
			   clickCounter=1;
			  }else if(clickCounter==1){
			    $(buttonsDropp).css('display','none');
			    clickCounter=0;
			  }
			  return false;
			});
		
		// list of backgrounds to change tooltip background
		if (self.options.animation) {
		  $('.listContainer').addClass(self.options.animationBg);
			var bgDropp = $('<div class="bgDropp"></div>').insertAfter(listContainer);
			$('<ul class="inline bg">'
				+'<li id="bgblack" class="bgblack noborder"></li>'
			  +'<li id="bgwhite" class="bgwhite noborder"></li>'
			  +'</ul>').appendTo(bgDropp);
			chooseBg = $('ul.bg').find('li');
			$.each(chooseBg, function( index, bg ){
				$(bg).bind('click', function(){
				  $('.listContainer').removeClass(self.options.animationBg);
				  $('.listContainer').addClass(bg.id);
					$(bgDropp).css('display','none');
					more = self.element.find('.more');
				  $.each(more, function( index, value ){
					  $(value).removeClass(self.options.animationBg);
					  $(value).addClass(bg.id);
				  });
					self.options.animationBg=bg.id;
				  
					clickCounter2=0;
					return false;
				});
				$(bg).bind('mouseover', function(){
					$(bg).css('border','1px solid red');
					$(bg).css('z-index','10');
				});
				$(bg).bind('mouseout', function(){
				  $(bg).css('border','0');
					$(bg).css('z-index','1');
				});
			});
			var clickCounter2=0;
			$('#'+value +' .bgList').bind('click', function(){
			  if(clickCounter2==0){
			   $(bgDropp).css('display','block');
			   clickCounter2=1;
			  }else if(clickCounter2==1){
			    $(bgDropp).css('display','none');
			    clickCounter2=0;
			  }
			  return false;
			});
		} else{
		  $('#'+value +' .bgList').bind('click', function(){
			  alert('animation is off, set animation:true');
			});
		}
			
			//Create a new tooltip
			$('.'+value+'-button').draggable({
				helper:'clone',
				//containment: picture,
				stop: function(event, ui){
					$('<p class="top">'+ui.position.top+'</p><p class="left">'+ui.position.left+'</p>').appendTo(this);
				}
			});
			var plus=0;
			$('#'+value).droppable({
				accept: '.'+value+'-button',
				drop: function( event, ui ) {
					plus++;
					var div = $('<div id="'+value+'-more'+plus+'" class="'+value+' more more32"></div>' )
						.css('top',ui.position.top+"px").css('left',ui.position.left+"px").draggable(
						//{containment: picture}
						).appendTo(picture);
					//add selected animationBg if animation set true
		      if(self.options.animation){
		        $(".more").addClass(self.options.animationBg);
		      }else{
		        $(".more").addClass('noAnimation');
		      }
		      //workaround for firefox issue on trimming border-radius content
		      $(".more32").css('overflow','visible');
					var imgButton = $('<div class="imgButtonDrag '+self.options.button+'" title="drag in the picture"></div>').appendTo(div);
					var divInput = $('<div clas="inputDiv"></div>').insertAfter(imgButton);
					var input = $('<input type="text" title="type here this tooltip"/>').appendTo(divInput).focus();
					$('<p class="pDelete" title="delete this tooltip"></p>').insertAfter(input).bind('click', function() {
					  $(div).remove();
					});
				}
			});
		});
		if(self.options.initialize){
			$('<div class="buttonSave"><p>Initialization mode</p><input type="button" value="save" class="save" title="get code!"/></div>').prependTo(self.element);
			$('<div class="buttonSave"><p>Initialization mode</p><input type="button" value="save" class="save" title="get code!"/></div>').appendTo(self.element);
		}
		if(self.options.modify){
			$('<div class="buttonSave"><p>Modify mode</p><input type="button" value="save" class="save" title="get code!"/></div>').prependTo(self.element);
			$('<div class="buttonSave"><p>Modify mode</p><input type="button" value="save" class="save" title="get code!"/></div>').appendTo(self.element);
		}
		$('#'+self.element.attr('id')+' .save').bind('click', function() {
		var moreInfos = 'moreInfos:{';
			//each picture
		$.each(self.options.pictures, function( index, value ) {
			if(index>0){
				moreInfos=moreInfos+',';
			}
			var picture = $( '#'+value );
			var divs = $(picture).find('.more32');
			moreInfos = moreInfos+'"'+value+'":[';
			// each more infos on that picture
			$.each(divs, function( index, value ){
				if(index>0){
					moreInfos=moreInfos+',';
				}
				descr=$(value).find('input').val();
				if(descr==undefined){
					descr="";
				}
				topPosition=$(value).css('top');
				leftPosition=$(value).css('left');
				moreInfos = moreInfos+'{"id":"'+value.id+'","descr":"'+descr+'","top":"';
				moreInfos = moreInfos+topPosition+'","left":"'+leftPosition+'"';
				
				if(value.href){
					moreInfos=moreInfos+',"href":"'+$('#'+value.id+' a').attr('href')+'"';
				}
				moreInfos=moreInfos+'}';
			});
			moreInfos=moreInfos+']';
		});
		moreInfos=moreInfos+'}';
		if(self.options.animation){
		  alert('animation: true, animationType: "'+self.options.animationType+'", animationBg: "'+self.options.animationBg+'", button: "'+self.options.button+'", '+moreInfos);
		}else{
		  alert('animation: false, button: "'+self.options.button+'", '+moreInfos);
		}
		});
	},
	
	// Use the _setOption method to respond to changes to options
	
	_setOption: function( key, value ) {

	// In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget	
	$.Widget.prototype._setOption.apply( this, arguments );
		// In jQuery UI 1.9 and above, you use the _super method instead
		//this._super( "_setOption", key, value );
	},
	 
	// Use the destroy method to clean up any modifications your widget has made to the DOM
	destroy: function() {
		// In jQuery UI 1.8, you must invoke the destroy method from the base widget
		$.Widget.prototype.destroy.call( this );
		// In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
		}
	});
  
}( jQuery ) );

