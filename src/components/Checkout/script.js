//SEND ETH
// import { ethers } from "ethers";

//kindly use version of ethers.js 5.4.0

// Send ETH
// __________________________________

import Web3 from "web3";
const Decimal = require("decimal.js");

export const sendETH = async (signer, recipient, amount) => {
  // Detect MetaMask and connect
  if (typeof window.ethereum === "undefined") {
    throw new Error("Ethereum wallet is not installed");
  }

  // Request access to the user's accounts and chain change
  await window.ethereum.request({
    //USED TO CHANGE CHAIN
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x5" }],
    // Goerli testnet chain ID = 0x5
  }); //TO MAKE WALLET TO SWITCH TO MAINNET REPLACE CHAIN ID WITH { "0X1"}

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();

  if (accounts.length === 0) {
    throw new Error("No accounts found");
  }

  console.log(accounts[0], recipient, amount);

  const ethAmount = web3.utils.toWei(amount.toString(), "ether");

  const tx = await web3.eth.sendTransaction({
    from: accounts[0],
    to: recipient,
    value: ethAmount,
  });

  return tx;
  //_____________end for test net

  //below is for mainnet
  //  const tx = await web3.eth.sendTransaction({
  //    from: accounts[0],
  //  to: recipient,
  //    value: web3.utils.toWei(amount.toString(), 'ether'),
  //  });
  // console.log(tx);
  // return tx;
};

//SEND BNB
// ____________________________________________
/* here goes the configuration for testnet and mainnet both we wil use this information in function accordingly

contract address for testnet = 0xD26547AD6a46a6274E6ba39129d08504Dd546AD3
contract address for mainnet  0xb8c77482e45f1f44de1745f52c74426c631bdd52

chainId: "0x61", // BSC Testnet chain ID
chainId: "0x38", //BSC Mainnet 

rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"], // BSC Testnet RPC URL
blockExplorerUrls: ["https://testnet.bscscan.com/"], // BSC Testnet block explorer URL

for main net rpc urls
rpcUrls: ["https://bsc-dataseed.binance.org/"], // BSC RPC URL
blockExplorerUrls: ["https://bscscan.com/"], // BSC block explorer URL

*/
export async function sendBNB(signer, recipient, amount) {
  //
  //________________________________________//
  // Check if MetaMask is installed and connect to BSC Mainnet
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x61", // BSC Mainnet chain ID 38 ,test net 61
        },
      ],
    });
  } else {
    throw new Error("MetaMask is not installed");
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();

  const tx = await web3.eth.sendTransaction({
    from: accounts[0],
    to: recipient,
    value: web3.utils.toWei(amount.toString(), "ether"),
  });

  return tx;
}

// _____________________________________________
//

//function To send USDT eth

// async function sendUSDT(signer, recipient, amount) {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const usdtContractAddress = "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684";
//   const usdtContractAbi = [
//     "function transfer(address to, uint256 value) returns (bool)",
//   ];
//   const usdtContract = new ethers.Contract(
//     usdtContractAddress,
//     usdtContractAbi,
//     signer
//   );

//   const balance = await usdtContract.balanceOf(signer.address);

//   if (balance.lt(amount)) {
//     throw new Error("Insufficient balance");
//   }

//   const tx = await usdtContract.transfer(
//     recipient,
//     ethers.utils.parseUnits(amount.toString(), 6)
//   );
//   return tx;
// }

//now i will try to send usdt ETh with web3.js
/* 
testnet goreli chain id = "0x5";
sepolia chain id 11155111
for main net = chainId: "0x1"
usdeth testnet contrat address = 0x509Ee0d083DdF8AC028f2a56731412edD63223B9
usdt eth for mainnet = 0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684
*/
export async function sendUSDT(signer, recipient, amount) {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; //MAIN NET
  //FOR TESTNET
  // const usdtContractAddress = "0x509Ee0d083DdF8AC028f2a56731412edD63223B9"; //testnet
  // const usdtContractAddress = "0xA1d7f71cbBb361A77820279958BAC38fC3667c1a";
  const usdtContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const usdtContract = new web3.eth.Contract(
    usdtContractAbi,
    usdtContractAddress
  );

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const decimals = 6; // Number of decimals for the token
  const amountInDecimals = amount * Math.pow(10, decimals);

  const tx = await usdtContract.methods
    .transfer(recipient, amountInDecimals.toString())
    .send({ from: accounts[0] });

  return tx;
}

