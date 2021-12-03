

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
git clone --branch plugin-breakout git@github.com-codeoflight:Open-Rights-Exchange/chain-js.git
npm --prefix ./chain-js install
git clone git@github.com-codeoflight:Open-Rights-Exchange/chain-js-plugin-eos.git
npm --prefix ./chain-js-plugin-eos install
git clone git@github.com-codeoflight:Open-Rights-Exchange/chain-js-plugin-ethereum.git
npm --prefix ./chain-js-plugin-ethereum install
git clone git@github.com-codeoflight:Open-Rights-Exchange/chain-js-plugin-algorand.git
npm --prefix ./chain-js-plugin-algorand install
git clone  --branch plugin-breakout git@github.com-codeoflight:Open-Rights-Exchange/chain-js-playground.git
npm --prefix ./chain-js-playground install
cd chain-js-playground
npm run debug
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