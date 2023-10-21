//global variables------------------------------------------------------------------------------------------
const pageWrapper = document.getElementById('page');
const pageBody = document.getElementById('pageBody');
const headerEl = document.getElementById('pageHeader');
const mainLogo = document.getElementById('mainLogo');








//helper functions------------------------------------------------------------------------------------------
const hasClass = (element, className) => {
    return ('' + element.className + '').indexOf(' ' + className + '') > -1;
};


const addEvent = (object, type, callback)=> {
	if (object == null || typeof(object) == 'undefined') return;
	if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};






//checks------------------------------------------------------------------------------------------
const pageProperties = {

	windowResized: false,
	resizeTimer: '',
	windowWidth: window.innerWidth,
	
	touchDevice: false,
	animations: true,

	init:() => {
		addEvent(window, "resize", function(event) {
			clearTimeout(pageProperties.resizeTimer);
   			pageProperties.resizeTimer = setTimeout(pageProperties.resized, 500);	
		});
		
		pageProperties.movileNav();
		
		//check if touch device
		if ('ontouchstart' in document) {
			pageProperties.touchDevice = true;
			pageProperties.animations = false;
			pageWrapper.className -= ' noTs';
			pageAnimations.init(pageAnimations.enterPage);
		} else {
			pageProperties.touchDevice = false;
			pageProperties.animations = true;
			pageAnimations.init(pageAnimations.enterPage);
		}
		
		
	},
	
	resized: ()=>{
		console.log('window.resized()');
		pageProperties.windowResized = true;		
		pageProperties.windowWidth = window.innerWidth;	
		
		pageProperties.movileNav();
	},
	
	movileNav: ()=> {
		if(pageProperties.windowWidth <= 768 ){
			mobileNav.init();
			pageProperties.animations = false;
		};
	}
}






//Loading------------------------------------------------------------------------------------------
const loadimages = {
	imageEls: document.getElementsByClassName('delayLoad'),
	videoEls: document.getElementsByClassName('preventPreload'),
	
	delayLoad: ()=> {
		let imgSrc; 		
		for (var i=0; i<loadimages.imageEls.length; i++) {
			imgSrc = loadimages.imageEls[i].dataset.imagesrc;
			loadimages.imageEls[i].src = imgSrc;
		};	
	},
	
	preventPreload: ()=> {
		let videoSrc;
		for (var i=0; i<loadimages.videoEls.length; i++) {
			videoSrc = loadimages.videoEls[i].dataset.videosrc;
			loadimages.videoEls[i].setAttribute("src", videoSrc);
		};
	}
	
}





//Header------------------------------------------------------------------------------------------
const headerFX = {
	triggerEl: document.getElementById('headerTrigger'),
	triggerPoint: 0,
	
	init: ()=> {
		//console.log('headerFX.init()');
		if (headerFX.triggerEl !== null ) {
			headerFX.triggerElTop = headerFX.triggerEl.getBoundingClientRect().top + window.pageYOffset;
			headerFX.triggerPoint = headerFX.triggerElTop - headerEl.offsetHeight;
			window.addEventListener('scroll', headerFX.scrollFunction);	
			if (window.pageYOffset > headerFX.triggerPoint &&! hasClass(headerEl, "shrink")){
				headerEl.className += ' shrink';
			};
		} else {
			// headerEl.classList.add("shrink");
			headerEl.className += ' shrink';
		};
	},	
		
	scrollFunction: ()=> {
		//console.log('headerFX.scrollFunction()')
		if(pageProperties.windowResized){
			headerFX.triggerElTop = headerFX.triggerEl.getBoundingClientRect().top + window.pageYOffset;
			headerFX.triggerPoint = headerFX.triggerElTop - headerEl.offsetHeight;				
		};
		if (window.pageYOffset > headerFX.triggerPoint &&! hasClass(headerEl, "shrink")){
			headerFX.shrinkHeader();
		};
		if (window.pageYOffset < headerFX.triggerPoint && hasClass(headerEl, "shrink")){
			headerFX.restoreHeader();		
		};
	},	
	
	shrinkHeader: ()=> {
		//console.log('headerFX.shrinkHeader()');
		TweenMax.from(headerEl, 0.25, {top:-headerFX.triggerPoint});
		TweenMax.to(headerEl, 0.25, {top:0, className:"+=shrink", delay: 0.25});
	},	
	
	restoreHeader: ()=> {
		//console.log('headerFX.restoreHeader()');
		TweenMax.to(headerEl, 0.25, {top:0, className:"-=shrink"});
	},
};




