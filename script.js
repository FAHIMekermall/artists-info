const elementById = (id) => document.getElementById(id);

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  keyword.value = ``;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  albumContainer.innerHTML = ``;
  artistContainer.textContent = ``;
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist.strArtistThumb
            ? artist.strArtistThumb
            : "https://sprucesounds.com/wp-content/themes/sprucesounds/assets/img/artist-placeholder.jpg"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "not available"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "not available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "not available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const albumContainer = elementById("albums");
  albumContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const album = data?.album;
  const albumContainer = elementById("albums");
  album.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
              item.strAlbumThumb
                ? item.strAlbumThumb
                : "https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png"
            }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum ? item.strAlbum : "not available"}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};

const input = elementById('keyword')
input.addEventListener('keypress',function(e){
  if(e.keyCode === 13){
    handleSearch()
  }
})