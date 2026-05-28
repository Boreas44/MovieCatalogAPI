<div align="right">
  <a href="https://res.cloudinary.com/dsnwi9kev/raw/upload/v1780001475/BTBS498_Task4_Rapor_h6gwme.docx">
    <img src="https://img.shields.io/badge/BTBS498_Task4_Rapor-indir-2563eb?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg&logoColor=white&labelColor=2b579a" alt="BTBS498 Task4 Rapor (Word)" />
  </a>
</div>

<h1 align="center">MovieCatalogAPI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/ASP.NET_Core-Web_API-2563eb?style=flat-square&logo=dotnet" alt="ASP.NET Core" />
  <img src="https://img.shields.io/badge/React-Vite-3b82f6?style=flat-square&logo=react" alt="React Vite" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-60a5fa?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/BTBS498-Task_4-1d4ed8?style=flat-square" alt="BTBS498 Task 4" />
</p>

<p align="center">
  <strong>ASP.NET Core Web API</strong> + <strong>React (Vite + Tailwind)</strong> ile gelistirilmis full-stack film katalog projesi.
</p>

<p align="center">
  RESTful servis yapisi, model-service-controller mimarisi ve API test surecini uygulamali gosterir.
</p>

---

## Ozellikler

| | |
|---|---|
| CRUD | Film listeleme, detay, ekleme, guncelleme, silme |
| Veri | Poster URL ve aciklama alani |
| Arayuz | iOS hissi veren modern tasarim |
| Baslangic | 12 adet varsayilan film |

## Teknolojiler

- **Backend:** ASP.NET Core (`net10.0`)
- **Frontend:** React + Vite
- **Stil:** Tailwind CSS

## Proje Yapisi

```
MovieCatalogAPI/
├── MovieLibraryAPI/    # Web API
└── MovieLibraryUI/   # React frontend
```

## Ekran Goruntuleri

### Ana arayuz (Movie Library)

Film listesi, detay alani, ekleme formu ve CRUD butonlari.

![Movie Library ana arayuz](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984693/6ab64aef-9999-449d-80d3-ff576a8daadb.png)

### POST islemi (Postman + UI)

**Postman:** `POST /api/movies` — basarili yanit `201 Created` (ornek: Interstellar, `id: 14`)

![Postman POST 201 Created](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984632/POST1_ciqchg.png)

**UI (ekleme sonrasi):** yeni film listede gorunur (`#14 Interstellar`).

![Filmler listesi - POST sonrasi](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984634/POST2_esqkeb.png)

### PUT islemi (Postman + UI)

**Postman:** `PUT /api/movies/1` — basarili yanit `200 OK` + guncellenmis film JSON'u

![Postman PUT 200 OK](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984632/PUT3_rnvdac.png)

**UI (guncellemeden once):** `#1 Seven` ve diger filmler.

![Filmler listesi - PUT oncesi](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984633/PUT1_yvn8yr.png)

**UI (guncellemeden sonra):** `#1` kaydi guncellenmis icerikle listede (`Inception`).

![Filmler listesi - PUT sonrasi](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984634/PUT2_sgzpek.png)

### DELETE islemi (Postman + UI)

**Postman:** `DELETE /api/movies/12` — basarili yanit `204 No Content`

![Postman DELETE 204](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984631/DELETE3_k9xuen.png)

**UI (silmeden once):** listede `#12 Pulp Fiction` gorunur.

![Filmler listesi - silmeden once](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984632/DELETE1_vp8phm.png)

**UI (sildikten sonra):** `#12` kaydi listeden kaldirilmis.

