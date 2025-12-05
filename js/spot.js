const slides = document.querySelectorAll('.slide');
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

setInterval(nextSlide, 6000); // 每 4 秒換圖


(function(){
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('siteNav');
  const spacer = document.getElementById('nav-spacer');
  if(!header || !nav || !spacer) return;

  const THRESHOLD = 50; // 往下 50px 才顯示

  function setSpacer(){
    if(header.classList.contains('visible')){
      spacer.style.height = nav.offsetHeight + 'px';
    } else {
      spacer.style.height = '0px';
    }
  }

  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    if(y > THRESHOLD){
      header.classList.remove('hidden');
      header.classList.add('visible');
      nav.classList.add('nav-sticky'); // 保留你原 sticky
    } else {
      header.classList.add('hidden');
      header.classList.remove('visible');
      nav.classList.remove('nav-sticky');
    }
    setSpacer();
  }

  // 初始化
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setSpacer);
})();


