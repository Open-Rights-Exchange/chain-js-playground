import { Chain, Transaction, Models, Helpers } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class SmartContractInteraction implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

        var gasLimit = Helpers.decimalToHexString((21000+4).toString()) //Error Returned error: intrinsic gas too low
        var gasPrice = Helpers.decimalToHexString("2000000020")
        

        const defaultTxOptions = { gasLimit: 91000 }

        var transaction : Transaction = await chain.new.Transaction(defaultTxOptions)

        var action = {
          to: "0x8690a95908dad0306b51a7eeaff3ef23b3a75dbf",
          from: "0xbe7707f5ce404db142e1379ea8ba646d150ebfd7",
          value: 0,
          data: "0xa9059cbb000000000000000000000000a26f803334002cbd7ddee757e95e684e417901e90000000000000000000000000000000000000000000000000000000000000001",
          chain: "ropsten",
          fork: "istanbul",
          //gasPrice,
        //   gasLimit
      }

        // var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ETHTransfer, txn);

        return {transaction, action}
    }
}