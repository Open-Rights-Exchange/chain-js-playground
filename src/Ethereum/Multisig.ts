import { Chain, Transaction, Models, Helpers } from "@open-rights-exchange/chain-js";
import { HelpersEthereum, ModelsEthereum, MultisigPlugin } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";
import { EthereumGnosisMultisigTransactionOptions } from "../../../chain-js-plugin-ethereum/src/plugin";

export class Multisig implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {
      // const multisigOwner = '0x76d1b5dCFE51dbeB3C489977Faf2643272AaD901'
      // const multisigOwnerPrivateKey1 = '0x9c58fafab2feb46838efdba78e108d2be13ec0064496889677f32044acf0bbc6'

      // const multisigOwner2 = '0x31DF49653c72933A4b99aF6fb5d5b77Cc169346a'
      // const multisigOwnerPrivateKey2 = '0xbafee378c528ac180d309760f24378a2cfe47d175691966d15c83948e4a7faa6'

      // const multisigOwner3 = '0x1A70f07994876922b07e596d3940f8a81bb093A4'
      // const multisigOwnerPrivateKey3 = '0x3b65208dc3f6b5881b08e6dfcf97d7d9584965306981a3340b26a80ae0ddfa41'
      
      //options.privateKeys_MSIG = [multisigOwnerPrivateKey1, multisigOwnerPrivateKey2, multisigOwnerPrivateKey3]

      const multisigOptions: MultisigPlugin.EthereumGnosisMultisigTransactionOptions = {
        multisigAddress: HelpersEthereum.toEthereumAddress('0xE5B218cc277BB9907d91B3B8695931963b411f2A'), 
      }

      const transactionOptions: ModelsEthereum.EthereumTransactionOptions<EthereumGnosisMultisigTransactionOptions> = {
        chain: options.chainSettings.chain,
        hardfork: options.chainSettings.hardFork,
        multisigOptions,
      }

      var gasLimit = Helpers.decimalToHexString((21000+4).toString()) 
      var gasPrice = Helpers.decimalToHexString("2000000020") // https://help.gnosis-safe.io/en/articles/4933491-gas-estimation
      
      var transaction : Transaction = await chain.new.Transaction(transactionOptions)

      const action = {
        to: HelpersEthereum.toEthereumAddress('0xA200c9fe7F747E10dBccA5f85A0A126c9bffe400'),
        value: 2000,
        // gasLimit: '1000000',
      }

      return {transaction, action}
    }
}