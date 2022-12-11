import { useEffect, useState } from "react"
import NftBrowser from "../common/NftBrowser"
import { myArticles } from "../../service/arweave-service"

function ArticleList() {
    const [articles, setArticles] = useState<any[]>([])

    useEffect(() => {
        loadArticles();

    }, []);

    const loadArticles = async () => {
        const ns = await myArticles();

        setArticles(ns)
        console.log("mounted!")
    }
    return (
        <div className="main">
            {articles.map(article => {
                return (<div>
                    {article.node.id}
                </div>)
            })}
        </div>
    )
}
export default ArticleList