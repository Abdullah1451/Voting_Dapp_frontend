import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import '../App.css';
import img0 from "../assets/AAp.jpg"
import img from "../assets/BJP.png"
import img1 from "../assets/Bahujan.webp"
import img2 from "../assets/congress.png"
import img3 from "../assets/Trinamool.jpg"
// import CandidateList from './Pages/CandidateList';
import Voting from '../artifacts/contracts/Voting.sol/Voting.json'
const votingAddress = "0xE9B245B509981d4Ab71b132faC95aA5f48aF2Ecc"
const images = { bjp: img, bsp: img1, aap: img0, congress: img2, aitc: img3 }
function Main(props) {

    const [allCandidate, setAllCandidate] = useState();
    // const [candidateId, setCandidateId] = useState("");
    // const [uid, setUid] = useState("");
    // const [candidateName, setCandidateName] = useState("");
    // const [partyName, setPartyName] = useState("");
    // const [candidateDetailId, setCandidateDetailId] = useState();

    console.log(typeof (uid))

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function fetchCandidates() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
            try {
                const data = await contract.getNumOfCandidates()
                console.log('Number of Candidates: ', parseInt(data._hex));
            }
            catch (err) {
                console.log(err.message);
            }
        }
    }

    async function setVoting(item) {
        // console.log(voting)
        console.log(item)
        let party = item?.[1]
        let email = localStorage.getItem('email')
        if (!party && !email) return
        if (typeof window.ethereum !== 'undefined') {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(votingAddress, Voting.abi, signer);
                const transaction = await contract.registerEmail(email, party);
                // setCandidateId("")
                // setUid("");
                await transaction.wait();


            } catch (error) {
                alert(error)
            }
        }
    }

    useEffect(() => {
        getCandidate()
    }, [])
    const getCandidate = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
            try {
                const totalCandidates = await contract.getAllCandidates()
                console.log('All Candidates: ', totalCandidates);
                setAllCandidate(totalCandidates)
            }
            catch (err) {
                console.log(err.message);
            }
        }
    }
    const selectCandiate = (item) => {
        console.log(item, "item");
    }
    console.log("all cand", allCandidate);
    return (
        <div className="App">
            <div className='Candidates'>
                {
                    allCandidate?.map(item => {
                        let logo = images?.[item[1]?.toLowerCase()]
                        return (
                            <div onClick={() => selectCandiate(item)} className={props.cssClasss}>

                                <div className='vote__card'>
                                    <img src={logo} alt="part logo" />

                                    <div className='vote__button'>
                                        <p>{item[1]}</p>
                                        {!props.owner && <button onClick={() => setVoting(item)} className='boxShadow Button'>VOTE</button>}
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }

            </div>

        </div>
    )
}

export default Main