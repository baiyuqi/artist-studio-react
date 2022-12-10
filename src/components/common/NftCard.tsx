import { Card } from 'antd';
import type { Nft } from '../../service/types';
const { Meta } = Card;

function NftCard({nft}:{nft:Nft}){
    return(
        <Card
       
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={nft.imageUri} />}
      >
        <Meta title={nft.name} description={nft.descriptipn} />
      
    </Card>
    )
}
export default NftCard