//send BUSD BSC
//________________________now will send busd bsc with web3.js

//for using it with the testnet we have to change rpc urls and chain id
// chainId: "0x61", // BSC Testnet chain ID
// chainId: "0x38", //BSC Mainnet

// rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"], // BSC Testnet RPC URL
// blockExplorerUrls: ["https://testnet.bscscan.com/"], // BSC Testnet block explorer URL

// for main net rpc urls
// rpcUrls: ["https://bsc-dataseed.binance.org/"], // BSC RPC URL
// blockExplorerUrls: ["https://bscscan.com/"], // BSC block explorer URL

//testnet contract address = 0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee
// mainnet contract address =0xe9e7cea3dedca5984780bafc599bd69add087d56
export async function sendBUSD(signer, recipient, amount) {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  // mainnet address = 0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee
  //below for mainnet and for testnet = "0x509Ee0d083DdF8AC028f2a56731412edD63223B9"
  const busdContractAddress = "0x509Ee0d083DdF8AC028f2a56731412edD63223B9";
  const busdContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const busdContract = new web3.eth.Contract(
    busdContractAbi,
    busdContractAddress
  );

  // const balance = await busdContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await busdContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}

//________________________________________________________
// async function sendBUSD(signer, recipient, amount) {
//   const provider = new ethers.providers.Web3Provider(
//     window.ethereum,
//     "binance"
//   );
//   const balance = await provider.getBalance(signer.address);

//   if (balance.lt(amount)) {
//     throw new Error("Insufficient balance");
//   }

//   const busdContractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
//   const busdContract = new ethers.Contract(
//     busdContractAddress,
//     ["function transfer(address to, uint amount)"],
//     signer
//   );
//   const tx = await busdContract.transfer(
//     recipient,
//     ethers.utils.parseUnits(amount.toString(), 18)
//   );

//   return tx;
// }

//WBTC ETH
//wbtc testnet address = 0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05
//wbtc live = 0xBb2b8038a1640196FbE3e38816F3e67Cba72D940
// testnet goreli chain id = "0x5";
// sepolia chain id 11155111
// for main net = chainId: "0x1
export async function sendWBTCETH(signer, recipient, amount) {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], // for mainnet 0x1 & test 0x5
    });
  }
  //wbtc testnet address = 0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05
  //wbtc live = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const wbtcContractAddress = "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05";
  const wbtcContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      decimals: 6, // Add the decimals field with the desired value
    },
  ];
  const wbtcContract = new web3.eth.Contract(
    wbtcContractAbi,
    wbtcContractAddress
  );

  const tx = await wbtcContract.methods
    .transfer(recipient, web3.utils.toBN(amount * 10 ** 8))
    .send({ from: accounts[0] });

  return tx;
}

//usdc bnb

//now i will try to send usdc bnb with help of web3.js
//on index 4
export async function sendUSDCBNB(signer, recipient, amount) {
  const web3 = new Web3(window.ethereum);

  // Change chain if needed
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x38" }], //for test 0x61 & main net 0x38
  });
  //usdc testnet = 0x64544969ed7EBf5f083679233325356EbE738930
  //usdc live = 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
  const accounts = await web3.eth.getAccounts();
  const usdcContractAddress = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  //can't find the usdcbnb testnet contract
  const usdcContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const usdcContract = new web3.eth.Contract(
    usdcContractAbi,
    usdcContractAddress
  );

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await usdcContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}
//end of usdc bnb

//USDC ETH

//send usdc eth with web3.js

export async function sendUSDCETH(signer, recipient, amount) {
  if (typeof window.ethereum !== "undefined") {
    //for the testnet  //
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });

    // await window.ethereum.request({
    //  method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0x1' }]
    // });
    //testnet chainid     || mainnet chain id  0x1
  }
  // usdc main net = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  // usdc test goreli = 0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  // const usdcContractAddress = "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557";//testnet
  const usdcContractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; //main net
  const usdcContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  // const usdcContract = new web3.eth.Contract(
  //   usdcContractAbi,
  //   usdcContractAddress
  // );

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const usdcContract = new web3.eth.Contract(
    usdcContractAbi,
    usdcContractAddress
  );

  const amountWithDecimals = new Decimal(amount).toFixed(6);
  const amountInWei = new Decimal(amountWithDecimals)
    .mul(new Decimal(10).pow(6))
    .toFixed();

  const tx = await usdcContract.methods
    .transfer(recipient, amountInWei)
    .send({ from: accounts[0] });

  return tx;
}

