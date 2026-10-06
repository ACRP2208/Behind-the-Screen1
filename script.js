/* Filter buttons (examples page) */
const buttons=document.querySelectorAll('.filters button');
const cases=document.querySelectorAll('.case');
buttons.forEach(btn=>{btn.addEventListener('click',()=>{
  const f=btn.dataset.filter;
  buttons.forEach(b=>b.setAttribute('aria-pressed',b===btn));
  cases.forEach(c=>{c.hidden=f!=='todos'&&c.dataset.type!==f;});
});});

/* Speed bump: external links go through leaving.html first */
const leaving=document.getElementById('leaving');
if(!leaving){
  document.querySelectorAll('a[href^="http"]').forEach(a=>{
    if(a.hostname===location.hostname&&location.hostname!=='')return;
    a.href='leaving.html?to='+encodeURIComponent(a.href);
    a.removeAttribute('target');
  });
}else{
  const to=new URLSearchParams(location.search).get('to')||'';
  const go=document.getElementById('go');
  const dest=document.getElementById('dest');
  if(/^https?:\/\//i.test(to)){
    dest.textContent=to;
    go.href=to;
  }else{
    dest.textContent='No valid destination was found.';
    go.hidden=true;
  }
  document.getElementById('back').addEventListener('click',()=>{
    if(history.length>1){history.back();}else{location.href='index.html';}
  });
}
