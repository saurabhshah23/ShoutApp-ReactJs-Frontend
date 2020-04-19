This is the React JS frontend project.
This is from a tutorial via classed on youtube for creating a clone of Twitter app.

Ref to the tutorial:
https://www.youtube.com/watch?v=m_u6P5k0vP0&t=1823s

videos from 13 to last consist of react js class components development from scratch.
Although, this codebase is developed using React Hooks instead of classes.

### Tech stack includes:

"react", "react-scripts", "react-dom" - (Default) React JS
"react-router-dom" - router
"redux", "react-redux", "redux-thunk" - Redux and Thunk for central store/state
"axios" - API calls
"@material-ui/core", "@material-ui/icons" - MUI - Material ui core and icons
"dayjs" - date formating (light-weight alternative to momentJs)
"jwt-decode" - jwt token decoding

### STEPS to setup after clone:

1. goto terminal/cmd till project folder.
2. run "npm i" to install dependencies before locally serving the fb functions.
3. npm start

### Directory structure:

- public/ (all static files)
  - index.html
  - manifest.json
  - shout.png (favicon / app logo)
- src/
  - components/ (all functional level components used inside pages)
  - pages/ (all page level container components)
  - images/ (all static images)
  - redux/ (all redux stuff inside)
    - actions (all actions inside)
    - reducers (all reducers inside)
    - store.js (store create and definition)
    - types.js (all constants definition)
  - util/ (common util components like auth, button, etc )
- App.css
- App.js
- intex.js
- .gitignore
- package.json
- README.md

===========================================================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
