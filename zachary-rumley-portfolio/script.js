(function () {
  const buttons = document.querySelectorAll('.menu-item');
  const videos = {
    pingpong: document.getElementById('stage-video-pingpong'),
    chickfila: document.getElementById('stage-video-chickfila')
  };
  const photo = document.getElementById('stage-photo');
  const summary = document.getElementById('stage-summary');
  const meta = document.getElementById('stage-meta');
  const action = document.getElementById('stage-action');
  const title = document.getElementById('hero-title');
  const playButton = document.getElementById('play-stage');

  if (!buttons.length || !title) return;

  const views = {
    pingpong: {
      title: 'Stories built to<br><em>move people.</em>',
      summary: 'I am an aspiring professional whose goal is to create content that taps into the emotions of viewers and ultimately inspires them.',
      meta: '<span>01 / 02</span><span>Ping Pong Promo</span><span>03:01</span>',
      href: 'project-pingpong.html'
    },
    chickfila: {
      title: 'Comedy, craft,<br><em>and a reason to watch.</em>',
      summary: 'I wanted the viewers to enjoy watching the video, laugh at the comedy of it, and also buy more Chick-fil-A sauce.',
      meta: '<span>02 / 02</span><span>Chick-fil-A Sauce</span><span>00:30</span>',
      href: 'project-chickfila.html'
    },
    story: {
      title: 'The person<br><em>behind the work.</em>',
      summary: 'I want to use what skills and talents God has given me to showcase His love to others through media.',
      meta: '<span>03 / 03</span><span>Your Story</span><span>About</span>',
      href: '#story'
    }
  };

  function pauseAll() {
    Object.values(videos).forEach((video) => {
      if (!video) return;
      video.pause();
      video.classList.remove('is-active');
      video.setAttribute('aria-hidden', 'true');
    });
    if (photo) {
      photo.classList.remove('is-active');
      photo.setAttribute('aria-hidden', 'true');
    }
  }

  async function activate(viewName) {
    const view = views[viewName];
    if (!view) return;
    buttons.forEach((button) => {
      const active = button.dataset.view === viewName;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    pauseAll();
    title.innerHTML = view.title;
    summary.textContent = view.summary;
    meta.innerHTML = view.meta;
    action.href = view.href;
    action.textContent = viewName === 'story' ? 'Read your story ↘' : 'Open project ↗';

    if (viewName === 'story') {
      photo.classList.add('is-active');
      photo.removeAttribute('aria-hidden');
      return;
    }

    const video = videos[viewName];
    video.classList.add('is-active');
    video.removeAttribute('aria-hidden');
    try { await video.play(); } catch (_) {}
    playButton.textContent = 'Pause motion';
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => activate(button.dataset.view));
  });

  playButton?.addEventListener('click', () => {
    const activeVideo = Array.from(Object.values(videos)).find((video) => video && video.classList.contains('is-active'));
    if (!activeVideo) return;
    if (activeVideo.paused) {
      activeVideo.play();
      playButton.textContent = 'Pause motion';
    } else {
      activeVideo.pause();
      playButton.textContent = 'Play motion';
    }
  });

  activate('pingpong');
})();
