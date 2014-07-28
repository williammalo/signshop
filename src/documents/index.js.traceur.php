var $traceurRuntime = {};

$traceurRuntime.toObject=function(value){
return Object(value)
}

//include data
<?php include 'data.js'; ?>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LIBRARY (contains uglyness for ie8 support)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* dom 4 shim */
   ;(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Node||e.HTMLDocument||e.HTMLElement).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);
//ie8 fix
if(!window.Node)
	(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Element                            ).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);

var dom
;(function(){

	var constr=function(a){
		a.on=function(a,b,c){
			this.addEventListener(a,b,c);
			return this;
		};
		a.clear=function(){
			var i;
			while(i=this.firstChild)this.removeChild(i);
			return this;
		};
		return a;
	};

	dom=function(a,b){
	  if(a==="br")return document.createElement("br");//dumb ie bug fix
	  var e=arguments, l=e.length, c, i=1,
	  element = document.createElement(a)
	  
	  if(b&&b.constructor===Object)
	    for(c in b)
	      element.setAttribute(c, b[c])
	    ,i=2

	  for(;i<l;i++) element.append(e[i])

	  return constr(element)
	}

	dom.query=function(s){
		var a=document.querySelector(s);
		return constr(a);
	};
	dom.queryAll=a=>Array.prototype.slice.call(document.querySelectorAll(a)).map(a=>constr(a));

	dom.fragment=document.createDocumentFragment.bind(document)

	dom.on=(a,b,c)=>addEventListener(a,b,c)
	dom.html=document.documentElement
	dom.body=document.body

})();

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

Array.prototype.fastFilter = function(callback) {
	var result = [];

	var  index = -1
		,length = this.length
		,value
		,resultLength = 0

	while (++index < length) {
		value = this[index];
		if (callback(value, index, this)){
			result[resultLength] = value
			resultLength+=1
	  	}
	}
	return result
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,area 	   = 15
	,inputElement     = dom.query("#input")
	,inputFormElement = dom.query("#inputform")
	,containerElement = dom.query("#container")
	,showAllLink =
		dom("a","show all")
			.on("click", e=>{ e.preventDefault(); SSHSearch({showAll:true}) })
	,linkTemplate = (link,text,tags,height)=>
		dom("a",{target:"paypal",href:link}
			,dom("img",{style:"height:"+height+"px"})
			,text
			//,dom("br")
			//,dom("small",tags)
		)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROCESS DATA
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

SSHData.forEach(item=>{

	var  rawURL  = item[0]
		,rawText = item[1]
		,tags    = item[2]||""
		,buyURL  = SSHData.buyPath + rawURL + SSHData.buySuffix
		,height  = item[3]

	item.prettyText	 = SSHData.processor(rawText)
	item.node 		 = linkTemplate(buyURL,item.prettyText,tags,height)
	item.imageURL 	 = imagePath + rawText + (SSHData.imageSuffix||".png")
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
//SEARCH SYSTEM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var match = (keyword,target)=>{
	if(keyword==="")
		return true  //for perf
	var keywordList = keyword
			.split(" ")
			.map(a=>RegExp(a,"i"))

	return keywordList.every(a=>a.test(target))
}

var SSHFilter = (keyword,reverse,showAll)=>{
	var  _match   = i=>match(keyword,i.searchText)^reverse
		,array    = SSHData.fastFilter(_match) //fastFilter method is very important for perf
	
	if(!showAll&&array.length>area)
		array.length = area

	return array
}

var SSHSearch = (args={})=>{
	var {showAll,keyword=inputElement.value,reverse} = args

	var  array       = SSHFilter(keyword,reverse,showAll)
		,fragment    = dom.fragment()
		,popFragment = i=>{
			if(!i.imageLoaded)               		//test if image is loaded (very important for perf!!!)
				 i.node.firstChild.src = i.imageURL //load image
				,i.imageLoaded 		   = true 		//cache that the image was loaded

			fragment.append(i.node)              	//add element to fragment
		}
	
	array.forEach(popFragment)

	if(!showAll&&array.length>=area)
		fragment.append(showAllLink)

	containerElement
		.clear()
		.append(fragment)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OTHER STUFF
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

inputElement
	.on("input",SSHSearch)

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+inputElement.value);
		e.preventDefault()
	})

//setup

inputElement.value = getQueryVariable("search")
SSHSearch()