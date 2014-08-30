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