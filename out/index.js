var container=document.getElementById("container"),clearNode=function(e,t){while(t=e.firstChild)e.removeChild(t)},showAll=!1,showAllLink=document.createElement("a");showAllLink.appendChild(document.createTextNode("show all")),showAllLink.addEventListener("click",function(e){e.preventDefault(),showAll=!0,filterView(container,document.getElementById("input").value)});var filterView=function(e,t,n){var r=document.createDocumentFragment();t===undefined&&(t=views[view].defaultKeyword||""),t=new RegExp(t,"i");var i=0;views[view].forEach(function(e,s){t.test(e[2])^n&&(view==="templates"&&!showAll?i<25:!0)&&(i++,e[3].firstChild.firstChild.src=e[4],r.appendChild(e[3]))}),view==="templates"&&!showAll&&i>24&&r.appendChild(showAllLink),showAll=!1,clearNode(e),e.appendChild(r)};document.getElementsByTagName("nav")[0].addEventListener("click",function(e){if(!e.target.href)return!0;e.preventDefault();var t=e.target.getAttribute("href");document.documentElement.className=t,history.pushState("","",t),view=t,filterView(container),_gaq.push(["_trackPageview","/"+t])},!1),addEventListener("load",function(){var e,t=document.querySelectorAll("[data-src]");for(e=t.length;e--;)t[e].src=t[e].getAttribute("data-src")});var iframe=document.createElement("iframe");iframe.src="faq";var cover=document.createElement("div");cover.className="cover",cover.addEventListener("click",function(e){document.body.removeChild(cover),e.preventDefault()}),cover.appendChild(iframe),document.getElementById("faq").addEventListener("click",function(e){e.preventDefault(),document.body.appendChild(cover)});var menuClick=function(e){var t=e.target.hasAttribute("data-category"),n=e.target.hasAttribute("data-reverse");t&&filterView(container,e.target.getAttribute("data-category"),n)},menuPop=function(e,t){e.forEach(function(e){var n=document.createElement("a");n.setAttribute("data-category",e[0]),n.appendChild(document.createTextNode(e[1])),e[2]&&n.setAttribute("data-reverse",!0),t.appendChild(n)})};["logos","elements","graphics"].forEach(function(e){views[e].menu=document.querySelector("menu."+e),views[e].menu.addEventListener("click",menuClick),menuPop(views[e].categories,views[e].menu)}),document.getElementById("input").addEventListener("input",function(){filterView(container,input.value)},!1);var view;(function(){var e=window.location.pathname.substr(1);view=e in views?e:"templates"})(),document.documentElement.className=view,filterView(container);var _gaq=[["_setAccount","UA-37761254-1"],["_trackPageview"]];(function(e,t){var n=e.createElement(t),r=e.getElementsByTagName(t)[0];n.src="//www.google-analytics.com/ga.js",r.parentNode.insertBefore(n,r)})(document,"script")