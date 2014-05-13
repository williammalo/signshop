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
	(function(e){function t(e){return typeof e=="string"?i.createTextNode(e):e}function n(e){if(e.length===1)return t(e[0]);for(var n=i.createDocumentFragment(),r=u.call(e),s=0;s<e.length;s++)n.appendChild(t(r[s]));return n}for(var r,i=e.document,s=(e.Element).prototype,o=["prepend",function(){var t=this.firstChild,r=n(arguments);t?this.insertBefore(r,t):this.appendChild(r)},"append",function(){this.appendChild(n(arguments))},"before",function(){var t=this.parentNode;t&&t.insertBefore(n(arguments),this)},"after",function(){var t=this.parentNode,r=this.nextSibling,i=n(arguments);t&&(r?t.insertBefore(i,r):t.appendChild(i))},"replace",function(){var t=this.parentNode;t&&t.replaceChild(n(arguments),this)},"remove",function(){var t=this.parentNode;t&&t.removeChild(this)}],u=o.slice,a=o.length;a;a-=2)r=o[a-2],r in s||(s[r]=o[a-1])})(window);

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

mapObject=function(o,f){
	Object.keys(o)
		.forEach(v=>{o[v] = f(o[v],v)})
	return o
};

getQueryVariable = function(a){return(RegExp("[&?]"+a+"=([^&]+)").exec(location)||["",""])[1]||""};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,inputElement     = dom.query("#input")
	,inputFormElement = dom.query("#inputform")
	,containerElement = dom.query("#container")
	,showAllLink =
		dom("a","show all")
			.on("click", e=>{ e.preventDefault(); filterView({showAll:true}) })

	,area = 25
	,linkTemplate = (link,text,tags)=>
		dom("a",{target:"paypal",href:link}
			,dom("img")
			,text
			,dom("br")
			,dom("small",tags)
		)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROCESS DATA
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



templates.forEach(item=>{

	var  rawURL  = item[0]
		,rawText = item[1]
		,tags    = item[2]||""
		,buyURL  = templates.buyPath+rawURL+templates.buySuffix;

	item.prettyText	 = templates.processor(rawText)
	item.node 		 = linkTemplate(buyURL,item.prettyText,tags)
	item.imageURL 	 = imagePath+rawText+(templates.imageSuffix||".png")
	item.imageLoaded = false
	item.searchText  = item.prettyText.replace("\n"," ")
	item.searchText  = item.searchText+item.searchText.replace("-","")+item.searchText.replace("-"," ")
	item.searchText  = item.searchText+" "+tags
})

templates.menu = dom.query("menu.templates")



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SEARCH SYSTEM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var searchFilter = (keyword,reverse,showAll)=>{

	keyword = new RegExp(keyword,"i")
	reverse|= 0
	var filter = i=>(
		keyword.test(i)^reverse
	)
	var array=templates.filter(filter)
	if(!showAll)
		array=array.slice(0,area)
	return array
}

var filterView=(args={})=>{

	var{showAll,keyword,reverse}=args

	keyword=keyword||inputElement.value

	var  array    = searchFilter(keyword,reverse,showAll)
		,fragment = dom.fragment()

	array.forEach(i=>{

		if(i.imageLoaded===false)               //test if image is loaded (very important for perf!!!)
			 i.node.firstChild.src=i.imageURL   //add image src
			,i.imageLoaded=true

		fragment.append(i.node)              //add element to fragment
	})
	if(!showAll&&array.length>=area)
		fragment.append(showAllLink)

	containerElement.clear()
	containerElement.append(fragment)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OTHER STUFF
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//s3 lazy images
dom.on("load",()=>{
	dom.queryAll("[data-src]")
		.forEach(i=>{
			i.src=imagePath+i.getAttribute("data-src")
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

//template menu

inputElement
	.on("input",filterView)

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+inputElement.value);
		e.preventDefault()
	})

//setup

inputElement.value = getQueryVariable("search")
filterView()



//build categorised pages menu
/*
;["logos","elements","graphics"].forEach(foo=>{
	
	var viewI=views[foo]

	viewI.categories.forEach(b=>{
		var a=dom("a",{"data-category":b[0]},b[1])
		if(b[2])a.setAttribute("data-reverse","")
		viewI.menu.append(a)
	})
	viewI.menu.on("click",e=>{
		var  t=e.target;

		if(t.hasAttribute("data-category"))
			filterView(
				 t.getAttribute("data-category")
				,t.hasAttribute("data-reverse")
			)
	})
})
*/