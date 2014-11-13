var path = require('path'),
    gm = require('gm'),
    PNG = require('pngjs').PNG,
    request = require('request');

var url = "";
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var chunk = process.stdin.read()
  if (chunk){
    url = url + chunk;
  }
});

var pixels = (" .,:;i1tfLCG08@").split("")

var ratio = 100 / 40
var width = 110
var height = Math.round(width / ratio)

process.stdin.on('end', function() {
  var reqStream = request.get({
    "uri": url,
    "encoding": null,
    "strictSSL": false,
    "timeout": 5000,
    "pool.maxSockets": 1
  }, function(err, res, body) {
    gm(body)
    .setFormat("png")
    .resize(width, height, "!")
    .type("Grayscale")
    .stream(function (err, stdout, stderr) {
      stdout
      .pipe(new PNG({ filterType: 4 }))
      .on("parsed", function () {
        var png = this;
        var converted = "";
        for (var y = 0; y < png.height; y++) {
          for (var x = 0; x < png.width; x++) {
            var idx = (png.width * y + x) << 2;
            var color = png.data[idx] / 256;
            var value = pixels.length - 1 - Math.floor(color * 14);

            process.stdout.write(pixels[value])
          }
          process.stdout.write("\n")
        }
        process.exit(0)
      })
    });
  })


});
