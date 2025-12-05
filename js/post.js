(function(){
  const wrapper = document.getElementById('ftx-duo');
  if(!wrapper) return;

  const leftBox  = wrapper.querySelector('[data-role="text"]');
  const rightBox = wrapper.querySelector('[data-role="image"]');
  if(!leftBox || !rightBox) return;

  const L = Array.from(leftBox.querySelectorAll('.ftx-slide'));
  const R = Array.from(rightBox.querySelectorAll('.ftx-slide'));
  if(!L.length || !R.length) return;

  let i = 0, anim = false, accum = 0;
  const DUR = 720;        // 轉場時間
  const TH  = 40;         // 滾輪切換門檻
  const maxIndex = Math.min(L.length, R.length) - 1;

  // 只創一次「下一段殘影」節點
  const nextGhost = document.createElement('div');
  nextGhost.className = 'ftx-next-ghost';
  leftBox.appendChild(nextGhost);

  function updateNextGhost(idx){
    const nextIdx = idx + 1;
    if(nextIdx <= maxIndex){
      const titleEl = L[nextIdx].querySelector('.ftx-title');
      nextGhost.textContent = titleEl ? titleEl.textContent : '';
      // 讓 ::before 的「下一段：」仍在，故 textContent 只放標題
      nextGhost.classList.add('is-show');
    }else{
      nextGhost.textContent = '';
      nextGhost.classList.remove('is-show');
    }
  }

  function swap(arr, n){
    const cur = arr[i], nxt = arr[n];
    cur.classList.remove('ftx-active'); cur.classList.add('ftx-prev');
    nxt.classList.add('ftx-active');
    setTimeout(()=> cur.classList.remove('ftx-prev'), DUR);
  }

  function go(n){
    if(anim || n===i || n<0 || n>maxIndex) return;
    anim = true;
    swap(L, n);
    swap(R, n);
    setTimeout(()=>{ i = n; anim = false; updateNextGhost(i); }, DUR);
  }

  // 初始化：只讓第一張 active，並建立初始「下一段」殘影
  L.forEach((el,idx)=> el.classList.toggle('ftx-active', idx===0));
  R.forEach((el,idx)=> el.classList.toggle('ftx-active', idx===0));
  updateNextGhost(0);

  // 滾輪控制（上下皆可）
  function onWheel(e){
    if(anim) return;
    if(Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // 只吃垂直
    e.preventDefault();
    accum += e.deltaY;
    if(accum >  TH){ accum = 0; go(i+1); }
    if(accum < -TH){ accum = 0; go(i-1); }
  }
  wrapper.addEventListener('wheel', onWheel, {passive:false});
  document.addEventListener('wheel', (e)=>{ if(wrapper.contains(e.target)) onWheel(e); }, {passive:false});

  // 鍵盤／觸控備援（可保留）
  wrapper.setAttribute('tabindex','0');
  wrapper.addEventListener('keydown', e=>{
    if(anim) return;
    if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); go(i+1); }
    if (['ArrowUp','PageUp'].includes(e.key))         { e.preventDefault(); go(i-1); }
  });
  let startY=null;
  wrapper.addEventListener('touchstart', e=>{ startY = e.touches[0].clientY; }, {passive:true});
  wrapper.addEventListener('touchend', e=>{
    if(startY==null) return;
    const dy = e.changedTouches[0].clientY - startY;
    if(Math.abs(dy) > 30){ dy < 0 ? go(i+1) : go(i-1); }
    startY = null;
  }, {passive:true});
})();


// 更多文章 start
const track = document.getElementById('crTrack');
document.getElementById('crPrev').onclick = () => {
  track.scrollBy({ left: -320, behavior: 'smooth' });
};
document.getElementById('crNext').onclick = () => {
  track.scrollBy({ left: 320, behavior: 'smooth' });
};
// 更多文章 end