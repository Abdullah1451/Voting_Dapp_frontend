
// import { ethers } from 'ethers';
// import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Voting from './artifacts/contracts/Voting.sol/Voting.json'
import AddCandidates from './Pages/AddCandidates';
import Main from './Pages/Main';
import Login from './Components/Login';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
// import Voting from './artifacts/contracts/Voting.sol/Voting.json'
const votingAddress = "0xE9B245B509981d4Ab71b132faC95aA5f48aF2Ecc"
// const votingAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

function App() {
  const [accountAddress, setAccountAddress] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [owwner, setOwner] = useState();

  useEffect(() => {
    fetchOwner()
    currentStatusAccount()
  }, [accountAddress])


  async function requestAccount() {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
        try{
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccountAddress(account[0]);
            currentStatusAccount()
            // window.location.reload()

        }catch(e){
            console.log("Error: "+e.message);
        }
    } else{
        console.log("Please install MetaMask");
    }
  }
  async function fetchOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
      try {
        const data = await contract.getOwner()
        setIsOwner(ethers.utils.getAddress(accountAddress) === ethers.utils.getAddress(data))
        // console.log("gjfdk", ethers.utils.getAddress(accountAddress) == ethers.utils.getAddress(data));
        setOwner(data)
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    currentStatusAccount();
  }, [])
  async function currentStatusAccount() {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (account.length > 0) {
          setAccountAddress(account[0]);

        } else {
          console.log("Connect to MetaMask using the connect button");
        }
      } catch (e) {
        console.log("Error: " + e.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  // console.log("isowner", isOwner, "hello");
  return (





    <>
      <Header />
      <Routes>
        <>

          {!isOwner ?

            <>
              <Route exact path="/" element={<Login setAccountAddress={setAccountAddress} accountAddress={accountAddress} requestAccount = {requestAccount} />} />
              <Route exact path="/home" element={<Main cssClasss = "Candidates__card" />} />

            </>

            :

            <>
              <Route path="/" element={<AddCandidates />} />
            </>

          }
        </>
      </Routes>
    </>





  );
}

export default App;
