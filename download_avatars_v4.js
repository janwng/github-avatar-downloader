var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "janwng";
var GITHUB_TOKEN = "65bf00c8ec473576306dd40cca18204b39b2b8a1";

//function to download image based on avatar URL
function downloadImageByURL(url, filePath) {
  let req = request.get(url)
    .on('response', function (response) {
      console.log('We are now downloading your image...');
      var fullFilePath;
      if (response.headers['content-type'] === 'image/jpeg') {
        fullFilePath = filePath + '.jpg';
      } else if (response.headers['content-type'] === 'image/png') {
        fullFilePath = filePath + '.png';
      } else {
        fullFilePath = filePath;
      }

      req.pipe(fs.createWriteStream(fullFilePath));
    });
}

function getRepoContributors(repoOwner, repoName, cb) {
  var nameOfOwner = process.argv[2];
  var nameOfRepo = process.argv[3];

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + nameOfOwner + '/' + nameOfRepo + '/contributors';

  var options = {
    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'},
    url: requestURL
  };

  if (nameOfOwner && nameOfRepo) {
    request.get(options, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        var data = JSON.parse(body);
        data.forEach((nameOfOwner) => {
          downloadImageByURL(nameOfOwner.avatar_url, './avatars/' + nameOfOwner.login);
        });
      }
    });
  } else {
    console.log('You must enter a repository owner and name!');
  }
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});