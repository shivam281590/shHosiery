const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'storage', 'public');
const symlinkDir = path.join(__dirname, 'public', 'storage');

fs.symlink(targetDir, symlinkDir, 'dir', (err) => {
    if (err) {
        console.error('Error creating symlink:', err);
    } else {
        console.log('Symlink created:', symlinkDir);
    }
});
