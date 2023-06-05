import { Box, Button, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CssTextField,
  Label,
  HeadComponent,
  NavBtn,
  PageTitle,
  textFieldStyled,
  CssTextField2,
  Title,
} from "../../Styles/CommonStyles";
import { GetLatestBankDetailsAction } from "../../Redux/actions";
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
import { ethers } from "ethers";
import { Web3 } from "web3";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const CryptoPay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //My Metamask Address
  const [metamaskAddress, setMetamaskAddress] = useState(
    "0x88F1a562c9Eb7aE732B3C7eB94F4B77E5c437e8B"
  );

  //!Handle Copy Address
  const [copiedValue, setCopiedValue] = React.useState(metamaskAddress);
  const [copiedIcon, setCopiedIcon] = React.useState(false);

  const handleCopyIcon = () => {
    setCopiedIcon(true);
    setTimeout(() => {
      setCopiedIcon(false);
    }, 2000);
  };

  const [checked, setChecked] = React.useState(false);
  const [crypto, setCrypto] = React.useState(false);
  const [showCryptoMethod, setShowCryptoMethod] = React.useState(false);
  const [amountToPay, setAmountToPay] = React.useState(0);
  const [connected, setConnected] = useState(false);
  const [bank, setBank] = useState(false);
  const [account, setAccount] = useState("");
  const [convertedToken, setConvertedToken] = useState("");

  //!  Conditions to show wallet depending on action
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

  // !To Show Crypto Currencies
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

  // ! To Show Bank Details
  const handleBank = () => {
    setCrypto(false);
    setBank(true);
    setShowCryptoMethod(false);
  };
  //! Fetch Bank Details
  const [bankDetails, setBankDetails] = React.useState({
    accTitle: "",
    bankName: "",
    accNumber: Number,
    swiftCode: "",
    routingNumber: "3467533",
    bankAddress: "",
  });
  const [paymentInfo, setPaymentInfo] = React.useState({
    status: true,
    id: "",
    method: "bank",
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

  // ! Fetch Bank Details Section Ends here

  //! Conditional Rendering Starts from here
  const handleAddress = (index) => {
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
    {
      img: "/assets/polygonlogo.png",
      title: "USDT POLYGON",
      price: "0.0000006",
    },
  ];

  //!Change To Token Price
  function fetchTokenPriceUSD(tokenSymbol) {
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`;

    return axios
      .get(apiUrl)
      .then((response) => {
        const priceData = response.data;
        const usdPrice = priceData.USD;
        // const etherPriceUSD = 1800;
        console.log("Token Price in USD:", usdPrice);
        const amountToPay = 1;

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

  //! To Send Bank Details
  let cryptoPayment = {
    method: "crypto",
    id: "",
    status: true,
  };

  //Crypto Payment To handle
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
      await sendETH(signer, hexAddress, toPay);
      // await sendDAIETH(signer,hexAddress,"0.002");
      // await sendUSDTPOLY(hexAddress,"0.2");
      // await sendBUSDETH(signer,hexAddress,"0.1");
      // await sendBUSDBNB(signer,hexAddress,"0.1");
      // await sendDAIBNB(signer,hexAddress,"0.2");
      // await sendMATIC(signer, hexAddress, tax.toString());
      console.log("Transaction successful");
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

      await sendUSDCETH(signer, hexAddress, convertedToken.toString());
      console.log("Transaction successful");
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
        cryptoPayment.id = res.transactionHash;

        handlePaymentStatus();
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
      await sendUSDT(signer, hexAddress, convertedToken);
      console.log("Transaction successful");
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
      await sendBUSD(signer, hexAddress, convertedToken.toString());
      console.log("Transaction successful");
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
    await sendUSDCBNB(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
    console.log("Transaction successful");
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
      await sendWBTCETH(signer, hexAddress, toPay.toString()); // Remove parseFloat here
      console.log("Transaction successful");
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
      await sendBUSDETH(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Transaction successful");
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
      await sendBUSDBNB(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Transaction successful");
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
      await sendDAIBNB(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
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
      await sendDAIETH(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Transaction successful");
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
      await sendMATIC(signer, hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Transaction successful");
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
      await sendUSDTPOLY(hexAddress, convertedToken.toString()); // Remove parseFloat here
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error handling WBTC-ETH:", error);
      // Handle the error as needed
    }
  };
  console.log("paymentInfo", paymentInfo);

  const handleSubmitBank = (e) => {
    e.preventDefault();
  };

  const handlePaymentStatus = (value) => {
    // dispatch(ChangePaymentStatusOfOrder(cryptoPayment))
  };

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "64px" }}>
        <HeadComponent>
          <NavBtn onClick={() => navigate("/")}>Back</NavBtn>
          <PageTitle sx={{ mt: 5, mb: 3 }}>Choose Payment Options</PageTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
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
            <Grid item xs={12} sm={6} md={6} lg={6}>
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
                onClick={handleCrypto}
              >
                Crypto Currencies
              </Button>
            </Grid>
          </Grid>
          {/* //! SHOW bANK dETAILS  */}
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
                        setPaymentInfo({ ...paymentInfo, id: e.target.value })
                      }
                      inputProps={{
                        sx: { color: "white" },
                      }}
                    />
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
          {/* //! Show Crypto Options */}
          {crypto ? (
            <Grid container rowGap={1} columnGap={2} sx={{ mt: "20px" }}>
              {paymentDetails.map((data, index) => (
                <Grid item xs={11.5} sm={11.8} md={5.88} lg={5.91} key={index}>
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
          {/* // ! CryptoCurrencies */}
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
                    <Typography sx={{ fontWeight: 300, fontSize: "14px" }}>
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
        </HeadComponent>
      </Box>
      <Footer />
    </>
  );
};

export default CryptoPay;
