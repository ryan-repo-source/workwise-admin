import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import generatePDF from 'react-to-pdf';

const Order_Managment = () => {
    const navigate = useNavigate();
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    const tableName = "table1"

    const [orders , setOrders] = useState(null)
    function format(date) {
        return date.replace('T', ' , ').replace('Z', '').slice(0, -4);
    }
    const GetOrders = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-orders', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            let data = [];
            console.log(response)
            response.data.map((el, key) => {
                data.push([el.id, el.company_name, el.email, el.title, format(el.created_at), `$ ${el.price}`,
                `<span class="btn btn-outline-secondary btn-sm edit" edit_id="${el.id}"><i class="fas fa-eye"></i></span><span class="btn btn-outline-danger ml-2 btn-sm trash" delete_id="${el.id}"><i class="fas fa-trash-alt"></i></span>`]);
            })
            setOrders(data);
        })
    }

    useEffect(() => {
        if (orders !== null) {
            const table = $(`#${tableName}`).DataTable(
                {
                    data: orders,
                    columns: [
                        { title: "ID#" },
                        { title: "Employer Name" },
                        { title: "Email Address" },
                        { title: "Package" },
                        { title: "Date" },
                        { title: "Total Price" },
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
    }, [orders])

    useEffect(() => {
        setInterval(function () {
            $('[edit_id]').unbind().click(function () {
                navigate(`/admin/view-order/${$(this).attr('edit_id')}`)
            })
            // $('[delete_id]').unbind().click(function () {
            //     DelUser($(this).attr('delete_id'));
            // })
        }, 1000)
    })

    useEffect(() => {
        GetOrders();
    },[])

    if (orders === null){
        return <div className='Loading'></div>
    }
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Orders Management </h4>
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
            {/* end page title */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className='table-buttons'>
                                    <DownloadTableExcel filename="Orders" sheet="users" currentTableRef={tableRef.current} >
                                        <button>Excel</button>
                                    </DownloadTableExcel>
                                    <button onClick={() => generatePDF(tableRef, { filename: 'Orders.pdf' })}>Download PDF</button>
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

export default Order_Managment