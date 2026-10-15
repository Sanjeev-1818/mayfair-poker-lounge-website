(function(){
  var b=document.getElementById('menu-btn'), m=document.getElementById('mobile-nav');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.textContent=o?'Close':'Menu';});}
  var h=document.querySelector('.site-head');
  if(h&&document.body.classList.contains('home')){var f=function(){h.classList.toggle('solid',window.scrollY>40||(m&&m.classList.contains('open')));};f();window.addEventListener('scroll',f,{passive:true});if(b)b.addEventListener('click',f);}
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
