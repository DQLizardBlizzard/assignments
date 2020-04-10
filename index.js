const requestOptions = {
  headers: {
    //Will have to get your own key
    //Refreshes every hour
    Authorization:
      "Bearer BQDdGqeWnpEn-NEreF04wV_NKCx4fPBy3d0_3PfvHvlwK3egXX3n_-Cl2nzjjGa98nxxlsP0FPaRHZ1xbih7NiMUO1UV9_paD_VRmR2uG0bvF5emAMJQB9F32kRnf5OUDjXVs20S30UXQ9EIfsbh76Fa1ix8d6vOG7CS6W_MmMrA1efvtR5zpm1--Mg2Kz8Vv9n5Gw_BJqDkjzdLLyPTKyR4TsTw4eR1szJe9w2HJpaDveYzXcH2QWf339vRV5LkOOodteMwqvdV"
  }
};

//.../{playlist_id}/tracks fetches information on a playlist's tracks
//instead of the entire playlist object
fetch(
  "https://api.spotify.com/v1/playlists/6UV10SjneRX3Jex3g4pEd9/tracks",
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
  
  let albumImg = new Image()
  albumImg.src = album.images[0].url

  let artistNameHeader = document.createElement('h2')
  let albumNameHeader = document.createElement('h2')
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