const mobileNav = {
	headerNav: document.getElementById('headerNav'),
	headerOpen: false,
	
	init: ()=> {
		console.log('mobileNav.init()');
		mobileNav.headerNav.addEventListener('click', mobileNav.openClose);
	},
	
	openClose: ()=> {
		console.log('mobileNav.openClose()');
		if(mobileNav.headerOpen == false){
			//open menu
			console.log('open menu');
			//TweenMax.to(mobileNav.headerNav, 0.25, {height: 'auto'});
			TweenLite.set(mobileNav.headerNav, {height:"auto", width:" 100%", backgroundColor: 'rgba(0,0,0,0.75)'})
			TweenLite.from(mobileNav.headerNav, 0.25, {height:0, width:0});
			mobileNav.headerOpen = true;
		} else {
			//closeMenu
			console.log('close menu');
			TweenMax.to(mobileNav.headerNav, 0.25, {height: '3.5em', width: '3.5em', clearProps: 'height, width, backgroundColor'});
			mobileNav.headerOpen = false;
		};
	}
	
}






//Animations------------------------------------------------------------------------------------------
const pageAnimations = {
	//anchors
	anchorImgEl: document.getElementById('anchorImg'),
	anchorImgSrc: '',
	//thumbnails
	thumbnailEls: document.getElementsByClassName('thumbnail-container'),
	thumbnail: '',
	thumbnails: [],
	//pageOverlay
	pageOverlay: document.getElementById('pageOverlay'),
	//links	
	headerNavEls: document.getElementById('headerNav'),
	primaryLinks: document.getElementsByClassName('primary_navigation'),
	secondaryLinks: document.getElementsByClassName('secondary_navigation'),
	porftolioNavEls: document.getElementById('portfolio_nav'),
// 	linkEls: document.getElementsByTagName('a'),
	//gallery
	portfolioHeadlineEl: document.getElementById('portfolioTitle'),
	portfolioParagraphWrapperEl: document.getElementById('portfolioParagraphWrapper'),
	portfolioParagraphEl: document.getElementById('portfolioParagraph'),
	

	init: (callback)=> {
		// console.log('pageAnimations.init()');
		
		if (pageAnimations.anchorImgEl !== null ) {
			TweenMax.set(pageAnimations.anchorImgEl, {opacity: 0});
			pageAnimations.anchorImgSrc = pageAnimations.anchorImgEl.dataset.imagesrc;
			pageAnimations.anchorImgEl.src = pageAnimations.anchorImgSrc;
			if(pageAnimations.portfolioHeadlineEl == null || !pageProperties.animations){
				pageAnimations.anchorImgEl.addEventListener("load", pageAnimations.loadAnchor);
			}	
		};
			
		if (pageAnimations.thumbnailEls !== null) {	
			if(pageProperties.animations){
				for (var i=0; i<pageAnimations.thumbnailEls.length; i++) {
					pageAnimations.thumbnail = new pageAnimations.ThumbnailAnimation(pageAnimations.thumbnailEls[i]);
					pageAnimations.thumbnails.push(pageAnimations.thumbnail);
				};	
			} else {
				for (var i=0; i<pageAnimations.thumbnailEls.length; i++) {
					pageAnimations.thumbnailEls[i].addEventListener('click', function(event)
						{
							event.preventDefault();
							pageAnimations.exitPage(event.currentTarget.getElementsByTagName('a')[0].attributes.href.value);               
						}
					)
				};	
			}	
		};
		
		if (mainLogo !== null ) {
			mainLogo.addEventListener('click', function(event)
				{
					event.preventDefault();
					pageAnimations.exitPage(event.currentTarget.getElementsByTagName('a')[0].attributes.href.value);               
				}
			)
		};
		
		if (pageAnimations.primaryLinks !== null ) {
			for (var i=0; i<pageAnimations.primaryLinks.length; i++) {
				pageAnimations.primaryLinks[i].addEventListener('click', function(event)
					{
						event.preventDefault();
						pageAnimations.exitPage(event.currentTarget.attributes.href.value);               
					}
				)
			};
		};
		
		if (pageAnimations.secondaryLinks !== null ) {	
			for (var i=0; i<pageAnimations.secondaryLinks.length; i++) {
				pageAnimations.secondaryLinks[i].addEventListener('click', function(event)
					{
						event.preventDefault();
						pageAnimations.exitPage(event.currentTarget.attributes.href.value);               
					}
				)
			};
		};
		
		if (pageAnimations.headerNavEls !== null ) {	
			pageAnimations.headerNavEls = pageAnimations.headerNavEls.getElementsByTagName('a');
			
			for (var i=0; i<pageAnimations.headerNavEls.length; i++) {
				pageAnimations.headerNavEls[i].addEventListener('click', function(event)
					{
						event.preventDefault();
						pageAnimations.exitPage(event.currentTarget.attributes.href.value);               
					}
				)
			};
		};	
		
		if (pageAnimations.porftolioNavEls !== null ) {	
			pageAnimations.porftolioNavEls = pageAnimations.porftolioNavEls.getElementsByTagName('a');
			
			for (var i=0; i<pageAnimations.porftolioNavEls.length; i++) {
				pageAnimations.porftolioNavEls[i].addEventListener('click', function(event)
					{
						event.preventDefault();
						pageAnimations.exitPage(event.currentTarget.attributes.href.value);               
					}
				)
			};
		};		
		
// 		if (pageAnimations.portfolioHeadlineEl !== null && pageProperties.animations) {	
// 			TweenMax.set(pageAnimations.portfolioHeadlineEl, {x: '-150%'});
// 			TweenMax.set(pageAnimations.portfolioParagraphEl, {opacity: 0});
// 			TweenMax.set(pageAnimations.portfolioParagraphWrapperEl, {scaleY: 0});
// 		};
		if (pageAnimations.portfolioHeadlineEl !== null && pageProperties.animations) {	
			TweenMax.set(pageAnimations.portfolioHeadlineEl, {x: '-150%'});
			TweenMax.set(pageAnimations.portfolioParagraphEl, {opacity: 0});
			TweenMax.set(pageAnimations.portfolioParagraphWrapperEl, {scaleY: 0});
		};		
		
		if (pageAnimations.portfolioHeadlineEl == null || !pageProperties.animations) {	
			loadimages.delayLoad();
			loadimages.preventPreload();
		}

		
// 		 console.log(hasClass(pageBody, "gallery-page"));
// 		 console.log(hasClass(headerEl, "butter"));

		callback();	
	},
	
	loadAnchor: ()=> {		
		// console.log('pageAnimations.loadAnchor()');
		TweenMax.to(pageAnimations.anchorImgEl, 0.5, {opacity:1, autoRound: false});
	},	

	enterPage: ()=> {
		//console.log('pageAnimations.enterPage();');
		TweenMax.to(pageAnimations.pageOverlay, 0.25, {opacity: 0, onComplete: function()
			{
				if(pageAnimations.portfolioHeadlineEl !== null && pageProperties.animations){
					pageAnimations.animatePortfolioText();
				}
			}
		});
		TweenMax.set(pageAnimations.pageOverlay, {height: 0, clearProps: 'opacity', delay: 0.5});
// 		TweenMax.to(pageWrapper, 0.5, {backgroundColor: "#fff"});
// 		TweenMax.to(pageBody, 0.5, {opacity: "1"});	               
	},
	
	exitPage: (url)=> {
		//console.log('pageAnimations.exitPage();');
		// TweenMax.to(pageAnimations.pageOverlay, 0.25, {height: '100%', ease: Power4.easeOut, onComplete: function()
// 			{
// 				window.location.href = url;                                           
// 			}
// 		})	          
		TweenMax.to(pageAnimations.pageOverlay, 0.25, {height: '100%', ease: Power4.easeOut, onComplete: function()
			{	
				window.location.href = url;
				TweenMax.to(pageAnimations.pageOverlay, 0.25, {height: '0', delay: 0.5});
		// 		TweenMax.to(pageAnimations.pageOverlay, 0.25, {height: '0'});                                      
			}
		})	               
	},

	animatePortfolioText: ()=> {	
		//console.log('pageAnimations.animatePortfolioText()');
		TweenMax.to(pageAnimations.portfolioHeadlineEl, 0.5, {x:'0%', ease: Power4.easeOut, autoRound: false});
		TweenMax.to(pageAnimations.portfolioParagraphWrapperEl, 0.25, {scaleY: 1, ease: Back.easeOut.config(1.7), autoRound: false});
		TweenMax.to(pageAnimations.portfolioParagraphEl, 0.5, {opacity: 1, delay: 0.25, autoRound: false, onComplete: function()
			{
				loadimages.delayLoad();
				pageAnimations.loadAnchor();
				loadimages.preventPreload();
			}
		
		});
// 		TweenMax.to(galleryPageLoadFX.headerEl, 0.5, {top: '0', delay: 0.5, ease: Power4.easeOut, clearProps: 'top', autoRound: false});
	},

	ThumbnailAnimation: function(thumbnailElement) {
		this.thumbnailEl = thumbnailElement;
		this.img = this.thumbnailEl.getElementsByTagName('img');
		this.textWrapper = this.thumbnailEl.getElementsByClassName('text-wrapper');
		this.headline = this.thumbnailEl.getElementsByTagName('h3');
		this.text = this.thumbnailEl.getElementsByTagName('p');
		this.hoverTl;
		this.clickTl;
		
		this.init =()=>{
			this.hoverTl = new TimelineMax({paused: true});
			this.hoverTl
				.to(this.img, 1.5, {className:"+=selected", ease: Power4.easeOut})
				.to(this.textWrapper, 0.5, {className:"+=selected", ease: Power4.easeOut}, 0.1)
				.to(this.headline, 0.6, {className:"+=selected", ease: Power4.easeOut}, 0.6)
				.to(this.text, 0.6, {opacity: 1, ease: Power4.easeOut}, 0.6)
			;
			var url = this.thumbnailEl.getElementsByTagName('a')[0].getAttribute("href");
			this.clickTl = new TimelineMax({paused: true});
			this.clickTl
				.to(this.textWrapper, 0.25, {className:"+=clicked", ease: Power4.easeOut})
				.to(this.text, 0.2, { opacity: 0 },0)
				.to(this.headline, 0.15, {className:"+=clicked", ease: Power4.easeOut}, 0)
				.to(this.headline, 0.35, {textAlign:"center", width: "100%", ease: Power4.easeOut}, 0.3)	
				.to(this.textWrapper, 0.25, {backgroundColor: "#000", borderColor: "#000", ease: Power4.easeOut, onComplete: function()
					{
							pageAnimations.exitPage(url);               
						}
				}, 1)            
 				.to(this.headline, 0.25, {color: '#222'}, 0.8)	               
			;	
			this.thumbnailEl.addEventListener('click', this.clickFunction);	 
			this.thumbnailEl.addEventListener('mouseenter', this.hoverIn);
			this.thumbnailEl.addEventListener('mouseleave', this.hoverOut);
		};
		this.hoverIn = ()=> {	
			this.hoverTl.play().timeScale(1);
		};
		this.hoverOut = ()=> {
			this.hoverTl.reverse().timeScale(1.5);
		};
		this.clickFunction = (event)=> {
			event.preventDefault();
			this.hoverTl.clear();
			this.clickTl.play().timeScale(1.7);
		};
		this.init();
	},
};














//Media Player------------------------------------------------------------------------------------------
const video = {
	els: document.getElementsByTagName('video'),
	player:'',
	players: [],
	embedPlaying: false,
	
	init: ()=> {
		console.log('video.init()');
		for (var i=0; i<video.els.length; i++) {
			video.player = new video.VideoEmbed(video.els[i]);
			video.players.push(video.player);
		};	
	},
	
	VideoEmbed: function(videoElement) {
		this.videoEl = videoElement;
		this.videoEl.controls = false;
		this.init =()=>{
			for (var i = 0; i < this.videoEl.parentNode.childNodes.length; i++) {
				if (this.videoEl.parentNode.childNodes[i].className == 'video-controls') {
					this.controlEl  = this.videoEl.parentNode.childNodes[i];
					break;
				}        
			};
			for (var j = 0; j < this.controlEl.childNodes.length; j++) {
				if (this.controlEl.childNodes[i].className == 'progressbar') {
					this.progressbar  = this.controlEl.childNodes[i];
					break;
				};
			};  
			this.progress = this.progressbar.firstElementChild;
			
			this.controlEl.addEventListener('click', this.playPauseVideo);			
			this.videoEl.addEventListener('play', this.playEventFunction);
			this.videoEl.addEventListener('pause', this.pauseEventFunction);
			this.videoEl.addEventListener('ended', this.endedEventFunction);
			this.videoEl.addEventListener('timeupdate', this.timeupdateEventFunction);
		};
		
		this.playPauseVideo = ()=> {
			if(video.embedPlaying == false){
				this.videoEl.play();
			} else {
				this.videoEl.pause();
			};
		};
		
		this.timeupdateEventFunction =()=> {
			var percentage = Math.floor((100 / this.videoEl.duration) * this.videoEl.currentTime);
			this.progress.style.width = percentage +'%';
			//console.log('percentage', percentage)
		},
				
		this.playEventFunction =()=> {	
// 			console.log('VideoEmbed.playEventFunction()');
			this.setVideoEmbedPlaying(true);
			
			//$(this.controlEl).attr('class', 'video-controls'); //clears all classes adds video-controls
			this.controlEl.className = 'video-controls';
 			
 			//$(this.controlEl).addClass('playing');	
 			this.controlEl.className += ' playing';
 			
 			
 			if(video.players.length > 1){
 				this.fadePlayers('fade');
 			};	
		};
		
		this.pauseEventFunction =()=> {
// 			console.log('VideoEmbed.pauseEventFunction()');
			this.setVideoEmbedPlaying(false);
// 			$(this.controlEl).attr('class', 'video-controls');
			this.controlEl.className = 'video-controls';
// 			$(this.controlEl).addClass('paused');			
			this.controlEl.className += ' paused';
				

			if(video.players.length > 1){
				this.fadePlayers('show');
			};	
		};
		
		this.endedEventFunction =()=> {
// 			console.log('VideoEmbed.endedEventFunction()');
			this.setVideoEmbedPlaying(false);
			this.controlEl.className = 'video-controls';			
			this.controlEl.className += ' ended';	
			
			if(video.players.length > 1){
				this.fadePlayers('show');
			};	
			this.progress.style.width = '100%';
		};
		
		this.setVideoEmbedPlaying =(arg)=> {
			if(arg == true){
				video.embedPlaying = true;
			};
			if(arg == false){
				video.embedPlaying = false;
			};
		};
		
		this.fadePlayers =(arg)=> {
			if(arg == 'fade'){
				for (var i=0; i<video.players.length; i++) {
					video.players[i].controlEl.className += ' inactive';
				};
				this.controlEl.className =
						this.controlEl.className.replace( /(?:^|\s)inactive(?!\S)/g , '' )

			};
			if(arg == 'show') {
				for (var i=0; i<video.players.length; i++) {
					video.players[i].controlEl.className =
						video.players[i].controlEl.className.replace( /(?:^|\s)inactive(?!\S)/g , '' )
					
				};
			};
		};
		
		this.init();
	},	
};






//Email------------------------------------------------------------------------------------------
const email = {
	
	submitEl: document.getElementById('sendEmail'),
	senderEmail: '',
	senderName: '',
	subject: '',
	message: '',
	receiverEmail: 'contactform@vinniefurman.com',
	
	init: ()=> {
		// console.log('email.init()');
		email.submitEl.style.cursor = "pointer";
		email.submitEl.addEventListener('click', function(event)
			{
				event.preventDefault();
				email.send();
			}
		);
	},
	
	validate: (email)=> {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	},
	
	send: (event)=> {
// 		alert('send email');
		// console.log('quoteGen.sendEmail()');
// 		event.preventDefault();
// 		quoteGen.clientEmail = document.getElementById("clientEmail").value;
// 			
		email.senderEmail = document.getElementById('senderEmail').value;
		email.senderName =  document.getElementById('senderName').value;
		email.subject = document.getElementById('subject').value;
		email.message = document.getElementById('message').value;
		
		if(email.validate(email.senderEmail)){
			email.buildEmail();
		} else {
			console.log('email could not be sent');
			email.submitEl.innerHTML = 'Invalid Email Address Please Try Again';
		};
	},
	
	buildEmail: ()=> {
		$.ajax({
			url: "mailer.php",
			type: 'POST',
			data: {
				receiverEmail: email.receiverEmail,
				senderEmail: email.senderEmail,
				senderName: email.senderName,
				subject: email.subject,
				message: email.message,
			},
		})
		.done(function(response) {
			//console.log('email sent');
			email.submitEl.innerHTML = 'Email Sent';
			email.submitEl.className += ' sent'
		})

		.fail(function(data) {
			console.log('email failed');
			email.submitEl.innerHTML = 'Email Failed Please Try Again';
		});
	},

};








































const load = () => {
	headerFX.init();
	pageProperties.init();
	// pageAnimations.init(pageAnimations.enterPage);
	if(document.getElementsByTagName('video').length > 0 ){
		video.init();	
	};
	if(document.getElementById('contactForm') !== null ){
		email.init();	
	};	
}

window.onload = load;