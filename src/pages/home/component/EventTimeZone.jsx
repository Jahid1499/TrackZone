import style from '../css/Card.module.css';
import Button from "./Button";
import Card from "./Card";


const styleCustom ={
    width: '30%',
}

const EventTimeZone = ({name, title, editHandler, deleteHandler, date, time, timeZone, link, linkBtn, edit, delete: deleteBtn}) => {


    const clickLink =()=>{
        navigator.clipboard.writeText(link)
        alert('Coped link !! Thank you')
    }

    return (
        <>
            <div style={styleCustom}>
                <Card>
                    <div className={style.card__header}>
                        <h5>{name}</h5>
                        <p>{date}</p>
                        <p>{title}</p>
                    </div>
                    <div className={style.card__body}>
                        <h1>{time}</h1>
                        <span>{timeZone} {' '} {'0'}</span>
                    </div>
                    <div className={style.card__footer}>
                        {
                            linkBtn && <Button clickHandler={clickLink}  buttonText={'Meet Link'} backgroundColor={'primary'}/>
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

export default EventTimeZone;