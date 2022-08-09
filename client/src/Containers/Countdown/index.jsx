import React, { useState, useEffect } from 'react'
import './timer.css'

/**
* @author
* @function Countdown
**/

const Countdown = (props) => {

    // Set the date we're counting down to
    const countDownDate = new Date("Jan 20, 2021 24:00:00").getTime();

    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [second, setSecond] = useState();

    useEffect(() => {
        const setCountdown = () => {
            const now = new Date().getTime();
    
            const distance = countDownDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSecond(Math.floor((distance % (1000 * 60)) / 1000));
            if( distance < 0 ) {
                clearInterval(setCountdown);
            }
        }
        setInterval(() => {setCountdown()},1000)
    },[countDownDate])

    return (
        <>
            <div className="timer-div">
                <div className="timer-container">
                    <div className="timer-inner">
                        <div className="timer-text">
                            <strong>Website is under construction</strong>
                            <br />
                            <div>🤗 We'll meet in...</div>
                        </div>
                        <div className="timer-item-container">
                            <div className="timer-item">
                                <div className="timer-item-group">
                                    <div className="timer-item-group-inner">
                                        <div>
                                            <div className="timer-item-value">
                                                <div className="timer-item-value-base">{days}</div>
                                            </div>
                                            <div className="timer-item-label" title="Days">Days </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="timer-item-group">
                                    <div className="timer-item-group-inner">
                                        <div>
                                            <div className="timer-item-value">
                                                <div className="timer-item-value-base">{hours} </div>
                                            </div>
                                            <div className="timer-item-label" title="Days">Hours</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="timer-item-group">
                                    <div className="timer-item-group-inner">
                                        <div>
                                            <div className="timer-item-value">
                                                <div className="timer-item-value-base">{minutes} </div>
                                            </div>
                                            <div className="timer-item-label" title="Days">Minutes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="timer-item-group">
                                    <div className="timer-item-group-inner">
                                        <div>
                                            <div className="timer-item-value">
                                                <div className="timer-item-value-base">{second} </div>
                                            </div>
                                            <div className="timer-item-label" title="Days">Seconds</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Countdown