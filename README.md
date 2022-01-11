

# Chain JS Playground

This project is intended to:
1. Allow you to play with \ test Chain JS functionality easily. 
2. All you to modify the Chain JS library easily and test your changes 


## Playing with Chain JS

1. clone this project 

```
git clone https://github.com/Open-Rights-Exchange/chain-js-playground.git
```

2. Modify the "src/index.ts"
3. Build and run the project 

```
npm run start
```

## Modify \ Test Chain JS

The below instructions show how we put the chain-js-playground project side by side with chain-js project- every time we run the playground code, it rebuilds chain-js allowing us to quickly test any change made to chain js.

Your folder structure should look as follows (The top level directory name doesn't matter, as long as chain-js and chain-js-playground have the same parent)
<pre>
|- chain-js-root  
  |-- chain-js  
  |-- chain-js-playground   
</pre>

The bellow instructions should create a structure that looks as above

```
mkdir chain-js-root
cd chain-js-root
git clone --branch plugin-breakout git@github.com:Open-Rights-Exchange/chain-js.git
npm --prefix ./chain-js install
git clone git@github.com:Open-Rights-Exchange/chain-js-plugin-eos.git
npm --prefix ./chain-js-plugin-eos install
git clone git@github.com:Open-Rights-Exchange/chain-js-plugin-ethereum.git
npm --prefix ./chain-js-plugin-ethereum install
git clone git@github.com:Open-Rights-Exchange/chain-js-plugin-algorand.git
npm --prefix ./chain-js-plugin-algorand install
git clone git@github.com:Open-Rights-Exchange/chain-js-playground.git
npm --prefix ./chain-js-playground install
cd chain-js-playground
npm run start
```

## Configuration

The following Environment variables are used to provide sensitive information
```
export eos_jungle_fromAccountName=XXX
export eos_jungle_toAccountName=XXX
export eos_jungle_privateKey=XXX

export algorand_testnet_fromAccountName=XXX
export algorand_testnet_toAccountName=XXX
export algorand_testnet_privateKey=XXX
export algorand_testnet_apiKey=https://developer.purestake.io/

export eth_ropsten_fromAccountName=XXX
export eth_ropsten_toAccountName=XXX
export eth_ropsten_privateKey=XXX
```

All other config options can be found in "chain.config.ts" 

## Understanding the development environment

### Linking projects without using npm link \ yarn link  

- When developing a chain-js plugin, you need a way to test your plugin. 
- The chain-js-playground is that environment - it gives you an environment in which you can trigger your plugin, without adding all that debug code to you plugin itself. 

- The playground project needs a way to reference your plugin while you're working on it. A common way to do this is to use "npm link" or "yarn link" - this can have a number or problems which we won't get into here. Insead we provide an alternate method. 

- Typescript provides what are called "Project References". You simply add the following to your tsconfig.json. 

```
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../chain-js-plugin-YOURPLUGIN" }
    ]
}
```

- The TypeScript compiler will now include that folder when compiling. 
- Withing your code, you would like to use your plugin the same way you will when it's published. 

```
import { Plugin as YOURPLUGIN } from '@COMPANY-NAME/chainjs-plugin-YOURPLUGIN'
```

- In order to accomplish this, we'll need to map your NPM package name "@COMPANY-NAME/chain-js-plugin-YOURPLUGIN" to the /src folder within your project.

```
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../chain-js-plugin-YOURPLUGIN" }
    ],
    "paths": {
      "@COMPANY-NAME/chain-js-plugin-YOURPLUGIN": ["../chain-js-plugin-YOURPLUGIN/src"]
    }
}

```

- Now, when you build this project using this tsconfig file, the TypeScript compiler knows that anytime is finds a reference to an NPM package named "@COMPANY-NAME/chain-js-plugin-YOURPLUGIN" .. it'll look in the "../chain-js-plugin-YOURPLUGIN/src" directory. 
- Notice that tht this is a relaive path, so both your playground project and your plugin project need to be contained within the same parent directory. 
- The advantage of this is that you can now simply clone both repo's and build - no need for NPM link etc. 

- Once you have completed development of your plugin you can then publish your NPM package and add the package to your package.json file. 

- If you would like to build your project using the published NPM package \ the one that's in your package.json, you simply build a tsconfig.json that does not have the above reference and path. 
- This allows you build your project either referencing your local development code or the publsihed NPM package once it's published ... all while avoiding NPM link.

### Webpack

- If you're a webpack user or you want to make sure that your plugin will play nice with the webpack environment, you'll be happy to know that we've provided an example webpack.config.js. You simply need to ensure that you add your plugin name and path to it's dist/src folder. 

```
  var local_chainjs_alias = function() {
    if(env.use_local_chainjs_code_NOT_npm == 'true') {
      return {
        "@COMPANY-NAME/chain-js-plugin-YOURPLUGIN": path.resolve(__dirname, "../chain-js-plugin-YOURPLUGIN/dist/src")
       }
    } else {
      return {}
    }
  }();
  ```

- Running "npm run webpack_build_from_local_source" runs the following command and will build a final package using weback. 

```
npx webpack build --env use_local_chainjs_code_NOT_npm=true --config ./webpack.config.js
```
- If you'd like to have webpack build using the published NPM package you can run "npm run webpack_build_from_npm_in_node_modules" this runs the same command but without the "--env use_local_chainjs_code_NOT_npm=true" switch.

```
npx webpack build --config ./webpack.config.js
```

### Debugging \ Stepping into code \ source maps. 

- As you are buiding your plugin, you may find the need to run your test, but step into the code in your plugin. 
- If you're not familiar with Visual Studio debuggin, simply hit F5 and select the "Debug via ts-node" profile. 
- You will need to ensure that you add two lines to the ".vscode/launch.json" within your playground project in order to allow VSCode to find your source maps and function correctly. 

```
        {
            ...
            "name": "Debug via ts-node",
            "outFiles": [
              ...
                "${workspaceRoot}/../chain-js-plugin-YOURPLUGIN/**/*.js",
            ],
            "resolveSourceMapLocations": [
                ...
                "${workspaceRoot}/../chain-js-plugin-YOURPLUGIN/**",
            ],

        }
```

- Note that the webpack config is also configured to generate compatible source map files and can also be stepped through if that is desired. 



## Notes

You can choose to run your code in the playground against the NPM package 

```
# Uses the @open-rights-exchange/chainjs NPM package
npm run start
```

or you can choose to run your code against your modified chain js code by running 

```
# Uses the local chain js code in the chain-js-root\chain-js folder. 
npm run debug 
```

For the best developer experience, it is suggested that you open the playground in VSCode and hit F5, select the "Debug via ts-node" profile. Set breakpoints and away you go. 