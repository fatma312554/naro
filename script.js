(function(){
var WA='21628535678';,MAIL=''; // numéro WhatsApp (ex. 21620123456) ou e-mail de NARO pour recevoir les commandes
var $=function(i){return document.getElementById(i)},PRICE=65,qty=1,size='M',msg='',pages=['accueil','piece','commande'];
function show(h){
 pages.forEach(function(p){$(p).classList.toggle('on',p===h)});
 document.body.dataset.p=h;window.scrollTo(0,0);
 if(h==='commande'){$('rs').textContent=size;$('rq').textContent=qty;$('rt').textContent=$('total').textContent=PRICE*qty+' DT'}
}
function go(h){try{if(location.hash!=='#'+h)location.hash=h}catch(e){}show(h)}
window.addEventListener('hashchange',function(){var h=location.hash.slice(1);if(pages.indexOf(h)>-1)show(h)});
document.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){go(b.dataset.go)})});
var sz=document.querySelectorAll('#sz button');
sz.forEach(function(b){b.addEventListener('click',function(){size=b.textContent;sz.forEach(function(x){x.setAttribute('aria-pressed',x===b)})})});
$('minus').onclick=function(){if(qty>1){qty--;$('qty').textContent=qty}};
$('plus').onclick=function(){if(qty<10){qty++;$('qty').textContent=qty}};
function reset(){
 $('f').reset();qty=1;size='M';$('qty').textContent=1;
 sz.forEach(function(x){x.setAttribute('aria-pressed',x.textContent==='M')});
 $('err').textContent='';$('st').textContent='';$('done').hidden=true;$('f').hidden=false;
}
$('no').onclick=function(){reset();go('accueil')};
$('home').onclick=function(){reset();go('accueil')};
$('f').addEventListener('submit',function(e){
 e.preventDefault();
 var n=$('nm').value.trim(),p=$('ph').value.trim(),a=$('ad').value.trim();
 if(!n){$('err').textContent='Indiquez votre nom.';$('nm').focus();return}
 if(p.replace(/\D/g,'').length<8){$('err').textContent='Indiquez un numéro de téléphone valide.';$('ph').focus();return}
 if(!a){$('err').textContent='Indiquez votre ville et votre adresse.';$('ad').focus();return}
 msg='Commande NARO\nT-shirt « Where history lives »\nTaille : '+size+'\nQuantité : '+qty+'\nTotal : '+PRICE*qty+' DT\n\nNom : '+n+'\nTéléphone : '+p+'\nAdresse : '+a;
 $('recap').textContent=msg;$('f').hidden=true;$('done').hidden=false;window.scrollTo(0,0);
 $('st').textContent='Envoyez le récapitulatif à NARO pour que votre commande soit prise en compte.';
 $('send').textContent=WA?'Envoyer sur WhatsApp':MAIL?'Envoyer par e-mail':'Copier la commande';
});
$('send').onclick=function(){
 if(WA){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener')}
 else if(MAIL){location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Commande NARO')+'&body='+encodeURIComponent(msg)}
 else{var bad=function(){$('st').textContent='Copie impossible : sélectionnez le texte ci-dessous.'};
  if(navigator.clipboard){navigator.clipboard.writeText(msg).then(function(){$('st').textContent='Commande copiée. Envoyez-la à NARO pour la confirmer.'},bad)}else bad()}
};
})();
