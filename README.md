# AdonisJS Laravel Mix

This package wraps [Laravel Mix](https://laravel-mix.com) to make it work seamlessly with AdonisJS.

## Getting started

Install the package using either npm or yarn:

```bash
npm i @mezielabs/laravel-mix
# or
yarn add @mezielabs/laravel-mix
```

Then, set up the package using the `invoke` command:

```bash
node ace invoke @mezielabs/laravel-mix
```

This will install [`laravel-mix`](https://github.com/JeffreyWay/laravel-mix) and [`cross-env`](https://www.npmjs.com/package/cross-env), create a `webpack.mix.js` file in the root of your project, and add some NPM scripts in your `package.json` for building your assets.

Also, the package adds some sample templates (`assets/app.scss` and `assets/app.js`) inside the `resources` directory. So for them to be picked up by the AdonisJS build process, we need to update `metaFiles` inside `.adonisrc.js` as below:

```json
// .adonisrc.json

"metaFiles": [
  ...
  "resources/assets/**/*",
]
```

> The templates are only meant to serve as a starting point. You are free to structure your assets however you like.

## How to use

The `webpack.mix.js` file serves as a configuration layer on top of webpack, and it's the entry point for all asset compilation:

```js
// webpack.mix.js

const mix = require('laravel-mix')

mix
  .setPublicPath('public')
  .js('resources/assets/js/app.js', 'js')
  .sass('resources/assets/sass/app.scss', 'css')
```

When compiled, this will create `css/app.css` and `js/app.js` inside the `public` directory.

To compile your asset, run Laravel Mix:

```bash
npm run mix:dev # start the build
npm run mix:watch # start the build and watch for changes
npm run mix:hot # start the build with hot reload
npm run mix:prod # build for production
```

This package ships with a `mix` helper, which you can use in your Edge templates:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>

  <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
```

The `mix()` helper takes the path of an asset.
