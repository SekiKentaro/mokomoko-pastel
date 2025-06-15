// deploy.js
const ghpages = require('gh-pages');

ghpages.publish('dist', {
  dotfiles: true
}, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Deploy complete!');
  }
});