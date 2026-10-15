(function(){
  var b=document.getElementById('menu-btn'), m=document.getElementById('mobile-nav'), h=document.querySelector('.site-head');
  function setOpen(o){ if(!b||!m) return; m.classList.toggle('open',o); b.setAttribute('aria-expanded',o?'true':'false'); b.textContent=o?'Close':'Menu'; solid(); }
  function solid(){ if(h&&document.body.classList.contains('home')) h.classList.toggle('solid', window.scrollY>40 || (m&&m.classList.contains('open'))); }
  if(b&&m){
    b.addEventListener('click',function(){ setOpen(!m.classList.contains('open')); });
    m.addEventListener('click',function(e){ if(e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&m.classList.contains('open')){ setOpen(false); b.focus(); } });
    document.addEventListener('click',function(e){ if(m.classList.contains('open') && !h.contains(e.target)) setOpen(false); });
    window.addEventListener('resize',function(){ if(window.innerWidth>1120) setOpen(false); });
  }
  solid(); window.addEventListener('scroll',solid,{passive:true});
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
