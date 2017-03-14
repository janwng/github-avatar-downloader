var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "janwng";
var GITHUB_TOKEN = "65bf00c8ec473576306dd40cca18204b39b2b8a1";

function getRepoContributors(repoOwner, repoName, cb) {
  var repoOwner = process.argv[2];
  var repoName = process.argv[3];

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'},
    url: requestURL
  };

  if (repoOwner && repoName) {
    request.get(options, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        var data = JSON.parse(body);
        data.forEach((repoOwner) => {
          downloadImageByURL(repoOwner.avatar_url, './downloads/' + repoOwner.login);
        });
      }
    });
  } else {
    console.log('You must enter a repository owner and name!');
  }
}

//function to download image based on avatar URL
function downloadImageByURL(url, filePath) {
   let req = request.get(url)
     .on('response', function (response) {
      console.log('We are now downloading your image...');
      if (response.headers['content-type'] === 'image/jpeg') {
        filePath += '.jpg';
      } else if (response.headers['content-type'] === 'image/png') {
        filePath += '.png';
      }

      req.pipe(fs.createWriteStream(filePath));
    });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});