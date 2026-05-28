# MovieCatalogAPI

MovieCatalogAPI, ASP.NET Core Web API + React (Vite + Tailwind) ile gelistirilmis full-stack bir film katalog projesidir.

Bu proje, BTBS498 dersi kapsaminda RESTful servis yapisini, model-service-controller mimarisini ve API test surecini uygulamali gostermek icin hazirlanmistir.

## Ozellikler

- Film listeleme, detay, ekleme, guncelleme, silme (CRUD)
- Poster URL ve aciklama alani
- iOS hissi veren modern arayuz tasarimi
- Varsayilan film listesi (12 adet baslangic filmi)

## Teknolojiler

- Backend: ASP.NET Core (`net10.0`)
- Frontend: React + Vite
- Stil: Tailwind CSS

## Proje Yapisi

- `MovieLibraryAPI/` -> Web API projesi
- `MovieLibraryUI/` -> Frontend projesi

## Ekran Goruntuleri

> Bu bolume proje ekran goruntulerini ekleyebilirsin.
>
> Ornek:
> - `docs/home.png`
> - `docs/detail.png`
>
> Markdown ile gosterim:
>
> `![Home](docs/home.png)`

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

API adresleri:
- `https://localhost:7270` (onerilen)
- `http://localhost:5063`

### Frontend'i calistir

```bash
cd MovieLibraryUI
npm run dev
```

UI adresi:
- `http://localhost:5173`

## API Endpointleri

Base URL: `https://localhost:7270/api/movies`

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
- Repo: [https://github.com/Boreas44/MovieCatalogAPI](https://github.com/Boreas44/MovieCatalogAPI)

### Postman ile PUT ornegi

- Method: `PUT`
- URL: `https://localhost:7270/api/movies/1`
- Body: `raw` -> `JSON`

```json
{
  "title": "Seven (Guncellendi)",
  "posterUrl": "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
  "description": "Guncellenmis aciklama",
  "director": "David Fincher",
  "actors": ["Brad Pitt", "Morgan Freeman"],
  "releaseYear": 1995,
  "genre": "Crime, Thriller",
  "imdbRating": 8.6
}
```

Beklenen: `200 OK` ve guncellenmis film JSON'u.

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

## Lisans

Bu proje egitim/odev amacli hazirlanmistir.
