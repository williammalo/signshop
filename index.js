//@codekit-prepend "data.js"

//reset
//window.localStorage.setItem("cartClicked","0");window.localStorage.setItem("tempClicked","0")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//categorized pages
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var catPages={};
catPages.setup=function(){
	document.body.className=this.Bclass

	this.philter(this.defaultCategory)
	var frag=document.createDocumentFragment()
	frag.appendChild(this.buts)
	frag.appendChild(this.logs)
	content.clear().appendChild(frag);
};

catPages.philter=function(q,n){
	var i,frag=document.createDocumentFragment(),temp,a=this.list;
	for(i=a.length;i--;){
	if(n?!RegExp(q,"i").test(a[i][1]):RegExp(q,"i").test(a[i][1])){
		temp=document.createElement("a").prop({
			href:"http://www.payloadz.com/go/?id="+a[i][0],
			target:"_blank"
		});

		temp.appendChild(
			document.createElement("img").prop({
				src:this.getSource(a[i][1])
			})
		);
		frag.appendChild(temp)
	}
	}
	this.logs.clear().appendChild(frag);
}

catPages.start=function(){

	var i,frag=document.createDocumentFragment(),tmp,categories=this.categories
	,evt=function(e){
		if(!e){e={};e.target=event.srcElement}

		var pageName=/signshop/.test(location.pathname)?location.pathname.split("/signshop/")[1]:location.pathname.split("/")[1];
		pageName=window[pageName]?pageName:"templates";
		var ctx=window[pageName];
		
		if(e.target.hasAttribute("data-category")){
			ctx.philter(e.target.getAttribute("data-category"),e.target.hasAttribute("data-reverse"))
		}
	};

	for(i=categories.length;i--;){
		tmp=document.createElement("button")
		tmp.setAttribute("data-category",categories[i][0])

		tmp.appendChild(
			document.createTextNode(categories[i][1])
		);
		if(categories[i][2]){
			tmp.setAttribute("data-reverse"," ")
		}
		frag.appendChild(tmp)
	};
	
	this.logs=document.createElement("div").prop({id:"logs"});
	
	this.buts=document.createElement("div").prop({id:"buts",onclick:evt});
	this.buts.appendChild(frag);

};

(function(){for(i in catPages){
	elements[i]=catPages[i]
	logos[i]=catPages[i]
	graphics[i]=catPages[i]
}})();

elements.start()
logos.start()
graphics.start()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//templates page
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
;(function(){
	var i,tmp,r="replace",now=(new Date).getFullYear()+"";
	for(i=templates.list.length;i--;){
		templates.list[i][2]=templates.list[i][1]
			[r](/uptodate/i,now)
			[r](/-/g," ")
			[r]("chev ","chevrolet ")
			[r]("rendez vous","rendez-vous")
			[r](" hb "," hatchback ")
			[r](" 2 dr "," 2dr ")
			[r](" 2dr "," two-door ")
			[r](" 4 dr "," 4dr ")
			[r](" 4dr "," 4-door ")
			[r](" 5 dr "," 5dr ")
			[r](" 5dr "," 5-door ")
			[r](" crew c "," crew cab ")
			[r](" ext c "," extended cab ")
			[r](" c c "," crew cab ")
			[r](" c cab "," crew cab ")
			[r](" ext cab "," extended cab ")
			[r](" quad c "," quad cab ")
			[r](" s dr "," swing door ")
			[r](" swing dr "," swing door ")
			[r](/(20\d{2}) (20\d{2})/,"$1-$2")
			[r](/ (20\d{2})$/,"$1")
			[r]("vw ","volkswagen ")
			[r](now+"-"+now,now)
		templates.list[i][3]=document.createElement("a").prop({
			href:"http://www.payloadz.com/go/?id="+templates.list[i][0],
			target:"_blank"
		});

		templates.list[i][3].appendChild(
			document.createElement("div")
		);
		templates.list[i][3].firstChild.appendChild(
			new Image
		);
		templates.list[i][3].appendChild(
			document.createTextNode(templates.list[i][2])
		);
	}
})();

(function(){
	var a=templates.list

	var showall=false
	var displayresults;

	var textbox=document.createElement("input").prop({
		type:"text",
		id:"sf",
		value:window.localStorage.getItem("tb")||"",
		placeholder:"Search your model..."
	});

	var close=document.createElement("img").prop({
		id:"close",
		src:"cancel.png",
		alt:"clear"
	});
	
	var form=document.createElement("form").prop({id:"fo"})
	form.appendChild(textbox);
	form.appendChild(close);

	var templateList=document.createElement("div").prop({id:"models"})

	var showallLink=document.createElement("a").prop({
		id:'showall',
		onclick:function(){showall=true;displayresults()}
	});

	showallLink.appendChild(document.createTextNode("Show all..."))

	if(!ie){
		displayresults=function(){
			var i,c=a,frag=document.createDocumentFragment(),s=textbox.value;
			//filter array
			c=c.filter(function(element){
				return RegExp(s,"i").test(element[2])
			});
			for(i=0;(showall?1:i<29)&&i<c.length;i++){
				c[i][3].firstChild.firstChild.src="t/"+c[i][1]+".jpg"
				frag.appendChild(c[i][3])
			}
			//update document
			if(!showall)frag.appendChild(showallLink)
			
			templateList.clear().appendChild(frag);
			showall=false;
			localStorage.setItem("tb", s);
		};

		form.onsubmit=displayresults;
		textbox.oninput=displayresults;
		textbox.onfocus=function(){document.getElementById("close").style.opacity="0.2";textbox.placeholder=""};
		textbox.onblur=function(){document.getElementById("close").style.opacity="0"};
		close.onclick=function(){textbox.value="";textbox.focus();displayresults()}

	}else{
		displayresults=function(){
				textbox.style.display="none";
				var i,frag=document.createDocumentFragment();
				for(i in a){
					a[i][3].firstChild.src=filePath+"t/"+a[i][1]+".jpg"
					frag.appendChild(a[i][3])
				}
				templateList.clear().appendChild(frag);
		}
	}
	templates.setup=function(){
		document.body.className="p3"
		content.clear()

		displayresults();

		content.appendChild(form)
		content.appendChild(templateList)
	}
})();



