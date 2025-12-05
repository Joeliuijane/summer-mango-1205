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



// ----------------------------


 (function () {
    const avatarButtons = document.querySelectorAll('.avatar-btn');
    const modal = document.getElementById('memberModal');
    const backdrop = modal.querySelector('.member-modal-backdrop');
    const closeBtn = modal.querySelector('.member-modal-close');

    const modalFullPhoto = document.getElementById('modalFullPhoto');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');

    function openModal(btn) {
      const name = btn.dataset.name || '';
      const role = btn.dataset.role || '';
      const description = btn.dataset.description || '';
      const tags = (btn.dataset.tags || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // 全身照路徑：優先用 data-full，沒有就退回頭貼
      const fullSrc =
        btn.dataset.full ||
        (btn.querySelector('.avatar-img') &&
          btn.querySelector('.avatar-img').getAttribute('src')) ||
        '';
      const fullAlt =
        (btn.querySelector('.avatar-img') &&
          btn.querySelector('.avatar-img').getAttribute('alt')) ||
        name ||
        '';

      modalFullPhoto.src = fullSrc;
      modalFullPhoto.alt = fullAlt;
      modalName.textContent = name;
      modalRole.textContent = role;
      modalDescription.textContent = description;

      modalTags.innerHTML = '';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    avatarButtons.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn));
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  })();
