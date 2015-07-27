// Send test to litmus.com
// Possible arguments:
// --clients=group
// --file=name

var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var getTimeStr = require('../utils/utils').getTimeStr;
var EmailBuilder = require('email-builder-core');

module.exports = function (gulp, options, $) {
  return gulp.task('litmus', function (callback) {
    var clients = argv.clients && options.clients[argv.clients] ? argv.clients : 'all';
    var files = argv.file && fs.existsSync(path.join(options.paths.dest, argv.file)) ?  [argv.file] : fs.readdirSync(options.paths.dest);
    
    var parms = {
      subject : getTimeStr(options.project),
      username : options.litmus.username,
      password : options.litmus.password,
      url : options.litmus.url,
      applications : options.clients[clients]
    };

    var emailBuilder = new EmailBuilder({litmus: parms});

    files.forEach(function(file){
      var content = fs.readFileSync(path.join(options.paths.dest, file));
      emailBuilder.sendLitmusTest(content).then(function(){
        process.exit();
      });
    });
  });
};

