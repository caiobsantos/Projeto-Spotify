const searchInput = document.getElementById('search-input');
const mainHeader = document.getElementById('main__header');
const mainPlaylistCards = document.getElementById('main__cards');
const resultArtists = document.getElementById('result-artist');

function getArtists (searchParam) {
    const url = `http://localhost:3000/artists?name_like=${searchParam}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    mainHeader.classList.add('hidden');
    mainPlaylistCards.classList.add('hidden');

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtists.classList.remove('hidden');
}

searchInput.style.color = 'red'

document.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue === '') {
        resultArtists.classList.add('hidden');
        mainHeader.classList.remove('hidden');
        mainPlaylistCards.classList.remove('hidden');

        return;
    }

    getArtists(searchValue);
})