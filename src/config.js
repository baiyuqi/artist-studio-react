export const NetworkConfiguration = {
    
    chainId: 0x7A69,
    nftAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",

    params: [{
        chainId: '0x7A69',
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-testnet",
        nativeCurrency: {
            name: "MYETH",
            symbol: "MYETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]

    }]

    

}
export const rpcUrl = ()=>{
    return NetworkConfiguration.params[0].rpcUrls[0];
}

