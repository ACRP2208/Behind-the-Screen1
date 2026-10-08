/* Filter buttons (examples page) */
const buttons=document.querySelectorAll('.filters button');
const cases=document.querySelectorAll('.case');
buttons.forEach(btn=>{btn.addEventListener('click',()=>{
  const f=btn.dataset.filter;
  buttons.forEach(b=>b.setAttribute('aria-pressed',b===btn));
  cases.forEach(c=>{c.hidden=f!=='todos'&&c.dataset.type!==f;});
});});

/* Speed bump: floating window shown before leaving the blog */
(function(){
  if(typeof HTMLDialogElement==='undefined')return; /* very old browsers: links open directly */
  const dlg=document.createElement('dialog');
  dlg.className='bump';
  dlg.setAttribute('aria-labelledby','bump-title');
  dlg.innerHTML=
    '<div class="bump-box">'+
    '<button type="button" class="bump-x" aria-label="Close">&times;</button>'+
    '<h2 id="bump-title">Wait. Think before you go.</h2>'+
    '<p>You are about to leave Behind the Screen and open another website. We do not control its content.</p>'+
    '<div class="bump-dest"><span>You are going to:</span><strong id="bump-url"></strong></div>'+
    '<p class="bump-ask">Ask yourself</p>'+
    '<ul><li>Who is behind this website or video?</li><li>What evidence does it show?</li><li>Can I confirm it in another reliable source?</li></ul>'+
    '<div class="actions"><a class="btn" id="bump-go" target="_blank" rel="noopener noreferrer">Continue to site</a>'+
    '<button type="button" class="btn ghost" id="bump-cancel">Go back</button></div>'+
    '</div>';
  document.body.appendChild(dlg);
  const urlEl=dlg.querySelector('#bump-url');
  const go=dlg.querySelector('#bump-go');
  const cancel=dlg.querySelector('#bump-cancel');
  const close=()=>dlg.close();
  dlg.querySelector('.bump-x').addEventListener('click',close);
  cancel.addEventListener('click',close);
  go.addEventListener('click',()=>{setTimeout(close,0);});
  dlg.addEventListener('click',e=>{if(e.target===dlg)close();});
  document.addEventListener('click',e=>{
    const a=e.target.closest&&e.target.closest('a[href^="http"]');
    if(!a||a.id==='bump-go')return;
    if(a.hostname===location.hostname&&location.hostname!=='')return;
    e.preventDefault();
    urlEl.textContent=a.href;
    go.href=a.href;
    dlg.showModal();
    cancel.focus();
  });
})();
