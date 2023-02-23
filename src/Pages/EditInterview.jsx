import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEmployee, getOneInterview, updateInterview } from '../services/api';
import { Multiselect } from 'multiselect-react-dropdown';


const EditInterview = () => {


    toast.configure();

    let [searchParams, setSearchParams] = useSearchParams();
    let interviewid = searchParams.get("id");


    const navigate = useNavigate();

    const [employeeList, setemployeeList] = useState([])
    const [interviewDetails, setInterviewDetails] = useState({});

    const [participants, setParticipants] = useState([]);

    const onSelectOption = (selectedList, selectedItem) => {
        participants.push(selectedItem);
    }

    const onRemoveOption = (selectedList, removedItem) => {
        let index = participants.indexOf(removedItem);
        participants.splice(index, 1);
    }


    const getCurrentInterview = async () => {

        const res = await getOneInterview(interviewid);
        res.participants.map((curEle) => {
            participants.push(curEle)
        })
        setInterviewDetails(res);

    }

    const fetchAllEmployee = async () => {
        const res = await getAllEmployee();
        setemployeeList(res);
    }

    useEffect(() => {
        fetchAllEmployee();
        getCurrentInterview()
    }, [])


    const callOnSubmit = async (e) => {

        e.preventDefault();

        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;

        participants.map((curParti) => {
            delete curParti.__v;
        })

        const res = await updateInterview(interviewid, startDate, endDate, participants);

        if (res.status === 201) {
            toast.success('Interview Updated', {
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

    return (


        <>
            {

                interviewDetails != ''
                    ? (

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
                                                                id="startDate" defaultValue={interviewDetails.startDate} />
                                                        </div>

                                                        <div className="col">
                                                            <label htmlFor="endDate">End Date</label>
                                                            <input type="datetime-local" className="form-control" name="endDate"
                                                                id="endDate" defaultValue={interviewDetails.endDate} />
                                                        </div>

                                                    </div>


                                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                                        <div className="col">
                                                            <label htmlFor="participants" className="form-label" >Participants</label>
                                                            <Multiselect

                                                                onSelect={onSelectOption}
                                                                onRemove={onRemoveOption}
                                                                options={employeeList}
                                                                selectedValues={interviewDetails.participants}
                                                                displayValue="email"
                                                            />
                                                        </div>


                                                    </div>



                                                    <div className="col-12" style={{ marginTop: '50px' }}>
                                                        <button type="submit" name="submit"
                                                            className="btn btn-warning">Update</button>
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                    : <h1>Loading</h1>

            }
        </>

    )
}

export default EditInterview