import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllInterview, deleteInterview } from '../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageInterviews = () => {

    toast.configure();

    const navigate = useNavigate();

    const [interviewData, setInterviewData] = useState([])

    const fetchAllInterview = async () => {

        const res = await getAllInterview();
        setInterviewData(res);

    }

    useEffect(() => {
        fetchAllInterview();
    }, [])


    const deleteIn = async (id) => {

        const res = await deleteInterview(id);

        if (res.status === 201) {
            toast.success('Interview Deleted', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            window.location.reload()


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
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Manage Interviews</h4>
                            <p className="card-description">
                            </p>

                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display expandable-table" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Interview Id</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ paddingTop: "30px" }} >

                                                {
                                                    interviewData.map((currentInterview,index) => {
                                                        return (
                                                            
                                                                <tr key={currentInterview._id} >
                                                                    <td>{index+1}</td>
                                                                    <td>{currentInterview._id}</td>
                                                                    <td>{currentInterview.startDate}</td>
                                                                    <td>{currentInterview.endDate}</td>
                                                                    <td>
                                                                        <a href={`/editinterview?id=${currentInterview._id}`} style={{ fontSize: "20px", cursor: "pointer", color: "green" }} className="fa-solid fa-pen-to-square"></a>
                                                                        <i className="fa-solid fa-trash" onClick={() => { deleteIn(currentInterview._id) }} style={{ fontSize: "18px", cursor: "pointer", color: "red", marginLeft: "10px" }} ></i>
                                                                    </td>
                                                                </tr>
                                                            
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageInterviews