var elements={};

elements.setup=function(){
	document.body.className="p2"
	
	elements.philter("slogan")

	var i,content=查(".content");
	while(i=content.firstChild){
		content.removeChild(i)
	}

	var frag=document.createDocumentFragment()
	frag.appendChild(elements.buts)
	frag.appendChild(elements.logs)
	content.appendChild(frag)
}


elements.list=[
	 [1895117,"slogan39"]
	,[1895116,"slogan38"]
	,[1895115,"slogan37"]
	,[1895114,"slogan36"]
	,[1895113,"slogan35"]
	,[1895112,"slogan34"]
	,[1895111,"slogan33"]
	,[1895110,"slogan32"]
	,[1895109,"slogan31"]
	,[1895108,"slogan30"]
	,[1895107,"slogan29"]
	,[1895106,"slogan28"]
	,[1895105,"slogan27"]
	,[1895104,"slogan26"]
	,[1895103,"slogan25"]
	,[1895102,"slogan24"]
	,[1895101,"slogan23"]
	,[1895100,"slogan22"]
	,[1895099,"slogan21"]
	,[1895098,"slogan20"]
	,[1895097,"slogan19"]
	,[1895096,"slogan18"]
	,[1895095,"slogan17"]
	,[1895094,"slogan16"]
	,[1895093,"slogan15"]
	,[1895092,"slogan14"]
	,[1895091,"slogan13"]
	,[1895090,"slogan12"]
	,[1895089,"slogan11"]
	,[1895088,"slogan10"]
	,[1895087,"slogan9"]
	,[1895086,"slogan8"]
	,[1895085,"slogan7"]
	,[1895084,"slogan6"]
	,[1895083,"slogan5"]
	,[1895082,"slogan4"]
	,[1895081,"slogan3"]
	,[1895080,"slogan2"]
	,[1895079,"slogan1"]
	,[1895078,"slogan"]
	,[1895077,"iso-48"]
	,[1895076,"iso-47"]
	,[1895075,"iso-46"]
	,[1895074,"iso-45"]
	,[1895073,"iso-44"]
	,[1895072,"iso-43"]
	,[1895071,"iso-42"]
	,[1895070,"iso-41"]
	,[1895069,"iso-40"]
	,[1895068,"iso-39"]
	,[1895067,"iso-38"]
	,[1895066,"iso-37"]
	,[1895065,"iso-36"]
	,[1895064,"iso-35"]
	,[1895063,"iso-34"]
	,[1895062,"iso-33"]
	,[1895061,"iso-32"]
	,[1895060,"iso-31"]
	,[1895059,"iso-30"]
	,[1895058,"iso-29"]
	,[1895057,"iso-28"]
	,[1895056,"iso-27"]
	,[1895055,"iso-26"]
	,[1895054,"iso-25"]
	,[1895053,"iso-24"]
	,[1895052,"iso-23"]
	,[1895051,"iso-22"]
	,[1895050,"iso-21"]
	,[1895049,"iso-20"]
	,[1895048,"iso-19"]
	,[1895047,"iso-18"]
	,[1895046,"iso-17"]
	,[1895045,"iso-16"]
	,[1895044,"iso-15"]
	,[1895043,"iso-14"]
	,[1895042,"iso-13"]
	,[1895041,"iso-12"]
	,[1895040,"iso-11"]
	,[1895039,"iso-10"]
	,[1895038,"iso-9"]
	,[1895037,"iso-8"]
	,[1895036,"iso-7"]
	,[1895035,"iso-6"]
	,[1895034,"iso-5"]
	,[1895033,"iso-4"]
	,[1895032,"iso-3"]
	,[1895031,"iso-2"]
	,[1895030,"iso-1"]
	,[1895029,"dotcom24"]
	,[1895028,"dotcom23"]
	,[1895027,"dotcom22"]
	,[1895026,"dotcom21"]
	,[1895025,"dotcom20"]
	,[1895024,"dotcom19"]
	,[1895023,"dotcom18"]
	,[1895022,"dotcom17"]
	,[1895021,"dotcom16"]
	,[1895020,"dotcom15"]
	,[1895019,"dotcom14"]
	,[1895018,"dotcom13"]
	,[1895017,"dotcom12"]
	,[1895016,"dotcom11"]
	,[1895015,"dotcom10"]
	,[1895014,"dotcom9"]
	,[1895013,"dotcom8"]
	,[1895012,"dotcom7"]
	,[1895011,"dotcom6"]
	,[1895010,"dotcom5"]
	,[1895009,"dotcom4"]
	,[1895008,"dotcom3"]
	,[1895007,"dotcom2"]
	,[1895006,"dotcom1"]
	,[1895005,"dotcom"]
	,[1895004,"150"]
	,[1895003,"100"]
	,[1895002,"100-3"]
	,[1895001,"100-2"]
	,[1895000,"95"]
	,[1894999,"95-3"]
	,[1894998,"95-2"]
	,[1894997,"90"]
	,[1894996,"90-3"]
	,[1894995,"90-2"]
	,[1894994,"85"]
	,[1894993,"85-3"]
	,[1894992,"85-2"]
	,[1894991,"80"]
	,[1894990,"80-3"]
	,[1894989,"80-2"]
	,[1894988,"75"]
	,[1894987,"75-3"]
	,[1894986,"75-2"]
	,[1894985,"70"]
	,[1894984,"70-3"]
	,[1894983,"70-2"]
	,[1894982,"65"]
	,[1894981,"65-3"]
	,[1894980,"65-2"]
	,[1894979,"60"]
	,[1894978,"60-3"]
	,[1894977,"60-2"]
	,[1894976,"55"]
	,[1894975,"55-3"]
	,[1894974,"55-2"]
	,[1894973,"50"]
	,[1894972,"50-4"]
	,[1894971,"50-3"]
	,[1894970,"50-2"]
	,[1894969,"45"]
	,[1894968,"45-3"]
	,[1894967,"45-2"]
	,[1894966,"40"]
	,[1894965,"40-3"]
	,[1894964,"40-2"]
	,[1894963,"35"]
	,[1894962,"35-3"]
	,[1894961,"35-2"]
	,[1894960,"30"]
	,[1894959,"30-3"]
	,[1894958,"30-2"]
	,[1894957,"25"]
	,[1894956,"25-3"]
	,[1894955,"25-2"]
	,[1894954,"20"]
	,[1894953,"20-3"]
	,[1894952,"20-2"]
	,[1894951,"15"]
	,[1894950,"15-3"]
	,[1894949,"15-2"]
	,[1894948,"10"]
	,[1894947,"10-3"]
	,[1894946,"10-2"]
	,[1894945,"5"]
	,[1894944,"5-3"]
	,[1894943,"5-2"]
	]

	elements.logs=document.createElement("div")
	elements.logs.id="logs"

	elements.philter=function(q,n){
		var i,frag=document.createDocumentFragment(),temp,tempimg,a=elements.list;
		for(i=a.length;i--;){
		if(n?!RegExp(q,"i").test(a[i][1]):RegExp(q,"i").test(a[i][1])){
			temp=document.createElement("a");
			temp.href="http://www.payloadz.com/go/?id="+a[i][0]
			temp.target="_blank"
			tempimg=document.createElement("img")
			tempimg.src="e/"+a[i][1]+".png"
			temp.appendChild(tempimg)
			frag.appendChild(temp)
		}
		}
		var z;
		while(z=elements.logs.firstChild){
		elements.logs.removeChild(z)
		}
		elements.logs.appendChild(frag);
	}


	elements.buts=document.createElement("div")
	elements.buts.id="buts"
	elements.butlist=[
		["dotcom","website"]
		,["slogan","slogans"]
		,["iso","iso"]
		,["^\\d","anniversary"]
		,["","all"]
	]

	


;(function(){
	var i,frag=document.createDocumentFragment(),tmp,tmptxt,butlist=elements.butlist;
	for(i=butlist.length;i--;){
		tmp=document.createElement("button")
		tmp.setAttribute("data-category",butlist[i][0])
		tmptxt=document.createTextNode(butlist[i][1])
		tmp.appendChild(tmptxt)
		if(butlist[i][2]){
			tmp.setAttribute("data-reverse"," ")
		}
		frag.appendChild(tmp)
	}
	elements.buts.appendChild(frag);
})()


elements.event=function(e){
	if(!e){e={};e.target=event.srcElement}
	if(e.target.hasAttribute("data-category")){
		elements.philter(e.target.getAttribute("data-category"),e.target.hasAttribute("data-reverse"))
			
		var i,content=document.getElementsByClassName("content")[0];
		
		while(i=content.firstChild){
			content.removeChild(i)
		}

		var frag=document.createDocumentFragment()
		frag.appendChild(elements.buts)
		frag.appendChild(elements.logs)
		content.appendChild(frag)
		console.log("clicked"+e.target.getAttribute("data-category"))
	}
}

elements.buts.onmousedown=elements.event
elements.buts.ontouchstart=elements.event
