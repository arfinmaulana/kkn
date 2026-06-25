const videoGrid = document.getElementById('videoGrid');
const photoGrid = document.getElementById('photoGrid');

const showSkeleton = (target) => {
  target.innerHTML = '<div class="skeleton"></div>';
};

const showError = (target, message) => {
  target.innerHTML = `<div class="card"><div class="card-body"><h3 class="card-title">Tidak bisa memuat data</h3><p>${message}</p></div></div>`;
};

const safeText = (value) => String(value ?? '').replace(/[<>&"']/g, (char) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#039;'
}[char]));

async function readJson(path) {
  const response = await fetch(`${path}?v=7`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Gagal membaca ${path}`);
  return response.json();
}

function createVideoCard(video) {
  const title = safeText(video.title || 'Video');
  const category = safeText(video.category || 'video');
  const id = encodeURIComponent(video.youtubeId);

  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <div class="media-box video-box">
      <img class="video-thumb" src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="Thumbnail ${title}" loading="lazy" decoding="async">
      <button class="video-button" type="button" aria-label="Putar ${title}">
        <span class="play-circle"><span class="play-triangle"></span></span>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <span class="badge">${category}</span>
    </div>
  `;

  const thumb = card.querySelector('.video-thumb');
  thumb.onerror = () => {
    thumb.onerror = null;
    thumb.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  };

  const box = card.querySelector('.video-box');
  const button = card.querySelector('.video-button');

  button.addEventListener('click', () => {
    box.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
        title="${title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  }, { once: true });

  return card;
}

function createPhotoCard(photo) {
  const title = safeText(photo.title || 'Foto');
  const category = safeText(photo.category || 'gallery');
  const viewerLink = photo.viewerLink || photo.image;
  const sources = [photo.image, ...(photo.fallbacks || [])].filter(Boolean);
  let sourceIndex = 0;

  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <div class="media-box photo-box">
      <img class="photo-img" alt="${title}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <div class="image-error">
        <div>
          <strong>Gambar belum berhasil dimuat.</strong>
          <span>Coba buka gambar langsung atau refresh halaman.</span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <span class="badge">${category}</span>
      <br>
      <a class="helper-link" href="${safeText(viewerLink)}" target="_blank" rel="noopener noreferrer">Buka foto langsung</a>
    </div>
  `;

  const img = card.querySelector('.photo-img');
  const errorBox = card.querySelector('.image-error');

  const loadNextSource = () => {
    if (sourceIndex >= sources.length) {
      img.style.display = 'none';
      errorBox.style.display = 'grid';
      return;
    }

    const nextSource = sources[sourceIndex];
    sourceIndex += 1;
    img.src = nextSource;
  };

  img.onerror = loadNextSource;
  img.onload = () => {
    errorBox.style.display = 'none';
    img.style.display = 'block';
  };

  loadNextSource();
  return card;
}

async function loadVideos() {
  showSkeleton(videoGrid);
  try {
    const videos = await readJson('data/videos.json');
    const visibleVideos = videos.filter(video => video.status === 'show');
    videoGrid.innerHTML = '';
    visibleVideos.forEach(video => videoGrid.appendChild(createVideoCard(video)));
    if (!visibleVideos.length) showError(videoGrid, 'Belum ada video dengan status show.');
  } catch (error) {
    showError(videoGrid, error.message);
  }
}

async function loadPhotos() {
  showSkeleton(photoGrid);
  try {
    const photos = await readJson('data/photos.json');
    const visiblePhotos = photos.filter(photo => photo.status === 'show');
    photoGrid.innerHTML = '';
    visiblePhotos.forEach(photo => photoGrid.appendChild(createPhotoCard(photo)));
    if (!visiblePhotos.length) showError(photoGrid, 'Belum ada foto dengan status show.');
  } catch (error) {
    showError(photoGrid, error.message);
  }
}

loadVideos();
loadPhotos();
