# react-seed

Minimal project starter for React apps

### Features
- ES2015+
- React Router, Redux
- LESS, Autoprefixer
- Webpack, Code splitting, Bundle analyzer

### Installation
```bash
npm install      # Install node modules
```

### Running for development
```bash
npm start        # Start webpack dev server
```

### Building for production
```bash
npm run build    # Prepare app for production (minify bundles, copy assets, etc.)
```

### Recommended project structure
```
.
|--build                          # Ready for production app
|--src
   |--app                         # App root folder
      |--api                      # Common services and utils
      |--components               # Common reusable components
         |--button
            |--index.js
            |--button.jsx
            |--button.less
      |--containers               # Common reusable containers
         |--searchPage
            |--index.js
            |--searchPage.jsx
            |--searchPage.less
      |--root                     # App root component
         |--index.js
         |--root.jsx
         |--root.less
      |--store                    # Redux setup (store, middleware, etc.)
         |--index.js
      |--auth                     # Auth section example
         |--components            # Auth components
         |--containers            # Auth containers
         |--ducks                 # Auth actions, reducers, etc.
         |--index.js               
      |--profile                  # Profile section example
         |--components            # Profile components
         |--containers            # Profile containers
         |--ducks                 # Profile actions, reducers, etc.
         |--index.js
   |--assets                      # Images, fonts, etc.
   |--styles                      # Common styles (variables, mixins, etc.)
```

### Useful stuff
- Style guide - [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Class names utility - [classnames](https://github.com/JedWatson/classnames)
- Dependency injection - [BottleJS](https://github.com/young-steveo/bottlejs)
- Immutability helper - [immutability-helper](https://github.com/kolodny/immutability-helper)
- Query parameters parsing - [query-string](https://github.com/sindresorhus/query-string)
- Redux ducks - [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
- Validation - [validate.js](https://github.com/ansman/validate.js)
- Testing - [Jest](https://github.com/facebook/jest), [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)

### FAQ

#### Bundle analyzer
To enable bundle analyzer uncomment [this line](https://github.com/taras-d/react-seed/blob/master/webpack/dev.config.js#L68) and run `npm start`. Analyzer will be available at `127.0.0.1:8888`.

#### Autoprefixer
To configure autoprefixer use [browserlist](https://github.com/taras-d/react-seed/blob/master/package.json#L46-L50) section in `package.json`. Refer to [github.com/ai/browserslist](https://github.com/ai/browserslist) and [browserl.ist](http://browserl.ist/) for more info.
