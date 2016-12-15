console.log(process.env.DATASTORE_EMULATOR_HOST);

var http = require('http');
var datastore = require('@google-cloud/datastore')({
  projectId: 'lowresourceapps'
});

var blogPostKey = datastore.key('BlogPost');
var blogPostData = {
  title: 'How to make the perfect homemade pasta',
  author: 'Andrew Chilton',
  isDraft: true
};

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  datastore.get(blogPostKey, function(err, entity) {
    console.log(err || entity);
    response.end("test" + entity.title);
  });
});


// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(80);

datastore.save({
  key: blogPostKey,
  data: blogPostData
}).then(function() {
  // The blog post is now published!
});
