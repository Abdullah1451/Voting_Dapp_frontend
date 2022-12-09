// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.16 <0.9.0;

contract Voting {

    event AddedCandidate(uint candidateID);

    address owner;
    constructor() {
        owner=msg.sender;
        // console.log("Deploying a Greeter with greeting: ");
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    struct Voter {
        string email; 
        string party;
    }
    
    struct Candidate {
        string name;
        string party; 
    }

    uint numCandidates; 
    uint numVoters;

    mapping (uint => Candidate) candidates;
    mapping (uint => Voter) voters;
    mapping (string => bool) registeredEmail;
    mapping (string => bool) isRegisteredParty;

    function getAllCandidates() public view returns (Candidate[] memory ) {
        Candidate[] memory ret = new Candidate[](numCandidates);
        for (uint i = 0; i < numCandidates; i++) {
            ret[i] = candidates[i];
        }
        return ret;
    }


    function addCandidate(string memory name, string memory party) onlyOwner internal{
        uint candidateID = numCandidates++;

        candidates[candidateID] = Candidate(name,party);
        emit AddedCandidate(candidateID);
    }

    function getNumOfVoters() onlyOwner public view returns(uint) {
        return numVoters;
    }

    function totalVotes(string memory _party) public view returns (uint) {
        uint numOfVotes = 0; 
        for (uint i = 0; i < numVoters; i++) {
            if (keccak256(bytes(voters[i].party)) == keccak256(bytes(_party))) {
                numOfVotes++;
            }
        }
        return numOfVotes; 
    }

    function addVote(string memory _name, string memory _party) internal {
        if (isRegisteredParty[_party] == true) {
            uint voterID = numVoters++; //voterID is the return variable
            voters[voterID] = Voter(_name, _party);
        }
    }

    function registerParty(string memory _name, string memory _party) public {
        require(!isRegisteredParty[_party], 'This Party is already registered');
        addCandidate(_name, _party);
        isRegisteredParty[_party] = true; // mark it as registered
    }

    function registerEmail(string memory _email, string memory _party) public {
        require(!registeredEmail[_email], 'This Email is already registered');
        require(isRegisteredParty[_party], 'This party does not exist');
        addVote(_email, _party);
        registeredEmail[_email] = true; // mark it as registered
    }

    function getOwner() public view returns(address) {
        return owner;
    }
}