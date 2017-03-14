var request = require('request');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "janwng";
var GITHUB_TOKEN = "65bf00c8ec473576306dd40cca18204b39b2b8a1";



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'},
    url: requestURL
  };



  request.get(options, (err, response, body) => {
    let data = JSON.parse(body);
    var avatarUrl = getAvatarUrl(data);
  });

  request.get(options, (err, response, body) => {
    let data = JSON.parse(body);
    data.forEach((person) => {
    var avatarUrl = person.avatar_url;

    request.get(avatarUrl)
      .pipe(fs.createWriteStream('./avatar.jpg'));
    });
  // .pipe(fs.createWriteStream('./avatars'));
})
  // });

  // request.get(requestURL[0].avatar_url)
  //   .pipe(fs.createWriteStream('./avatars.jpg'));


  }



function getAvatarUrl(data) {
  data.forEach((person) => {
    // console.log(person.avatar_url);
  })
}

// function downloadImageByURL(url, filePath) {
//    request.pipe(fs.createWriteStream('./avatars'));

// }



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});