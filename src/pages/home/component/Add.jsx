import style from '../css/Add.module.css';
import plus from '../img/PlusMath.png';

const Add = ({openHandle, title}) => {
    return (
        <>
            <button title={title} className={style.addSection} onClick={openHandle}>
                <img src={plus} alt="add"/>
            </button>
        </>
    );
};

export default Add;