import { Chain, Transaction } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

export class ERC1155TransferFrom_template_Builder implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

        var transaction : Transaction = await chain.new.Transaction()

        var Erc1155TransferFrom : ModelsEthereum.Erc1155SafeTransferFromParams= {
          transferFrom: HelpersEthereum.toEthereumEntityName(options.fromAccountName),
          to: HelpersEthereum.toEthereumEntityName("0x9F0E93C9A61036Ce864cE43654440d7bA2a7d8Ca"),
          contractAddress: HelpersEthereum.toEthereumAddress("0x88B48F654c30e99bc2e4A1559b4Dcf1aD93FA656"),
          tokenId: 43799878620342970581926639484176058944731643284697752016825318578142832492547,
          quantity: 1
        }

        var action = await chain.composeAction(ModelsEthereum.EthereumChainActionType.ERC721TransferFrom, Erc1155TransferFrom);

        return {transaction, action}
    }
}