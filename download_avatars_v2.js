var request = require('request');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "janwng";
var GITHUB_TOKEN = "65bf00c8ec473576306dd40cca18204b39b2b8a1";

const year = process.argv[2];



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'},
    url: requestURL
  };

  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {

    var data = JSON.parse(body);
    data.forEach((person) => {
      console.log(person.login);
      // getAvatarUrl(data);
      // downloadImageByURL(person.avatar_url, './downloads/' + person.login);
      downloadImageByURL(person.avatar_url, './downloads/' + person.login);

    });
    }
  });

}

function getAvatarUrl(data) {
  data.forEach((person) => {
    console.log(person.avatar_url);
  })
}

function downloadImageByURL(url, filePath) {
   let req = request.get(url)
     .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('Response Message: ', response.statusMessage);
      console.log('Response Content Type: ', response.headers['content-type']);
      if (response.headers['content-type'] === 'image/jpeg') {
        filePath += '.jpg';
      } else if (response.headers['content-type'] === 'image/png') {
        filePath += '.png';
      }

      //cant use filepath until its been set to the correct value
      //which is after the request is completed and response is done
      //so you can either make the request again (which is weird)
      //so it can get the NEW value of file path with the extension
      //or you can set the original request function to a variable
      //and pipe that NEW filePath so you can add on the file extensions
      req.pipe(fs.createWriteStream(filePath));
    });

}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});