import { Chain, Transaction, Models, Helpers, Errors } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum, Plugin as EthereumPlugin, } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class CancelTransacton_Builder implements ITransactionBuilder {
    async build(chain: EthereumPlugin, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {


        var transaction : Transaction = await chain.new.Transaction(options.defaultTransactionOptions)

        const numberOfTransactionsExecuted : number = await chain.web3.eth.getTransactionCount(options.fromAccountName, 'latest')
        const highestNonceExecuted: number = numberOfTransactionsExecuted - 1
        const numberOfTransactionsPending: number = await chain.web3.eth.getTransactionCount(options.fromAccountName, 'pending')
        const highestNoncePending: number = numberOfTransactionsPending - 1

        console.log(`last nonce executed: ${highestNonceExecuted} ${Helpers.decimalToHexString(highestNonceExecuted.toString())}`)
        console.log(`highest nonce pending: ${highestNoncePending} ${Helpers.decimalToHexString(highestNoncePending.toString())}`)

        if(highestNonceExecuted === highestNoncePending) {
          Errors.throwNewError("There are no transaction pending that require cancelation")
        }

        const remainingPendingTxns = numberOfTransactionsPending - numberOfTransactionsExecuted
        if(remainingPendingTxns > 1) {
          console.log(`Note: After canceling this transaction there are ${remainingPendingTxns-1} pending transaction that need to be canceled` )
        }

        var nonce = Helpers.decimalToHexString((highestNonceExecuted + 1).toString())
        var gasLimit = Helpers.decimalToHexString((21000+4).toString()) //Error Returned error: intrinsic gas too low
        var gasPrice = Helpers.decimalToHexString("2000000020")

        var txn : ModelsEthereum.EthTransferParams = {
          to: options.fromAccountName,
          value: '0',
          gasPrice,
          gasLimit,
          nonce
        }

        var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ETHTransfer, txn);

        return {transaction, action}
    }
}