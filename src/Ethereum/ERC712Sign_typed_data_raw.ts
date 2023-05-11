import { Chain, Transaction } from "@open-rights-exchange/chain-js";
import { HelpersEthereum } from "@open-rights-exchange/chain-js-plugin-ethereum";
import { ETHTxnTypes, IOptionBag, ITransactionBuilder, TransactionBuilderResponse } from "src/models";

// There was an error: Error: ambiguous primary types or unused types: "MyTypeA",
// "EIP712Domain" (argument="types", value={"MyTypeA":[{"name":"sender","type":"address"},{"name":"x","type":"uint"},{"name":"deadline","type":"uint"}],
// "EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},
//  code=INVALID_ARGUMENT, version=hash/5.6.1)


export const ERC712ABI = [
  {
    "constant": true,
    "inputs": [] as any[],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "executeSetIfSignatureMatch",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
          

export class ERC712Sign_typed_data_raw_builder implements ITransactionBuilder {
    async build(chain: Chain, options: IOptionBag, txnType: ETHTxnTypes): Promise<TransactionBuilderResponse> {

        let moreOptions = {signMethod : 'etherum.sign-typed-data'}
        let extOptions = {...options.defaultTransactionOptions, ...moreOptions}

        var transaction : Transaction = await chain.new.Transaction(extOptions)
    
        const eip712_domain = {
          name: "name",
          version: "1",
          verifyingContract: "0xB6Fa4E9B48F6fAcd8746573d8e151175c40121C7",
          chainId: 1,
        };
    
        const eip712_types = {
          MyTypeA: [
            {name:"sender",type:"address"},
            {name:"x",type:"uint"},
            {name:"deadline", type:"uint"}
          ]
        };

        var milsec_deadline = Date.now() / 1000 + 100;
        console.log(milsec_deadline, "milisec");
        var deadline = parseInt(String(milsec_deadline).slice(0, 10));

        const x = 5;          

        const action : any = {
          from: options.fromAccountName,
          to: '0xE79e5dfbdaeb5bF5395A760FB0F7a5A71466234b',
          contract: {
            abi: ERC712ABI,
            method: 'executeSetIfSignatureMatch',
            //parameters: ["$eip712_v","$eip712_r","$eip712_s",options.fromAccountName, deadline, x],
            parameters: [0,"0x00","0x00",options.fromAccountName, deadline, x],
            eip712: {
              version: 4,
              types: eip712_types,
              primaryType: "MyTypeA",
              domain: eip712_domain,
              message: {
                sender: options.fromAccountName,
                x,
                deadline
              },
              parameterSubstitution: {
                v: 0,
                r: 1,
                s: 2
              }
            }
          },
        }

        return {transaction, action}
    }
}