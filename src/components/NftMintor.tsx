import { useState } from "react"

import React from 'react';
import { mintNFT } from '../service/nft-service';

import { messageBox } from "../service/message-service"
import { toArweave, imageToArweave } from "../service/arweave-service"
import { Button, Checkbox, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { NftMeta } from "../service/types";
import { Upload } from 'antd';
import { useNavigate } from "react-router-dom"
import styles from './NftMintor.module.css'
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    }
}
function NftMinter() {

    const navigate = useNavigate()
    const [meta, updateMeta] = useState<NftMeta>({ name: "", descriptipn: "", imageUri: "" })
    const [uri, setUri] = useState("")
    const store = async (file: any) => {
        try {


            const imageuri = await imageToArweave(file)//addToIpfs(image)
            messageBox("success", "", imageuri)
            setUri(imageuri);
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }

    const mint = async () => {
        try {
            const data: NftMeta = { ...meta, imageUri: uri }
            const json = JSON.stringify(data);
            const metauri = await toArweave(json)//addToIpfs(json)
            messageBox("success", "", metauri)
            const { success, tokenId } = await mintNFT(metauri);

            if (success) {
                messageBox("success", "", tokenId)
                navigate("/nft-browser")
                // router.push("/mynft")
            } else {
                messageBox("danger", "", "mint failed")
            }
        } catch (error) {
            if (error instanceof Error)
                messageBox("danger", "", error.message)
        }
    }


    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <Input
                    placeholder="Asset Name"
                      className={styles.NftField}
                    onChange={(e) => updateMeta({ ...meta, name: e.target.value })}

                />


                <Input.TextArea
                    placeholder="Asset Description"
                      className={styles.NftField}
                    onChange={(e) => { updateMeta({ ...meta, descriptipn: e.target.value }) }}
                />

                <Input
                    type='file'
                    placeholder="Asset Image"
                    className={styles.NftField}
                    onChange={(e) => { e.target.files&&store(e.target.files[0]) }}
                />


                <img width="350" src={uri} className={styles.NftImage}/>


                <Button type="primary" onClick={mint} >
                    铸币
                </Button >



            </div>

        </div>
    )
}

export default NftMinter