import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Banner = () => {
    const [banner, setBanner] = useState([]);

    const getBanner = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-banner`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (response) {
            setBanner(response.data);
        })
    }
    useEffect(() => {
        getBanner();
    })

    if (Object.keys(banner).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">

            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Banner Management </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <a href="/admin"> Admin </a>
                                </li>
                                <li className="breadcrumb-item active"> Banners </li>
                            </ol>
                        </div>
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
                                        <tr style={{ cursor: "pointer" }}>
                                            <th> ID </th> <th> Section </th> <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {banner.map((elem, key) => {
                                            return (
                                                <tr data-id={1} style={{ cursor: "pointer" }}>
                                                    <td style={{ width: 80 }}> {key + 1} </td>
                                                    <td> {elem.heading} </td>
                                                    <td style={{ width: 100 }}>
                                                        <Link
                                                            to={`/admin/banner/${elem.id}/edit`}
                                                            className="btn btn-outline-secondary btn-sm edit"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-pencil-alt" />
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

export default Banner