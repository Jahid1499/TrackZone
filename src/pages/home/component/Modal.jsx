import style from "../css/Modal.module.css";
import useTimeZone from "../hooks/useTimeZone";
import InputGroup from "./InputGroup";

function Modal({ clientList, formTitle, modalName, formSubmit, handleModalClose, init, validate }){

    const { formState: state, handleBlur, handleChange, handleFocus, handleSubmit, clear} = useTimeZone({ init, validate });

    const cb = ({ hasError, values, errors }) => {
        if ( !hasError) {
            formSubmit(values, modalName);
        }
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.titleCloseBtn}>
                    <button onClick={handleModalClose}>X</button>
                </div>
                <div className={style.title}>
                    <h1>{formTitle}</h1>
                </div>
                <div className={style.body}>
                    <form className={style.form} onSubmit={(e)=> handleSubmit(e, cb)}>

                        {
                            modalName == 'eventTimeZone' && (<InputGroup
                                    value={state.title.value}
                                    label={'Title'}
                                    name={'title'}
                                    type={'title'}
                                    placeholder={'Please enter title'}
                                    error={state.title.error}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )
                        }
                        {
                            modalName != 'eventTimeZone' && (
                                <InputGroup
                                    value={state.name.value}
                                    label={'Name'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={'Please enter your name'}
                                    error={state.name.error}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )
                        }

                        {
                            modalName == 'eventTimeZone' && (<div className={style.form__group}>
                                    <label>Client Name <span>*</span></label>
                                    <select className={ state.name.error != '' ? style.outline__error : style.outline__normal} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}  name="name" value={state.name.value}>
                                        <option value="">Select One</option>
                                        {
                                            clientList && clientList.map((item, index)=> (<option key={index} value={item.name}>{item.name}</option>))
                                        }
                                    </select>
                                    <span>{state.name.error}</span>
                                </div>
                            )
                        }

                        {
                            modalName == 'eventTimeZone' && (<InputGroup
                                    value={state.date.value}
                                    label={'Date'}
                                    name={'date'}
                                    type={'date'}
                                    placeholder={'Please enter date'}
                                    error={state.date.error}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )
                        }

                        {
                            modalName == 'eventTimeZone' && (<InputGroup
                                    value={state.time.value}
                                    label={'Time'}
                                    name={'time'}
                                    type={'time'}
                                    placeholder={'Please enter time'}
                                    error={state.time.error}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )
                        }

                        {
                            modalName != 'eventTimeZone' && (
                                <InputGroup
                                    value={state.location.value}
                                    label={'Location'}
                                    name={'location'}
                                    type={'text'}
                                    placeholder={'Please enter location'}
                                    error={state.location.error}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            )
                        }


                        {
                            modalName == 'eventTimeZone' && (<InputGroup
                                value={state.link.value}
                                label={'Link'}
                                name={'link'}
                                type={'text'}
                                placeholder={'Please enter link'}
                                error={state.link.error}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            )
                        }


                        <div className={style.form__group}>
                            <label>Time zone <span>*</span></label>
                            <select className={ state.timeZone.error != '' ? style.outline__error : style.outline__normal} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus}  name="timeZone" value={state.timeZone.value}>
                                <option value="">Select One</option>
                                <option value="UTC">UTC</option>
                                <option value="GMT">GMT</option>
                                <option value="PST">PST</option>
                                <option value="EST">EST</option>
                            </select>
                            <span>{state.timeZone.error}</span>
                        </div>
                        <div className={style.footer}>
                            <button className={style.close__button} onClick={handleModalClose}>Cancel</button>
                            <button className={style.clear__button} onClick={clear}>Clear</button>
                            <button type={"submit"} className={style.save__button}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;