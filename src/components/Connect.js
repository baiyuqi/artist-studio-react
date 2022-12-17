import { ethers } from "ethers";
import { connect } from '../service/connection-service'
import { ConnectWallet } from "@thirdweb-dev/react";

import 'react-notifications-component/dist/theme.css'

function Connect() {
    const connectWallet = async () => {
        await connect();
    }
  return (
    <>
 
 <ConnectWallet className="primary" accentColor="#dddddd" colorMode="light" />
          

    </>

  )
}

export default Connect
