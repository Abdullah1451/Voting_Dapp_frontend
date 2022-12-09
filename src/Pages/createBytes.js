const ethers = require('ethers');

export async function createBytes32(str) {
    const args = process.str.slice(2);
    const name = args[0];
    const bytes = await ethers.utils.formatBytes32String(name) ;
    return bytes;
    // console.log("Bytes: " ,bytes);
}

export default async function createString(hex) {
    // const name = args[0];
    const str = ethers.utils.parseBytes32String(hex);
    return str;
    // console.log("Bytes: " ,bytes);
}


