
//helper functions
var container=document.getElementById("container");

var clearNode=function(node,i){
	while(i=node.firstChild)node.removeChild(i);
};

var showAll=false;
var showAllLink=document.createElement("a");
showAllLink.appendChild(document.createTextNode("show all"));
showAllLink.addEventListener("click",function(e){
	e.preventDefault();
	showAll=true;
	filterView(container,document.getElementById("input").value);
});

var filterView=function(container,keyword,reverse){
	var fragment=document.createDocumentFragment();
	if(keyword===undefined)keyword=views[view].defaultKeyword||"";
	keyword=new RegExp(keyword,"i");
	var nth=0;

	views[view].forEach(function(item,index){
		if( (keyword.test(item[2])^reverse)&&(view==="templates"&&(!showAll)?nth<25:true) )
			nth++,
			item[3].firstChild.firstChild.src=item[4],
			fragment.appendChild(item[3]);
	});
	if(view==="templates"&&(!showAll)&&nth>24){
		fragment.appendChild(showAllLink);
	};
	showAll=false;
	clearNode(container);
	container.appendChild(fragment);
};

//page switching
document.getElementsByTagName("nav")[0].addEventListener("click",function(e){
	if(!e.target.href)return true;
	e.preventDefault();
	var page=e.target.getAttribute("href");

	document.documentElement.className=page;
	history.pushState("","",page);
	view=page;
	filterView(container);
	_gaq.push(['_trackPageview', '/'+page]);
},false);

//lazy images
addEventListener("load",function(){
	var i,a=document.querySelectorAll("[data-src]");
	for(i=a.length;i--;)a[i].src=a[i].getAttribute("data-src");
});

//faq popup
var iframe=document.createElement("iframe");
iframe.src="faq";
var cover=document.createElement("div");
cover.className="cover";
cover.addEventListener("click",function(e){
	document.body.removeChild(cover),e.preventDefault();
});
cover.appendChild(iframe);

document.getElementById("faq").addEventListener("click",function(e){
	e.preventDefault();
	document.body.appendChild(cover);
});

//menus

var menuClick=function(e){
	var c=e.target.hasAttribute("data-category");
	var r=e.target.hasAttribute("data-reverse");
	if(c)
		filterView(container,e.target.getAttribute("data-category"),r);
};

var menuPop=function(list,element){
	list.forEach(function(a){
		var link=document.createElement("a");
		link.setAttribute("data-category",a[0]);
		link.appendChild(document.createTextNode(a[1]));
		if(a[2])link.setAttribute("data-reverse",true);
		element.appendChild(link);
	});
};

//categorised menu pages
["logos","elements","graphics"].forEach(function(i){
	views[i].menu=document.querySelector("menu."+i);
	views[i].menu.addEventListener("click",menuClick);
	menuPop(views[i].categories,views[i].menu);
});

//template menu
document.getElementById("input")
	.addEventListener("input",function(){
		filterView(container,input.value);
	},false);

//page start
var view;

(function(){
	var t=window.location.pathname.substr(1);
	view=t in views?t:"templates";
})();

document.documentElement.className=view;
filterView(container);

//google analytics
var _gaq=[['_setAccount','UA-37761254-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s);}(document,'script'));