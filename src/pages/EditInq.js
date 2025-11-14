import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Inquiry = () => {
    const { id } = useParams();
    const [inq, setInq] = useState({});
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Contact_Inquiries') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    useEffect(() => {
        GetInq();
    }, [id]);

    const GetInq = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-inquiry/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            setInq(response.data);
        })
    }
    console.log(inq)
    function format(date) {
        return date.replace('T', ' , ').replace('Z', '').slice(0, -4);
    }
    if (Object.keys(inq).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">

            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Content Inquiries </h4>
                    </div>
                </div>
            </div>
            {/* end page title */}
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-nowrap mb-0">
                                    <tbody>

                                        {inq[0].name != null ? (
                                            <tr>
                                                <th scope="row"> Name : </th> <td> {inq[0].name} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].email != null ? (
                                            <tr>
                                                <th scope="row"> Email : </th> <td> {inq[0].email} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].phone != null ? (
                                            <tr>
                                                <th scope="row"> Phone : </th> <td> {inq[0].phone} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].company_name != null ? (
                                            <tr>
                                                <th scope="row"> Company Name : </th> <td> {inq[0].company_name} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].companysize != null ? (
                                            <tr>
                                                <th scope="row"> Company Size : </th> <td> {inq[0].companysize} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].country != null ? (
                                            <tr>
                                                <th scope="row"> Country : </th> <td> {inq[0].country} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        {inq[0].created_at != null ? (
                                            <tr>
                                                <th scope="row"> Submitted on : </th>
                                                <td> {format(inq[0].created_at)} </td>
                                            </tr>
                                        ) : (
                                            false
                                        )}
                                        <tr>
                                            <td colSpan={2}>
                                                <div className='bade-slasflc'>
                                                    {inq[0].general == 1 && <span>General</span>}
                                                    {inq[0].project_management == 1 && <span>Project Management</span>}
                                                    {inq[0].special_talent_request == 1 && <span>Special Talent Request</span>}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {inq[0].message != null ? (
                                <>

                                    <h4 className="card-title mb-3 mt-4"> Message </h4>
                                    <p className="text-muted"> {inq[0].message} </p>
                                </>
                            ) : (
                                false
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default Inquiry