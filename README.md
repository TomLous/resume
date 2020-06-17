Tom Lous's Resume

# Install 

```
brew install node@10
brew unlink node
brew link --force --overwrite node@10
npm install --global gulp-cli
```

maybe remove old modules  ``

#### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp dev` browserSync opens the project in your default browser and live reloads when changes are made
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp copy` copies dependencies from node_modules to the vendor directory

