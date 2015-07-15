
var $traceurRuntime = {};

$traceurRuntime.toObject=function(value){
return Object(value)
}

// dom 4 shim https://github.com/WebReflection/dom4
<?php include 'dom4.js'; ?>
//dom manipulation lib
<?php include 'dom.js'; ?>
//search lib
<?php include 'WS.js'; ?>

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
//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var  imagePath = "http://signshop.s3-website-us-east-1.amazonaws.com/"
	,inputFormElement = dom.query("#inputform")
	,showAllLink =
		dom("a",{style:"cursor:pointer"},"show all")
			.on("click", WS.showAll)
	,linkTemplate = (link,text,tags,height)=>
		dom("a",{target:"paypal",href:link}
			,dom("img",{height,width:150})
			,text
		)

var setArea = function(){
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var area = ((h-168)*w)/54208;
	area = Math.max(area,10)|0;

	WS.idealArea = area
	WS.area = area
}
setArea();
onresize = setArea;

dom.query("#showalllink").on("click",WS.showAll)

WS.search.on("appendnode",item=>{
	if(!item.imageLoaded)    	               		//test if image is loaded (very important for perf!!!)
		 item.node.firstChild.src = item.imageURL 	//load image
		,item.imageLoaded 		  = true 		  	//cache that the image was loaded
})

WS.search.on("fragmentpopulated",(fragment,array)=>{
	if(array.length===WS.idealArea)
		fragment.append(showAllLink)
})

//include data
<?php include 'data.js'; ?>
//process data

var prettify = text=>{
	var now=(new Date).getFullYear()+"";
	var rules=[
		//date formating
		 [/uptodate/i,now]
		,[/(20\d\d-20\d\d)/,"\n$1"]
		,[/( 20\d\d)/,"\n$1"]
		,[now+"-"+now,now]
		//put model on first line
		,[/^(\S*) (\S*) /,"$1 $2\n"]
		,["Prius\nC","Prius C"]
		,["Ram\nPromaster","Ram Promaster\n"]
		,["Transit\nConnect ","Transit Connect\n"]
		,["model\nS","model S"]
		//unescape
		,[" slash "," / "]
		,[/(20\d\d)-(20\d\d)/,"$1–$2"]
		,[/-/g,"‑"]
		//hack!!!!
		,[" Econoline\n"," Econoline e-350 e-250\n"]
		,["Ram\n1500","Ram 1500 2500"]
		//fixes
		,["\n\n","\n"]
		,["\n ","\n"]
	]

	rules.forEach(i=>{
		text = text.replace(i[0],i[1])
	})

	return text
}

WS.data.forEach(item=>{

	var  rawURL  = item[0]
		,rawText = item[1]
		,tags    = item[2]||""
		,buyURL  = "http://signshophelper.fetchapp.com/sell/" + rawURL + "/ppc"
		,height  = item[3]

	item.prettyText	 = prettify(rawText)
	item.node 		 = linkTemplate(buyURL,item.prettyText,tags,height)
	item.imageURL 	 = imagePath + rawText + ".jpg"
	item.imageLoaded = false
	item.searchText  = item.prettyText.replace("\n", " ")
	item.searchText  = item.searchText 
					 + item.searchText.replace(/‑/g, "" )
					 + item.searchText.replace(/‑/g, " ")
					 + item.searchText.replace(/‑/g, "-")
					 + " " + tags
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

//hardlinking

inputFormElement
	.on("submit",e=>{
		history.pushState("","","?search="+WS.inputElement.value);
		e.preventDefault()
	})


WS.inputElement.value = getQueryVariable("search")

WS.search()


//clicked indicator

WS.containerElement.on("click",event=>{
	if(event.target.href)
		event.target.classList.add("clicked")
})


//stylesheet load
//https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery

var cb = function() {
var l = document.createElement('link'); l.rel = 'stylesheet';
l.href = 'http://fonts.googleapis.com/css?family=Ubuntu:400,700';
var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
  webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
