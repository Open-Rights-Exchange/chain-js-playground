import { ChainFactory, Chain, Models, ChainType } from '@open-rights-exchange/chainjs'

var kylinEndpoints : Models.ChainEndpoint[] = [{url : "https://go.com"}];
var chainSettings: any = {};

let message: string = 'Hello, World!';
console.log(message);



 /** Using chain-specifc features - ex. eosjs */
const myChain = new ChainFactory().create(ChainType.EosV2, kylinEndpoints, chainSettings)
var description = myChain.description
console.log(description);

var connected = myChain.isConnected;
console.log(connected);

// (Typescript) cast generic chain to EOS chain object
//const eosChain = (myChain as ChainEosV2) // EOSIO node version 2.x
//eosChain.eosjs.api.transact();
 // xhr2-cookies requires polyfills
 