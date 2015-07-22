var options = {};
var fs = require('fs');

// Root directory for assets.
options.basedir = 'static/';

// Browser sync options (http://www.browsersync.io/docs/options/).
options.browserSync = {
    server: {
        baseDir: "./",
        routes: {
            "/"   : "dest/",
            "/i"  : options.basedir + "i",
        }
    },

    logLevel: "silent",
    notify  : false
};

// List of styles to apply rtl-postprocessor.
options.rtlize = ['*-ar.css'];

// Create rtl copy compiled from this sources, -rtl suffix will be added.
options.rtlcopy = [];

// Directories names.
options.dirs = {
    css    : 'css/',
    html   : 'templates/',
    img    : 'i-dest/',
    imgsrc : 'i-src/',
    scss   : 'scss/',
    dest   : 'dest/',
};


// Path relative to gulpfile.js, to store...
// paths.css        - compiled and processed CSS.
// paths.html       - HTML files.
// paths.img        - optomized image files.
// paths.imgsrc     - not optimized source image files.
// paths.scss       - SCSS sources.
options.paths = {
    css       : options.basedir + options.dirs.css,
    html      : options.basedir + options.dirs.html,
    img       : options.basedir + options.dirs.img,
    imgsrc    : options.basedir + options.dirs.imgsrc,
    scss      : options.basedir + options.dirs.scss,
    dest      : options.dirs.dest,
};

// A single glob or array of globs that indicate which files to watch for
// changes.
// Used for `gulp watch`.
// `options.files.img` used in images proccessing task.
options.files = {
    css    : [options.paths.css + '**/*.css'],
    html   : [options.paths.html + '*.html'],
    img    : [options.paths.imgsrc + '**/*.+(png|jpg|gif)'],
    scss   : [options.paths.scss + '**/*.scss'],
};

options.clients = {
  all     : ['appmail6', 'ipad', 'gmailnew', 'chromegmailnew', 'ffgmailnew', 'ffyahoo', 'yahoo', 'chromeyahoo', 'ol2000', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2013', 'outlookcom', 'android22', 'android4', 'androidgmailapp', 'iphone5s', 'iphone4', 'ipadmini'],
  ol      : ['ol2000', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2013'],
  ol_good : ['ol2000', 'ol2002', 'ol2003'],
  ol_bad  : ['ol2007', 'ol2010', 'ol2013'],
  ol_short: ['ol2003', 'ol2013'],
  web     : ['gmailnew', 'chromegmailnew', 'ffgmailnew', 'outlookcom', 'ffyahoo', 'yahoo', 'chromeyahoo'],
  mobile  : ['android22', 'android4', 'androidgmailapp', 'iphone5s', 'iphone4', 'ipadmini']
};

// Array of array of strings to replace in the final html
options.replace = [
    ['mc:hideable=""', 'mc:hideable'],
    ['mc:repeatable=""', 'mc:repeatable'],
    [':not(.skip)', ''],
    // Replace curve brackets to avoid removing by swig, used by gulp-html-i18n
    ['${', '${{'],
    ['}$', '}}$'],
];

module.exports = options;