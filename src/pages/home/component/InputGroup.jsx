import style from "../css/Modal.module.css";

const InputGroup = ({ value, label, name, type, placeholder, error, onChange, onFocus, onBlur}) => {
    return (
        <>
            <div className={style.form__group}>
                <label>{label} <span>*</span></label>
                <input className={ error != '' ? style.outline__error : style.outline__normal} onChange={onChange} onBlur={onBlur} onFocus={onFocus} type={type} name={name} value={value} placeholder={placeholder}/>
                <span>{error}</span>
            </div>
        </>
    );
};

export default InputGroup;