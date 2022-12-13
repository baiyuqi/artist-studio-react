import { create as ipfsHttpClient } from "ipfs-http-client";
import useArConnect from "use-arconnect"
import { messageBox } from "../service/message-service"
import { ArweaveWebWallet } from 'arweave-wallet-connector'
import React from "react";
function Test() {
   const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const ar = useArConnect()



  const test = async () => {
    debugger
    await webWallet()

    messageBox("success", "", "kkk")




  }
  async function webWallet() {

    const wallet = new ArweaveWebWallet({
      // optionally provide information about your app that will be displayed in the wallet provider interface
      name: 'Your application name',
      logo: 'URL of your logo to be displayed to users'
    })

    wallet.setUrl('arweave.app')
    if(!isWalletConnected){
      await wallet.connect() // on user gesture to avoid blocked popup
      setIsWalletConnected(true)
    }else{
      await wallet.disconnect() // on user gesture to avoid blocked popup
      setIsWalletConnected(false)
    }
  }
  async function ArConnect() {

    await ar.connect(["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY", "SIGN_TRANSACTION"]);

  }
  return (
    <div>

      <a href="javascript:void(0);" onClick={test}>
        Test
      </a>


    </div>

  )
}

export default Test