//SENDING WBTC ETH
// /WBTC ETH
//wbtc testnet address = 0x092a5a621798D08b4B696A36954a7C50D00aE618
//wbtc live = 0xBb2b8038a1640196FbE3e38816F3e67Cba72D940
// testnet goreli chain id = "0x5";
// sepolia chain id 11155111
// for main net = chainId: "0x1

// export async function sendWBTCETH(signer, recipient, amount) {
//   if (typeof window.ethereum !== "undefined") {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0x1" }], //for mainnet 0x1 & test 0x5
//     });
//   }

//   //testnet contract = "0x092a5a621798D08b4B696A36954a7C50D00aE618";
//   const web3 = new Web3(window.ethereum);
//   const accounts = await web3.eth.getAccounts();
//   const wbtcContractAddress = "0x092a5a621798D08b4B696A36954a7C50D00aE618";
//   const wbtcContractAbi = [
//     {
//       constant: false,
//       inputs: [
//         {
//           name: "to",
//           type: "address",
//         },
//         {
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "transfer",
//       outputs: [
//         {
//           name: "",
//           type: "bool",
//         },
//       ],
//       payable: false,
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ];
//   const wbtcContract = new web3.eth.Contract(
//     wbtcContractAbi,
//     wbtcContractAddress
//   );

//   // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

//   // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
//   //   throw new Error("Insufficient balance");
//   // }

//   const tx = await wbtcContract.methods
//     .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
//     .send({ from: accounts[0] });

//   return tx;
// }
///WBTC ENDS HERE

//_____________________EThereum and bnb script's end's here_________________//

//____________script's start here___________________________________//

//creating function to send BUSD ETH;

export async function sendBUSDETH(signer, recipient, amount) {
  //busd goreli = 0xb809b9B2dc5e93CB863176Ea2D565425B03c0540; 18 decimal's
  //goreli test chainId= "0x5"
  // mainnet id = '0x1'
  // busd mainnet = ""
  if (typeof window.ethereum !== "undefined") {
    //for the testnet  //
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], //for mainnet 0x1
    });

    // await window.ethereum.request({
    //  method: 'wallet_switchEthereumChain',
    //  params: [{ chainId: '0x1' }] });
    //testnet chainid     || mainnet chain id  0x1
  }

  //busd testnet = 0xb809b9B2dc5e93CB863176Ea2D565425B03c0540
  //busd livenet = 0x4Fabb145d64652a948d72533023f6E7A623C7C53

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const busdContractAddress = "0xb809b9B2dc5e93CB863176Ea2D565425B03c0540";
  const busdContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const busdContract = new web3.eth.Contract(
    busdContractAbi,
    busdContractAddress
  );

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await busdContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}

//script to send BUSD ON BNB
// TESTNET = 0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee
//mainnet = ""
export async function sendBUSDBNB(signer, recipient, amount) {
  const web3 = new Web3(window.ethereum);

  // Change chain if needed
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x61" }], //for test 0x61 & main net 0x38
  });
  //busd testnet = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee
  //busd livenet = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
  const accounts = await web3.eth.getAccounts();
  const busdContractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"; //TESTNET
  //can't find the usdcbnb testnet contract
  const busdContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const busdContract = new web3.eth.Contract(
    busdContractAbi,
    busdContractAddress
  );

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await busdContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}

//_______________________________________________________________________________//
//now i am creating function to send dai on bsc chain
// dai on testnet = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"
// dai on mainnet
// binace tesnet chainid for test 0x61 & main net 0x38
export async function sendDAIBNB(signer, recipient, amount) {
  const web3 = new Web3(window.ethereum);

  // Change chain if needed
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x61" }], //for test 0x61 & main net 0x38
  });
  //dai livenet = 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3
  //dai testnet = 0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867
  const accounts = await web3.eth.getAccounts();
  const daiContractAddress = "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867";
  const daiContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const daiContract = new web3.eth.Contract(daiContractAbi, daiContractAddress);

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await daiContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}

