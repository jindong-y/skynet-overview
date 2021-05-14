import img from './images/image1.png'

import Gauge from "./Gauge"
import * as styles from "./styles.module.css";
import React, {useEffect} from "react";
import Axios from "axios";

function Overview() {

    return (

        <div className={styles.overview}>
            <Title/>
            <TableView/>
        </div>
    )
}

function Title() {

    return (
        <div className={styles.frame5369}>
            <div className={styles.frame5370}>
                <img src={require('./images/image1.svg').default} alt=""/>
                <h1> DYP.Finance </h1>
            </div>
            <h1> - Skynet Overview </h1>
        </div>
    )
}

function TableView() {

    const [data, setDate] = React.useState();

    useEffect(() => {
        console.log("fetch data")

        Axios.get('https://www.certik.org/api/quickscan/project?projectId=pancakeswap')
            .then((response) => {
                setDate(response.data?.primitives)
                console.log("get response", response)
            })
            .catch((error) => console.error(error));

    }, []);


    return (
        <div className={styles.frame5365}>
            <div className={styles.frame5364}>
                {data?.map((cell,index) => {
                    return <TableCell key={index} {...cell}/>
                })}
                {/*<TableCell {...data[0]}/>*/}
                {/*<TableCell {...data[1]}/>*/}
            </div>
        </div>
    );
}

function TableCell(props) {
    const { score} = props;
    return (
        <div className={styles.tableCell}>
            <div className={styles.cellContainer}>
                <div className={styles.cellContent}>
                    <Comments {...props}/>
                </div>

                <div className={styles.gauge}>
                    <Gauge value={score}/>
                    <p className={styles.score}>{score}</p>
                </div>
            </div>
        </div>
    );
}


function Comments(props) {
    const {name, issues, checks, score} = props;
    const color = score <= 60 ? styles.alert
        : score <= 80 ? styles.warning
            : styles.good;
    const adj = score <= 60 ? 'average'
        : score <= 80 ? 'good'
            : 'excellent';
    const issuesSpan = <span className={color}>{issues}</span>;
    const commentsSpan = <span className={color}>{adj}</span>;
    switch (name) {
        case "static-analysis":
            return <div>
                <h1>Static Analysis</h1>
                <h2>{issuesSpan} issues detected out of <span
                    className={styles.secondaryLightBlue}>{checks}</span> vulnerability and security checks
                </h2>
            </div>;
        case "onchain-monitoring":
            return <div>
                <h1>On-chain Monitoring</h1>
                <h2>
                    {commentsSpan} based on real-time transactional tracking systems
                </h2>
            </div>;
        case "social-sentiment":
            return <div>
                <h1>Social Sentiment</h1>
                <h2>
                    {commentsSpan} based on social monitoring and sentiment analysis
                </h2>
            </div>;
        case "governance-autonomy":
            return <div>
                <h1>Governance & Autonomy</h1>
                <h2>
                    {issues} security-type certificate found on
                    <a href="https://www.certik.org/technology" className={styles.externalLink}>CertiK Chain
                        <button className={styles.externalLinkButton}/>
                    </a>
                </h2>
            </div>;
        case "market-volatility":
            return <div>
                <h1>Market Volatility</h1>
                <h2>
                    {commentsSpan} based on indicators over trading volume/liquidity/depth
                </h2>
            </div>;
        case "safety-assessment":
            return <div>
                <h1>Risk Assessment</h1>
                <h2>
                    {commentsSpan} based on {checks} safety and hazard evaluations
                </h2>
            </div>;
        default: return <></>
    }

}


export default Overview;
