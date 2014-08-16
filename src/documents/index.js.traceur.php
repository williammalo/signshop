////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POLYFILLS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $traceurRuntime = {};

$traceurRuntime.toObject=function(value){
return Object(value)
}

/* dom 4 shim */
   ;(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Node||e.HTMLDocument||e.HTMLElement).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);
//ie8 fix
if(!window.Node)
	(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Element                            ).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);

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
		var a=document.querySelector(s);
		return a;
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

SSH={}

//defaults
SSH.idealArea = 15
SSH.area = 15

//filter that respects SSH.area
SSH.filter = function(array,callback) {
	var result = [];

	var  index = -1
		,length = array.length
		,value
		,resultLength = 0

	while (++index < length) {
		value = array[index];
		if ((resultLength<SSH.area)&&callback(value, index, array)){  //for showall
			result[resultLength] = value
			resultLength+=1
	  	}
	}
	return result
}

SSH.match = (keyword,target)=>{
	if(keyword==="")
		return true  //for perf
	var keywordList = keyword
			.split(" ")
			.map(a=>RegExp(a,"i"))

	return keywordList.every(a=>a.test(target))
}

SSH.getResults = (keyword,reverse)=>
	SSH.filter(
		 SSH.data
		,i=>SSH.match(keyword,i.searchText)^reverse
	)

SSH.search = function(args={}){
	var {keyword=SSH.inputElement.value,reverse} = args

	var onappendnode = SSH.search.onappendnode||function(){}
	var onfragmentpopulated = SSH.search.onfragmentpopulated||function(){}

	var  array       = SSH.getResults(keyword,reverse)
		,fragment    = dom.fragment()
	
	array.forEach(i=>{
		onappendnode(i)
		fragment.append(i.node)
	})

	onfragmentpopulated(fragment,array)

	SSH.containerElement
		.clear()
		.append(fragment)
}
SSH.search.on = (eventString,callback)=>{
	SSH.search["on"+eventString]=callback
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,inputFormElement = dom.query("#inputform")
	,showAllLink =
		dom("a",{style:"cursor:pointer"},"show all")
			.on("click", e=>{ e.preventDefault(); SSH.area=1000; SSH.search(); SSH.area=SSH.idealArea })
	,linkTemplate = (link,text,tags,height)=>
		dom("a",{target:"paypal",href:link}
			,dom("img",{style:"height:"+height+"px"})
			,text
		)

SSH.inputElement = dom.query("#input")
SSH.containerElement = dom.query("#container")

SSH.search.on("appendnode",item=>{
	if(!item.imageLoaded)               		  //test if image is loaded (very important for perf!!!)
		 item.node.firstChild.src = item.imageURL //load image
		,item.imageLoaded 		  = true 		  //cache that the image was loaded
})

SSH.search.on("fragmentpopulated",(fragment,array)=>{
	if(array.length===SSH.idealArea)
		fragment.append(showAllLink)
})

//include data
<?php include 'data.js'; ?>
//process data
SSH.data.forEach(item=>{

	var  rawURL  = item[0]
		,rawText = item[1]
		,tags    = item[2]||""
		,buyURL  = SSH.data.buyPath + rawURL + SSH.data.buySuffix
		,height  = item[3]

	item.prettyText	 = SSH.data.processor(rawText)
	item.node 		 = linkTemplate(buyURL,item.prettyText,tags,height)
	item.imageURL 	 = imagePath + rawText + (SSH.data.imageSuffix||".png")
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

//lazy images

dom.on("load",()=>{
	dom.queryAll("[data-src]")
		.forEach(i=>{
			i.src = imagePath + i.getAttribute("data-src")
		})
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

SSH.inputElement
	.on("input",SSH.search)

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+SSH.inputElement.value);
		e.preventDefault()
	})

//setup

SSH.inputElement.value = getQueryVariable("search")
SSH.search()


//stylesheet load
var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
  webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);