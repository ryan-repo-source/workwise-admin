import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import generatePDF from 'react-to-pdf';


const Newsletters = () => {
    // const tableRef = useRef();
    const [tableRef, SettableRef] = useState();
    const [newsletter, getNewsletters] = useState({});
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Newsletters_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])

    useEffect(() => {
        GetNewsletters();
    }, [])

    var hostname = 'https://works.demo-customproject.com:4001';

    const GetNewsletters = async () => {
        await axios.get(hostname + '/get-newsletters', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            getNewsletters(res.data);
        })
    }

    const DelUser = async (id) => {
        if (window.confirm('Are you sure to delete this') === true) {
            await axios.delete(hostname + `/delete-newsletter/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
                console.log(response)
                GetNewsletters();
            })
        }
    }

    if (Object.keys(newsletter).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (
            <div className="container-fluid">

                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Newsletters Management </h4>
                        </div>
                    </div>
                </div>
                {/* end page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className='table-buttons'>
                                    <DownloadTableExcel filename="Newsetter_Data" sheet="users" currentTableRef={tableRef} >
                                        <button>Excel</button>
                                    </DownloadTableExcel>
                                    <button onClick={() => generatePDF({ current: tableRef }, { filename: 'Newsetter_Data.pdf' })}>Download PDF</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-editable table-nowrap align-middle table-edits" ref={SettableRef}>
                                        <thead>
                                            <tr style={{ cursor: "pointer" }}>
                                                <th> ID </th> <th> Email </th> <th> Status </th>
                                                {
                                                    auth.role == 4 ? false : <th> Actions </th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {newsletter.map((elem, key) => {
                                                return (
                                                    <tr data-id={1} style={{ cursor: "pointer" }}>
                                                        <td data-field="id" style={{ width: 80 }}>

                                                            {key + 1}
                                                        </td>
                                                        <td data-field="name" style={{ width: "70%" }}>

                                                            {elem.email}
                                                        </td>
                                                        <td>

                                                            {elem.is_active == 0 ? (
                                                                <span className="badge badge-pill badge-soft-danger font-size-11">
                                                                    Hidden
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-pill badge-soft-success font-size-11">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </td>
                                                        {
                                                            auth.role == 4 ? false :
                                                                <td style={{ width: 100 }}>
                                                                    <button
                                                                        onClick={() => {
                                                                            DelUser(elem.id);
                                                                        }}
                                                                        className="btn btn-outline-danger ml-2 btn-sm trash"
                                                                        title="Edit"
                                                                    >
                                                                        <i className="fas fa-trash-alt" />
                                                                    </button>
                                                                </td>
                                                        }
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

export default Newsletters