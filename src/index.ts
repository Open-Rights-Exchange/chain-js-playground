import { ChainFactory, Chain, Models, ChainType } from '@open-rights-exchange/chainjs'


var jungleEndpoints : Models.ChainEndpoint[] = [{url : "https://jungle3.cryptolions.io:443"}];
var chainSettings: any = {};

 /** Using chain-specifc features - ex. eosjs */
 const chain = new ChainFactory().create(ChainType.EosV2, jungleEndpoints, chainSettings)


let message: string = 'Hello, World!';
console.log(message);

async function runTxn() {

    try {

        console.log(chain.isConnected);
        await chain.connect()

        var sendTokenTx = await chain.new.Transaction()
        await chain.composeAction(Models.ChainActionType.TokenTransfer, {
            to: 'codeoflight2',
            contractAddress: 'eosio.token', 
            amount: '0.0001'
         });    
        //sendTokenTx.actions = [action]
    
        console.log(chain.isConnected);

    } catch(error) {
        console.log("There was an error: " + error);
    }

}

runTxn()





// (Typescript) cast generic chain to EOS chain object
//const eosChain = (myChain as ChainEosV2) // EOSIO node version 2.x
//eosChain.eosjs.api.transact();
 // xhr2-cookies requires polyfills
 