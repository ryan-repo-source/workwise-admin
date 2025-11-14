import React, { useState } from 'react'
import axios from 'axios';
import $ from 'jquery';
import { useEffect } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
    });

    const [roles, SetRoles] = useState(null);

    const setVal = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const getRoles = () => {
        axios.get(`https://works.demo-customproject.com:4001/get-roles/`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            SetRoles(res.data);
        })
    }

    const AddUser = async e => {
        e.preventDefault();
        let privlges = "";
        $(`[name='privi']`).each(function () {
            const ths = $(this);
            if (ths.prop('checked')) {
                if (privlges === "") {
                    privlges = ths.val();
                } else {
                    privlges = privlges + ',' + ths.val();
                }
            }
        })
        axios.post('https://works.demo-customproject.com:4001/addUser', { ...user, privileges: privlges }, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            if (response.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(response.data.message);
                user.first_name = '';
                user.last_name = '';
                user.email = '';
                user.password = '';
                $('.msg-box ~ form input').val('');
                $(`[name='privi']`).prop('checked', false)
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(response.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getRoles();
    }, [])
    if (roles === null) {
        return <div className='Loading'></div>
    }
    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> User Management </h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">

                                <a href="javascript: void(0);"> Users </a>
                            </li>
                            <li className="breadcrumb-item active"> Add User </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        {/* end page title */}
        <div className="row justify-content-center">
            <div className="col-xl-6">
                <div className="card">
                    <div className="card-body">
                        <div className="msg-box"> Lorem Ipsum </div>
                        <h4 className="card-title mb-4"> Add User </h4>
                        <form onSubmit={AddUser}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">

                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            onChange={setVal}
                                            className="form-control"
                                            id="formrow-email-input"
                                            placeholder="Enter Your First Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="formrow-password-input"
                                            className="form-label"
                                        >Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            onChange={setVal}
                                            className="form-control"
                                            id="formrow-password-input"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formrow-firstname-input" className="form-label">

                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={setVal}
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formrow-firstname-input" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="phone"
                                    name="phone"
                                    defaultValue={user.phone}
                                    onChange={setVal}
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formrow-firstname-input" className="form-label">
                                    Role
                                </label>
                                <select className='form-control' onChange={setVal} name='role'>
                                    {
                                        roles?.map((role) => {
                                            return <option value={role.id}>{role.label}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">

                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={setVal}
                                            className="form-control"
                                            id="formrow-inputCity"
                                            placeholder="Enter Your Password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <label htmlFor="formrow-inputCity" className="form-label">
                                        Allow Privilege
                                    </label>
                                    <div className='privlges-flex'>
                                        <label>
                                            <input type='checkbox' value="Contact_Inquiries" name='privi' />
                                            Contact Inquiries
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Faqs_Management" name='privi' />
                                            Faqs Management
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Packages_Management" name='privi' />
                                            Packages Management
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Reviews_Management" name='privi' />
                                            Reviews Management
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Site_Management" name='privi' />
                                            Site Management
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Content_Management" name='privi' />
                                            Content Management
                                        </label>
                                        <label>
                                            <input type='checkbox' value="Newsletters_Management" name='privi' />
                                            Newsletters Management
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary w-md">

                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default AddUser