import { useEffect, useState } from "react"
import NftBrowser from "../common/NftBrowser"
import { myArticles } from "../../service/arweave-service"
import { Typography,Table, Pagination, Card, Modal, Button, Form, Input, InputNumber, Select, Checkbox, Radio, notification } from 'antd'

function ArticleList() {
    const [articles, setArticles] = useState<any[]>([])
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
        },
        {
            title:     'ID',
            dataIndex: 'id',
            width: 100,
            ellipsis:true
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 500,
            render: (text:string) => <a href="javascript: void(0)" target="_self" >{text}</a>
        },
        {
            title: '内容',
            dataIndex: 'content'
        },
    ]
    useEffect(() => {
        loadArticles();

    }, []);

    const loadArticles = async () => {
        debugger
        const ns = await myArticles();
        const as = ns.map((a:any, index:number)=>{
            const ttag = a.node.tags.filter((e:any)=>{
                const istitle =  e.name==="title"
                return istitle
             })
             const title = ttag.length == 1?ttag[0].value:"unknown"

            return {index,id: a.node.id, shortId: a.node.id.substring(0,10) + "...", title: title, content: "pp" }
    })
        setArticles(as)
        console.log("mounted!")
    }

    return (

        <div>
         

            <Table
                onRow={record => {
                    return {
                        onClick: event => { console.log(record) }, // 点击行
                        onDoubleClick: event => { },
                        onContextMenu: event => { },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}

                columns={columns}
                dataSource={articles}

                bordered
            >
            </Table>
        </div>
    )
}
export default ArticleList