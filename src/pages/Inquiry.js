import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import generatePDF from 'react-to-pdf';


const Inquiry = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    // const tableRef = useRef();
    const [tableRef, SettableRef] = useState();
    const [inq, setInq] = useState({});
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Contact_Inquiries') && auth.role != 1) {
            window.location.replace('/admin');
        }
        GetInq();
    }, []);

    const GetInq = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-inq', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            setInq(response.data);
        })
    }
    const DelInq = async (id) => {
        if (window.confirm('Are you sure to delete this') === true) {
            await axios.delete(`https://works.demo-customproject.com:4001/del-inquiry/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
                GetInq();
            })
        }
    }

    const UpdateTable = (e) => {
        SettableRef(e)
    }

    function format(date) {
        return date.replace('T', ' , ').replace('Z', '').slice(0, -4);
    }
    if (Object.keys(inq).length === 0 && auth !== null) {
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
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='table-buttons'>
                                <DownloadTableExcel filename="Inquiry_Data" sheet="users" currentTableRef={tableRef} >
                                    <button>Excel</button>
                                </DownloadTableExcel>
                                {console.log(tableRef)}
                                <button onClick={() => generatePDF({current: tableRef}, { filename: 'Inquiry_Data.pdf' })}>Download PDF</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-editable table-nowrap align-middle table-edits" ref={SettableRef}>
                                    <thead>
                                        <tr style={{ cursor: "pointer" }}>
                                            <th> # </th> <th> Name </th> <th> Email </th> <th> Phone </th>
                                            <th> Submitted On </th> <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {inq.map((elem, key) => {
                                            return (
                                                <tr data-id={1} style={{ cursor: "pointer" }}>
                                                    <td data-field="id" style={{ width: 80 }}>

                                                        {key + 1}
                                                    </td>
                                                    <td data-field="name"> {elem.name} </td>
                                                    <td data-field="age"> {elem.email} </td>
                                                    <td data-field="gender"> {elem.phone} </td>
                                                    <td data-field="gender"> {format(elem.created_at)} </td>
                                                    <td style={{ width: 200 }}>
                                                        <Link
                                                            to={`/admin/view-inq/${elem.id}`}
                                                            className="btn btn-outline-secondary btn-sm edit"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-eye" />
                                                        </Link>
                                                        {
                                                            auth.role == 4 ? false : <button
                                                                onClick={() => {
                                                                    DelInq(elem.id);
                                                                }}
                                                                className="btn btn-outline-danger ml-2 btn-sm trash"
                                                                title="Edit"
                                                            >
                                                                <i className="fas fa-trash-alt" />
                                                            </button>
                                                        }
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

export default Inquiry