import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Email_Edit = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    const { id } = useParams();
    const [data, SetData] = useState(null);
    const setVal = (e) => {
        SetData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Content_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])

    const getPrevCont = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/single_email/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (res) {
            SetData(res.data[0]);
        })
    }

    const UpdateTemp = async (e) => {
        e.preventDefault();
        await axios.put(`https://works.demo-customproject.com:4001/update_email/${id}`, data, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (res) {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                getPrevCont()
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
    }
    console.log(data)
    useEffect(() => {
        getPrevCont();
    }, [])
    if (data === null && auth !== null) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Email Templates </h4>
                        </div>
                    </div>
                </div>
                <form onSubmit={UpdateTemp}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="msg-box"> </div>
                                    <h4 className="card-title mb-4"> {data?.name} </h4>
                                    {data.heading_1 != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Heading One
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.heading_1}
                                                name="heading_1"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                            />
                                        </div>
                                    ) : null}
                                    {data.heading_2 != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Heading Two
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.heading_2}
                                                name="heading_2"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                            />
                                        </div>
                                    ) : null}
                                    {data.heading_3 != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Heading Three
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.heading_3}
                                                name="heading_3"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                            />
                                        </div>
                                    ) : null}
                                    {data.heading_4 != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Heading Four
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.heading_4}
                                                name="heading_4"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                            />
                                        </div>
                                    ) : null}
                                    {data.short_description != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Short Description
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.short_description}
                                                name="short_description"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                                placeholder="Short Description"
                                            />
                                        </div>
                                    ) : null}
                                    {data.description != null ? (
                                        <div className="mb-3">
                                            <label htmlFor="formrow-firstname-input" className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                defaultValue={data.description}
                                                name="description"
                                                onChange={setVal}
                                                className="form-control"
                                                id="formrow-firstname-input"
                                                placeholder="Description"
                                            ></textarea>
                                        </div>
                                    ) : null}
                                    <div>
                                        <button type="submit" className="btn btn-primary w-md">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Email_Edit