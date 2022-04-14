import {validateSettings} from './helpers'
import { Models } from '@open-rights-exchange/chain-js'


// let chainId = "algorand", networkId = "testnet", doMSIG = false
// let chainId = "eos", networkId = "jungle", doMSIG = false
let chainId = "eos", networkId = "kylin", doMSIG = false
// let chainId = "eth", networkId = "ropsten", doMSIG = false

//Validate that all the env variables we're expecting exist, before importing our config object. Missing variables can cause confusing errors. 
validateSettings(chainId, networkId, doMSIG);

import config from './chain.config'
var configObj = config[chainId][networkId]

var chainType = configObj.chainType;
var endpoints : Models.ChainEndpoint[] = configObj.endpoints
var chainSettings: any = configObj.chainSettings
var fromAccountName = configObj.fromAccountName
var fromAccountName_MSIG = configObj.fromAccountName_MSIG
var toAccountName = configObj.toAccountName
var symbol = configObj.symbol
var permission = configObj.permission
var privateKey_singleSign = configObj.privateKey_singleSign
var privateKeys_MSIG = configObj.privateKeys_MSIG
var transferAmount = configObj.transferAmount
var precision = configObj.precision


// If we're doing an MSIG transaction then use the the keys defined in config.privateKeys_MSIG 
// The from account also gets replaced with config.fromAccountName_MSIG as we need to test using an account that has a MSIG setup on it. 
var signing_keys : string[] = [privateKey_singleSign]
if(doMSIG) {
    signing_keys = privateKeys_MSIG,
    fromAccountName = fromAccountName_MSIG
}


console.log("sign with the following keys: " + signing_keys)

/*
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
import { PluginChainFactory } from '@open-rights-exchange/chain-js'
import { Plugin as EOSPlugin} from '@open-rights-exchange/chain-js-plugin-eos'
import { Plugin as EthereumPlugin} from '@open-rights-exchange/chain-js-plugin-ethereum'
import { Plugin as AlorandPlugin} from '@open-rights-exchange/chain-js-plugin-algorand'
var chain = PluginChainFactory([EOSPlugin, EthereumPlugin, AlorandPlugin], chainType, endpoints, chainSettings);

async function runTxn() {

    try {
        console.log(chain.isConnected);
        await chain.connect()

        var sendTokenTx = await chain.new.Transaction()
        var action = await chain.composeAction(Models.ChainActionType.ValueTransfer,
        {
            fromAccountName,
            toAccountName,
            amount: transferAmount,
            symbol,
            memo: 'Test',
            permission,
            precision
        });

        sendTokenTx.actions = [action];
        
        await sendTokenTx.prepareToBeSigned()
        await sendTokenTx.validate()
        await sendTokenTx.sign(signing_keys);

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

;(async () => {
    if(chain) {
        await runTxn()
        process.exit()
    }
})()