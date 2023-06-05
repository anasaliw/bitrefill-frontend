import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  NavBtn,
  CssTextField,
  Label,
  textFieldStyled,
  Title,
  CssTextField2,
} from "../../Styles/CommonStyles";
import { ethers } from "ethers";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { Web3 } from "web3";
import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
// import { ethers, providers } from "ethers";
// import { sendETH } from "./script";
// import { sendETH } from "./script";
import { GetLatestBankDetailsAction } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { sendETH, sendWBTC } from "./script";
import { sendBNB } from "./script";
import { sendUSDT } from "./script";
import { sendBUSD } from "./script";
import { sendUSDCETH } from "./script";
import { sendUSDCBNB } from "./script";
import { sendWBTCETH } from "./script";

import { sendDAIETH } from "./script"; /// await sendDAIETH(
import { sendMATIC } from "./script";
import { sendUSDTPOLY } from "./script"; // await sendUSDTPOL
import { sendDAIBNB } from "./script"; //  await sendDAIBNB
import { sendBUSDBNB } from "./script"; // await sendBUSDBNB
import { sendBUSDETH } from "./script"; // await sendBUSDETH
import axios from "axios";

// import {sendPolygonNativeToken} from "./script";

const paymentDetails = [
  { img: "/assets/etherium.png", title: "ETH", price: "0.0000006" },
  { img: "/assets/b3.png", title: "BNB", price: "0.0000006" },
  { img: "/assets/b4.png", title: "USDT ETH", price: "0.0000006" },
  { img: "/assets/b5.png", title: "USDC ETH", price: "0.0000006" },
  { img: "/assets/b3.png", title: "USDC BNB", price: "0.0000006" },
  { img: "/assets/b2.png", title: "BUSDC BSC", price: "0.0000006" },
  { img: "/assets/wbtc.png", title: "WBTC ETH", price: "0.0000006" },
  { img: "/assets/b2.png", title: "BUSD ETH", price: "0.0000006" },
  { img: "/assets/b2.png", title: "BUSD BNB", price: "0.0000006" },
  { img: "/assets/dai.png", title: "DAI BNB", price: "0.0000006" },
  { img: "/assets/dai.png", title: "DAI ETH", price: "0.0000006" },
  {
    img: "/assets/polygonlogo.png",
    title: "MATIC POLYGON",
    price: "0.0000006",
  },
  { img: "/assets/polygonlogo.png", title: "USDT POLYGON", price: "0.0000006" },
];
const GridBox = styled(Box)`
  border-radius: 10px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  background: #3a3a3a;
  height: 65px;
  cursor: pointer;
  &:hover {
    color: black;
    background: #d9d9d9;
  }
  &:focus {
    color: black;
    background: #d9d9d9;
  }
`;
const DialogForPrivacy = ({
  open,
  setOpen,
  handleClose,
  scroll,
  descriptionElementRef,
  handlePlaceOrder,
  itemPrice,
  setItemPrice,
  shippingTax,
  shippingInfo,
  showSummary,
  setShowSummary,
  paymentInfo,
  setPaymentInfo,
  setShippingTaxToSend,
  expectedDelivery,
  createPayment,
}) => {
  const dispatch = useDispatch();
  // const [copy, setCopy] = React.useState(
  //   "Account Title: John \nBank Name: next bank \nAccount Number: 2642165435453248 \nSwift Code: 57546574 \nRouting No: 57546574 \nBank Address: Rue du Rhône 67 - 1204 Genève"
  // );
  const [checked, setChecked] = React.useState(false);
  const [crypto, setCrypto] = React.useState(false);
  const [showCryptoMethod, setShowCryptoMethod] = React.useState(false);
  const [amountToPay, setAmountToPay] = React.useState(0);
  const [connected, setConnected] = useState(false);
  const [bank, setBank] = useState(false);
  const [account, setAccount] = useState("");
  //My Metamask Address
  const [metamaskAddress, setMetamaskAddress] = useState(
    "0x88F1a562c9Eb7aE732B3C7eB94F4B77E5c437e8B"
  );

  //! Copy Address Icon

  const [copiedValue, setCopiedValue] = React.useState(metamaskAddress);
  const [copiedIcon, setCopiedIcon] = React.useState(false);

  const handleCopyIcon = () => {
    setCopiedIcon(true);
    setTimeout(() => {
      setCopiedIcon(false);
    }, 2000);
  };

  // Conditions to show wallet depending on action
  const [eth, setEth] = useState(false);
  const [bnb, setBnb] = useState(false);
  const [usdt, setUsdt] = useState(false);
  const [usdc, setUsdc] = useState(false);
  const [usdcBnb, setUsdcBnb] = useState(false);
  const [busdc, setBusdc] = useState(false);
  const [wbdc, setWbdc] = useState(false);
  const [busdEth, setBusdEth] = useState(false);
  const [busdBnb, setBusdBnb] = useState(false);
  const [daiBnb, setDaiBnb] = useState(false);
  const [daiEth, setDaiEth] = useState(false);
  const [maticPolygon, setMaticPolygon] = useState(false);
  const [usdtPolygon, setUsdtPolygon] = useState(false);
  // const bankDetails = [
  //   { name: "Account Title", value: "John" },
  //   { name: "Bank Name", value: "next bank" },
  //   { name: "Account Number", value: "2642165435453248" },
  //   { name: "Swift Code", value: "57546574" },
  //   { name: "Bank Address", value: "Rue du Rhône 67 - 1204 Genève" },
  // ];
  //! Conversion Starts here
  // Instead of getting whole abi,, I just defined this one
  // Cuz we only need transfer function

  const fetchConversion = async () => {
    const TokenName = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    console.log("tokenName");
    const res = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${TokenName}&tsyms=${TokenName},USD`
    );
    // console.log("tokenName", res);
  };

  // !To USD
  const [convertedToken, setConvertedToken] = useState(Number);
  function fetchTokenPriceUSD(tokenSymbol) {
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`;

    return axios
      .get(apiUrl)
      .then((response) => {
        const priceData = response.data;
        const usdPrice = priceData.USD;
        // const etherPriceUSD = 1800;
        console.log("Token Price in USD:", usdPrice);

        const amountInEther = amountToPay / usdPrice;
        console.log("Token Price in USD result:", amountInEther);
        setConvertedToken(amountInEther);
        // setConvertedToken(amountInEther)
        console.log("Token Price Converted ", convertedToken);
        return amountInEther;
        // return usdPrice;
      })
      .catch((error) => {
        console.error("Error fetching token price:", error);
        return null;
      });
  }

  // Usage example:
  // const tokenSymbol = "ETH";
  // fetchTokenPrice(tokenSymbol)
  //   .then(price => {
  //     // Use the fetched token price here
  //     console.log('Token Price:', price);
  //   });

  useEffect(() => {
    // fetchConversion();
    // fetchTokenPriceUSD(tokenSymbol);
  }, []);

  const abi = ["function transfer(address to, uint amount)"];

  const sendTokens = async () => {
    const { contractAdress, DECIMAL } = await getTokenAmount();
    const signer = await getProviderOrSigner(true);
    console.log(contractAdress, DECIMAL);
    const erc20 = new Contract(contractAdress, abi, signer);
    // const dec = await erc20.decimals();
    console.log(erc20);
    const amount = utils.parseUnits(priceInToken.toString(), DECIMAL);
    await erc20.transfer(toAddress, amount);
  };

  const handleCrypto = () => {
    async function connectMetamask() {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
          setConnected(true);
          setAccount(address);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Metamask not found");
      }
      setBank(false);
      setCrypto(true);
      // setCrypto(false);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setEth(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
    }
    connectMetamask();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log(shippingInfo);
  const calculate = () => {
    if (shippingInfo?.country.toLowerCase() === shippingTax?.country) {
      return shippingTax?.nationShipping;
    } else {
      return shippingTax?.worldShipping;
    }
  };
  const handleCalculate = () => {
    if (shippingInfo?.country.toLowerCase() === shippingTax?.country) {
      setAmountToPay(itemPrice + shippingTax?.nationShipping);
      setShippingTaxToSend(shippingTax?.nationShipping);
    } else {
      setAmountToPay(itemPrice + shippingTax?.worldShipping);
      setShippingTaxToSend(shippingTax?.worldShipping);
    }
  };
  const handleBank = () => {
    setCrypto(false);
    setBank(true);
    setShowCryptoMethod(false);
  };
  React.useEffect(() => {
    handleCalculate();
  }, [crypto]);
  console.log("amountToPay", amountToPay);

  // const handleEther = async () => {
  //   let tax = 1;

  //   console.log(metamaskAddress);
  //   console.log("Calling ETH", amountToPay);
  //   const hexAddress = ethers.utils.getAddress(metamaskAddress);
  //   console.log(hexAddress);
  //   try {
  //     // await sendETH(hexAddress,parseFloat(tax));
  //     // Alternatively, if you want to pass signer object instead of hexAddress:
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     // await sendETH(signer,hexAddress,"0.002");
  //     // await sendDAIETH(signer,hexAddress,"0.002");
  //     // await sendUSDTPOLY(hexAddress,"0.2");
  //     // await sendBUSDETH(signer,hexAddress,"0.1");
  //     // await sendBUSDBNB(signer,hexAddress,"0.1");
  //     // await sendDAIBNB(signer,hexAddress,"0.2");
  //     // console.log("Token", convertedToken.toFixed(15));
  //     // let amountToSend = convertedToken

  //     await sendETH(signer, hexAddress, tax.toString());
  //     console.log("Transaction successful");
  //   } catch (error) {
  //     console.error("Transaction failed:", error);
  //   }
  // };
  const handleEther = async () => {
    let tax = 1;

    console.log(metamaskAddress);
    console.log("Calling ETH", amountToPay);
    const hexAddress = ethers.utils.getAddress(metamaskAddress);
    console.log(hexAddress);
    try {
      // await sendETH(hexAddress,parseFloat(tax));
      // Alternatively, if you want to pass signer object instead of hexAddress:
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let toPay = convertedToken.toFixed(18);
      const res = await sendETH(signer, hexAddress, toPay);
      // await sendDAIETH(signer,hexAddress,"0.002");
      // await sendUSDTPOLY(hexAddress,"0.2");
      // await sendBUSDETH(signer,hexAddress,"0.1");
      // await sendBUSDBNB(signer,hexAddress,"0.1");
      // await sendDAIBNB(signer,hexAddress,"0.2");
      // await sendMATIC(signer, hexAddress, tax.toString());
      console.log("Transaction successful");
      console.log("Calling Ether", res);
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  //_____HANDLE USDCETH

  const handleUSDCETH = async () => {
    try {
      let tax = 1;

      console.log(metamaskAddress);
      console.log(amountToPay);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const hexAddress = await signer.getAddress();
      console.log(hexAddress);

      const res = await sendUSDCETH(
        signer,
        hexAddress,
        convertedToken.toString()
      );
      console.log("Transaction successful");
      console.log("Calling USDCETH", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentpaymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  //_________HANDLE USDC END

  //function to handle BNB
  const handleBnb = async () => {
    // let tax = 1;
    console.log("Hurraahhh0");
    console.log(metamaskAddress);
    console.log(amountToPay);
    const hexAddress = ethers.utils.getAddress(metamaskAddress);
    console.log(hexAddress);
    try {
      // await sendETH(hexAddress,parseFloat(tax));
      // Alternatively, if you want to pass signer object instead of hexAddress:
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      console.log("Token", convertedToken.toFixed(8));

      const res = await sendBNB(signer, hexAddress, convertedToken.toString());
      console.log("Calling BNB", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  //END OF BNB FUNCTION

  //HANDLE USDT
  const handleUSDT = async () => {
    let tax = 1;
    console.log("Calling USDT ");
    console.log(metamaskAddress);
    console.log(amountToPay);
    const hexAddress = ethers.utils.getAddress(metamaskAddress);
    console.log(hexAddress);
    try {
      // await sendETH(hexAddress,parseFloat(tax));
      // Alternatively, if you want to pass signer object instead of hexAddress:
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendUSDT(signer, hexAddress, convertedToken);
      console.log("Calling USDT", res);
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  //NOW CALLING BUSD BSC WHICH IS ON INDEX 5

  const handleBUSDBSC = async () => {
    let tax = 1;
    console.log("Calling BUSDBSC");
    console.log(metamaskAddress);
    console.log(amountToPay);
    const hexAddress = ethers.utils.getAddress(metamaskAddress);
    console.log(hexAddress);
    try {
      // await sendETH(hexAddress,parseFloat(tax));
      // Alternatively, if you want to pass signer object instead of hexAddress:
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendBUSD(signer, hexAddress, convertedToken.toString());
      console.log("Calling BUSD", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  //_____________END OF BUSD BSC
  //END OF USDT

  //handle usdcbnb with web3.js

  // const handleUSDCBNB = async () => {
  //   let tax = 1;
  //   console.log("USDCBNB");
  //   console.log(metamaskAddress);
  //   console.log(amountToPay);
  //   const hexAddress = ethers.utils.getAddress(metamaskAddress);
  //   console.log(hexAddress);

  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   await sendUSDCBNB(signer, hexAddress, convertedToken); // Remove parseFloat here
  //   console.log("Transaction successful");
  // };
  const handleUSDCBNB = async () => {
    let tax = 1;
    console.log("USDCBNB");
    console.log(metamaskAddress);
    console.log(amountToPay);
    const hexAddress = ethers.utils.getAddress(metamaskAddress);
    console.log(hexAddress);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const res = await sendUSDCBNB(
      signer,
      hexAddress,
      convertedToken.toString()
    ); // Remove parseFloat here
    console.log("Transaction successful");
    console.log("Calling USDC BNB", res);
    if (res.status === true) {
      createPayment.id = res.transactionHash;
      createPayment.status = true;
      createPayment.paymentMethod = "cryptocurrency";

      handlePlaceOrder();
    }
  };

  //end of usdcbnb with web3.js

  //sendin WBTC ETH
  const handleWBtcEth = async () => {
    try {
      const tax = 1;
      console.log("WBTC ETH");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let toPay = convertedToken.toFixed(8);
      const res = await sendWBTCETH(signer, hexAddress, toPay.toString()); // Remove parseFloat here
      console.log("Calling WBTCETH", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleBUSDEth = async () => {
    try {
      const tax = 1;
      console.log("BUSD ETH");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendBUSDETH(
        signer,
        hexAddress,
        convertedToken.toString()
      ); // Remove parseFloat here
      console.log("Calling BUSD", res);
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleBUSDBNB = async () => {
    try {
      const tax = 1;
      console.log("BUSD BNB");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendBUSDBNB(
        signer,
        hexAddress,
        convertedToken.toString()
      ); // Remove parseFloat here
      console.log("Calling ", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleDAIBNB = async () => {
    try {
      const tax = 1;
      console.log("Calling DAI BNB");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendDAIBNB(
        signer,
        hexAddress,
        convertedToken.toString()
      ); // Remove parseFloat here
      console.log("Calling BNB", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleDAIETH = async () => {
    try {
      const tax = 1;
      console.log("Calling DAI ETH");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendDAIETH(
        signer,
        hexAddress,
        convertedToken.toString()
      ); // Remove parseFloat here
      console.log("Calling DAIETH", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleMaticPolygon = async () => {
    try {
      const tax = 1;
      console.log("Calling Matic Polygon");
      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      let toPay = convertedToken.toFixed(18);
      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendMATIC(
        signer,
        hexAddress,
        convertedToken.toString()
      ); // Remove parseFloat here
      console.log("Calling BNB", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  const handleUSDTPolygon = async () => {
    try {
      const tax = "1";
      console.log("Calling USDT POLYGON");

      console.log(metamaskAddress);
      console.log(amountToPay);

      if (!metamaskAddress || !amountToPay) {
        throw new Error("Invalid address or amount");
      }

      const hexAddress = ethers.utils.getAddress(metamaskAddress);
      console.log(hexAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const res = await sendUSDTPOLY(hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Calling BNB", res);
      console.log("Transaction successful");
      console.log(res);
      if (res.status === true) {
        createPayment.id = res.transactionHash;
        createPayment.status = true;
        createPayment.paymentMethod = "cryptocurrency";

        handlePlaceOrder();
      }
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };

  const getConversionRate = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "binancecoin",
          vs_currencies: "usd",
        },
      }
    );
    console.log("conversion", response.data);
    const amountInEther = amountToPay / response.data.binancecoin.usd;
    console.log("conversion bnb:", amountInEther);
    setConvertedToken(amountInEther);
    // setConvertedToken(amountInEther)
    console.log("Token Price Converted ", convertedToken);

    return response.data.binancecoin.usd;
  };

  //_____________-now below script's will be for polygon
  const handleAddress = (index) => {
    // i know this is lengthy but this is all i got right now :)
    // setAmountToPay(itemPrice + calculate());
    let total = itemPrice + calculate();
    //THis is total price of const
    console.log(total);
    // This is Total Price of State, You can use both, it depends on you,
    console.log(amountToPay);

    // This is the recipient Address,(Right Now My Personal).
    console.log(metamaskAddress);

    //This is for ETH
    if (index === 0) {
      fetchTokenPriceUSD("ETH");
      setBank(false);
      setShowCryptoMethod(true);
      setCrypto(false);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);

      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);

      setEth(true);
    } else if (index === 1) {
      //BNB
      //for tst net
      fetchTokenPriceUSD("BNB");
      // getConversionRate();
      //for mainnet
      // fetchTokenPriceUSD("BNB");

      setBank(false);
      setShowCryptoMethod(true);
      setCrypto(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setEth(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setBnb(true);
    } else if (index === 2) {
      //This is for USDT
      fetchTokenPriceUSD("USDT");
      setCrypto(false);
      setUsdc(false);
      setShowCryptoMethod(true);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setEth(false);
      setBnb(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setUsdt(true);
    } else if (index === 3) {
      fetchTokenPriceUSD("USDC");
      setCrypto(false);
      setUsdcBnb(false);
      setBusdc(false);
      setShowCryptoMethod(true);
      setWbdc(false);
      setEth(false);
      setBnb(false);
      setUsdt(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setUsdc(true);
    } else if (index === 4) {
      fetchTokenPriceUSD("USDC");
      setCrypto(false);
      setBusdc(false);
      setWbdc(false);
      setEth(false);
      setShowCryptoMethod(true);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setUsdcBnb(true);
    } else if (index === 5) {
      setCrypto(false);
      fetchTokenPriceUSD("BUSDC");
      setShowCryptoMethod(true);
      setWbdc(false);
      setEth(false);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setBusdc(true);
    } else if (index === 6) {
      fetchTokenPriceUSD("WBTC");
      setCrypto(false);
      setEth(false);
      setShowCryptoMethod(true);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setWbdc(true);
    } else if (index === 7) {
      fetchTokenPriceUSD("BUSD");
      setCrypto(false);
      setEth(false);
      setShowCryptoMethod(true);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setBusdBnb(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setBusdEth(true);
    } else if (index === 8) {
      // 18Decimal
      fetchTokenPriceUSD("BUSD");
      setCrypto(false);
      setEth(false);
      setBnb(false);
      setShowCryptoMethod(true);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setBusdEth(false);
      setDaiBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setBusdBnb(true);
    } else if (index === 9) {
      //18Decimal
      fetchTokenPriceUSD("DAI");
      setCrypto(false);
      setEth(false);
      setBnb(false);
      setShowCryptoMethod(true);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setDaiBnb(true);
    } else if (index === 10) {
      fetchTokenPriceUSD("DAI");
      setCrypto(false);
      setEth(false);
      setShowCryptoMethod(true);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setDaiBnb(false);
      setBusdEth(false);
      setBusdBnb(false);
      setMaticPolygon(false);
      setUsdtPolygon(false);
      setDaiEth(true);
    } else if (index === 11) {
      fetchTokenPriceUSD("MATIC");
      setCrypto(false);
      setEth(false);
      setBnb(false);
      setShowCryptoMethod(true);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setDaiBnb(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiEth(false);
      setUsdtPolygon(false);
      setMaticPolygon(true);
    } else if (index === 12) {
      console.log("called");
      fetchTokenPriceUSD("USDT");
      setCrypto(false);
      setEth(false);
      setShowCryptoMethod(true);
      setBnb(false);
      setUsdt(false);
      setUsdc(false);
      setUsdcBnb(false);
      setBusdc(false);
      setWbdc(false);
      setDaiBnb(false);
      setBusdEth(false);
      setBusdBnb(false);
      setDaiEth(false);
      setMaticPolygon(false);
      setUsdtPolygon(true);
    }

    console.log(index);
  };

  console.log(itemPrice);

  // let amount = 43;

  // const sendETH = async (address, amountt = 45) => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const balance = await provider.getBalance(signer.address);
  //   console.log(signer, recipient, amountt);

  //   if (balance.lt(amountt)) {
  //     throw new Error("Insufficient balance");
  //   }

  //   const tx = await signer.sendTransaction({
  //     to: recipient,
  //     value: ethers.utils.parseEther(amountt.toString(), 18),
  //   });
  //   console.log(tx);
  //   return tx;
  // };
  const [bankDetails, setBankDetails] = React.useState({
    accTitle: "",
    bankName: "",
    accNumber: Number,
    swiftCode: "",
    routingNumber: "3467533",
    bankAddress: "",
  });

  const fetchBank = async () => {
    const res = await dispatch(GetLatestBankDetailsAction());
    console.log("bank", res?.data?.accounts);
    setBankDetails({
      ...bankDetails,
      accTitle: res?.data?.accounts?.accTitle,
      bankName: res?.data?.accounts?.bankName,
      accNumber: res?.data?.accounts?.accNumber,
      swiftCode: res?.data?.accounts?.swiftCode,
      bankAddress: res?.data?.accounts?.bankAddress,
    });
  };

  const [copy, setCopy] = React.useState(
    `Account Title: ${bankDetails?.accTitle} \nBank Name: ${bankDetails?.bankName} \nAccount Number: ${bankDetails?.accNumber} \nSwift Code: ${bankDetails?.swiftCode} \nRouting No: ${bankDetails?.routingNumber} \nBank Address: ${bankDetails?.bankAddress}`
  );

  useEffect(() => {
    fetchBank();
  }, []);

  const TotalAmount = () => {
    handleCalculate();
    setShowSummary(true);
  };

  const handleSubmitBank = (e) => {
    e.preventDefault();
    createPayment.id = paymentInfo.id;
    createPayment.status = true;
    createPayment.paymentMethod = "bank transfer";
    handlePlaceOrder();
  };
  console.log("PaymentId", paymentInfo.id);

  return (
    <>
      <Dialog
        // sx={{ background: "black" }}
        PaperProps={{ sx: { background: "#2b2b2b", color: "white" } }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          {!showSummary ? "GDPR" : "Payment Details"}
        </DialogTitle>
        {!showSummary ? (
          <>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                sx={{ color: "white" }}
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                The GDPR is designed to give individuals greater control over
                their personal data and to unify data protection regulations
                across the EU. It sets out rules for how companies must collect,
                process, store and protect personal data, and gives individuals
                the right to access, correct and erase their personal data.
                Under the GDPR, organizations must obtain explicit consent from
                individuals before collecting and processing their personal
                data, and must take measures to protect that data from breaches
                or unauthorized access. They are also required to appoint a data
                protection officer (DPO) to oversee compliance with GDPR
                regulations. Failure to comply with GDPR can result in
                significant fines, with penalties of up to 4% of a company's
                global annual revenue or €20 million (whichever is greater) for
                serious violations.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <FormControlLabel
                sx={{ mr: "auto" }}
                label='Agree to the Terms of Service, Privacy Policy and GDPR'
                control={
                  <Checkbox
                    color='success'
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    onChange={handleChange}
                    checked={checked}
                    // sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
              />

              <NavBtn
                sx={{ height: "40px", width: "150px" }}
                disabled={!checked}
                onClick={TotalAmount}
              >
                Continue
              </NavBtn>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent
              dividers={scroll === "paper"}
              sx={{ minWidth: "300px", width: "550px" }}
            >
              <DialogContentText
                // sx={{ color: "white" }}
                id='scroll-dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{
                  color: "white",
                  padding: "20px 0px",
                  "& > div": {
                    mb: 3,
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Total Item Prices: </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                    {itemPrice}£
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography> Shipping: </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                    {calculate()}£
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography> Net Total: </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                    {itemPrice + calculate()}£
                  </Typography>
                </Box>
                {expectedDelivery && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography> Expected Delivery: </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: "19px" }}>
                      {expectedDelivery} days
                    </Typography>
                  </Box>
                )}

                <Grid container rowGap={1} columnGap={2}>
                  <Grid item xs={11.5} sm={11.8} md={11.9} lg={11.9}>
                    <Button
                      sx={{
                        textTransform: "none",
                        color: "white",
                        height: "52px",
                        background: "#2e2a2a",
                        borderRadius: "10px",
                        "&:hover": {
                          background: "#D9D9D9",
                          color: "black",
                        },
                        "&:focus": {
                          background: "#D9D9D9",
                          color: "black",
                        },
                      }}
                      fullWidth
                      // variant='outlined'
                      onClick={handleBank}
                    >
                      Bank Transfer
                    </Button>
                  </Grid>
                  <Grid item xs={11.5} sm={11.5} md={11.9} lg={11.9}>
                    <Button
                      fullWidth
                      sx={{
                        textTransform: "none",
                        color: "white",
                        height: "52px",
                        background: "#3A3A3A",
                        borderRadius: "10px",
                        "&:hover": {
                          background: "#D9D9D9",
                          color: "black",
                        },
                        "&:focus": {
                          background: "#D9D9D9",
                          color: "black",
                        },
                      }}
                      onClick={handleCrypto}
                    >
                      Cryptocurrencies
                    </Button>
                  </Grid>
                </Grid>
                {crypto ? (
                  <Grid container rowGap={1} columnGap={2} sx={{ mt: "20px" }}>
                    {paymentDetails.map((data, index) => (
                      <Grid
                        item
                        xs={11.5}
                        sm={11.8}
                        md={5.8}
                        lg={5.8}
                        key={index}
                      >
                        <GridBox onClick={() => handleAddress(index)}>
                          <img
                            src={data.img}
                            alt='bitcoin'
                            style={{ width: "30px" }}
                          />
                          <Box sx={{ ml: "12px" }}>
                            <Typography sx={{ fontSize: "14px" }}>
                              {data.title}
                            </Typography>
                            <Typography sx={{ fontSize: "14px" }}>
                              {/* {data.price} */}
                            </Typography>
                          </Box>
                        </GridBox>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  ""
                )}
                {/* //Bank Details  */}

                {bank ? (
                  <Box sx={{ mt: 5 }}>
                    <Grid container rowGap={1} columnGap={1}>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Account Title</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.accTitle}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Bank Name</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.bankName}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Account Number</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.accNumber}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Swift Code</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.swiftCode}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Routing No</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.routingNumber}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                      <Grid item lg={5.8} md={5.8} sm={11.8} xs={11.8}>
                        <Label>Bank Address</Label>

                        <CssTextField
                          disabled
                          sx={{
                            color: "white",
                            // WebkitTextFillColor: "white !important",
                            "& .MuiInputBase-input": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                          InputProps={{
                            style: textFieldStyled,
                          }}
                          value={bankDetails?.bankAddress}
                          inputProps={{
                            sx: { color: "white" },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <CopyToClipboard text={copy}>
                      <NavBtn variant='contained' sx={{ width: "180px" }}>
                        Copy to clipboard
                      </NavBtn>
                    </CopyToClipboard>
                    <Box>
                      <Title sx={{ mb: 3, mt: 5 }}>
                        Already Paid? Enter Payment Id
                      </Title>
                      <Box>
                        <form onSubmit={handleSubmitBank}>
                          <Label>Transaction Id</Label>

                          <CssTextField2
                            // disabled
                            required
                            sx={{
                              color: "white",
                              // WebkitTextFillColor: "white !important",
                              "& .MuiInputBase-input": {
                                WebkitTextFillColor: "white !important",
                              },
                            }}
                            InputProps={{
                              style: textFieldStyled,
                            }}
                            value={paymentInfo.id}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                id: e.target.value,
                              })
                            }
                            inputProps={{
                              sx: { color: "white" },
                            }}
                          />
                          <br></br>
                          <NavBtn type='submit' sx={{ mt: 2 }}>
                            Submit
                          </NavBtn>
                        </form>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}

                {/* //Crypto Currencies */}
                {showCryptoMethod ? (
                  <>
                    {eth ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send Ethereum to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} ETH
                          </Typography>
                          <NavBtn onClick={handleEther} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}

                    {bnb ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send BNB to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} BNB
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} BNB
                          </Typography>
                          <NavBtn onClick={handleBnb} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {usdt ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send USDT ETH to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} USDT ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} USDT ETH
                          </Typography>
                          <NavBtn onClick={handleUSDT} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {usdc ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send USDC ETH to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} USDC ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} USDC ETH
                          </Typography>
                          <NavBtn onClick={handleUSDCETH} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {usdcBnb ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send USDC BNB to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} USDC BNB
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} USDC BNB
                          </Typography>
                          <NavBtn onClick={handleUSDCBNB} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {busdc ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send BUSDC BSC to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} BUSDC BSC
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} BUSDC BSC
                          </Typography>
                          <NavBtn onClick={handleBUSDBSC} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {wbdc ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send WBTC ETH to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} WBTC ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} WBTC ETH
                          </Typography>
                          <NavBtn onClick={handleWBtcEth} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {busdEth ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send BUSD ETH to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} BUSD ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} BUSD ETH
                          </Typography>
                          <NavBtn onClick={handleBUSDEth} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {busdBnb ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send BUSD BNB to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} BUSD BNB
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} BUSD BNB
                          </Typography>
                          <NavBtn onClick={handleBUSDBNB} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {daiBnb ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send DAI BNB to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} DAI BNB
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} DAI BNB
                          </Typography>
                          <NavBtn onClick={handleDAIBNB} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {daiEth ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send DAI ETH to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} DAI ETH
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} DAI ETH
                          </Typography>
                          <NavBtn onClick={handleDAIETH} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {maticPolygon ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send Matic Polygon to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} Matic Polygon
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} Matic Polygon
                          </Typography>
                          <NavBtn onClick={handleMaticPolygon} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                    {usdtPolygon ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: {
                              lg: "35px",
                              md: "35px",
                              sm: "20px",
                              xs: "15px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "206px",
                              height: "202px",
                              background: "#D9D9D9",
                              borderRadius: "10px",
                              margin: "0 auto",
                              mb: 5,
                            }}
                          ></Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            Pay Manually
                          </Typography>
                          <Typography sx={{ fontWeight: 600 }}>
                            Send USDT Polygon to this address
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {metamaskAddress}{" "}
                            <CopyToClipboard
                              title='copy address'
                              style={{
                                // marginTop: "5px",
                                marginLeft: "5px",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                              text={copiedValue}
                            >
                              {copiedIcon ? (
                                <DoneIcon sx={{ color: "#09CA0C" }} />
                              ) : (
                                <ContentCopyIcon
                                  sx={{ color: "#09CA0C" }}
                                  onClick={handleCopyIcon}
                                />
                              )}
                            </CopyToClipboard>{" "}
                            {convertedToken} USDT Polygon
                          </Typography>
                          <Typography sx={{ fontWeight: 600, mt: 5 }}>
                            Amount to pay
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 300, fontSize: "14px" }}
                          >
                            {convertedToken} USDT Polygon
                          </Typography>
                          <NavBtn onClick={handleUSDTPolygon} sx={{ mt: 2 }}>
                            Pay with web3 connect
                          </NavBtn>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <FormControlLabel
                sx={{ mr: "auto" }}
                label='Agree to the Terms of Service, Privacy Policy and GDPR'
                control={
                  <Checkbox
                    color='success'
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    onChange={handleChange}
                    checked={checked}
                    // sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
              /> */}
              {/* <Checkbox
            label='Agree'
            color='success'
            sx={{ mr: "auto", "& .MuiSvgIcon-root": { fontSize: 28 } }}
            onChange={handleChange}
            checked={checked}
          /> */}
              {/* <NavBtn sx={{ mr: 1 }} onClick={handleClose}>
                Cancel
              </NavBtn> */}

              <NavBtn
                sx={{ height: "34px", width: "150px" }}
                disabled={!checked}
                onClick={handlePlaceOrder}
              >
                Place Order
              </NavBtn>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default DialogForPrivacy;
