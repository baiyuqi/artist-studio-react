import { create as ipfsHttpClient } from "ipfs-http-client";
import useArConnect from "use-arconnect"
import { messageBox } from "../service/message-service"

function Test() {
 // const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const ar = useArConnect()



    const test = async () => {
      debugger
      await ArConnect()
      messageBox("success", "", "kkk")
            
 
     
      
    }
    async function ArConnect(){
     
      await ar.connect(["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY","SIGN_TRANSACTION"]);

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
