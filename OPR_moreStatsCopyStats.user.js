// ==UserScript==
// @name         OPR more stats and copy stats
// @version      2.01
// @category     Info
// @namespace    sdfgsdfgerververvesafsadfrververv
// @author       lokpro
// @match        https://opr.ingress.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/clipboard.js/1.6.1/clipboard.min.js
// ==/UserScript==

// 12:25pm 2019/1/17

// Settings
var HowManyRecentRedeemedPortalTitlesToShow = 5;

// more stats and copy stats
(function(){
setTimeout( function(){

var div_player_stats = [
	document.getElementsByClassName("profile-pic-small")[0].parentNode,
	document.getElementsByClassName("profile-pic")[0].parentNode,
];

var div = div_player_stats[1].getElementsByTagName("div")[0];
var p_array = div.getElementsByTagName("p");

// p_array = document.getElementsByClassName("profile-pic")[0].parentNode .getElementsByTagName("div")[0].getElementsByTagName("p")

var performance = div.getElementsByTagName("img")[0].src
	.split('/').pop().split('.').shift();

var total = parseInt( p_array[1].getElementsByTagName("span")[2].innerText );
var created = parseInt( p_array[2].getElementsByTagName("span")[2].innerText );
var rejected = parseInt( p_array[3].getElementsByTagName("span")[2].innerText );
var createdPlusRejected = created+rejected;
var percent = ( createdPlusRejected/total *100 ).toFixed(2) +'%';
var percentCreated = ( created/total *100 ).toFixed(2) +'%';
var percentRejected = ( rejected/total *100 ).toFixed(2) +'%';


var str_stat = 
	document.getElementsByClassName("player_nickname")[0].innerText + "\n\n"
	+ p_array[0].getElementsByTagName("span")[1].innerText + " " + performance + " " + createdPlusRejected +" (" + percent +")\n"
	+ p_array[1].getElementsByTagName("span")[1].innerText + " " + total + "\n"
	+ p_array[2].getElementsByTagName("span")[1].innerText + " " + created + "\n" //+" (" + percentCreated +")\n"
	+ p_array[3].getElementsByTagName("span")[1].innerText + " " + rejected //+" (" + percentRejected +")"
	//+ createdPlusRejected +" (" + percent +") "+performance;

for( var i=0; i<div_player_stats.length; i++ ){
	document.getElementsByClassName("player_nickname")[i].innerHTML
		+= ' <button class="button btnCopyStat">copy</button>';
	div_player_stats[i].getElementsByTagName("div")[0]
		.getElementsByTagName("p")[0]
		.getElementsByTagName("span")[1].innerText += " " + createdPlusRejected +" (" + percent +")";
}

new Clipboard('.btnCopyStat', {
	text: function(trigger) {
		return str_stat;
	}
});
}, 999 );
})();

(function(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'api/v1/vault/reward', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);

				var div_player_stats = [
					document.querySelector(".navbar-form > div:nth-child(2) > div:nth-child(3)"),
					document.querySelector("div.visible-xs > div:nth-child(3)"),
				];
				
				var CLASS_LEFT = " ingress-mid-blue pull-left";
				var CLASS_RIGHT = " gold pull-right";
				
				for( var i=0; i<div_player_stats.length; i++ ){
					var p;
					var node;
					
					div_player_stats[i].appendChild( document.createElement("br") );
					p = document.createElement("p");
							node = document.createElement("span");
							node.innerText = "- Upgrades -";
							node.className = "gold pull-right";
						p.append( node );
					div_player_stats[i].appendChild( p );
					
					
					div_player_stats[i].appendChild( document.createElement("br") );
					p = document.createElement("p");
							node = document.createElement("span");
							node.innerText = "progress:";
							node.className = CLASS_LEFT;
							node.style.marginLeft = "5px";
						p.append( node );
							node = document.createElement("span");
							node.innerText = json.progress + "/"+ json.interval;
							node.className = CLASS_RIGHT;
						p.append( node );
					div_player_stats[i].appendChild( p );

					div_player_stats[i].appendChild( document.createElement("br") );
					p = document.createElement("p");
							node = document.createElement("span");
							node.innerText = "available:";
							node.className = CLASS_LEFT;
							node.style.marginLeft = "5px";
						p.append( node );
							node = document.createElement("span");
							node.innerText = json.available;
							node.className = CLASS_RIGHT;
						p.append( node );
					div_player_stats[i].appendChild( p );
					
					div_player_stats[i].appendChild( document.createElement("br") );
					p = document.createElement("p");
							node = document.createElement("span");
							node.innerText = "redeemed:";
							node.className = CLASS_LEFT;
							node.style.marginLeft = "5px";
						p.append( node );
							node = document.createElement("span");
							node.innerText = json.total;
							node.className = CLASS_RIGHT;
						p.append( node );
					div_player_stats[i].appendChild( p );
					
					var upgradedTitles = [];
					for( var k=0; k<json.history.length && k<HowManyRecentRedeemedPortalTitlesToShow; k++ ){
						upgradedTitles.push( json.history[k].title );
					}
					if( upgradedTitles.length >0 ){
						upgradedTitles = "[" + upgradedTitles.join("], [") + "]";
						div_player_stats[i].appendChild( document.createElement("br") );
						p = document.createElement("p");
								node = document.createElement("span");
								node.innerText = "recently redeemed:";
								node.className = CLASS_LEFT;
								node.style.marginLeft = "5px";
							p.append( node );
								node = document.createElement("span");
								node.innerText = upgradedTitles;
								node.className = CLASS_RIGHT;
								node.style.width = "200px";
								node.style.textAlign = "right";
							p.append( node );
						div_player_stats[i].appendChild( p );
					}
				}
         }
    }
};
xmlhttp.send(null);
})();
