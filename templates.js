var templates={};

templates.start=function(){
	var a=templates.list

	var showall=false
	var displayresults;

	var form=document.createElement("form")
	form.id="fo"
	var textbox=document.createElement("input")
	textbox.type="text"
	textbox.id="sf"
	textbox.value=window.localStorage.getItem("tb")||""
	textbox.placeholder="Search your model..."
	form.appendChild(textbox)
	var close=document.createElement("img")
	close.id="close"
	close.src="cancel.png"
	close.alt="clear"
	form.appendChild(close)
	var templateList=document.createElement("div")
	templateList.id="models"
	var showallLink=document.createElement("a")
	showallLink.id='showall'
	showallLink.appendChild(document.createTextNode("Show all..."))
	showallLink.onclick=function(){showall=true;displayresults()}
	if(!ie){
		displayresults=function(){
			var i,c=a,frag=document.createDocumentFragment(),s=textbox.value;
			//filter array
			c=c.filter(function(element){
				return RegExp(s,"i").test(element[2])
			});
			for(i=0;(showall?1:i<29)&&i<c.length;i++){
				c[i][3].firstChild.src="t/"+c[i][1]+".jpg"
				frag.appendChild(c[i][3])
			}
			//update document
			if(!showall)frag.appendChild(showallLink)
			templateList.clear()
			templateList.appendChild(frag)
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
				templateList.clear()
				templateList.appendChild(frag);
		}
	}
	templates.setup=function(){
		document.body.className="p3"
		content.clear()

		displayresults();

		content.appendChild(form)
		content.appendChild(templateList)
	}
}

