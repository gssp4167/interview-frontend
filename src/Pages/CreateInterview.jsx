import React, { useEffect, useState } from 'react'
import { createInterview, getAllEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Multiselect } from 'multiselect-react-dropdown';
import emailjs from 'emailjs-com';

const USERID = '0BlfNNDuQbgJWvaIS';
const TEMPLATEID = 'template_cv4ypui';
const SERVICEID = 'service_2y1umwq';

const CreateInterview = () => {

    toast.configure();

    const navigate = useNavigate();


    const objectArray = [
    ]

    const [employeeList, setemployeeList] = useState([])
    const [participants, setParticipants] = useState([]);

    const onSelectOption = (selectedList, selectedItem) => {
        participants.push(selectedItem);
    }

    const onRemoveOption = (selectedList, removedItem) => {
        let index = participants.indexOf(removedItem);
        participants.splice(index, 1);
    }

    const fetchAllEmployee = async () => {
        const res = await getAllEmployee();
        setemployeeList(res);
    }


    useEffect(() => {
        fetchAllEmployee();
    }, [])

    const callOnSubmit = async (e) => {
        e.preventDefault();

        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;

        participants.map(async (curParti) => {
            delete curParti.__v;
        })


        participants.map(async (curParti) => {
            var templateParams = {
                from_name: "Gautam Sai",
                to_name: curParti.email,
                message: `Interview is Schedulde at ${startDate} to ${endDate}`
            };

            await emailjs.send(SERVICEID, TEMPLATEID, templateParams, USERID)

        })



        if (participants.length >= 2) {
            const res = await createInterview(startDate, endDate, participants);

            if (res.status === 201) {
                toast.success('Interview Created', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                navigate("/allinterviews")


            } else {
                toast.error(`Error : ${res.data.message} `, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        else {
            toast.error(`Particpants Should be more than 1 `, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }



    }


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">

                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">

                            <div className="card-body">
                                <h4 className="card-title">Schedule a Interview</h4>
                                <p className="card-description">
                                </p>
                                <form onSubmit={callOnSubmit} className="forms-sample">

                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                        <div className="col">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input type="datetime-local" className="form-control" name="startDate"
                                                id="startDate" required />
                                        </div>

                                        <div className="col">
                                            <label htmlFor="endDate">End Date</label>
                                            <input type="datetime-local" className="form-control" name="endDate"
                                                id="endDate" required />
                                        </div>

                                    </div>


                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                        <div className="col">
                                            <label htmlFor="participants" className="form-label" >Participants</label>
                                            <Multiselect
                                                onSelect={onSelectOption}
                                                onRemove={onRemoveOption}
                                                options={employeeList}
                                                displayValue="email"
                                            />
                                        </div>


                                    </div>



                                    <div className="col-12" style={{ marginTop: '50px' }}>
                                        <button type="submit" name="submit"
                                            className="btn btn-warning">Create</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateInterview;