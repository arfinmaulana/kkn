# Clean YouTube + ImgBB Demo untuk GitHub Pages

Demo ini dibuat untuk menampilkan:

- Video dari YouTube dengan tampilan clean dan lazy loading.
- Foto dari ImgBB dengan direct link, cache buster, referrer policy, dan fallback image proxy.
- Website statis yang bisa langsung di-host di GitHub Pages.

## File penting

```text
index.html
css/style.css
js/main.js
data/videos.json
data/photos.json
```

## Cara ganti video

Buka `data/videos.json` lalu ganti `youtubeId`.

Contoh link YouTube:

```text
https://youtu.be/sdhh7AYzsTY?si=r-_8veQLF7uGjQLK
```

Yang dipakai hanya:

```text
sdhh7AYzsTY
```

## Cara ganti foto ImgBB

Buka `data/photos.json` lalu ganti bagian `image`.

Gunakan direct image link, biasanya bentuknya:

```text
https://i.ibb.co/xxxxx/nama-file.png
```

Bukan viewer link seperti:

```text
https://ibb.co/xxxxx
```

Kalau foto sulit tampil di beberapa HP, tambahkan fallback di `fallbacks`.

## Cara upload ke GitHub Pages

1. Extract ZIP ini.
2. Upload semua file ke repo GitHub.
3. Buka Settings → Pages.
4. Pilih branch `main` dan folder `/root`.
5. Save.

## Catatan video

Sebelum diklik, YouTube iframe tidak dimuat. Halaman hanya menampilkan thumbnail dan tombol play.
Setelah diklik, player YouTube akan muncul karena sumber videonya tetap dari YouTube.
