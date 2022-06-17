import style from '../css/Card.module.css';
import Button from "./Button";
import Card from "./Card";
import {useEffect, useState} from "react";
import * as myDate from 'date-fns';


const styleCustom ={
    width: '30%',
}

const TimeZone = ({name, location, timeZone, link, edit, delete: deleteBtn, editHandler, deleteHandler}) => {

    const [time, setTime] = useState(myDate.format(new Date(), 'HH:mm:ss'));
    const [date, setDate] = useState(myDate.format(new Date(), 'dd-mm-yy'));

    useEffect(()=>{
        setInterval(()=>{
            setTime(myDate.format(new Date(), 'HH:mm:ss'))
            setDate(myDate.format(new Date(), 'dd-mm-yy'))
        }, 1000)
    }, [time])

    return (
        <>
            <div style={styleCustom}>
                <Card>
                    <div className={style.card__header}>
                        <h5>{name}</h5>
                        <p>{location}</p>
                        <p>{date}</p>
                    </div>
                    <div className={style.card__body}>
                        <h1>{time}</h1>
                        <span>{timeZone} {' '} {'0'}</span>
                    </div>
                    <div className={style.card__footer}>
                        {
                            link && <Button buttonText={'Meet Link'} backgroundColor={'primary'}/>
                        }
                        {
                            edit && <Button clickHandler={editHandler} buttonText={'edit'} backgroundColor={'warning'}/>
                        }
                        {
                            deleteBtn && <Button clickHandler={deleteHandler} buttonText={'delete'} backgroundColor={'danger'}/>
                        }
                    </div>
                </Card>
            </div>
        </>
    );
};

export default TimeZone;