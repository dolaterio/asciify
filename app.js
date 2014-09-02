var path = require('path'),
    gm = require('gm'),
    PNG = require('pngjs').PNG,
    request = require('request');

var url = process.argv[2];

if(!url){
  console.error("Usage: node resizer.js WIDTH HEIGHT URL DESTINATION")
  process.exit(1)
}

var reqStream = request.get({
  "uri": url,
  "encoding": null,
  "strictSSL": false,
  "timeout": 5000,
  "pool.maxSockets": 10
})

var pixels = (" .,:;i1tfLCG08@").split("")

gm(reqStream)
.setFormat("png")
.resize(170, 70, "!")
.type("Grayscale")
.stream(function (err, stdout) {
  var stream = stdout.pipe(new PNG({ filterType: 4 }))
  stream.on("parsed", function () {
    var png = this;
    var converted = "";
    for (var y = 0; y < png.height; y++) {
      for (var x = 0; x < png.width; x++) {
        var idx = (png.width * y + x) << 2,
            color = png.data[idx],
            value = 14 - Math.floor(color / 18)

        process.stdout.write(pixels[value])
      }
      process.stdout.write("\n")
    }
    process.exit(0)
  })
});
