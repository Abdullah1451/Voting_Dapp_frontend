import React, { useState } from 'react'
import { useEffect } from 'react'
import { ethers } from 'ethers';

import Voting from '../artifacts/contracts/Voting.sol/Voting.json'
import Main from './Main';

const votingAddress = "0xE9B245B509981d4Ab71b132faC95aA5f48aF2Ecc"


function AddCandidates() {
    const [allCandidate, setAllCandidate] = useState();
    const [partyName, setPartyName] = useState("");
    const [candidateName, setCandidateName] = useState("");

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    async function addCandidate() {

        if (!candidateName && !partyName) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
            const transaction = await contract.registerParty(candidateName, partyName);
            setCandidateName("");
            setPartyName("");
            await transaction.wait();
            if (transaction) {
                window.location.reload()
            }
        }
    }
    // async function fetchTotalVotes() {
    //     if (typeof window.ethereum !== 'undefined') {
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
    //         try {
    //             const data = await contract.totalVotes(candidateDetailId)
    //             console.log('Number of Candidates: ', parseInt(data._hex));
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }
    async function fetchVoters() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
            try {
                const data = await contract.getNumOfVoters()
                console.log('Number of Voters: ', parseInt(data._hex));
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className='add__candidate'>
            <Main owner={true} cssClasss="Candidates__card1" />
            <div className='add__candidate__card boxShadow'>
                <div>
                    <div className='add__candidate__card__input'>
                        <label> Candidate Name </label>
                        <input className="App-input boxShadow" placeholder='Candidate Name' type="text" onChange={(e) => setCandidateName(e.target.value)} value={candidateName} />
                    </div>
                    <div className='add__candidate__card__input'>
                        <label>Party Name</label>
                        <input className="App-input boxShadow" placeholder='Party Name' type="text" onChange={(e) => setPartyName(e.target.value)} value={partyName} />
                    </div>
                </div>
                <div >
                    <button className="Button boxShadow" onClick={addCandidate}>Add Candidate</button>

                </div>
            </div>
        </div>
    );
}

export default AddCandidates;