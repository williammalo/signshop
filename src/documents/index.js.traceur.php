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

//https://github.com/addyosmani/memoize.js/blob/master/memoize.js

(function (global) {
    "use strict";
    global.memoize = global.memoize || (typeof JSON === 'object' && typeof JSON.stringify === 'function' ?
        function (func) {
            var stringifyJson = JSON.stringify,
                cache = {};

            return function () {
                var hash = stringifyJson(arguments);
                return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
            };
        } : function (func) {
            return func;
        });
}(this));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,input = dom.query("#input")
	,inputForm = dom.query("#inputform")
	,container = dom.query("#container")
	,showAll = false
	,showAllLink =
		dom("a","show all")
			.on("click", e=>{ e.preventDefault(); showAll=true; filterView(input.value) })

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

views=mapObject(views,(a,b)=>{

	var textProcessor=a.processor||(t=>t+"")
	a.forEach(i=>{
		var  rawURL=i[0]
			,rawText=i[1]
			,tags=i[2]||""
			,buyURL=a.buyPath+rawURL+a.buySuffix;
		i.prettyText = textProcessor(rawText)
		i.node = linkTemplate(buyURL,i.prettyText,tags)
		i.imageURL = imagePath+rawText+(a.imageSuffix||".png")
		i.imageLoaded = false
		i.searchText = i.prettyText.replace("\n"," ")
		i.searchText = i.searchText+i.searchText.replace("-","")+i.searchText.replace("-"," ") //add no dash variant
		i.searchText = i.searchText+" "+tags
	})
	a.menu=dom.query(`menu.${b}`)
	return a
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ACTUAL CODE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var searchFilter = (view,keyword,reverse)=>{
	keyword = new RegExp(keyword,"i")
	reverse|= 0
	return array=views[view]
		.filter( (item,index)=> (keyword.test(item.searchText)^reverse)  )
		.filter( (item,index)=> (view==="templates"?(showAll||index<area):true) )
}

var search=(...a)=>{
	var  array=searchFilter(...a)
		,fragment=dom.fragment()
	array.forEach((item,index)=>{
		if(!item.imageLoaded)                          //test if image is loaded (very important for perf!!!)
			 item.node.firstChild.src=item.imageURL   //add image src
			,item.imageLoaded=true
		fragment.append(item.node)              //add element to fragment
	})
	return{fragment,array}
}

var filterView=(keyword,reverse)=>{

	container.clear()

	var {fragment,array}=search(view,keyword,reverse)
	if( view==="templates"
		&&(!showAll)
		&&array.length>(area-1)
	)fragment.append(showAllLink)
	
	showAll=false

	container.append(fragment)
}

var switchPage=page=>{
	dom.html.className=view=page
	filterView()
}

//pjax nav
dom.query("nav").on("click",e=>{
	var page=e.target.getAttribute("href")
	if(page)
		e.preventDefault(), history.pushState("","",page), switchPage(page)
},false)

//s3 lazy images
dom.on("load",()=>{
	dom.queryAll("[data-src]").forEach( a=>{a.src=imagePath+a.getAttribute("data-src")} )
})

//faq cover
var cover=dom("div",{"class":"cover"}
		,dom("iframe",{src:"faq"})
	).on("click",e=>{ e.preventDefault(); cover.remove() } )

dom.query("#faq").on("click",e=>{ e.preventDefault(); dom.body.append(cover) } )


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

//template menu
input.on("input",e=>{filterView(input.value)});
inputForm.on("submit",e=>{history.pushState("","","?search="+input.value);e.preventDefault()});


//setup
(function(t,page){
	t=window.location.pathname.substr(1);
	page=views[t]?t:"templates";

	switchPage(page);
	getQueryVariable = function(a){return(RegExp("[&?]"+a+"=([^&]+)").exec(location)||["",""])[1]||""};
	var query=getQueryVariable("search");
	input.value=query;
	filterView(query);
})();

