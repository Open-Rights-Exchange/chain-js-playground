import { Transaction, Chain, Errors } from '@open-rights-exchange/chain-js'
import {  EOSTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from '../models'

export class EOSTransactionBuilder implements ITransactionBuilder {

    async build(chain: Chain, options: IOptionBag, txnType: EOSTxnTypes): Promise<TransactionBuilderResponse> {
        var response : TransactionBuilderResponse = null
        switch(txnType) {
            default: {
                Errors.throwNewError("txnType " + txnType.toString() + " is not yet implemented")
            }
        }
        return response
    }
}