// ==========================
// 區塊一：圖文不同步滑動 + 三階段文字
// ==========================
(function () {
  const block1 = document.querySelector('#block1');
  if (!block1) return;

  const imgGroup = block1.querySelector('.b1-images');
  const lines = block1.querySelectorAll('.b1-line');

  function onScrollBlock1() {
    const rect = block1.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // 區塊出現在畫面內才開始算
    const enter = vh - rect.top;
    const total = vh + rect.height;
    let progress = enter / total;
    progress = Math.max(0, Math.min(1, progress)); // clamp 0~1

    // 圖片做比較慢的位移（parallax）
  // 圖片做比較慢的位移（parallax）
  const imgOffset = -80 * progress; // px
  // 如果你前面已經不用 --b1-img-y，可以把這行刪掉
  imgGroup.style.setProperty('--b1-img-y', imgOffset + 'px');

  // 加上「輪轉」效果：progress 0~1 對應大約 -6° ~ +6°
  const rot = (progress - 0.5) * 12; // 12 可調，越大轉越多
  block1.style.setProperty('--b1-rot', rot.toFixed(2));


    // 三行文字：依照進度分段出現
    lines.forEach((line, index) => {
      const baseStart = index * 0.22; // 0, 0.22, 0.44...
      const visibleProgress = (progress - baseStart) / 0.25;

      if (visibleProgress > 0) {
        line.classList.add('is-visible');
        const y = 40 * (1 - Math.min(visibleProgress, 1)); // 由 40px → 0
        line.style.setProperty('--b1-line-y', y + 'px');
      } else {
        line.classList.remove('is-visible');
        line.style.setProperty('--b1-line-y', '40px');
      }
    });
  }

  window.addEventListener('scroll', onScrollBlock1);
  window.addEventListener('load', onScrollBlock1);
})();

// ==========================
// 區塊二：橫向移動 + 不同步閃爍
// ==========================
(function () {
  const block2 = document.querySelector('#block2');
  if (!block2) return;

  const track = block2.querySelector('.b2-track');

  function onScrollBlock2() {
    const rect = block2.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const enter = vh - rect.top;
    const total = vh + rect.height;
    let progress = enter / total;
    progress = Math.max(0, Math.min(1, progress)); // clamp

    // 根據捲動做橫向位移（可調整位移量）
    const maxShift = 220; // px，越大移動越多
    const shift = -maxShift * progress;
    track.style.setProperty('--b2-x', shift + 'px');
  }

  window.addEventListener('scroll', onScrollBlock2);
  window.addEventListener('load', onScrollBlock2);
})();
