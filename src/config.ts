type NetworkConfiguration = {
     
    chainId: number,
   
    nftAddress: string,

    params: {
        chainId: string,
        rpcUrls:string[],
        chainName: string,
        nativeCurrency: {
            name: string,
            symbol: string,
            decimals: number
        },
        blockExplorerUrls:string []

    }[]
}
 const confs: NetworkConfiguration[]=[ {
    
    chainId: 0x7A69,
   
    nftAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",

    params: [{
        chainId: '0x7A69',
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-hardhat",
        nativeCurrency: {
            name: "MYETH",
            symbol: "MYETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]

    }]

    

},
{
    

    chainId: 0x539,
    nftAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",

    params: [{
        chainId: '0x0539',
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-ganache",
        nativeCurrency: {
            name: "GETH",
            symbol: "GETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]

    }]

    

}
]
export const configuration = ()=> confs[selection]
const selection = 0
export const rpcUrl = ()=>{
    return confs[selection].params[0].rpcUrls[0];
}

