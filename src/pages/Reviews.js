import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Reviews = () => {

    const [reviews, setReviews] = useState(null);
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Reviews_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])

    const GetReviews = () => {
        axios.get(`https://works.demo-customproject.com:4001/get-all-reviews/`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            setReviews(res.data);
        })
    }

    const DeleteRev = (id) => {
        if (window.confirm('Are you sure to delete this') === true) {
            axios.post(`https://works.demo-customproject.com:4001/delt-reviews/`, { id: id }, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
                GetReviews();
            })
        }
    }

    useEffect(() => {
        GetReviews();
    }, [])

    if (reviews === null) {
        return <div className='Loading'></div>
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Reviews Management </h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-editable table-nowrap align-middle table-edits">
                                    <thead>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th> ID </th>
                                            <th> Rating </th>
                                            <th> Comment </th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reviews.map((rev, key) => {
                                                return <tr data-id={key} style={{ cursor: 'pointer' }}>
                                                    <td data-field="id" style={{ width: 80 }}>{key}</td>
                                                    <td>
                                                        <span className="badge badge-pill badge-soft-success ratei font-size-20">
                                                            <div className='rt-str'>
                                                                {
                                                                    (() => {
                                                                        const arr = [];
                                                                        for (let i = 0; i < 5; i++) {
                                                                            if (i < rev.rating) {
                                                                                arr.push(<i class='bx bxs-star' ></i>)
                                                                            } else {
                                                                                arr.push(<i class='bx bx-star' ></i>)
                                                                            }
                                                                        }
                                                                        return arr;
                                                                    })()
                                                                }
                                                            </div>
                                                        </span>
                                                    </td>

                                                    <td style={{ width: '65%' }}>
                                                        <p>{rev.comment}</p>
                                                    </td>
                                                    <td data-field="name" style={{ width: 200 }}>
                                                        <Link className="btn btn-outline-secondary btn-sm edit" title="Edit" to={`/admin/edit-review/${rev.id}`}>
                                                            <i className="fas fa-pencil-alt" />
                                                        </Link>
                                                        {
                                                            auth.role == 4 ? false :
                                                                <button className="btn btn-outline-danger ml-2 btn-sm trash" onClick={() => { DeleteRev(rev.id) }} title="Edit">
                                                                    <i className="fas fa-trash-alt" />
                                                                </button>
                                                        }
                                                    </td>
                                                </tr>
                                            })
                                        }
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

export default Reviews