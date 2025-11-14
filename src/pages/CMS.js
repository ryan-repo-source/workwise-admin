import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CMS = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Content_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    const { slug } = useParams();
    const [page, setPage] = useState([]);
    const getUser = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-cms/${slug}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (response) {
            setPage(response.data);
        })
    }
    useEffect(() => {
        getUser();
    }, [slug])
    if (Object.keys(page).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">

            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> User Management </h4>
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
                                <table className="table table-editable table-nowrap align-middle table-edits">
                                    <thead>
                                        <tr style={{ cursor: "pointer" }}>
                                            <th> ID </th> <th> Section </th> <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {page.map((elem, key) => {
                                            return (
                                                <tr data-id={1} style={{ cursor: "pointer" }}>
                                                    <td style={{ width: 80 }}> {key + 1} </td>
                                                    <td> {elem.page_section} </td>
                                                    <td style={{ width: 100 }}>
                                                        <Link
                                                            to={`/admin/cms/${elem.id}/edit`}
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

export default CMS