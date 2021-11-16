import config from './chain.config'
import { Models } from '@open-rights-exchange/chainjs'


// var configObj = config.eth.ropsten
var configObj = config.eos.jungle

var chainType = configObj.chainType;
var endpoints : Models.ChainEndpoint[] = configObj.endpoints
var chainSettings: any = configObj.chainSettings
var fromAccountName = configObj.fromAccountName
var toAccountName = configObj.toAccountName
var symbol = configObj.symbol
var permission = configObj.permission
var privateKeys = configObj.privateKeys
var transferAmount = configObj.transferAmount
var precision = configObj.precision

/*
-- To us the current chain-js design (without plugins), uncomment the below 
-- Note that HelpersEos is loaded from chain-js - this needs to be loaded from the plugin when using the plugin model.
*/
// import { ChainFactory } from '@open-rights-exchange/chainjs'
// var chain  = new ChainFactory().create(chainType,endpoints, chainSettings);


/*
-- The new plugin model implements a PluginChainFactory which should be used insted of ChainFactory
-- Uncomment the below two lines to use the plugin model
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
 import { PluginChainFactory } from '@open-rights-exchange/chainjs'
 import { Plugin as EOSPlugin} from '@open-rights-exchange/chainjs-plugin-eos'
 var chain = PluginChainFactory([EOSPlugin], chainType,endpoints, chainSettings);

async function runTxn() {

    try {

        console.log(chain.isConnected);
        await chain.connect()

        var sendTokenTx = await chain.new.Transaction()
        var action = await chain.composeAction(Models.ChainActionType.ValueTransfer,
            {            
               fromAccountName : fromAccountName,
               toAccountName: toAccountName,
               amount: transferAmount,
               symbol: symbol,
               memo: 'Test',
               permission: permission,
               precision: precision               
             });
             
        sendTokenTx.actions = [action];
        
        await sendTokenTx.prepareToBeSigned()
        await sendTokenTx.validate()
        await sendTokenTx.sign(privateKeys);

        var result :  Models.TransactionResult =  await sendTokenTx.send();

        console.log('transactionId:', result.transactionId)
        console.log('hasAllRequiredSignatures:', sendTokenTx.hasAllRequiredSignatures)
        console.log('actions:', JSON.stringify(sendTokenTx.actions))
        console.log('header:', sendTokenTx.header)
        console.log('signatures:', sendTokenTx.signatures)

    } catch(error) {
        console.log("There was an error: " + error);
    }

}

if(chain) {
    runTxn()
}
    





// (Typescript) cast generic chain to EOS chain object
//const eosChain = (myChain as ChainEosV2) // EOSIO node version 2.x
//eosChain.eosjs.api.transact();
 // xhr2-cookies requires polyfills
 