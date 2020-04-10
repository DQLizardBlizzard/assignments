const requestOptions = {
  headers: {
    //Will have to get your own key
    //Refreshes every hour
    Authorization:
      "Bearer BQCMzf5_QXU1osfGSpCB9f7oBFrHDqL9bVPpTutY4BBZgpwXgLcrurc3h7AkZzEFLhpfr_U3KgT7c7hcTcLJSzqEj7Rvcs8uyXmTUCzVE2ik8h0Pa4Is69vg649S89qQXAjt2v6gFznTM32KSlZvDaeLKbObfp682c4N_4pWb_8LYF3Aso1w7hC7Bp7SJthwVQzvVnsXQFs7IX1JC5WYFQ4peNARbg7zpRMd0r4ajewkfGh2-QL1e3N--E8AYdjz7ijLD3kAZcyGT8Dvsyo64PSPt1w"
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

    topSongs.forEach(song => {
        let albumPic = new Image();
        albumPic.src = song.track.album.images[1].url;
        document.body.appendChild(albumPic);
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
  })
