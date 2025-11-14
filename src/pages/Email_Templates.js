import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Email_Templates = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    const [email, setEmail] = useState({});
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Contact_Inquiries') && auth.role != 1) {
            window.location.replace('/admin');
        }
        getEmailTemp();
    }, []);

    const getEmailTemp = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-email-temp', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            setEmail(response.data);
        })
    }
    if (Object.keys(email).length === 0 && auth !== null) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">

            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Email Templates </h4>
                    </div>
                </div>
            </div>
            {/* end page title */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-editable table-nowrap align-middle table-edits">
                                    <thead>
                                        <tr style={{ cursor: "pointer" }}>
                                            <th> # </th> <th> Name </th>  <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {email.map((elem, key) => {
                                            return (
                                                <tr data-id={1} style={{ cursor: "pointer" }}>
                                                    <td data-field="id" style={{ width: 80 }}>
                                                        {key + 1}
                                                    </td>
                                                    <td data-field="name"> {elem.name} </td>
                                                    <td style={{ width: 200 }}>
                                                        <Link
                                                            to={`/admin/edit-email-templates/${elem.id}`}
                                                            className="btn btn-outline-secondary btn-sm edit"
                                                            title="Edit"
                                                        >
                                                            <i className="bx bx-pencil" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default Email_Templates