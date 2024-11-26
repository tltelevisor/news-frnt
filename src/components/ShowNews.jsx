import TabPrdSection from './TabPrdSection'

export default function ShowNews({ id, date, news, link, news_text, products }) {

    return (
        <li>
            <a href={link} style={{ padding: "5px" }}>{news}</a>
            <p style={{ padding: "5px" }}>{date}</p>
            <TabPrdSection key={id + '_' + products.id} {...products}></TabPrdSection>
        </li>
    )
}

