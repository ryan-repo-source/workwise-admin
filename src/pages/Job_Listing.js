import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import { useProductContext } from '../context/productcontext';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import generatePDF from 'react-to-pdf';

const Job_Listing = () => {
    const navigate = useNavigate();
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    const tableName = "table1"

    function format(date) {
        return date.replace('T', ' , ').replace('Z', '').slice(0, -4);
    }

    const { jobs } = useProductContext();
    const [data, setData] = useState({});
    useEffect(() => {
        let data1 = [];
        jobs?.map((el) => {
            data1.push([el.id, el.title, el.company_name == null ? el.first_name + ' ' + el.last_name : el.company_name, format(el.created_at),
            `<span class="btn btn-outline-secondary btn-sm edit" edit_id="${el.id}"><i class="fas fa-pencil-alt"></i></span><span class="btn btn-outline-danger ml-2 btn-sm trash" delete_id="${el.id}"><i class="fas fa-trash-alt"></i></span><a href="/job-description/${el.id}" class="btn btn-outline-secondary btn-sm trash"><i class="fas fa-eye"></i></a>`]);
        })
        setData(data1);
    }, [jobs])

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const table = $(`#${tableName}`).DataTable(
                {
                    data: data,
                    columns: [
                        { title: "ID#" },
                        { title: "Title" },
                        { title: "Posted By" },
                        { title: "Posted On" },
                        { title: "Actions" },
                    ],
                    destroy: true,  // I think some clean up is happening here
                    searching: true,
                }
            )
            // Extra step to do extra clean-up.
            return function () {
                table.destroy()
            }
        }
    }, [data])


    const DelJob = async (id) => {
        if (window.confirm('Are you sure to delete this Job') === true) {
            await axios.delete(`https://works.demo-customproject.com:4001/delete-single-job/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {})
        }
    }

    useEffect(() => {
        setInterval(function () {
            $('[edit_id]').unbind().click(function () {
                navigate(`/admin/edit-jobs/${$(this).attr('edit_id')}`)
            })
            $('[delete_id]').unbind().click(function () {
                DelJob($(this).attr('delete_id'));
                $(this).closest('tr').remove();
            })
        }, 1000)
    })

    if (jobs === null) {
        return <div className='Loading'></div>
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Job Management </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">

                                    <a href="/admin"> Admin </a>
                                </li>
                                <li className="breadcrumb-item active"> Job Management </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tab-btns'>
                <Link to="/admin/add-jobs" className='btn btn-primary w-md'>Add New Job</Link>
            </div>
            {/* end page title */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='table-buttons'>
                                <DownloadTableExcel filename="Users_Data" sheet="users" currentTableRef={tableRef.current} >
                                    <button>Excel</button>
                                </DownloadTableExcel>
                                <button onClick={() => generatePDF(tableRef, { filename: 'Users_Data.pdf' })}>Download PDF</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" id={tableName} ref={tableRef}></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job_Listing