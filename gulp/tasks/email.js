// Send test to email
// Possible arguments:
// --file=name

var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var getTimeStr = require('../utils/utils').getTimeStr;
var EmailBuilder = require('email-builder-core');

module.exports = function (gulp, options, $) {
  return gulp.task('email', function (callback) {
    var files = argv.file && fs.existsSync(path.join(options.paths.dest, argv.file)) ?  [argv.file] : fs.readdirSync(options.paths.dest);

    var parms = {
      email    : options.email.user,
      subject  : getTimeStr(options.project),
      transport: {
        type   : 'SMTP',
        options: {
          service: 'gmail',
          auth   : {
            user: options.email.user,
            pass: options.email.pass
          },
        }
      }
    };

    var emailBuilder = new EmailBuilder({emailTest: parms});

    files.forEach(function(file){
      var content = fs.readFileSync(path.join(options.paths.dest, file));
      emailBuilder.sendEmailTest(content).then(function(){
        process.exit();
      });
    });
  });
};

