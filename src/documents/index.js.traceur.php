////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POLYFILLS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $traceurRuntime = {};

$traceurRuntime.toObject=function(value){
return Object(value)
}

/* 
   ;(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Node||e.HTMLDocument||e.HTMLElement).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);
ie8 fix
if(!window.Node)
	(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Element                            ).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);
*/
/* dom 4 shim https://github.com/WebReflection/dom4 */
(function(e){function m(a){return"string"===typeof a?e.document.createTextNode(a):a}function h(a){if(1===a.length)return m(a[0]);for(var b=e.document.createDocumentFragment(),c=s.call(a),d=0;d<a.length;d++)b.appendChild(m(c[d]));return b}for(var n=Object.defineProperty||function(a,b,c){a.__defineGetter__(b,c.get)},t=[].indexOf||function(a){for(var b=this.length;b--&&this[b]!==a;);return b},p,k,l,g,u=/^\s+|\s+$/g,q=/\s+/,r=function(a,b){if(this.contains(a))b||this.remove(a);else if(void 0===b||b)b=
!0,this.add(a);return!!b},c=(e.Element||e.Node||e.HTMLElement).prototype,f=["matches",c.matchesSelector||c.webkitMatchesSelector||c.khtmlMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||c.oMatchesSelector||function(a){var b=this.parentNode;return!!b&&-1<t.call(b.querySelectorAll(a),this)},"prepend",function(){var a=this.firstChild,b=h(arguments);a?this.insertBefore(b,a):this.appendChild(b)},"append",function(){this.appendChild(h(arguments))},"before",function(){var a=this.parentNode;a&&
a.insertBefore(h(arguments),this)},"after",function(){var a=this.parentNode,b=this.nextSibling,c=h(arguments);a&&(b?a.insertBefore(c,b):a.appendChild(c))},"replace",function(){var a=this.parentNode;a&&a.replaceChild(h(arguments),this)},"remove",function(){var a=this.parentNode;a&&a.removeChild(this)}],s=f.slice,d=f.length;d;d-=2)k=f[d-2],k in c||(c[k]=f[d-1]);"classList"in document.documentElement?(g=document.createElement("div").classList,g.add("a","b","a"),"a b"!=g&&(c=g.constructor.prototype,"add"in
c||(c=e.DOMTokenList.prototype),l=function(a){return function(){for(var b=0;b<arguments.length;)a.call(this,arguments[b++])}},c.add=l(c.add),c.remove=l(c.remove),c.toggle=r)):(l=function(a){if(!a)throw"SyntaxError";if(q.test(a))throw"InvalidCharacterError";return a},g=function(a){var b=a.className.replace(u,"");b.length&&f.push.apply(this,b.split(q));this._=a},g.prototype={length:0,add:function(){for(var a=0,b;a<arguments.length;a++)b=arguments[a],this.contains(b)||f.push.call(this,k);this._.className=
""+this},contains:function(a){return function(b){d=a.call(this,k=l(b));return-1<d}}([].indexOf||function(a){for(d=this.length;d--&&this[d]!==a;);return d}),item:function(a){return this[a]||null},remove:function(){for(var a=0,b;a<arguments.length;a++)b=arguments[a],this.contains(b)&&f.splice.call(this,d,1);this._.className=""+this},toggle:r,toString:function(){return f.join.call(this," ")}},n(c,"classList",{get:function(){return new g(this)},set:function(){}}));"head"in document||n(document,"head",
{get:function(){return p||(p=document.getElementsByTagName("head")[0])}});try{new e.CustomEvent("?")}catch(v){e.CustomEvent=function(a,b){function c(a,b,d,e){this.initEvent(a,b,d);this.detail=e}return function(d,e){var f=document.createEvent(a);if("string"!=typeof d)throw Error("An event name must be provided");"Event"==a&&(f.initCustomEvent=c);null==e&&(e=b);f.initCustomEvent(d,e.bubbles,e.cancelable,e.detail);return f}}(e.CustomEvent?"CustomEvent":"Event",{bubbles:!1,cancelable:!1,detail:null})}})(window);



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