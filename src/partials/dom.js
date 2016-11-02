;(function(document){

	var slice      = Array.prototype.slice
	var addMethods = (a,b)=>{for(var i in b)a.prototype[i] = b[i]}

	addMethods(Element,{
		on		 (...a)	{this.addEventListener(...a); return this;},
		clear	 ()		{var i; while(i=this.firstChild)this.removeChild(i); return this;},
		query 	 (a)	{return this.querySelector(a)},
		queryAll (a)	{return slice.call(this.querySelectorAll(a))}
	})

	var dom=function(a,b){
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

	dom.query    = s => document.querySelector(s);
	dom.queryAll = a => slice.call(document.querySelectorAll(a));
	dom.fragment = ()=> document.createDocumentFragment()

	dom.on   = (...a)=>window.addEventListener(...a)
	dom.html = document.documentElement
	dom.body = document.body
	dom.head = document.head

	window.dom = dom

})(document);