templates.list=[
	 [1901353,"toyoya-rav-4-2013-uptodate"]
	,[1901352,"toyota-prius-c-2013-uptodate"]
	,[1901351,"subaru-xv-2013-uptodate"]
	,[1901350,"nissan-pathfinder-2013-uptodate"]
	,[1901349,"mitsubishi-imiev-2012-UPTODATE"]
	,[1901348,"mazda CX-5-2012-uptodate"]
	,[1901347,"kia-rio-hb-2013-uptodate"]
	,[1901346,"kia-forte-hb-2013-uptodate"]
	,[1901345,"hyundai-santa-fe-2013-uptodate"]
	,[1901344,"ford-escape-2013-uptodate"]
	,[1901343,"ford-cmax-2012-uptodate"]
	,[1901342,"dodge-dart-2013-uptodate"]
	,[1894192,"chev-orlando-2012-uptodate"]
	,[1894168,"chev-sonic-2012-uptodate"]
	,[1894169,"chev-spark-2012-uptodate"]
	,[1894170,"chev-volt-2011-uptodate"]
	,[1894171,"dodge-caravan-2012-uptodate"]
	,[1894172,"dodge-charger-2011-uptodate"]
	,[1894189,"dodge-durango-2012-uptodate"]
	,[1894173,"fiat-2012-uptodate"]
	,[1894174,"ford-focus-4dr-hb-2012-uptodate"]
	,[1894175,"honda cr-v-2012-uptodate"]
	,[1894176,"honda-civic-coupe-2012-uptodate"]
	,[1894177,"hyndai-accent-4dr-HB-2012-uptodate"]
	,[1894178,"hyundai-elantra-2012-uptodate"]
	,[1894179,"hyundai-veloster-2012-uptodate"]
	,[1894180,"mazda-5-2012-uptodate"]
	,[1894181,"mitsubishi-RVR-2010-uptodate"]
	,[1894182,"nissan-NV-high-roof-2012-uptodate"]
	,[1894183,"nissan-NV-low-roof-2012-uptodate"]
	,[1894184,"scion-IQ-2012-uptodate"]
	,[1894185,"scion-XB-2012-uptodate"]
	,[1894186,"vw-beetle-2012-uptodate"]
	,[1894187,"vw-jetta-2011-uptodate"]
	,[1197244,"buick-enclave-2008-uptodate"]
	,[1197240,"buick-rainier-2004-2007"]
	,[1197379,"buick-rendez-vous-2004-2007"]
	,[1197230,"chev-aveo-4dr-2004-2011"]
	,[1197824,"chev-aveo-5dr-2004-2011"]
	,[1197845,"chev-camaro-2009-uptodate"]
	,[1197846,"chev-cavalier-2004-2005"]
	,[1197847,"chev-cobalt-4dr-2007-2009"]
	,[1197848,"chev-cobalt-coupe-2007-2009"]
	,[1197849,"chev-corvette-2006-uptodate"]
	,[1417079,"chev-cruze-2011-uptodate"]
	,[1208680,"chrysler-aspen-2007-2009"]
	,[1197852,"chev-impala-police-2005"]
	,[1197853,"chev-impala-2008-uptodate"]
	,[1197854,"chev-malibu-2007"]
	,[1197855,"chev-malibu-2008-uptodate"]
	,[1197856,"chev-malibu-maxx-2007"]
	,[1197858,"chev-ssr-2004-2006"]
	,[1199425,"chev-express-cube-16ft"]
	,[1199424,"savana-express-cube-13ft"]
	,[1207558,"chev-avalanche-2003-2006"]
	,[1207559,"chev-avalanche-2007-uptodate"]
	,[1207561,"chev-colorado-crew-c-2004-2012"]
	,[1207562,"chev-colorado-ext-c-2004-2012"]
	,[1207563,"chev-colorado-reg-2004-2012"]
	,[1207564,"chev-s-10-crew-c-2003-2004"]
	,[1207565,"chev-s-10-ext-c-2003-2004"]
	,[1207566,"chev-s-10-reg-2003-2004"]
	,[1207567,"chev-s-10-reg-long-2003-2004"]
	,[1207569,"chev-silverado-3500-crew-c-2003-2006"]
	,[1207570,"chev-silverado-3500-ext-c-long-2003-2006"]
	,[1207572,"chev-silverado-3500-reg-2003-2006"]
	,[1207839,"chev-silverado-crew-c-2003-2006"]
	,[1207853,"chev-silverado-ext-cab-2003-2006"]
	,[1207856,"chev-silverado-ext-cab-long-2003-2006"]
	,[1207870,"chev-silverado-reg-long-2003-2006"]
	,[1207872,"chev-silverado-reg-short-2003-2006"]
	,[1207841,"chev-silverado-crew-c-2007-uptodate"]
	,[1207863,"chev-silverado-ext-cab-reg-2007-uptodate"]
	,[1207849,"chev-silverado-ext-c-long-2007-uptodate"]
	,[1207865,"chev-silverado-long-2007-uptodate"]
	,[1207867,"chev-silverado-reg-2007-uptodate"]
	,[1207884,"chev-silverado-3500-crew-c-2007"]
	,[1207885,"chev-silverado-3500-ext-c-long-2007"]
	,[1207887,"chev-silverado-3500-reg-2007"]
	,[1207888,"chev-silverado-crew-c-2007"]
	,[1207889,"chev-silverado-ext-cab-2007"]
	,[1207890,"chev-silverado-ext-cab-long-2007"]
	,[1207891,"chev-silverado-reg-long-2007"]
	,[1207892,"chev-silverado-reg-short-2007"]
	,[1207913,"chev-astro-cargo-s-dr-2003-2005"]
	,[1207918,"chev-astro-swing-dr-2003-2005"]
	,[1207923,"chev-astro-tailgate-2003-2005"]
	,[1207926,"chev-blazer-2dr-2004-2005"]
	,[1207928,"chev-blazer-4dr-2004-2005"]
	,[1207930,"chev-equinox-2004-2009"]
	,[1207931,"chev-equinox-2010-uptodate"]
	,[1207932,"chev-express-cube-13ft"]
	,[1207942,"chev-express-long-2003-uptodate"]
	,[1207945,"chev-express-long-slide-2003-uptodate"]
	,[1207966,"chev-express-long-slide-cargo-2003-uptodate"]
	,[1207968,"chev-express-reg-2003-uptodate"]
	,[1207970,"chev-express-reg-cargo-2003-uptodate"]
	,[1207986,"chev-express-reg-slide-2003-uptodate"]
	,[1207989,"chev-express-reg-slide-cargo-2003-uptodate"]
	,[1197850,"chev-hhr-2007-2011"]
	,[1197851,"chev-hhr-panel-2007-2011"]
	,[1207998,"chev-suburban-2008-uptodate"]
	,[1208003,"chev-tahoe-2007-uptodate"]
	,[1208004,"chev-tracker-2004"]
	,[1208005,"chev-trailblazer-ext-lt-2004-2006"]
	,[1208006,"chev-trailblazer-ls-2004-2009"]
	,[1208007,"chev-traverse-2009-uptodate"]
	,[1208008,"chev-uplander-ext-2005-2009"]
	,[1208009,"chev-venture-ext-2003-2004"]
	,[1208010,"chev-venture-reg-2003-2004"]
	,[1208683,"chrysler-pt-cruiser-2004-2010"]
	,[1208685,"chrysler-pt-cruiser-panel-2007-uptodate"]
	,[1208686,"town-country-2003-2007"]
	,[1208687,"town-country-2008-uptodate"]
	,[1207932,"chev-express-cube-13ft"]
	,[1199425,"chev-express-cube-16ft"]
	,[1208696,"ford-econoline-cube-15ft"]
	,[1209090,"dodge-avenger-2008-uptodate"]
	,[1209089,"dodge-caliber-2007-uptodate"]
	,[1209088,"dodge-challenger-2008-uptodate"]
	,[1209087,"dodge-charger-police-2007-uptodate"]
	,[1209086,"dodge-magnum-police-2006-2009"]
	,[1209085,"dodge-srt-4-2004-2006"]
	,[1209116,"dodge-dakota-c-c-2004"]
	,[1209114,"dodge-dakota-quad-c-2004"]
	,[1209111,"dodge-dakota-reg-2004"]
	,[1209115,"dodge-dakota-c-c-2005-2011"]
	,[1209112,"dodge-dakota-quad-c-2005-2011"]
	,[1209108,"dodge-ram-1500-q-cab-2003-2008"]
	,[1209105,"dodge-ram-1500-reg-long-2003-2008"]
	,[1209103,"dodge-ram-1500-reg-short-2003-2008"]
	,[1209100,"dodge-ram-3500-q-cab-2003-2008"]
	,[1209092,"dodge-ram-3500-resistol-2008"]
	,[1209091,"dodge-ram-mega-cab-2007-2008"]
	,[1209110,"dodge-ram-1500-c-cab-2009-uptodate"]
	,[1209109,"dodge-ram-1500-c-cab-toolbox-2009-uptodate"]
	,[1209107,"dodge-ram-1500-quad-cab-2009-uptodate"]
	,[1209104,"dodge-ram-1500-reg-long-2009-uptodate"]
	,[1209101,"dodge-ram-1500-reg-short-2009-uptodate"]
	,[1209089,"dodge-caliber-2007-uptodate"]
	,[1209144,"dodge-caravan-gr-2003-2007"]
	,[1209141,"dodge-caravan-reg-2003-2006"]
	,[1209142,"dodge-caravan-gr-2008-uptodate"]
	,[1209139,"dodge-durango-2003"]
	,[1209138,"dodge-durango-2004-2009"]
	,[1209137,"dodge-journey-2009-uptodate"]
	,[1209135,"dodge-nitro-2007-2009"]
	,[1209133,"dodge-ram-2003"]
	,[1209130,"dodge-ram-short-2003"]
	,[1209126,"dodge-sprinter-reg-2004-2007"]
	,[1209124,"dodge-sprinter-reg-hr-2004-2007"]
	,[1209122,"dodge-sprinter-short-2004-2007"]
	,[1209080,"dodge-sprinter-cargo-144-h-roof-win-2008-uptodate"]
	,[1209079,"dodge-sprinter-cargo-144-window-2008-uptodate"]
	,[1208721,"dodge-sprinter-cargo-170-2008-uptodate"]
	,[1209084,"dodge-sprinter-c-ext-roof-170-2008-uptodate"]
	,[1208715,"dodge-sprinter-chassis-144-2008-uptodate"]
	,[1208714,"dodge-sprinter-chassis-170-2008-uptodate"]
	,[1209083,"dodge-sprinter-c-mega-roof-170-2008-uptodate"]
	,[1208713,"dodge-sprinter-passenger-144-2008-uptodate"]
	,[1208709,"dodge-sprinter-passenger-144-h-roof-2008-uptodate"]
	,[1208708,"dodge-sprinter-passenger-170-2008-uptodate"]
	,[1209082,"dodge-sprinter-cargo-144-2008-uptodate"]
	,[1209081,"dodge-sprinter-cargo-144-h-roof-2008-uptodate"]
	,[1210154,"ford-fiesta-hb-2010-uptodate"]
	,[1210153,"ford-flex-2009-uptodate"]
	,[1210053,"ford-focus-4dr-2008-uptodate"]
	,[1210055,"ford-focus-coupe-2008-uptodate"]
	,[1210052,"ford-focus-w-2003-2007"]
	,[1210051,"ford-freestyle-2005-2007"]
	,[1210050,"ford-fusion-2007-2009"]
	,[1417090,"ford-fusion-2010-uptodate"]
	,[1210047,"ford-mustang-2004"]
	,[1210045,"ford-mustang-2005-uptodate"]
	,[1210044,"ford-svt-2003-2006"]
	,[1210043,"ford-taurus-2008-2009"]
	,[1210042,"ford-taurus-2010-uptodate"]
	,[1210041,"ford-taurus-x-2008-2009"]
	,[1208696,"ford-econoline-cube-15ft"]
	,[1210168,"ford-explorer-sport-trac-2003-uptodate"]
	,[1210163,"ford-f150-reg-cab-6-5ft-2004-2008"]
	,[1210161,"ford-f150-reg-cab-8ft-2004-2008"]
	,[1210160,"ford-f150-reg-cab-f-6-5ft-2004-2008"]
	,[1210189,"ford-f150-supercab-f-6-5ft-2004-2008"]
	,[1210186,"ford-f150-supercab-s-5-5ft-2004-2008"]
	,[1210157,"ford-f150-super-cab-s-6-5ft-2004-2008"]
	,[1210185,"ford-f150-supercab-s-8ft-2004-2008"]
	,[1210184,"ford-f150-supercrew-5-5ft-2004-2008"]
	,[1210182,"ford-f250_f350-supercab-8ft-2004-2008"]
	,[1210180,"ford-f250_f350-supercab-8ft-2008"]
	,[1210179,"ford-f250_f350-supercrew-8ft-2004-2008"]
	,[1210178,"ford-f250_f350-supercrew-8ft-2008"]
	,[1210177,"ford-f250_f350-work-8ft-2004-2008"]
	,[1210174,"ford-f250_f350-work-8ft-2008"]
	,[1210167,"ford-f150-crew-cab-5-5ft-2009-uptodate"]
	,[1210164,"ford-f150-crew-cab-6-5ft-2009-uptodate"]
	,[1210159,"ford-f150-reg-cab-long-b-2009-uptodate"]
	,[1210158,"ford-f150-reg-cab-short-b-2009-uptodate"]
	,[1210155,"ford-f150-supercab-5-5ft-2009-uptodate"]
	,[1210190,"ford-f150-supercab-8ft-2009-uptodate"]
	,[1210188,"ford-f150-supercab-f-6-5ft-2009-uptodate"]
	,[1210173,"ford-ranger-reg-cab-2004-2011"]
	,[1210171,"ford-ranger-s-c-flareside-2004-2011"]
	,[1210169,"ford-ranger-supercab-2004-2011"]
	,[1210197,"ford-excursion-2004-2005"]
	,[1210212,"ford-econoline-2004-2007"]
	,[1210209,"ford-econoline-chateau-2004-2007"]
	,[1210206,"ford-econoline-ext-length-2004-2007"]
	,[1210204,"ford-econoline-slide-2004-2007"]
	,[1210211,"ford-econoline-2008-uptodate"]
	,[1210208,"ford-econoline-chateau-2008-uptodate"]
	,[1210205,"ford-econoline-ext-length-2008-uptodate"]
	,[1210202,"ford-econoline-slide-2008-uptodate"]
	,[1210201,"ford-edge-2007-2010"]
	,[1417084,"ford-edge-2011-uptodate"]
	,[1210199,"ford-escape-2004-2007"]
	,[1210198,"ford-escape-2008-2012"]
	,[1210405,"ford-expedition-2004-2006"]
	,[1210404,"ford-expedition-2008-uptodate"]
	,[1210403,"ford-expedition-el-2008-uptodate"]
	,[1210401,"ford-explorer-2003-2010"]
	,[1417087,"ford-explorer-2011-uptodate"]
	,[1210168,"ford-explorer-sport-trac-2003-uptodate"]
	,[1210153,"ford-flex-2009-uptodate"]
	,[1210399,"ford-freestar-2004-2007"]
	,[1210051,"ford-freestyle-2005-2007"]
	,[1210041,"ford-taurus-x-2008-2009"]
	,[1210397,"ford-transit-connect-2010-uptodate"]
	,[1210396,"ford-windstar-2003"]
	,[1199425,"chev-express-cube-16ft"]
	,[1199424,"savana-express-cube-13ft"]
	,[1210428,"gmc-canyon-crew-c-2004-2012"]
	,[1210427,"gmc-canyon-ext-c-2004-2012"]
	,[1210426,"gmc-canyon-reg-2004-2012"]
	,[1210425,"gmc-sierra-3500hd-2007-uptodate"]
	,[1210423,"gmc-sierra-crew-c-2007-uptodate"]
	,[1210422,"gmc-sierra-ext-long-2007-uptodate"]
	,[1210420,"gmc-sierra-ext-reg-2007-uptodate"]
	,[1210419,"gmc-sierra-reg-2007-uptodate"]
	,[1210418,"gmc-sierra-reg-long-2007-uptodate"]
	,[1210417,"sonoma-s-10-crew-c-2003"]
	,[1210414,"sonoma-s-10-ext-c-2003"]
	,[1210412,"sonoma-s-10-ext-sport-s-2003"]
	,[1210411,"sonoma-s-10-reg-2003"]
	,[1210407,"sonoma-s-10-reg-long-2003"]
	,[1210446,"gmc-sierra-crew-c-2003-2007"]
	,[1210444,"gmc-sierra-crew-c-l-2003-2007"]
	,[1210439,"gmc-sierra-crew-c-sport-s-2003-2006"]
	,[1210437,"gmc-sierra-ext-cab-2003-2006"]
	,[1210438,"gmc-sierra-ext-c-sport-s-2003-2006"]
	,[1210436,"gmc-sierra-ext-long-2007"]
	,[1210435,"gmc-sierra-reg-2003-2007"]
	,[1210431,"gmc-sierra-reg-long-2003-2007"]
	,[1210429,"gmc-sierra-reg-sport-s-2003-2007"]
	,[1210503,"gmc-acadia-2007-uptodate"]
	,[1210502,"gmc-envoy-2003-2009"]
	,[1210501,"gmc-envoy-denali-2005-2009"]
	,[1210500,"gmc-envoy-xl-2004-2006"]
	,[1210499,"gmc-terrain-2010-uptodate"]
	,[1210498,"gmc-yukon-tahoe-2003-2006"]
	,[1210497,"gmc-yukon-tahoe-2007-uptodate"]
	,[1210494,"gmc-yukon-xl-suburban-2003-2006"]
	,[1210487,"gmc-yukon-xl-suburban-2007-uptodate"]
	,[1210483,"safari-astro-cargo-s-dr-2003-2005"]
	,[1210480,"safari-astro-swing-dr-2003-2005"]
	,[1210478,"safari-astro-tailgate-2003-2005"]
	,[1210475,"savana-express-long-2003-uptodate"]
	,[1210472,"savana-express-long-slide-2003-uptodate"]
	,[1210469,"savana-express-reg-2003-uptodate"]
	,[1210466,"savana-express-reg-slide-2003-uptodate"]
	,[1211009,"honda-accord-coupe-2008-uptodate"]
	,[1211007,"honda-accord-crosstour-2010-uptodate"]
	,[1211006,"honda-civic-coupe-2004-2005"]
	,[1211004,"honda-civic-coupe-2006-2011"]
	,[1211003,"honda-civic-sedan-2006-uptodate"]
	,[1211002,"honda-civic-si-2003-2005"]
	,[1211000,"honda-civic-si-2006-2007"]
	,[1417092,"honda-cr-z-2011-uptodate"]
	,[1210996,"honda-element-2003-2007"]
	,[1210993,"honda-fit-2007-2008"]
	,[1210991,"honda-fit-2009-uptodate"]
	,[1210982,"honda-insight-2010-uptodate"]
	,[1210981,"honda-s2000-2007-uptodate"]
	,[1211012,"honda-ridgeline-2006-uptodate"]
	,[1211050,"honda-cr-v-2007-2011"]
	,[1211049,"honda-cr-v-2004-2006"]
	,[1210996,"honda-element-2003-2007"]
	,[1210994,"honda-element-2008-2011"]
	,[1211023,"honda-odyssey-2004"]
	,[1211022,"honda-odyssey-2005-uptodate"]
	,[1417094,"honda-odyssey-2011-uptodate"]
	,[1211017,"honda-pilot-2003-2008"]
	,[1211014,"honda-pilot-2009-uptodate"]
	,[1211327,"hummer-h2-2003-2009"]
	,[1211326,"hummer-h3-2006-2009"]
	,[1211337,"hyundai-accent-2dr-2004-2005"]
	,[1211336,"hyundai-accent-2dr-hb-2008-2011"]
	,[1211335,"hyundai-accent-4dr-2004-2005"]
	,[1211338,"hyundai-accent-2006-2011"]
	,[1211332,"hyundai-elantra-4dr-hb-2004-2008"]
	,[1211331,"hyundai-elantra-sedan-2006-2011"]
	,[1261894,"hyundai-genesis-coupe-2009-uptodate"]
	,[1211329,"hyundai-tiburon-2004-2007"]
	,[1211328,"hyundai-tiburon-2008"]
	,[1211345,"hyundai-entourage-2007-2009"]
	,[1211344,"hyundai-santa-fe-2003-2006"]
	,[1211343,"hyundai-santa-fe-2007-uptodate"]
	,[1211342,"hyundai-tucson-2005-2009"]
	,[1318109,"hyundai-tucson-2010-uptodate"]
	,[1211341,"hyundai-veracruz-2008-uptodate"]
	,[1211767,"jeep-commander-2006-2011"]
	,[1211865,"jeep-compass-2007-uptodate"]
	,[1211862,"jeep-gr-cherokee-2003-2004"]
	,[1211861,"jeep-gr-cherokee-2005-uptodate"]
	,[1417096,"jeep-gr-cherokee-2011-uptodate"]
	,[1211858,"jeep-liberty-le-2003-2007"]
	,[1211856,"jeep-liberty-re-2003-2007"]
	,[1211811,"jeep-liberty-sp-2003-2007"]
	,[1211859,"jeep-liberty-2008-2009"]
	,[1211798,"jeep-patriot-2007-uptodate"]
	,[1211771,"jeep-tj-2004-2006"]
	,[1211770,"jeep-tj-unlimited-2005-2009"]
	,[1211769,"jeep-wrangler-2dr-2007-uptodate"]
	,[1211768,"jeep-wrangler-4dr-2007-uptodate"]
	,[1211874,"kia-forte-2010-uptodate"]
	,[1211873,"kia-koup-2010-uptodate"]
	,[1211872,"kia-rio-2006-2011"]
	,[1211870,"kia-rondo-2007-uptodate"]
	,[1211868,"kia-soul-2010-uptodate"]
	,[1211875,"kia-spectra-2007-2009"]
	,[1211898,"kia-borrego-2009-uptodate"]
	,[1211897,"kia-sedona-2004-2005"]
	,[1211896,"kia-sedona-2006-2012"]
	,[1211895,"kia-sorento-2004-2009"]
	,[1212158,"kia-sorento-2010-uptodate"]
	,[1211894,"kia-sportage-2005-2006"]
	,[1211891,"kia-sportage-2007-uptodate"]
	,[1417099,"kia-sportage-2011-uptodate"]
	,[1211950,"lincoln-navigator-l-2008-uptodate"]
	,[1417102,"mazda2-2011-uptodate"]
	,[1212170,"mazda3-2004-2009"]
	,[1212169,"mazda3-2010-uptodate"]
	,[1212168,"mazda3-sedan-2010-uptodate"]
	,[1212176,"mazda-mx5-miata-2008-uptodate"]
	,[1212175,"mazda-protege-5-2003"]
	,[1212173,"mazda-rx-8-2008-uptodate"]
	,[1212171,"mazda-speed3-2010-uptodate"]
	,[1212177,"mazda-b-series-2004-2009"]
	,[1212184,"mazda-5-2006-2011"]
	,[1212183,"mazda-cx-7-2007-2012"]
	,[1212182,"mazda-cx-9-2007-uptodate"]
	,[1212181,"mazda-mpv-2003-2006"]
	,[1212180,"mazda-tribute-2004-2005"]
	,[1212179,"mazda-tribute-2006"]
	,[1212178,"mazda-tribute-2007-2011"]
	,[1212194,"mini-clubman-2008-uptodate"]
	,[1212193,"mini-cooper-2004-uptodate"]
	,[1212197,"mitsubishi-lancer-evolution-2003-uptodate"]
	,[1212198,"mitsubishi-lancer-2008-uptodate"]
	,[1212196,"mitsubishi-raider-c-cab-2006-2009"]
	,[1212195,"mitsubishi-raider-ext-cab-2006-2009"]
	,[1212205,"mitsubishi-endeavor-2004-2009"]
	,[1212203,"mitsubishi-montero-2003-2006"]
	,[1212202,"mitsubishi-montero-sport-2003-2004"]
	,[1212200,"mitsubishi-outlander-2004-2006"]
	,[1212199,"mitsubishi-outlander-2007-uptodate"]
	,[1212218,"nissan-cube-2009-uptodate"]
	,[1212217,"nissan-versa-2007-uptodate"]
	,[1212212,"nissan-frontire-ext-cab-2003-2004"]
	,[1212210,"nissan-frontire-reg-cab-2003-2004"]
	,[1212215,"nissan-frontier-crew-c-2005-uptodate"]
	,[1212214,"nissan-frontier-king-c-2005-uptodate"]
	,[1212207,"nissan-titan-crew-c-2004-uptodate"]
	,[1212206,"nissan-titan-king-c-2004-uptodate"]
	,[1212265,"nissan-armada-2004-uptodate"]
	,[1417104,"nissan-juke-2011-uptodate"]
	,[1212263,"nissan-murano-2003-uptodate"]
	,[1212262,"nissan-pathfinder-2003-2004"]
	,[1212260,"nissan-pathfinder-2005-2012"]
	,[1212259,"nissan-quest-2004-2010"]
	,[1417105,"nissan-quest-2011-uptodate"]
	,[1212257,"nissan-xterra-2003-2004"]
	,[1212255,"nissan-xterra-2005-uptodate"]
	,[1212258,"nissan-x-trail-rogue-2008-uptodate"]
	,[1212271,"old-bravada-2004"]
	,[1212269,"old-silhouette-2004"]
	,[1197852,"chev-impala-2005"]
	,[1212281,"chev-impala-police-2006-uptodate"]
	,[1209087,"dodge-charger-2007-uptodate"]
	,[1209086,"dodge-magnum-2006-2009"]
	,[1212286,"ford-crown-vic-gr-marquis-police-2005-uptodate"]
	,[1212328,"pontiac-g6-2007"]
	,[1212324,"pontiac-g6-2008-2009"]
	,[1212323,"pontiac-gto-2005-2006"]
	,[1212320,"pontiac-solstice-2007-2009"]
	,[1212319,"pontiac-sunfire-2004-2005"]
	,[1212305,"pontiac-vibe-2004-2008"]
	,[1212303,"pontiac-vibe-2009-uptodate"]
	,[1212298,"pontiac-wave-4dr-2004-2006-canadian"]
	,[1212296,"pontiac-wave-5dr-2004-2006-canadian"]
	,[1212336,"pontiac-aztek-2004-2005"]
	,[1212334,"pontiac-montana-2006-2009"]
	,[1212333,"pontiac-montana-ext-2004-2005"]
	,[1212332,"pontiac-montana-reg-2004-2005"]
	,[1212331,"pontiac-sv6-2006"]
	,[1212330,"pontiac-torrent-2007-2009"]
	,[1212625,"saturn-astra-2008-2009"]
	,[1212624,"saturn-ion-2003-2007"]
	,[1212623,"saturn-sky-2007-2009"]
	,[1212622,"saturn-outlook-2007-2009"]
	,[1212621,"saturn-relay-2006-2007"]
	,[1212619,"saturn-vue-2003-2007"]
	,[1212618,"saturn-vue-2008-2009"]
	,[1212629,"smart-fortwo-2006-2007"]
	,[1212628,"smart-fortwo-2008-uptodate"]
	,[1213458,"subaru-baja-sport-2004-2006"]
	,[1213428,"subaru-impreza-4-dr-hb-2008-uptodate"]
	,[1213424,"subaru-impreza-sedan-2008-uptodate"]
	,[1213423,"subaru-impreza-sedan-wrx-2008-uptodate"]
	,[1213422,"subaru-impreza-wagon-2004-2007"]
	,[1213417,"subaru-impreza-wrx-4-dr-hb-2008-uptodate"]
	,[1213418,"subaru-impreza-wrx-2004-2007"]
	,[1213415,"subaru-impreza-wrx-sti-2008-uptodate"]
	,[1213413,"subaru-outback-2006-2009"]
	,[1417108,"subaru-outback-2010-uptodate"]
	,[1213412,"subaru-outback-sport-2006-2009"]
	,[1213465,"subaru-b9-tribeca-2006-2007"]
	,[1213459,"subaru-tribeca-2008-uptodate"]
	,[1213464,"subaru-forester-2004-2008"]
	,[1213462,"subaru-forester-2009-uptodate"]
	,[1213483,"suzuki-aerio-2004-2007"]
	,[1213481,"suzuki-swift-5dr-2004-2011"]
	,[1213479,"suzuki-sx4-2007-uptodate"]
	,[1213478,"suzuki-equator-6ft-box-2009-uptodate"]
	,[1213475,"suzuki-equator-c-c-6ft-box-2009-uptodate"]
	,[1213473,"suzuki-equator-crew-cab-2009-uptodate"]
	,[1213472,"suzuki-gr-vitara-2004-2005"]
	,[1213471,"suzuki-gr-vitara-2006-uptodate"]
	,[1213470,"suzuki-vitara-con-2004"]
	,[1213469,"suzuki-xl-7-2004-2006"]
	,[1213467,"suzuki-xl-7-2007-2009"]
	,[1213506,"scion-xa-2004-2007"]
	,[1213504,"scion-xb-2011"]
	,[1213501,"toyota-echo-2dr-coupe-2004-2005"]
	,[1213499,"toyota-echo-4dr-2004-2005"]
	,[1213503,"toyota-echo-2003-2005"]
	,[1213498,"toyota-matrix-2004-2008"]
	,[1213497,"toyota-matrix-2009-uptodate"]
	,[1213496,"toyota-prius-2004-2009"]
	,[1213495,"toyota-prius-2010-uptodate"]
	,[1213494,"toyota-venza-2009-uptodate"]
	,[1213489,"toyota-yaris-2dr-2006-uptodate"]
	,[1213488,"toyota-yaris-4dr-hb-2006-uptodate"]
	,[1213486,"toyota-yaris-sedan-2008-uptodate"]
	,[1213810,"toyota-tacoma-crew-c-2003-2004"]
	,[1213812,"toyota-tacoma-access-c-2005-uptodate"]
	,[1213808,"toyota-tacoma-crew-cab-2005-uptodate"]
	,[1213805,"toyota-tundra-cab-2003"]
	,[1213797,"toyota-tundra-reg-2003"]
	,[1213806,"toyota-tundra-access-cab-2004-2006"]
	,[1213803,"toyota-tundra-crew-cab-2004-2006"]
	,[1213796,"toyota-tundra-reg-cab-2004-2006"]
	,[1213802,"toyota-tundra-crew-cab-2007-uptodate"]
	,[1213799,"toyota-tundra-crew-cab-long-2007-uptodate"]
	,[1213798,"toyota-tundra-crewmax-2008-uptodate"]
	,[1213795,"toyota-tundra-reg-cab-long-2007-uptodate"]
	,[1213794,"toyota-tundra-reg-cab-short-2007-uptodate"]
	,[1214138,"scion-xb-2004-2007"]
	,[1213504,"scion-xb-2008-2010"]
	,[1214134,"toyota-4runner-2004-2009"]
	,[1417109,"toyota-4runner-2010-uptodate"]
	,[1214132,"toyota-fj-cruiser-2007-uptodate"]
	,[1214131,"toyota-highlander-2003-2007"]
	,[1214130,"toyota-highlander-2008-uptodate"]
	,[1214129,"toyota-rav4-2003-2005"]
	,[1214128,"toyota-rav4-2006-uptodate"]
	,[1214127,"toyota-sequoia-2003-2008"]
	,[1214126,"toyota-sequoia-2009-uptodate"]
	,[1214124,"toyota-sienna-2004-2010"]
	,[1417111,"toyota-sienna-2011-uptodate"]
	,[1215157,"vw-golf-2003-uptodate"]
	,[1215156,"vw-jetta-2007-2010"]
	,[1215155,"vw-new-beetle-2003-2011"]
	,[1215154,"vw-rabbit-gti-2007-2009"]
	,[1215153,"vw-routan-2009-2012"]
	,[1215152,"vw-tiguan-2009-uptodate"]
	,[1215151,"vw-touareg-2004-uptodate"]
	,[1214274,"freight-argosy-day-cab-2001-2006"]
	,[1214273,"freight-argosy-mid-rf-2001-2006"]
	,[1214272,"freight-argosy-raised-rf-2001-2006"]
	,[1214271,"freight-cascadia"]
	,[1214269,"freight-columbia-day-cab-2004-uptodate"]
	,[1214268,"freight-columbia-day-cab-deflector-2004-uptodate"]
	,[1214267,"freight-columbia-mid-rf-2004-uptodate"]
	,[1214266,"freight-columbia-raised-rf-2004-uptodate"]
	,[1214265,"freight-coronado-day-cab-2004-uptodate"]
	,[1214264,"freight-coronado-mid-rf-2004-uptodate"]
	,[1214263,"freight-coronado-raised-rf-2004-uptodate"]
	,[1214262,"freight-m2-26in-ext-cab-2003-uptodate"]
	,[1214260,"freight-m2-48in-crew-cab-2003-uptodate"]
	,[1214257,"freight-m2-day-cab-2003-uptodate"]
	,[1214283,"gmc-topkick-c4500-c5500"]
	,[1214284,"gmc-t-series-t7500"]
	,[1214281,"hino-fa1517-2008-2009"]
	,[1214279,"hino-low-profile-258-2009"]
	,[1214842,"inter-8500-reg"]
	,[1214839,"inter-9200i"]
	,[1214841,"inter-9200i-9400i-hr"]
	,[1214840,"inter-9200i-9400i-lr"]
	,[1214838,"inter-9200i-defl"]
	,[1214836,"inter-9900i-sleeper-hr"]
	,[1214835,"inter-9900i-sleeper-mr"]
	,[1214834,"inter-9900ix-defl"]
	,[1214833,"inter-9900ix-reg"]
	,[1214832,"inter-cf-series"]
	,[1214831,"inter-cxt-2006"]
	,[1214830,"inter-lonestar"]
	,[1214849,"kenworth-t600-sleeper-2004-uptodate"]
	,[1214848,"kenworth-t800-deflector-2004-uptodate"]
	,[1214847,"kenworth-t800-reg-hood-ext-cab-2004-uptodate"]
	,[1214845,"kenworth-t800-sleeper-2004-uptodate"]
	,[1214850,"kenworth-t2000-uptodate"]
	,[1214844,"kenworth-w900-sleeper-2004-uptodate"]
	,[1214854,"mack-chn603-daycab"]
	,[1214852,"mack-vision-daycab"]
	,[1214853,"mack-vision-daycab-deflector"]
	,[1214851,"mack-vision-sleeper"]
	,[1214857,"mitsubishi-fuso-fe-180"]
	,[1215038,"peterbilt-330-108in-bbc"]
	,[1215037,"peterbilt-357-111in-bbc"]
	,[1215036,"peterbilt-357-119in-bbc-sloped-hd"]
	,[1215035,"peterbilt-362-76-bbc-flat-nose"]
	,[1215034,"peterbilt-362-90-bbc-flat-nose"]
	,[1215032,"peterbilt-379-long-city-2004-2009"]
	,[1215030,"peterbilt-379-long-sleeper-69in-2004-2009"]
	,[1215029,"peterbilt-379-short-city-2004-2009"]
	,[1214864,"peterbilt-385-112in-bbc"]
	,[1214862,"peterbilt-385-120in-bbc"]
	,[1214860,"peterbilt-387-high-roof-sl-2004-2009"]
	,[1214858,"peterbilt-387-mid-roof-sl-2004-2007"]
	,[1215059,"sterling-acterra"]
	,[1215067,"volvo-hwy-2003-uptodate"]
	,[1215065,"volvo-vn-730-2008-uptodate"]
	,[1215063,"volvo-vt-800-2006-uptodate"]
	,[1215075,"western-star-4900-ex"]
	,[1215073,"western-star-4900-fa"]
	,[1215071,"western-star-4900-sa"]
	,[1215070,"western-star-6900-xd"]
	,[1215150,"trailer-45ft"]
	,[1215146,"trailer-48ft"]
	,[1215149,"trailer-53ft"]
	,[1215144,"trailer-front-rear-dry-box"]
	,[1215142,"trailer-front-rear-refer-box"]
	];


