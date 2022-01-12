import {validateSettings} from './helpers'
import { Models } from '@open-rights-exchange/chain-js'

let chainId = "algorand", networkId = "testnet"
// let chainId = "eos", networkId = "jungle"
// let chainId = "eth", networkId = "ropsten"

//Validate that all the env variables we're expecting exist, before importing our config object. Missing variables can cause confusing errors. 
validateSettings(chainId, networkId);

import config from './chain.config'
var configObj = config[chainId][networkId]

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

;(async () => {
    if(chain) {
        await runTxn()
        process.exit()
    }
})()