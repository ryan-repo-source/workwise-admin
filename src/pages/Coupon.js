import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Coupon = () => {

    const [coupon, getCoup] = useState({});

    useEffect(() => {
        GetCoupon();
    }, [])

    const GetCoupon = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-coupon', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            getCoup(res.data);
        })
    }

    const DelUser = async (id) => {
        if (window.confirm('Are you sure to delete this') === true) {
            await axios.delete(`https://works.demo-customproject.com:4001/delete-coupon/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (response) {
                GetCoupon();
            })
        }
    }

    if (Object.keys(coupon).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return ( <div className="container-fluid">

                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Coupon Management </h4>
                            <Link
                                to="/admin/add-coupon"
                                className="btn btn-primary waves-effect waves-light"
                            >

                                Add New
                            </Link>
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
                                                <th> ID </th> <th> Code </th> <th> Discount </th>
                                                <th> Status </th> <th> Actions </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {coupon.map((elem, key) => {
                                                return (
                                                    <tr data-id={1} style={{ cursor: "pointer" }}>
                                                        <td data-field="id" style={{ width: 80 }}>

                                                            {key + 1}
                                                        </td>
                                                        <td> {elem.code} </td> <td> {elem.discount} </td>
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
                                                        <td style={{ width: 200 }}>
                                                            <Link
                                                                to={`/admin/edit-coupon/${elem.id}`}
                                                                className="btn btn-outline-secondary btn-sm edit"
                                                                title="Edit"
                                                            >
                                                                <i className="fas fa-pencil-alt" />
                                                            </Link>
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

            export default Coupon