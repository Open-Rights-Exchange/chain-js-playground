import { ChainFactory,  Models, ChainType, HelpersEos } from '@open-rights-exchange/chainjs'
import secret from './secrets.config'

var jungleEndpoints : Models.ChainEndpoint[] = [{url : "https://jungle3.cryptolions.io:443"}];
var chainSettings: any = {};

/** Using chain-specifc features - ex. eosjs */
const chain = new ChainFactory().create(ChainType.EosV2, jungleEndpoints, chainSettings)

async function runTxn() {

    try {

        console.log(chain.isConnected);
        await chain.connect()

        var sendTokenTx = await chain.new.Transaction()
        var action = await chain.composeAction(Models.ChainActionType.TokenTransfer,
            {            
               fromAccountName : 'codeoflight1',
               toAccountName: 'codeoflight2',
               amount: '0.0001',
               symbol: 'EOS',
               memo: 'Test',
               permission: HelpersEos.toEosEntityName('active')
             });
           sendTokenTx.actions = [action];
           
           await sendTokenTx.prepareToBeSigned()
           await sendTokenTx.validate()
           await sendTokenTx.sign([secret.JungleKey]);

           //var result :  Models.TransactionResult =  await sendTokenTx.send();

           //console.log('transactionId:', result.transactionId)
           console.log('hasAllRequiredSignatures:', sendTokenTx.hasAllRequiredSignatures)
           console.log('actions:', JSON.stringify(sendTokenTx.actions))
           console.log('header:', sendTokenTx.header)
           console.log('signatures:', sendTokenTx.signatures)

    } catch(error) {

        console.log("There was an error: " + error);

    }

}

runTxn()





// (Typescript) cast generic chain to EOS chain object
//const eosChain = (myChain as ChainEosV2) // EOSIO node version 2.x
//eosChain.eosjs.api.transact();
 // xhr2-cookies requires polyfills
 