![Filmler listesi - sildikten sonra](https://res.cloudinary.com/dsnwi9kev/image/upload/v1779984632/DELETE2_uc9tqh.png)

---

## Gereksinimler

- .NET SDK 10
- Node.js (LTS)
- npm

## Hizli Baslangic

### 1) API'yi calistir

```bash
cd MovieLibraryAPI
dotnet restore
dotnet run --launch-profile https
```

### 2) UI'i calistir (ayri terminal)

```bash
cd MovieLibraryUI
npm install
npm run dev
```

## Calisma Adimlari

### Backend kurulum

```bash
cd MovieLibraryAPI
dotnet restore
```

### Frontend kurulum

```bash
cd ../MovieLibraryUI
npm install
```

### Backend'i calistir

```bash
cd MovieLibraryAPI
dotnet run --launch-profile https
```

**API adresleri:**

| Ortam | URL |
|-------|-----|
| HTTPS (onerilen) | `https://localhost:7270` |
| HTTP | `http://localhost:5063` |

### Frontend'i calistir

```bash
cd MovieLibraryUI
npm run dev
```

**UI adresi:** `http://localhost:5173`

---

## API Endpointleri

**Base URL:** `https://localhost:7270/api/movies`

| Method | Endpoint | Aciklama | Basarili yanit |
|--------|----------|----------|----------------|
| `GET` | `/api/movies` | Tum filmleri listeler | `200 OK` + film listesi |
| `GET` | `/api/movies/{id}` | Tek film detayi | `200 OK` veya `404 Not Found` |
| `POST` | `/api/movies` | Yeni film ekler | `201 Created` + olusturulan film |
| `PUT` | `/api/movies/{id}` | Film gunceller | `200 OK` + guncellenmis film |
| `DELETE` | `/api/movies/{id}` | Film siler | `204 No Content` (body yok) |

## Test

- Postman, SoapUI veya `MovieLibraryAPI.http` ile endpoint testleri yapilabilir.
- Frontend uzerinden CRUD islemleri dogrudan test edilebilir.
- Repo: [github.com/Boreas44/MovieCatalogAPI](https://github.com/Boreas44/MovieCatalogAPI)

### Postman ile PUT ornegi

- Method: `PUT`
- URL: `https://localhost:7270/api/movies/1`
- Body: `raw` -> `JSON`

```json
{
  "title": "Inception (Guncellendi)",
  "posterUrl": "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6d.jpg",
  "description": "Guncellenmis aciklama",
  "director": "Christopher Nolan",
  "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
  "releaseYear": 2010,
  "genre": "Sci-Fi, Thriller",
  "imdbRating": 8.8
}
```

Beklenen: `200 OK` ve guncellenmis film JSON'u (`Seven` -> `Inception`).

### Postman ile DELETE ornegi

- Method: `DELETE`
- URL: `https://localhost:7270/api/movies/12`
- Body gerekmez.

Beklenen: `204 No Content`. Dogrulama icin `GET /api/movies/12` -> `404 Not Found`.

## Ornek POST Body

```json
{
  "title": "Interstellar",
  "posterUrl": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "description": "Insanligin yasam savasi verdigi bir gelecekte, bir grup astronot yeni bir yuva bulmak icin uzay-zamanin derinliklerine yolculuk eder.",
  "director": "Christopher Nolan",
  "actors": ["Matthew McConaughey", "Anne Hathaway"],
  "releaseYear": 2014,
  "genre": "Sci-Fi",
  "imdbRating": 8.7
}
```

## Notlar

- API in-memory liste kullandigi icin uygulama her yeniden baslatildiginda varsayilan filmler yuklenir.
- `address already in use` hatasinda ilgili portu kullanan process kapatilmalidir.
- Gorsel URL hataliysa UI tarafinda placeholder poster gosterilir.

---

<p align="center">
  <sub>Bu proje egitim / odev amacli hazirlanmistir — BTBS498 Task 4</sub>
</p>

<p align="center">
  <a href="https://res.cloudinary.com/dsnwi9kev/raw/upload/v1780001475/BTBS498_Task4_Rapor_h6gwme.docx">
    <img src="https://img.shields.io/badge/Raporu_indir-BTBS498_Task4-2563eb?style=flat-square&logo=https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg&logoColor=white&labelColor=2b579a" alt="Rapor indir (Word)" />
  </a>
</p>
