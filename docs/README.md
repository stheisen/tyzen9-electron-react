# Project Structure
```
tyzen9-electron-react/
    build/                      -- Webpack's output directory
    dist/                       -- Electron-Builder working directory
    docs/                       -- Project documentation
    node_modules/               -- NODE required modules
    resources/                  -- Static content (images/fonts)
    app/                    
      electron/                 -- Electron launcher, environment, and logging configuration
      src/                      -- React entry point [index.js] and React compoments (JavaScript EMS)
      index.html                -- Browser entry point
    .eslintrc.json              -- ESLint configuration
    .bablerc                    -- Bable configuration
    .gitignore
    electron-builder.json       -- Electron builder config for Windows and MAC
    electron-builder.linux.json -- Electron builder config for Linux (handles packaged icons differently)
    package.json
    webpack.config.js           -- Common Webpack config imported by other configurations
    webpack.dev.js              -- Development build
    webpack.prod.js             -- Production (packaged) build

```

# Project Dependencies
## Packaged Dependencies
- `dotenv`:  loads environment variables from a .env file into process.env.
- `react`: the actual react package that enables to use of react in our project.
- `react-dom`: serves as the entry point to the DOM and server renderers for React. 
- `winston`: popular logging library for Node.js.
- `winston-daily-rotate-file`: A transport for winston which logs to a rotating file.

## Development Dependencies
- `@babel/core`: the core/main Babel project.
- `babel-loader`: Used to connect Babel and Webpack together.
- `@babel/cli`: This package allows us to use Babel from the command line.
- `@babel/preset-env`: this is a preset (collection) of different babel packages that are needed to convert all ES6 JavaScript syntax into older JavaScript versions. 
- `@babel/preset-react`: This is also preset that contains babel packages needed to convert React JSX syntax into the version of JavaScript supported by older browsers.
- `concurrently`: Run multiple commands concurrently. We’ll use it to run both the Electron process and the React app in watch mode.
- `copy-webpack-plugin`: Copies individual files or entire directories, which already exist, to the build directory.
- `cross-env`: Run scripts that set and use environment variables across different platforms. We’ll use it to make our scripts compatible with both Unix and Windows OSes.
- `electron`: The core framework for creating the desktop app.
- `electron-builder`: A complete solution to package and build a ready for distribution Electron app for macOS, Windows, and Linux.
- `electronmon`: Monitors Electron for changes during development for hit reloads.
- `eslint*`: The packages for a popular JavaScript linter.
- `html-webpack-plugin`: Used to map index.html to the created and uniquely named webpack bundle.
- `wait-on`: Utility to wait for files, ports, sockets, etc. We’ll use it to wait for the React app to be built before we open the Electron app (while developing).
- `webpack*`: The packages that enables us to use webpack in the project.

## Check for Dependency Updates
1. Install globally [npm-check-updates](https://bit.ly/416uKTB)
```
:~$ npm i -g npm-check-updates
```
2. Move to the root level of the project and usen the `ncu` command to display available major (red), minor (cyan), and patch(green) updates.
```
:~/project-dir$ ncu
```

# References/Inspirations
- [How to create a React app without using create-react-app](https://bit.ly/3I1LAKV) - Ivad Yves HABIMANA
- [Create React App without Create React App](https://bit.ly/3Eb2e9N) - Kannan Nagasamy
- [Building a desktop app with Electron and Create React App](https://bit.ly/3YkAyY1) - Mazzarolo Matteo
- [A Complete Guide to Winston Logging in Node.js](https://bit.ly/414hijj) - Better Stack Team
- [secure-electron-template](https://bit.ly/3YV94s4) - reZach
- [Loading Multiple .env Files for Different Environments in NodeJS](https://bit.ly/3IyynKN) - Bradley Kofi
- [Set up ESLint, Prettier and Husky in a React project](https://bit.ly/3lF2qHO) - Ivad Yves HABIMANA
- [Understanding globstars (**/*)](https://bit.ly/3ICrB6N) - stackoverflow
