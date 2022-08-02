import { Transaction, Chain, Errors } from '@open-rights-exchange/chain-js'
import { AlgorandTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from '../models'

export class AlgorandTransactionBuilder implements ITransactionBuilder {

    async build(chain: Chain, options: IOptionBag, txnType: AlgorandTxnTypes): Promise<TransactionBuilderResponse> {
        var response : TransactionBuilderResponse = null
        switch(txnType) {
            default: {
                Errors.throwNewError("txnType " + txnType.toString() + " is not yet implemented")
            }
        }
        return response
    }
}