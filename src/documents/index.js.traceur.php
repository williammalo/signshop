//include data
<?php include 'data.js'; ?>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LIBRARY
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
	dom.queryAll=a=>[...document.querySelectorAll(a)].map(a=>constr(a));

	dom.fragment=document.createDocumentFragment.bind(document)

	dom.on=(a,b,c)=>addEventListener(a,b,c)
	dom.html=document.documentElement
	dom.body=document.body

})();

mapObject=function(o,f){
	var result={}
	Object.keys(o)
		.forEach(v=>{result[v] = f.call(o, o[v], v, o)})
	return result
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,buyPath   = "http://www.payloadz.com/go/?id="
	,input = dom.query("#input")
	,container = dom.query("#container")
	,showAll = false
	,showAllLink =
		dom("a","show all")
			.on("click", e=>{ e.preventDefault(); showAll=true; filterView(input.value) })

	,area = 25
	,linkTemplate = (link,text)=>
		dom("a",{target:"paypal",href:buyPath+link}
			,dom("div"
				,dom("img")
			)
			,text
		)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROCESS DATA
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

views=mapObject(views,(a,b)=>{

	f=a.processor||(t=>t+"")
	a.forEach(i=>{
		i[2] = f(i[1])                                  //pretty text
		i[3] = linkTemplate( i[0], i[2] )               //construct dom node
		i[4] = imagePath+i[1]+(a.imageSuffix||".png")   //image url
	})
	a.menu=dom.query(`menu.${b}`)
	return a
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ACTUAL CODE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//functions
var sanitize=f=>{
	return (keyword=(views[view].defaultKeyword||""),reverse)=>{
		keyword = new RegExp(keyword,"i")
		reverse|= 0
		return f(keyword,reverse)
	}
}
var filterView=sanitize((keyword,reverse)=>{

	var fragment=dom.fragment()
	   ,filteredArray=views[view]
		.filter( (item,index)=>keyword.test(item[2])^reverse )
		.filter( (item,index)=>view==="templates"?(showAll||index<area):true )
		.map(
			(item,index)=>(
			item[3].firstChild.firstChild.src=item[4]   //add image src
			,fragment.append(item[3])              //add element to fragment
			,item)
		)
	
	if( view==="templates"
		&&(!showAll)
		&&filteredArray.length>(area-1)
	)fragment.append(showAllLink)
	
	showAll=false
	container
		.clear()
		.append(fragment)
})

var switchPage=page=>{ dom.html.className=view=page; filterView() }

//nav
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

//categorised menu pages
;["logos","elements","graphics"].forEach(foo=>{
	
	foo=views[foo]

	foo.categories.forEach(b=>{
		var a=dom("a",{"data-category":b[0]},b[1])
		if(b[2])a.setAttribute("data-reverse","")
		foo.menu.append(a)
	})
	foo.menu.on("click",e=>{
		var  t=e.target
			,c=t.hasAttribute("data-category")
			,r=t.hasAttribute("data-reverse")
		if(c)
			filterView(t.getAttribute("data-category"),r)
	})
})

//template menu
input.on("input",e=>filterView(input.value))

;(t,page)=>{
	t=window.location.pathname.substr(1)
	page=views[t]?t:"templates"

	switchPage(page)
}()