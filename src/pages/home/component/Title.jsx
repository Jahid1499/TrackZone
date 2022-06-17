import style from '../css/Title.module.css';

const Title = ({title}) => {
    return (
        <>
            <p className={style.sectionTitle}>{title}</p>
        </>
    );
};

export default Title;