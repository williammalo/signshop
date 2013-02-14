
//@codekit-prepend "templates-min.js"
//@codekit-prepend "logos-min.js"
//@codekit-prepend "elements-min.js"
//@codekit-prepend "graphics-min.js"

//reset
//window.localStorage.setItem("cartClicked","0");window.localStorage.setItem("tempClicked","0")
//formsubmit
找("#mail").onclick=function(){this.classList.add("clicked")}
if(window.location.hash=="#subscribed"){
	找("#mail").innerHTML="<span>We sent you an email to validate your subscription.</span>"
	window.location.hash=""
}
//tabs
;(function(){
	var t, i, a=找("nav a");
	for(i=a.length;i--;){
		t=a[i].innerHTML
		a[i].innerHTML='<svg width="35" height="60" class=border><path d="M 32,0 C 27,0 24,3 22,7 22,7 22,7 22,8 l 0,0 L 9,54 C 8,57 4,60 0,60 l 35,0 0,-60 -3,0 z"/></svg><svg width="35" height="60" class=border><path d="m 3,0 c 4,0 8,3 9,7 0,0 0,1 0,1 l 0,0 L 26,54 C 27,57 31,60 35,60 L 0,60 0,0 3,0 z"/></svg><svg width="35" height="60" class=tab><path d="M 32,0 C 27,0 24,3 22,7 22,7 22,7 22,8 l 0,0 L 9,54 C 8,57 4,60 0,60 l 35,0 0,-60 -3,0 z"/></svg><svg width="35" height="60" class=tab><path d="m 3,0 c 4,0 8,3 9,7 0,0 0,1 0,1 l 0,0 L 26,54 C 27,57 31,60 35,60 L 0,60 0,0 3,0 z"/></svg>'+t
	}
})()
//cart button
var cart=找("#cart")
var cspan=找("#cart span")
cspan.style.top=(+window.localStorage.getItem("cartClicked"))?"-20px":"0";
cart.onclick=function(){window.localStorage.setItem("cartClicked","1")}
//faq modal
找("#faq").onclick=function(e){
	var cover,iframe;
	cover=document.createElement("div")
	cover.className="cover"
	iframe=document.createElement("iframe")
	iframe.src="faq"
	cover.appendChild(iframe)
	cover.onclick=function(e){if(e.target===cover)document.body.removeChild(this),e.preventDefault()}
	document.body.appendChild(cover)
	e.preventDefault()
};
//slideshow
(function(){if(!ie){
	var images=找("#slide img");
	(function f(index){
		for(i=images.length;i--;)images[i].style.opacity=0
		images[index|0].style.opacity=1
		index=((index|0)+1)%images.length
		setTimeout(function(){f(index)},4e3)
	})()
}})()
var g=找("header").classList;
//click event
var clickevent=function(e,d,t){
	if(!e){e={};e.target=event.srcElement}
	t=e.target
	d=t.id
	if(t.className==="more"){
		g.toggle("show")
		e.preventDefault()
	}
	if(d[0]==="p"&&Modernizr.history){
		g.remove("show");
		var pageName=[,"logos","elements","templates","graphics"][d[1]]
		History.pushState("","",pageName)
		_gaq.push(['_trackPageview', '/'+pageName]);
		window[pageName].setup()
		e.preventDefault()
	}
}
ontouchstart=clickevent
onmousedown=clickevent
onclick=function(e){if(Modernizr.history){t=e.target;if(t.className==="more"||t.id[0]==="p")e.preventDefault()}}
//load event
var pageName=/signshop/.test(location.pathname)?location.pathname.split("/signshop/")[1]:location.pathname.split("/")[1];
pageName=window[pageName]?pageName:"templates"
window[pageName].setup()
//google analytics
var _gaq=[['_setAccount','UA-37761254-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s)}(document,'script'))