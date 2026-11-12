document.addEventListener('DOMContentLoaded', () => {
  const reel = document.querySelector('.reel-montage');
  if (!reel) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reel.pause();
    reel.removeAttribute('autoplay');
    return;
  }
  const attempt = reel.play();
  if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
});
