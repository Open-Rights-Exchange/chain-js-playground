import { Chain, Transaction, Models, Helpers } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class SetGasPriceInTransaction_Builder implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {


        // var txnOptions = {
        //     // gasLimit: "0x62D4", //25300 (25200 is default)
        //     // gasPrice: "0x3B9ACA0A", //1000000010 (1000000000 is default)
        //     feeMultipliers: {
        //       [Models.TxExecutionPriority.Slow]: 2,
        //       [Models.TxExecutionPriority.Average]: 3,
        //       [Models.TxExecutionPriority.Fast]: 4,
        //     }
        // };

        var transaction : Transaction = await chain.new.Transaction(options.defaultTransactionOptions)

        // Note that you can NOT use the ValueTransfer template when you're trying to specifically set the GasPrice. 
        // GasPrice and GasLimit are not generic parameters. 
        // var genericValueTransfer = {
        //   fromAccountName: options.fromAccountName,
        //   toAccountName: options.toAccountName,
        //   amount: options.transferAmount,
        //   symbol: options.symbol,
        //   memo: 'Test',
        //   permission: options.permission,
        //   precision: options.precision,
        //   gasLimit: "0x62D4", //25300 (25200 is default)
        //   gasPrice: "0x3B9ACA0A", //1000000010 (1000000000 is default)'
        //   // nonce: "0x1"
        // }

        //var action = await chain.composeAction(Models.ChainActionType.ValueTransfer, genericValueTransfer);

        const gasPrice = Helpers.decimalToHexString("1000000000")
        const gasLimit = Helpers.decimalToHexString((21000 + 4).toString()) //21000 + 4

        console.log(`gasPrice: ${gasPrice}`)
        console.log(`gasLimit: ${gasLimit}`)

        var txn : ModelsEthereum.EthTransferParams = {
          to: options.toAccountName,
          value: options.transferAmount,
          //gasLimit: "0x520C", //21000 + 4
          gasLimit: gasLimit, //21000 + 4
          //gasPrice: "0x77359414", //2000000020 (1000000000 is default)'
          gasPrice: gasPrice, //Set a very low gas price if you want your transaction to get "stuck"
        }

        var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ETHTransfer, txn);

        return {transaction, action}
    }
}