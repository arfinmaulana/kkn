# Demo YouTube + ImgBB untuk GitHub Pages

Ini adalah demo website sederhana untuk menampilkan:

- Video dari YouTube
- Foto dari ImgBB
- Data konten dari file JSON

## File penting

```text
data/videos.json
data/photos.json
```

## Link yang sudah dimasukkan

Foto ImgBB:

```text
https://i.ibb.co/cjZDTmJ/Screenshot-144.png
```

YouTube ID:

```text
sdhh7AYzsTY
```

## Cara update foto

Buka `data/photos.json`, lalu ganti bagian `image`.

Contoh:

```json
{
  "id": "photo-002",
  "title": "Foto Baru",
  "category": "gallery",
  "image": "https://i.ibb.co/xxxxx/foto-baru.png",
  "status": "show"
}
```

## Cara update video

Buka `data/videos.json`, lalu ganti bagian `youtubeId`.

Contoh:

```json
{
  "id": "video-002",
  "title": "Video Baru",
  "category": "youtube",
  "youtubeId": "ISI_ID_YOUTUBE_DI_SINI",
  "status": "show"
}
```

Kalau link YouTube seperti ini:

```text
https://youtu.be/sdhh7AYzsTY?si=r-_8veQLF7uGjQLK
```

Maka YouTube ID-nya adalah:

```text
sdhh7AYzsTY
```

## Cara publish ke GitHub Pages

1. Buat repo baru di GitHub.
2. Upload semua file dari folder ini.
3. Masuk ke `Settings`.
4. Buka `Pages`.
5. Pilih source branch `main`.
6. Pilih folder `/root`.
7. Klik save.
