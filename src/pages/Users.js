import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import generatePDF from 'react-to-pdf';

const Users = () => {
    const navigate = useNavigate();
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    const tableName = "table1"

    const { role } = useParams();
    const [users, setUsers] = useState({});
    useEffect(() => {
        GetUsers();
    }, [role]);
    useEffect(() => {
        GetUsers();
    }, []);

    const ToggleApprove = (id, data) => {
        let dat;
        data === true ? dat = 1 : dat = 0;
        axios.put(`https://works.demo-customproject.com:4001/approve-sup/${id}/${dat}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            GetUsers();
            console.log(res);
        })
    }

    const GetUsers = async () => {
        await axios.get('https://works.demo-customproject.com:4001/users', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            let data = [];
            response.data.filter((fltr, key) => {
                if (fltr.role === role) {
                    console.log(fltr, role);
                }
                return fltr.role == role;
            }).map((el, key) => {
                let role = '';
                if (el.role == "0") {
                    role = "Candidate"
                }
                if (el.role == "2") {
                    role = "Employer"
                }
                if (el.role == "3") {
                    role = "Admin"
                }
                if (el.role == "4") {
                    role = "Sub Admin"
                }

                data.push([el.id, el.first_name + ' ' + el.last_name, el.email, el.phone, role,
                `<span class="btn btn-outline-secondary btn-sm edit" edit_id="${el.id}"><i class="fas fa-pencil-alt"></i></span><span class="btn btn-outline-danger ml-2 btn-sm trash" delete_id="${el.id}"><i class="fas fa-trash-alt"></i></span>${el.role === 2 ? `<div class="form-check form-switch form-switch-lg d-inline-block" dir="ltr"><input class="form-check-input" type="checkbox" ${el.approved === 1 ? 'checked' : false} app_id="${el.id}"><label class="form-check-label" for="SwitchCheckSizelg">Approve</label></div>` : ''}`]);
            })
            setUsers(data);
        })
    }
    // Delete
    const DelUser = async (id) => {
        if (window.confirm('Are you sure to delete this user') === true) {
            await axios.delete(`https://works.demo-customproject.com:4001/deluser/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
                GetUsers();
            })
        }
    }

    useEffect(() => {
        if (Object.keys(users).length !== 0) {
            const table = $(`#${tableName}`).DataTable(
                {
                    data: users,
                    columns: [
                        { title: "ID#" },
                        { title: "Name" },
                        { title: "Email" },
                        { title: "Phone" },
                        { title: "Role" },
                        { title: "Actions" },
                    ],
                    destroy: true,  // I think some clean up is happening here
                    searching: true,
                }
            )
            console.log(table)
            // Extra step to do extra clean-up.
            return function () {
                table.destroy()
            }
        }
    }, [users])

    useEffect(() => {
        setInterval(function () {
            $('[edit_id]').unbind().click(function () {
                navigate(`/admin/edituser/${$(this).attr('edit_id')}`)
            })
            $('[delete_id]').unbind().click(function () {
                DelUser($(this).attr('delete_id'));
            })
            $('[app_id]').unbind().click(function () {
                ToggleApprove($(this).attr('app_id'), $(this).is(':checked'));
            })
        }, 1000)
    })


    if (Object.keys(users).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> {role == 0 ? 'Candidates' : false}{role == 2 ? 'Employers' : false}{role == 3 ? 'Admins' : false}{role == 4 ? 'Sub Admins' : false} Management </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">

                                    <a href="/admin"> Admin </a>
                                </li>
                                <li className="breadcrumb-item active"> Users </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tab-btns'>
                <Link to="/admin/addUser" className='btn btn-primary w-md'>Add User</Link>
            </div>
            {/* end page title */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className='table-buttons'>
                                    <DownloadTableExcel filename="Users_Data" sheet="users" currentTableRef={tableRef.current} >
                                        <button>Excel</button>
                                    </DownloadTableExcel>
                                    <button onClick={() => generatePDF(tableRef, {filename: 'Users_Data.pdf'})}>Download PDF</button>
                                </div>
                                <table className="table table-bordered" width="100%" id={tableName} ref={tableRef}></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        )
    }
}

export default Users