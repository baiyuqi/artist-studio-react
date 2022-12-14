import Arweave from "arweave";
import { keyframes } from "styled-components";
import { messageBox } from "../service/message-service"
import { recipientQuery, ownersQuery } from './arweave-query-api';
const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
});

export const toArweave = async function (entity) {


    let tx = await arweave.createTransaction({
        data: entity,
    });
    tx.addTag('Content-Type', 'image/jpeg');

    await arweave.transactions.sign(tx);//
    const response = await arweave.transactions.post(tx);

    const myurl = "http://127.0.0.1:1984/" + tx.id;
    messageBox("success", "", myurl)

    return myurl;
}
export const imageToArweave = async function (file) {
    const data = await readImageFile(file)

    const url = toArweave(data);

    return url;
}

const readImageFile = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {


        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.onerror = (event) => {
            reject(event)
        }

        reader.readAsArrayBuffer(file)
    })
}
export const storeArticle = async function (content, tags) {


    let tx = await arweave.createTransaction({
        data: content,
    });
    Object.keys(tags).map((k)=>{
        tx.addTag(k, tags[k]);
    })
  //  tx.addTag('Content-Type', 'text/html');
  //  tx.addTag('Domain-Type', 'article');
    await arweave.transactions.sign(tx);//
    const response = await arweave.transactions.post(tx);

    const myurl = "http://127.0.0.1:1984/" + tx.id;
    messageBox("success", "", myurl)

    return myurl;
}
export const myArticles = async () => {

    try {
        const wallet = window.arweaveWallet
        const currentAddress = await wallet.getActiveAddress()
 
        const query = ownersQuery(currentAddress);
        const results = await arweave.api.post(`graphql`, query)
            .catch(err => {
                console.error('GraphQL query failed');
                throw new Error(err)
            });

        const edges = results.data.data.transactions.edges;
        return edges;
    }
    catch (error) {
        console.log(error);
    }
}