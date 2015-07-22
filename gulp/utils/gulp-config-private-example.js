// Rename this file to `gulp-config-private.js`.
// Options here override `gulp-config.js`.
var options = {};

// Directory name on s3.
// Possible values: exante, xcfd, insider.
// Add the new one if needed.
options.directory = 'exante';

// Project name. Used as a title on litmus tests and as test email subject.
options.project = 'Test';

options.litmus = {
  username: 'name@mail.com',
  password: '***',
  url: 'https://organization.litmus.com',
};

options.s3 = {
  key         : '***',
  secret      : '***',
  bucket      : 'bucket_name',
  distribution: '***',
};

// Your account on gmail.com.
// Used as SMTP service as well.
options.email = {
  user: 'name@gmail.com',
  pass: '***',
};

module.exports = options;