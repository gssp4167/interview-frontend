import axios from 'axios';


const URL = 'https://interview-backend-bybj.onrender.com';
// https://interview-backend.netlify.app/

export const createInterview = async (startDate, endDate, participants) => {


    const res = await axios.post(`${URL}/interview/create`, {
        startDate,
        endDate,
        participants,
    })

    return res;

}

export const getAllInterview = async () => {

    const res = await axios.get(`${URL}/interview/getAll`)

    return res.data;

}

export const getOneInterview = async (id) => {

    const res = await axios.get(`${URL}/interview/get/${id}`)

    return res.data;

}

export const updateInterview = async (id, startDate, endDate, participants) => {


    const res = await axios.patch(`${URL}/interview/update/${id}`, {
        startDate,
        endDate,
        participants,
    })

    return res;

}

export const deleteInterview = async (id) => {

    const res = await axios.delete(`${URL}/interview/delete/${id}`)

    return res;

}


export const getAllEmployee = async () => {

    const res = await axios.get(`${URL}/employee/getAll`)

    return res.data;

}

export const getOneEmployee = async (id) => {

    const res = await axios.get(`${URL}/employee/get/${id}`)

    return res.data;

}