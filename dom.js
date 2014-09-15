;(function(document){

	var slice = Array.prototype.slice;

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
		return slice.call(this.querySelectorAll(a))
	};

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
	dom.queryAll=a=>slice.call(document.querySelectorAll(a));

	dom.fragment=()=>document.createDocumentFragment()

	dom.on=addEventListener
	dom.html=document.documentElement
	dom.body=document.body
	dom.head=document.head

})(document);