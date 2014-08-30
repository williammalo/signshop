////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POLYFILLS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $traceurRuntime = {};

$traceurRuntime.toObject=function(value){
return Object(value)
}

/* dom 4 shim https://github.com/WebReflection/dom4 */
<?php include 'dom4.js'; ?>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DOM LIBRARY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Element.prototype.on = function(a,b,c){
	this.addEventListener(a,b,c);
	return this;
};

Element.prototype.clear = function(){
	var i;
	while(i=this.firstChild)this.removeChild(i);
	return this;
};

Element.prototype.query = function(a){
	return this.querySelector(a)
};

Element.prototype.queryAll = function(a){
	return Array.prototype.slice.call(this.querySelectorAll(a))
};

;(function(){

	window.dom=function(a,b){
	  if(a==="br")return document.createElement("br");//dumb ie bug fix
	  var e=arguments, l=e.length, c, i=1,
	  element = document.createElement(a)
	  
	  if(b&&b.constructor===Object)
	    for(c in b)
	      element.setAttribute(c, b[c])
	    ,i=2

	  for(;i<l;i++) element.append(e[i])

	  return element
	}

	dom.query=function(s){
		return document.querySelector(s);
	};
	dom.queryAll=a=>Array.prototype.slice.call(document.querySelectorAll(a));

	dom.fragment=document.createDocumentFragment.bind(document)

	dom.on=(a,b,c)=>addEventListener(a,b,c)
	dom.html=document.documentElement
	dom.body=document.body

})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UTILITY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mapObject=(o,ƒ)=>{
	var n = {}
	Object.keys(o)
		.forEach(v=>{n[v] = ƒ(o[v],v)})
	return n
};

var getQueryVariable = function(a){
	return unescape(
		(
			RegExp("[&?]"+a+"=([^&]+)")
				.exec(location)
				||["",""]
		)[1]||""
	)
};

var mergeObject=function(a,b){
	for(var i in b)
		a[i] = b[i]
	return a
};

var addMethods = (a,b)=>{
	for(var i in b)
		a.prototype[i] = b[i]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SEARCH LIBRARY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<?php include 'WS.js'; ?>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,inputFormElement = dom.query("#inputform")
	,showAllLink =
		dom("a",{style:"cursor:pointer"},"show all")
			.on("click", e=>{ 
				e.preventDefault();
				WS.area = 1000;
				WS.search();
				WS.area = WS.idealArea 
			})
	,linkTemplate = (link,text,tags,height)=>
		dom("a",{target:"paypal",href:link}
			,dom("img",{style:"height:"+height+"px"})
			,text
		)

WS.inputElement = dom.query("#input")
WS.containerElement = dom.query("#container")

WS.search.on("appendnode",item=>{
	if(!item.imageLoaded)               		  //test if image is loaded (very important for perf!!!)
		 item.node.firstChild.src = item.imageURL //load image
		,item.imageLoaded 		  = true 		  //cache that the image was loaded
})

WS.search.on("fragmentpopulated",(fragment,array)=>{
	if(array.length===WS.idealArea)
		fragment.append(showAllLink)
})

//include data
<?php include 'data.js'; ?>
//process data
WS.data.forEach(item=>{

	var  rawURL  = item[0]
		,rawText = item[1]
		,tags    = item[2]||""
		,buyURL  = WS.data.buyPath + rawURL + WS.data.buySuffix
		,height  = item[3]

	item.prettyText	 = WS.data.processor(rawText)
	item.node 		 = linkTemplate(buyURL,item.prettyText,tags,height)
	item.imageURL 	 = imagePath + rawText + (WS.data.imageSuffix||".png")
	item.imageLoaded = false
	item.searchText  = item.prettyText.replace("\n", " ")
	item.searchText  = item.searchText 
					 + item.searchText.replace(/‑/g, "" )
					 + item.searchText.replace(/‑/g, " ")
					 + item.searchText.replace(/‑/g, "-")
	item.searchText  = item.searchText + " " + tags
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROGRAMMING
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//defered images
dom.queryAll("[data-src]")
	.forEach(i=>{
		i.src = imagePath + i.getAttribute("data-src")
	})


//faq cover

var cover=dom(
	 "div"
	,{"class":"cover"}
	,dom("iframe",{src:"faq"})
)
	.on("click",e=>{
		e.preventDefault()
		cover.remove()
	})

dom.query("#faq")
	.on("click",e=>{
		e.preventDefault()
		dom.body.append(cover)
	})

//searchbox

WS.inputElement
	.on("input",WS.search)

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+WS.inputElement.value);
		e.preventDefault()
	})

//setup

if(WS.inputElement.value = getQueryVariable("search"))
	WS.search()


//stylesheet load
//https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
/*
var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
  webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
*/