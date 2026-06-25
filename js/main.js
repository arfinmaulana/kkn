async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Gagal membaca ${path}`);
  }
  return response.json();
}

function renderVideos(videos) {
  const container = document.getElementById('video-list');
  const visibleVideos = videos.filter(video => video.status === 'show');

  if (visibleVideos.length === 0) {
    container.innerHTML = '<div class="empty">Belum ada video yang status-nya show.</div>';
    return;
  }

  container.innerHTML = visibleVideos.map(video => `
    <article class="card">
      <div class="video-frame">
        <iframe
          src="https://www.youtube.com/embed/${video.youtubeId}"
          title="${video.title}"
          allowfullscreen>
        </iframe>
      </div>
      <div class="card-body">
        <h3>${video.title}</h3>
        <span class="badge">${video.category}</span>
      </div>
    </article>
  `).join('');
}

function renderPhotos(photos) {
  const container = document.getElementById('photo-list');
  const visiblePhotos = photos.filter(photo => photo.status === 'show');

  if (visiblePhotos.length === 0) {
    container.innerHTML = '<div class="empty">Belum ada foto yang status-nya show.</div>';
    return;
  }

  container.innerHTML = visiblePhotos.map(photo => `
    <article class="card photo-card">
      <img src="${photo.image}" alt="${photo.title}" loading="lazy">
      <div class="card-body">
        <h3>${photo.title}</h3>
        <span class="badge">${photo.category}</span>
      </div>
    </article>
  `).join('');
}

async function init() {
  try {
    const [videos, photos] = await Promise.all([
      loadJSON('./data/videos.json'),
      loadJSON('./data/photos.json')
    ]);

    renderVideos(videos);
    renderPhotos(photos);
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="container"><p class="empty">Terjadi error: ${error.message}</p></div>`
    );
  }
}

init();