//_______________________-SEND DAI ETHEREUM CHAIN_____________

export async function sendDAIETH(signer, recipient, amount) {
  //goreli test chainId= "0x5"
  // mainnet id = '0x1'
  if (typeof window.ethereum !== "undefined") {
    //for the testnet  //
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], //TO SWITCH TO MAINNET CHANGE ID TO 0X1
    });

    // await window.ethereum.request({
    //  method: 'wallet_switchEthereumChain',
    //  params: [{ chainId: '0x1' }] });
    //testnet chainid     || mainnet chain id  0x1
  }
  //DAI livenet = 0x6B175474E89094C44Da98b954EedeAC495271d0F
  //DAI testnet = 0x73967c6a0904aA032C103b4104747E88c566B1A2
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const daiContractAddress = "0x73967c6a0904aA032C103b4104747E88c566B1A2";
  const daiContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const daiContract = new web3.eth.Contract(daiContractAbi, daiContractAddress);

  // const balance = await usdtContract.methods.balanceOf(accounts[0]).call();

  // if (web3.utils.toBN(balance).lt(web3.utils.toBN(amount))) {
  //   throw new Error("Insufficient balance");
  // }

  const tx = await daiContract.methods
    .transfer(recipient, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: accounts[0] });

  return tx;
}

//____________now i will write function to send matic native on poly gon chain

export const sendMATIC = async (
  signer,
  recipient,
  amount,
  network = "testnet"
) => {
  // Detect MetaMask and connect
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    throw new Error("MetaMask is not installed");
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0], recipient, amount);

  // Polygon Testnet Configuration
  if (network === "testnet") {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x13881", // Testnet chain ID for Polygon Mumbai testnet
          chainName: "Polygon Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"], // Testnet RPC URL
          blockExplorerUrls: ["https://mumbai.polygonscan.com"], // Testnet block explorer URL
        },
      ],
    });
  }

  // Polygon Mainnet Configuration
  // if (network === 'mainnet') {
  //   await window.ethereum.request({
  //     method: 'wallet_addEthereumChain',
  //     params: [
  //       {//for test net chain id = 0x13881
  //         chainId: '0x89', // Mainnet chain ID for Polygon Mainnet 0x89
  //         chainName: 'Polygon Mainnet',
  //         nativeCurrency: {
  //           name: 'MATIC',
  //           symbol: 'MATIC',
  //           decimals: 18,
  //         },
  //         rpcUrls: ['https://rpc-mainnet.maticvigil.com'], // Mainnet RPC URL
  //         blockExplorerUrls: ['https://polygonscan.com'], // Mainnet block explorer URL
  //       },
  //     ],
  //   });
  // }

  const maticAmount = web3.utils.toWei(amount.toString(), "ether");

  const tx = await web3.eth.sendTransaction({
    from: accounts[0],
    to: recipient,
    value: maticAmount,
  });

  return tx;
};

//now i will write script to send to send USDT polygon

export async function sendUSDTPOLY(recipient, amount, network = "mainnet") {
  // const chainId = network === "testnet" ? "0x5" : "0x1";
  console.log("Calling USDT Polygon"); // for mainnet change chain id 0x89
  const chainId = "0x13881"; //see above function for testnet configuration for test and mainnet configuration

  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } else {
    throw new Error("MetaMask is not installed");
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  //usdt poly mainnet = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;
  //usdt poly testnet = 0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832
  const usdtContractAddress = "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832";
  const usdtContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const usdtContract = new web3.eth.Contract(
    usdtContractAbi,
    usdtContractAddress
  );

  // const decimals = 6; // Number of decimals for the contract
  // const usdtAmount = web3.utils.toWei(
  //   (amount * Math.pow(10, decimals)).toString(),
  //   "wei"
  // );

  const amountWithDecimals = new Decimal(amount).toFixed(6);
  const amountInWei = new Decimal(amountWithDecimals)
    .mul(new Decimal(10).pow(6))
    .toFixed();

  const tx = await usdtContract.methods
    .transfer(recipient, amountInWei)
    .send({ from: accounts[0] });

  return tx;
}
