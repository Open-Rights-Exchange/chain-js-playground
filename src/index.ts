import { validateSettings } from './helpers'
import { Models, Errors, ChainType } from '@open-rights-exchange/chain-js'
import { ETHTxnTypes, EOSTxnTypes, AlgorandTxnTypes, IOptionBag, TransactionBuilderResponse} from './models'
import { EthereumTransactionBuilder } from './Ethereum'
import { EOSTransactionBuilder } from './EOS'
import { AlgorandTransactionBuilder } from './Algorand'

// let chainId = "algorand", networkId = "testnet", doMSIG = false, txnType = AlgorandTxnTypes.TokenTransfer
// let chainId = "eos", networkId = "jungle", doMSIG = false, txnType = EOSTxnTypes.TokenTransfer
// let chainId = "eos", networkId = "kylin", doMSIG = false, txnType = EOSTxnTypes.TokenTransfer
// let chainId = "eth", networkId = "ropsten", doMSIG = true, txnType = ETHTxnTypes.Multisig
// let chainId = "eth", networkId = "rinkeby", doMSIG = false, txnType = ETHTxnTypes.Erc1155SafeTransferFrom_raw
// let chainId = "eth", networkId = "goerli", doMSIG = false, txnType = ETHTxnTypes.ERC20TransferFrom_raw
// let chainId = "matic", networkId = "polygon_mumbai", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer
// let chainId = "avalanche", networkId = "fuji", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer
let chainId = "avalanche", networkId = "mainnet", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer
// let chainId = "telosevm", networkId = "testnet", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer
// let chainId = "telosevm", networkId = "mainnet", doMSIG = false, txnType = ETHTxnTypes.TokenTransfer


//Validate that all the env variables we're expecting exist, before importing our config object. Missing variables can cause confusing errors. 
validateSettings(chainId, networkId, doMSIG);

import config from './chain.config'
var configObj = config[chainId][networkId]



const options: IOptionBag = {
    defaultTransactionOptions: configObj.defaultTransactionOptions,
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
    precision: configObj.precision,
}



/*
-- Note that the 1st parameter passed to PluginChainFactory is an array of plugins loaded by the user. 
*/
import { PluginChainFactory } from '@open-rights-exchange/chain-js'
import { Plugin as EOSPlugin} from '@open-rights-exchange/chain-js-plugin-eos'
import { Plugin as EthereumPlugin, ModelsEthereum, HelpersEthereum, GnosisSafeMultisigPlugin, EthereumTransaction, MultisigPlugin} from '@open-rights-exchange/chain-js-plugin-ethereum'
import { Plugin as AlorandPlugin} from '@open-rights-exchange/chain-js-plugin-algorand'
import { Transaction } from '@open-rights-exchange/chain-js';
var chain = PluginChainFactory([EOSPlugin, EthereumPlugin, AlorandPlugin], options.chainType, options.endpoints, options.chainSettings);

