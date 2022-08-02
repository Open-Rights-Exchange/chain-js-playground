import { validateSettings } from './helpers'
import { Models, Helpers, Errors } from '@open-rights-exchange/chain-js'
import { ETHTxnTypes, EOSTxnTypes, AlgorandTxnTypes, IOptionBag, TransactionBuilderResponse} from './models'
import { EthereumTransactionBuilder } from './Ethereum'
import { EOSTransactionBuilder } from './EOS'
import { AlgorandTransactionBuilder } from './Algorand'

// let chainId = "algorand", networkId = "testnet", doMSIG = false, txnType = AlgorandTxnTypes.TokenTransfer
// let chainId = "eos", networkId = "jungle", doMSIG = false, txnType = EOSTxnTypes.TokenTransfer
// let chainId = "eos", networkId = "kylin", doMSIG = false, txnType = EOSTxnTypes.TokenTransfer
// let chainId = "eth", networkId = "ropsten", doMSIG = false, txnType = EOSTxnTypes.TokenTransfer
let chainId = "eth", networkId = "rinkeby", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer
// let chainId = "matic", networkId = "polygon_mumbai", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer

//Validate that all the env variables we're expecting exist, before importing our config object. Missing variables can cause confusing errors. 
validateSettings(chainId, networkId, doMSIG);

import config from './chain.config'
var configObj = config[chainId][networkId]

const options: IOptionBag = {
    chainType: configObj.chainType,
    endpoints: configObj.endpoints,
    chainSettings: configObj.chainSettings,
    fromAccountName: configObj.fromAccountName,
    fromAccountName_MSIG: configObj.fromAccountName_MSIG,
    toAccountName: configObj.toAccountName,
    symbol: configObj.symbol,
    permission: configObj.permission,
    privateKey_singleSign: configObj.privateKey_singleSign,
    privateKeys_MSIG: configObj.privateKeys_MSIG,
    transferAmount: configObj.transferAmount,
    precision: configObj.precision
}

// If we're doing an MSIG transaction then use the the keys defined in config.privateKeys_MSIG 
// The from account also gets replaced with config.fromAccountName_MSIG as we need to test using an account that has a MSIG setup on it. 
var signing_keys : string[] = [options.privateKey_singleSign]
if(doMSIG) {
    signing_keys = options.privateKeys_MSIG,
    options.fromAccountName = options.fromAccountName_MSIG
}

/*
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
import { PluginChainFactory } from '@open-rights-exchange/chain-js'
import { Plugin as EOSPlugin} from '@open-rights-exchange/chain-js-plugin-eos'
import { Plugin as EthereumPlugin, ModelsEthereum, HelpersEthereum} from '@open-rights-exchange/chain-js-plugin-ethereum'
import { Plugin as AlorandPlugin} from '@open-rights-exchange/chain-js-plugin-algorand'
import { Transaction } from '@open-rights-exchange/chain-js';
var chain = PluginChainFactory([EOSPlugin, EthereumPlugin, AlorandPlugin], options.chainType, options.endpoints, options.chainSettings);



async function runTxn() {

    try {
        var transaction : Transaction = null;
        var action : any = null;

        await chain.connect()

        //If txnType is tokentransfer we use our generic code. Else we setup the transaction using one of the custom
        if(txnType.toString() == "tokentransfer") {

            var txnOptions = {
                // gasLimit: "0x62D4", //25300 (25200 is default)
                // gasPrice: "0x3B9ACA0A", //1000000010 (1000000000 is default)
            };
    
            transaction = await chain.new.Transaction(txnOptions);
    
            var genericValueTransfer = {
                fromAccountName: options.fromAccountName,
                toAccountName: options.toAccountName,
                amount: options.transferAmount,
                symbol: options.symbol,
                memo: 'Test',
                permission: options.permission,
                precision: options.precision,
            }

            action = await chain.composeAction(Models.ChainActionType.ValueTransfer, genericValueTransfer);

        } else {
            // If we're running any transaction that isn't a simple token transfer
            // This case statement 
            let response: TransactionBuilderResponse = null
            switch(options.chainType) {
                case Models.ChainType.EthereumV1: {
                    response = await new EthereumTransactionBuilder().build(chain, options, (txnType as unknown) as ETHTxnTypes)
                    break
                }
                case Models.ChainType.EosV2: {
                    response = await new EOSTransactionBuilder().build(chain, options, (txnType as unknown) as EOSTxnTypes)
                    break
                }
                case Models.ChainType.AlgorandV1: {
                    response = await new AlgorandTransactionBuilder().build(chain, options, (txnType as unknown) as AlgorandTxnTypes)
                    break
                }
                default: {
                    Errors.throwNewError("Invalid ChainType")
                }
            }
            transaction = response.transaction
            action = response.action
        } 

        transaction.actions = [action];

        if(chain.supportsFee) {
            const fee = await transaction.getSuggestedFee(Models.TxExecutionPriority.Fast);
            const multiplier : number = 2
            const finalPrice : string = (fee * multiplier).toString()
            await transaction.setDesiredFee(finalPrice)
        }
        
        await transaction.prepareToBeSigned()
        await transaction.validate()
        await transaction.sign(signing_keys);

        //console.log(JSON.stringify(transaction))
        console.log(transaction)

        var result :  Models.TransactionResult =  await transaction.send();

        console.log('transactionId:', result.transactionId)
        console.log('hasAllRequiredSignatures:', transaction.hasAllRequiredSignatures)
        console.log('actions:', JSON.stringify(transaction.actions))
        console.log('header:', transaction.header)
        console.log('signatures:', transaction.signatures)
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