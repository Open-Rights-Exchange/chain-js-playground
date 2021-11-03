

# Chain JS Playground

This project is intended to:
1. Allow you to play with \ test Chain JS functionality easily. 
2. All you to modify the Chain JS library easily and test your changes 


## Playing with Chain JS

<!--#
NOUN=mother
ATTRIBUTION=Mark Wahlberg
$-->

"Say hi to your {{ NOUN }} for me," {{ ATTRIBUTION }}

1. clone this project 

```
git clone git@github.com-codeoflight:CodeOfLight/chain-js-playground.git
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
git clone https://github.com/Open-Rights-Exchange/chain-js.git
npm --prefix ./chain-js install
git clone git@github.com-codeoflight:CodeOfLight/chain-js-playground.git
npm --prefix ./chain-js-playground install
cd chain-js-playground
npm run debug
```

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