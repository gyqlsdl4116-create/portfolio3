// WAI-ARIA 탭 패턴: 클릭 + 방향키 이동
(function(){
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  function activate(tab){
    tabs.forEach(t=>{
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click', ()=>activate(tab));
    tab.addEventListener('keydown', e=>{
      let idx = null;
      if(e.key==='ArrowRight') idx = (i+1)%tabs.length;
      if(e.key==='ArrowLeft')  idx = (i-1+tabs.length)%tabs.length;
      if(e.key==='Home') idx = 0;
      if(e.key==='End')  idx = tabs.length-1;
      if(idx!==null){ e.preventDefault(); activate(tabs[idx]); }
    });
  });
})();
