
import style from '../css/Header.module.css';
import clockImage from '../img/Clock.png'

const Header = () => {
    return (
        <>
            <div className={style.header}>
                <img src={clockImage} alt="clock"/>
                <h4>Track Zone</h4>
            </div>
        </>
    );
};

export default Header;