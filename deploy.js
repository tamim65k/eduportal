const ghpages = require('gh-pages');
const path = require('path');

const options = {
  dotfiles: false,
  branch: 'gh-pages',
  repo: 'https://github.com/tamim65k/eduportal.git',
  message: 'Deploy to GitHub Pages',
  user: {
    name: 'GitHub Actions',
    email: 'actions@github.com'
  },
  // This helps with Windows long path issues
  git: 'git',
  // This helps with large files
  max_attempts: 3,
  // This helps with Windows path issues
  dest: 'build',
  // This helps with Windows path length issues
  // by using the 8.3 short name format
  dotfiles: true
};

console.log('Starting deployment...');

ghpages.publish('build', options, function(err) {
  if (err) {
    console.error('Deployment error:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
    console.log('Your site should be live at: https://tamim65k.github.io/eduportal');
  }
});
