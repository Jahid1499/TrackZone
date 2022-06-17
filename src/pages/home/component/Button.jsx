import style from '../css/Button.module.css';

const bgColour ={
    warning: '#ffc107',
    success: '#28a745',
    danger: '#dc3545',
    primary: '#007bff'
}

const Button = ({buttonText, backgroundColor, clickHandler}) => {
    return (
        <>
            <button onClick={clickHandler} className={style.button} style={{background: `${bgColour[backgroundColor]}`}}>{buttonText}</button>
        </>
    );
};

export default Button;