//formsubmit
找("#mail").onclick=function(){this.classList.add("clicked")}
找("#formsubmit").onclick=function(){
	window.localStorage.setItem("oldpage",/signshop/.test(location.pathname)?location.pathname.split("/signshop/")[1]:location.pathname.split("/")[1]);
}
if(window.location.hash=="#subscribed"){
	找("#mail").innerHTML="<span>We sent you an email to validate your subscription.</span>"
	if(Modernizr.history){
		History.pushState("","",(localStorage.getItem("oldpage")||"templates"))
		window[localStorage.getItem("oldpage")||"templates"].setup()
	}else{
		window.location=(localStorage.getItem("oldpage")||"templates")+"#subscribed"
	}
}



//tabs
;(function(){
	var t, i, a=找("nav a");
	for(i=a.length;i--;){
		t=a[i].innerHTML
		a[i].innerHTML='<svg width="35" height="60" class=border><path d="M 32,0 C 27,0 24,3 22,7 22,7 22,7 22,8 l 0,0 L 9,54 C 8,57 4,60 0,60 l 35,0 0,-60 -3,0 z"/></svg><svg width="35" height="60" class=border><path d="m 3,0 c 4,0 8,3 9,7 0,0 0,1 0,1 l 0,0 L 26,54 C 27,57 31,60 35,60 L 0,60 0,0 3,0 z"/></svg><svg width="35" height="60" class=tab><path d="M 32,0 C 27,0 24,3 22,7 22,7 22,7 22,8 l 0,0 L 9,54 C 8,57 4,60 0,60 l 35,0 0,-60 -3,0 z"/></svg><svg width="35" height="60" class=tab><path d="m 3,0 c 4,0 8,3 9,7 0,0 0,1 0,1 l 0,0 L 26,54 C 27,57 31,60 35,60 L 0,60 0,0 3,0 z"/></svg>'+t
	}
})()



//cart button
var cart=找("#cart")
var cspan=找("#cart span")
cspan.style.top=(+window.localStorage.getItem("cartClicked"))?"-20px":"0";
cart.onclick=function(){window.localStorage.setItem("cartClicked","1")}



//faq modal
找("#faq").onclick=function(e){
	var 
	iframe=document.createElement("iframe").prop({src:"faq"}),
	cover=document.createElement("div").prop({
		className:"cover",
		onclick:function(e){
			if(e.target===cover)document.body.removeChild(this),e.preventDefault()
		}
	});

	cover.appendChild(iframe)
	document.body.appendChild(cover)
	e.preventDefault()
};



//slideshow
(function(){if(!ie){
	var images=找("#slide img");
	(function f(index){
		for(i=images.length;i--;)images[i].style.opacity=0
		images[index|0].style.opacity=1
		index=((index|0)+1)%images.length
		setTimeout(function(){f(index)},4e3)
	})()
}})()

//style
if(window.localStorage.getItem("style")=="simple")document.documentElement.classList.add("simple");
找("#stoggle").onclick=function(){
	if(document.documentElement.classList.contains("simple")){
		document.documentElement.classList.remove("simple")
		window.localStorage.setItem("style","standard")
	}else{
		document.documentElement.classList.add("simple")
		window.localStorage.setItem("style","simple")
	}
}

//click event
var headerClass=找("header").classList;
var clickevent=function(e,d,t){
	if(!e){e={};e.target=event.srcElement} //ie8 polyfill!!!!!
	t=e.target
	d=t.id
	if(t.className==="more"){
		headerClass.toggle("show")
		e.preventDefault()
	}
	if(d[0]==="p"&&Modernizr.history){
		headerClass.remove("show");
		var pageName=[,"logos","elements","templates","graphics"][d[1]]
		History.pushState("","",pageName)
		_gaq.push(['_trackPageview', '/'+pageName]);
		window[pageName].setup()
		e.preventDefault()
	}
}
ontouchstart=clickevent
onmousedown=clickevent
onclick=function(e){if(Modernizr.history){t=e.target;if(t.className==="more"||t.id[0]==="p")e.preventDefault()}}



//load event
var pageName=/signshop/.test(location.pathname)?location.pathname.split("/signshop/")[1]:location.pathname.split("/")[1];
pageName=window[pageName]?pageName:"templates"
window[pageName].setup()



//google analytics
var _gaq=[['_setAccount','UA-37761254-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s)}(document,'script'))

//lazy images
onload=function(){
	var i,a=document.querySelectorAll("[data-src]");
	for(i=a.length;i--;)a[i].src=a[i].getAttribute("data-src")
}