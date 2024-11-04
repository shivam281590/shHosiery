let mix = require('laravel-mix');

// Basic JavaScript and CSS compilation
// mix.js('views/js/app.js', 'public/js')
//    .sass('views/sass/app.scss', 'public/css');

// If using Vue
mix.setPublicPath('public');
mix.js('views/js/app.js', 'public/js').vue().postCss('views/css/app.css','public/css',[
        require('postcss-import'),
        // require('tailwindcss'),
        require('autoprefixer')
    ]
);

// Optionally, enable versioning for cache busting
if (mix.inProduction()) {
    mix.version();
}