(function(){
	var i,tmp;
	for(i=templates.list.length;i--;){
		templates.list[i][2]=templates.list[i][1]
			.replace(/uptodate/i,(new Date).getFullYear())
			.replace(/-/g," ")
			.replace("chev ","chevrolet ")
			.replace("rendez vous","rendez-vous")
			.replace(" hb "," hatchback ")
			.replace(" 2 dr "," 2dr ")
			.replace(" 2dr "," two-door ")
			.replace(" 4 dr "," 4dr ")
			.replace(" 4dr "," 4-door ")
			.replace(" 5 dr "," 5dr ")
			.replace(" 5dr "," 5-door ")
			.replace(" crew c "," crew cab ")
			.replace(" ext c "," extended cab ")
			.replace(" c c "," crew cab ")
			.replace(" c cab "," crew cab ")
			.replace(" ext cab "," extended cab ")
			.replace(" quad c "," quad cab ")
			.replace(" s dr "," swing door ")
			.replace(" swing dr "," swing door ")
			.replace(/(20\d{2}) (20\d{2})/,"\n$1-$2")
			.replace(/ (20\d{2})$/,"\n$1")
			.replace("vw ","volkswagen ")
			.replace("2013-2013","2013")
		templates.list[i][3]=document.createElement("a")
		templates.list[i][3].href="http://www.payloadz.com/go/?id="+templates.list[i][0]
		templates.list[i][3].target="_blank"
		tmp=document.createElement("img")
		//tmp.src="t/"+templates.list[i][1]+".jpg"
		templates.list[i][3].appendChild(tmp)
		tmp=document.createTextNode(templates.list[i][2])
		templates.list[i][3].appendChild(tmp)
	}
})()

templates.start()