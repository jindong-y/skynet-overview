import React from "react"
import {arc} from "d3-shape"
import * as styles from "./styles/gauge.module.css"



//d3-shape is imported to help draw arc svg
function Gauge({
                   value = 100,
               }) {
    
    const MainInnerRad=18;
    const MainOuterRad=24;
    const SecondaryInnerRad=14;
    const SecondaryOuterRad=18;

    //set gauge color based on the value
    const style=value<=60?styles.alertScoreColor
            :value<=80?styles.warningScoreColor
            :styles.goodScoreColor;

    //Filled arc indicating the score
    //Has a padding of 2 degree every 60 degree
    //return an array of d in <path/>
    const valueArc = ()=>{
        let degree=value/100*240;
        let ellipse=[];
        let start=-Math.PI * 2 / 3;
        while(degree>0){
            if(degree>=59){
                let interval=start===-Math.PI * 2 / 3?59:58;
                ellipse.push(
                    arc()
                        .innerRadius(MainInnerRad)
                        .outerRadius(MainOuterRad)
                        .startAngle(start)
                        .endAngle(start+interval*Math.PI/180)
                        ()
                )
                start+=(interval+2)*Math.PI/180;
            }else{
                ellipse.push(
                    arc()
                        .innerRadius(MainInnerRad)
                        .outerRadius(MainOuterRad)
                        .startAngle(start)
                        .endAngle(-Math.PI * 2 / 3+value/100*240*Math.PI/180)
                        ()
                )
            }
            degree-=60;

        }
        return ellipse;

    }


    const backgroundArc = arc()
        .innerRadius(MainInnerRad)
        .outerRadius(MainOuterRad)
        .startAngle(-Math.PI * 2 / 3)
        .endAngle(Math.PI * 2 / 3)
        ();

    const secondaryBackgroundArc = arc()
        .innerRadius(SecondaryInnerRad)
        .outerRadius(SecondaryOuterRad)
        .startAngle(-Math.PI * 2 / 3)
        .endAngle(Math.PI * 2 / 3)
        ();

    //calculate the location of the arrow. Used for translation.
    const arrowLocation=()=>{
        const degree=7/6*Math.PI-value/100*4/3*Math.PI;
        return {
            x: Math.cos(degree)*MainInnerRad ,
            y: -Math.sin(degree)*MainInnerRad
        }
    }


    return (
        <div>
            <svg
                viewBox={[
                    -MainOuterRad, -MainOuterRad,
                    48, 48]}>

                //filled Arc
                {
                    valueArc().map((a, index)=>
                         <path
                             key={index}
                             className={style}
                             d={a}
                        />
                    )
                }
                <path
                    d={backgroundArc}
                    className={style+' '+styles.mainBackground}
                />
                <path
                    d={secondaryBackgroundArc}
                    className={styles.secondBackground}
                />

                // arrow pointer
                <path
                    d="M0.0269775 4.37666L1.52698 0.272919L3.02698 4.37666H1.52698H0.0269775Z"
                    fill="#354559"
                    transform={`
                    
                    translate(${arrowLocation().x-1.5} , ${arrowLocation().y}) 
                    rotate(${
                        value/100*240-120
                    } 1.5 0)
                     `}
                    className={styles.pointer}
                />

            </svg>

        </div>
    )
}

export default Gauge