async function runTxn() {

    try {
        var transaction : Transaction = null;
        var action : any = null;

        await chain.connect()

        if(options.chainType == ChainType.EthereumV1 && doMSIG) {
            const gnosisSafePlugin = new GnosisSafeMultisigPlugin.GnosisSafeMultisigPlugin()
            await chain.installPlugin(gnosisSafePlugin)
        }

        //If txnType is tokentransfer we use our generic code. Else we setup the transaction using one of the custom
        if(txnType.toString() == "tokentransfer") {
    
            transaction = await chain.new.Transaction(options.defaultTransactionOptions);
    
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

        // if(chain.supportsFee) {
        //     const feeResult = await transaction.getSuggestedFee(Models.TxExecutionPriority.Fast);
        //     await transaction.setDesiredFee(feeResult.feeStringified)
        // }
        
        await transaction.prepareToBeSigned()
        await transaction.validate()
        
        if(doMSIG) {
    
            console.log('missing signatures (before sign): ', transaction.missingSignatures)
            await transaction.sign(options.privateKeys_MSIG);

            //https://docs.gnosis-safe.io/contracts/signatures
            // const signatures = [
            //     MultisigPlugin.toGnosisSignature(
            //       '{"signer":"0x1a70f07994876922b07e596d3940f8a81bb093a4","data":"0x8c559e90d4e52b76a09af7e0075114a4a3f06660b8e82e60fb0be08c7a9d9531031b7caea6e2fd610c2a4e55b8c85a27fc5b4ade14958f733aa85f4fba38dbf420"}',
            //     ),
            //     MultisigPlugin.toGnosisSignature(
            //       '{"signer":"0x31df49653c72933a4b99af6fb5d5b77cc169346a","data":"0x0551f8762924acde58f8f483a6ec5a8042b19aeeda4706cc9fb5437fb3ebe59d7dbc70fc117e9a3be9e7dd8a4b5b5d9817f7aa39dbdbd0f97447cf92b3cb0ce61f"}',
            //     ),
            //     MultisigPlugin.toGnosisSignature(
            //       '{"signer":"0x76d1b5dcfe51dbeb3c489977faf2643272aad901","data":"0x4ce3f5e88b59fd4acfd3692cdb760af62d25766ce88adf3960e8435743999a394b8fafb8cae97c51456f3277009d2b53912659e4a9051660bc57e10a8b9f670c20"}',
            //     )
            // ]
            //
            // await transaction.addSignatures(signatures)

            // Can sign one by one 
            // await Promise.all(signing_keys.map(async (key) => {
            //     await transaction.sign([key])
            // }));
            //
            // await transaction.sign([options.privateKeys_MSIG[2]]);
            // await transaction.sign([options.privateKeys_MSIG[1]]);

        } else {
            await transaction.sign([options.privateKey_singleSign]);
        }

        let result: Models.TransactionResult =  null
        
        if (transaction.requiresParentTransaction) {
            // Must sign parent Transaction with any of the multisig account private keys - this signer pays the fees
            await transaction.parentTransaction.sign([HelpersEthereum.toEthereumPrivateKey(options.privateKeys_MSIG[0])])

            // console.log('ParentTransaction: ', transaction.parentTransaction.actions[0])
            // console.log('missing signatures: ', transaction.missingSignatures)
            // console.log(
            //     'safeTransaction: ',
            //     ((transaction as EthereumTransaction).multisigTransaction as MultisigPlugin.GnosisSafeMultisigPluginTransaction).rawTransaction,
            // )
            // console.log(
            //     'parentTransaction: ',
            //     ((transaction as EthereumTransaction).multisigTransaction as MultisigPlugin.GnosisSafeMultisigPluginTransaction).parentRawTransaction,
            // )
            // console.log('ParentTransaction: ', transaction.parentTransaction.actions[0])
                        
            console.log('header:', transaction.parentTransaction.header)
            console.log(`gasPrice\\gasLimit: ${transaction.parentTransaction.actions[0].gasPrice} \ ${transaction.parentTransaction.actions[0].gasLimit} `)
            console.log(`gasPrice\\gasLimit: ${parseInt(transaction.parentTransaction.actions[0].gasPrice, 16)} \ ${parseInt(transaction.parentTransaction.actions[0].gasLimit, 16)} `)
            result = await transaction.parentTransaction.send()
          } else {
            console.log(`gasPrice\\gasLimit: ${transaction.actions[0].gasPrice} \ ${transaction.actions[0].gasLimit} `)
            console.log(`gasPrice\\gasLimit: ${parseInt(transaction.actions[0].gasPrice, 16)} \ ${parseInt(transaction.actions[0].gasLimit, 16)} `)
            console.log('header:', transaction.header)
            result = await transaction.send();            
          }


        //console.log(JSON.stringify(transaction))
        // console.log(transaction)

        console.log('transactionId:', result.transactionId)
        console.log('hasAllRequiredSignatures:', transaction.hasAllRequiredSignatures)
        console.log('actions:', JSON.stringify(transaction.actions))
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