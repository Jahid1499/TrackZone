
import style from './css/Home.module.css'
import Header from "./component/Header";
import Title from "./component/Title";
import Add from "./component/Add";
import {useEffect, useState} from "react";
import Modal from "./component/Modal";
import TimeZone from "./component/TimeZone";
import EventTimeZone from "./component/EventTimeZone";

const ownAndClientInit = {
    name: '',
    location: '',
    timeZone: '',
};



const eventInit = {
    name: '',
    date:'',
    time: '',
    link: '',
    timeZone: '',
    title:'',
}

const validate = (values) =>{
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is Required';
    }

    if (!values.location) {
        errors.location = 'Location is Required';
    }

    if (!values.timeZone) {
        errors.timeZone = 'Time zone is Required';
    }
    return errors;
}

const validateForEvent = (values) =>{
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is Required';
    }

    if (!values.date) {
        errors.date = 'Date is Required';
    }

    if (!values.time) {
        errors.time = 'Time zone is Required';
    }
    if (!values.link) {
        errors.link = 'Link is Required';
    }

    if (!values.timeZone) {
        errors.timeZone = 'TimeZone zone is Required';
    }

    if (!values.title) {
        errors.title = 'Title is Required';
    }
    return errors;
}

const Home = () => {

    const [myTime, setMyTime] = useState({});
    const [clientTime, setClientTime] = useState([]);
    const [eventTime, setEventTime] = useState([]);

    const [formTitle, setFormTitle] = useState('')
    const [modalName, setModalName] = useState('')
    const [modalInit, setModalInit] = useState(null)
    const [mainDivOpen, setMainDivOpen] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)

    const [clientList, setClientList] = useState([]);

    const modelOpenHandler = (title, modalName) =>{

        if (modalName == 'myTimeZone') {
            setModalInit({...ownAndClientInit});
        }
        else if (modalName == 'clientTimeZone')
        {
            if (Object.keys(myTime).length == 0)
            {
                alert('Please first create own time zone');
                return;
            }else {
                setModalInit({...ownAndClientInit});
            }
        }else if (modalName == 'eventTimeZone')
        {
            if (clientTime.length == 0)
            {
                alert('Please first create client time zone');
                return;
            }else {
                setModalInit({...eventInit});
            }
        }

        setFormTitle(title);
        setModalName(modalName);
        setMainDivOpen(false);
        setModalOpen(true);
    }

    const handleSubmit=(value, modalName)=>{
        value.id = Math.floor(Math.random() * 100000 + 1)
        if (modalName == 'myTimeZone')
        {
            setMyTime({...value})
        }else if(modalName == 'clientTimeZone'){
            setClientTime([].concat(clientTime, value))
        }else if(modalName == 'eventTimeZone'){
            setEventTime([].concat(eventTime, value))
        }
        setFormTitle('');
        setModalName('');
        setMainDivOpen(true);
        setModalOpen(false);
    }

    const handleModalClose = () =>{
        setFormTitle('');
        setModalName('');
        setMainDivOpen(true);
        setModalOpen(false);
    }

    useEffect(()=>{
        setClientList(clientTime.map((item)=>({
            name: item.name
        })))
    }, [clientTime])

    const editHandler = (id, modalName, title) =>{
        if (modalName === 'clientTimeZone')
        {
            const newClientList = clientTime.filter((item) => item.id == id)
            const obj = Object.assign({}, newClientList[0]);
            delete obj.id
            setModalInit({...obj})
        }else if(modalName === 'eventTimeZone'){
            const newEventTime = eventTime.filter((item) => item.id == id)
            setModalInit({...newEventTime[0]})
        }

        setFormTitle(title);
        setModalName(modalName);
        setMainDivOpen(false);
        setModalOpen(true);
    }

    const updateHandler = (id, modalName) =>{

    }

    const deleteHandler = (id, modalName) =>{
        if (modalName === 'clientTimeZone')
        {
            const newClientList = clientTime.filter((item) => item.id != id)
            setClientTime(newClientList)
            alert('Client time zone successfully deleted')
        }else if(modalName === 'eventTimeZone'){
            const newEventTime = eventTime.filter((item) => item.id != id)
            setEventTime(newEventTime)
            alert('Event time zone successfully deleted')
        }
    }

    return (
        <>
            {
                mainDivOpen && (
                    <div className={style.container}>
                        <div>
                            <Header/>
                        </div>
                        <div className={style.section}>
                            <Title title={'my time zone'}/>

                            {
                                Object.keys(myTime).length > 0 && <TimeZone editHandler={()=>editHandler(myTime.id, 'myTimeZone', 'Update own time zone')} {...myTime} edit={true} delete={false} link={false}/>
                            }

                            {
                                Object.keys(myTime).length == 0 && <Add title={'Create new own time zone'} openHandle={()=> modelOpenHandler('My Time Zone', 'myTimeZone')}/>
                            }
                        </div>

                        <div className={style.section}>
                            <Title title={'client time zone'}/>
                            <div className={style.section__div}>
                               {
                                   clientTime && clientTime.length > 0 && clientTime.map((item, index)=>(<TimeZone deleteHandler={()=>deleteHandler(item.id, 'clientTimeZone')} editHandler={()=>editHandler(item.id, 'clientTimeZone', 'Update client time zone')} key={index} {...item} edit={true} delete={true} link={false}/>))
                               }
                               <Add title={'Create new client time zone'} openHandle={()=> modelOpenHandler('Client Time Zone', 'clientTimeZone')}/>
                            </div>
                        </div>

                        <div className={style.section}>
                            <Title title={'event time zone'}/>
                            <div className={style.section__div}>
                                {
                                    eventTime && eventTime.length > 0 && eventTime.map((item, index)=>(<EventTimeZone deleteHandler={()=>deleteHandler(item.id, 'eventTimeZone')} editHandler={()=>editHandler(item.id, 'eventTimeZone', 'Update event time zone')} key={index} {...item} edit={true} delete={true} linkBtn={true}/>))
                                }
                                <Add title={'Create new event time zone'} openHandle={()=> modelOpenHandler('Event Time Zone', 'eventTimeZone')}/>
                            </div>

                        </div>
                    </div>
                )
            }

            {
                modalOpen && (<Modal clientList={clientList} validate={ modalName == 'myTimeZone' ? validate : modalName == 'clientTimeZone' ? validate : validateForEvent } formTitle={formTitle} init={modalInit} modalName={modalName} formSubmit={handleSubmit} handleModalClose={handleModalClose}  />)
            }
        </>
    );
};

export default Home;
