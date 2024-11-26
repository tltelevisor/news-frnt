import classes from './Button/Button.module.css'
import TopicTextSection from './TopicTextSection'

export default function TabPrdSection(products) {

    const result = Object.keys(products).map((key) => products[key]);

    const DisplayData = result.map(
        (info) => {
            return (
                <tr>
                    <td>
                        <TopicTextSection
                            style={{ marginBottom: '1rem', width: "100%" }}
                            topic={info.title} long_text={info.description}
                        >

                        </TopicTextSection>
                    </td>

                    <td className={classes.table_r}>

                        <TopicTextSection
                            style={{ marginBottom: '1rem', marginLeft: '1rem', width: "100%", textAlign: "center" }}
                            topic={info.prob} long_text={info.just}
                        >

                        </TopicTextSection>

                    </td>

                </tr>
            )
        }
    )

    return (
        <div>
            <table >
                <thead>
                    <tr>
                        <th>
                            <div style={{ textAlign: "left" }}>

                                Продукт
                            </div>
                        </th>
                        <th>
                            <div style={{ padding: "5px", marginLeft: '1rem', textAlign: "center" }}>
                                Вероятность
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
}