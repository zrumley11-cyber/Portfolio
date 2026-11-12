document.addEventListener('DOMContentLoaded', () => {
  const clips = Array.from(document.querySelectorAll('.hero-reel .reel-clip'));
  if (!clips.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    clips.forEach(video => { video.pause(); video.removeAttribute('autoplay'); });
    return;
  }
  let active = 0;
  let timer;
  const play = video => {
    video.currentTime = 0;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  };
  clips.slice(1).forEach(video => video.pause());
  play(clips[0]);
  const advance = () => {
    const next = (active + 1) % clips.length;
    const previous = clips[active];
    const incoming = clips[next];
    play(incoming);
    incoming.classList.add('is-active');
    previous.classList.remove('is-active');
    active = next;
    window.setTimeout(() => previous.pause(), 600);
  };
  const start = () => { if (!timer) timer = window.setInterval(advance, 3000); };
  const stop = () => { if (timer) window.clearInterval(timer); timer = null; clips.forEach(video => video.pause()); };
  start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else { play(clips[active]); start(); }
  });
});
