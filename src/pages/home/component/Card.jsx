
const style ={
    height: 'auto',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 16%)',
    padding: '15px',
}

const Card = (props) => {
    return (
        <>
            <div style={style}>
                {
                    props.children
                }
            </div>
        </>
    );
};

export default Card;