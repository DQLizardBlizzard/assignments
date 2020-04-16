const requestOptions = {
  headers: {
    //Will have to get your own key
    //Refreshes every hour
    Authorization:
      "Bearer BQBB_bmz3G7haycTXp_S0A6I-Z6jU1iik-YyayvnI8tvDeS5b8m50v4M2zkD2cWb5qVCh3pAG3L32qVMVnozywPTw-eJ3dil87-iN_4mIz_-cg-roQ4ak-oLfjKx35UcJTU6lzN4YKL_HLxQ9XMnq2DbQlu57mXY-vjRMeTLZIJODVvRv9OapYsLwuQgY252kntowDS3gCH6n9pgjvVaczlgMqhhVkvUdwhcXbVmJLelvA4lZ_6D7Iej-KVZSOnWRJ65xPYJQVTwSvIDdp8WMrF0a2I"
  }
};

//.../{playlist_id}/tracks fetches information on a playlist's tracks
//instead of the entire playlist object
fetch(
  "https://api.spotify.com/v1/playlists/37i9dQZF1EtqQ6KTQvvHJo/tracks",
  requestOptions
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    const trackSort = data.items.sort(function(element1, element2) {
      if (element1.track.popularity > element2.track.popularity) {
        return 1;
      } else {
        return -1;
      }
    });

    const topSongs = trackSort.slice(trackSort.length - 3);

    //Test to see if slice function worked
    topSongs.forEach(element => {
      console.log(element.track.name, element.track.popularity);
    });

    return Promise.all(topSongs.map(song => {
        return fetch(song.track.album.href, requestOptions)
    }))

  })
  .then(responses => {
      return Promise.all(responses.map(response => {
          return response.json();
      }))
  })
  .then(albums => {
      console.log(albums)
      albums.forEach(album => {
        createAlbumContainer(album)
      })

  })

function createAlbumContainer(album) {

  // <div class="album">
  //   <img src="albumimgurl.com" alt="">
  //   <h2>Name of the artist</h2>
  //   <h2>Name of the album</h2>
  //   <ol class="tracklist">
  //       <li class="track"></li>
  //       <li class="track"></li>
  //       <li class="track"></li>
  //       <li class="track"></li>
  //   </ol>
  // </div>

  console.log(album.href)
  let albumContainer = document.createElement('div')
  albumContainer.className = "albumContainer"
  let albumImg = new Image()
  albumImg.src = album.images[0].url

  let artistNameHeader = document.createElement('h1')
  artistNameHeader.innerHTML = album.artists[0].name
  let albumNameHeader = document.createElement('h2')
  albumNameHeader.innerHTML = album.name
  let tracklist = document.createElement('ol')
  
  album.tracks.items.forEach(track => {
    let trackLi = document.createElement('li') 
    trackLi.innerHTML = track.name
    tracklist.appendChild(trackLi)
  })

  albumContainer.appendChild(albumImg)
  albumContainer.appendChild(artistNameHeader)
  albumContainer.appendChild(albumNameHeader)
  albumContainer.appendChild(tracklist)

  document.querySelector("#albums").appendChild(albumContainer)
}
