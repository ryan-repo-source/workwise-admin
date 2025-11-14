import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {

    const [cate, getCate] = useState(null);

    useEffect(() => {
        Getcategory();
    }, [])

    const Getcategory = async () => {
        await axios.get('https://works.demo-customproject.com:4001/categories', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            getCate(res.data);
        })
    }
    const DelCat = async (id) => {
        if (window.confirm('Are you sure to delete this') === true) {
            await axios.delete(`https://works.demo-customproject.com:4001/delete-cat/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
                Getcategory();
            })
        }
    }

    if (cate === null) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Categories Management </h4>
                            <Link
                                to="/admin/add-category"
                                className="btn btn-primary waves-effect waves-light">
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
                                                <th> ID </th> <th> Name </th> <th> Status </th>
                                                <th> Actions </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {Object.keys(cate).length === 0 ? <div className='notfound'>Not found</div> : cate.map((elem, key) => {
                                                return (
                                                    <tr data-id={1} style={{ cursor: "pointer" }}>
                                                        <td data-field="id" style={{ width: 80 }}>

                                                            {key + 1}
                                                        </td>
                                                        <td> {elem.name} </td>
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
                                                                to={`/admin/edit-category/${elem.id}`}
                                                                className="btn btn-outline-secondary btn-sm edit"
                                                                title="Edit"
                                                            >
                                                                <i className="fas fa-pencil-alt" />
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    DelCat(elem.id);
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

export default Categories