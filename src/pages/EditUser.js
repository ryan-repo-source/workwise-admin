import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const auth = JSON.parse(localStorage.getItem('user_data'));


    const [roles, SetRoles] = useState(null);

    useEffect(() => {
        $('.eye-buttn').click(function () {
            let inpt = $(this).prev();
            if (inpt.attr('type') == "text") {
                inpt.attr('type', 'password')
            } else {
                inpt.attr('type', 'text')
            }
        })
    })

    const setVal = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const getUser = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/user/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            setUser(response.data[0]);
        })
    }

    const getRoles = () => {
        axios.get(`https://works.demo-customproject.com:4001/get-roles/`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            SetRoles(res.data);
        })
    }
    useEffect(() => {
        getRoles();
        getUser();
    }, [id])
    const UpdateUser = async (e) => {
        e.preventDefault();
        let privlges = "";
        if(auth.id == user.id){
            privlges = user.privileges;
        }else{
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
        }
        await axios.put(`https://works.demo-customproject.com:4001/edituser/${id}`, { ...user, privileges: privlges }, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (response) {
            if (response.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(response.data.message);
                $('.aut-form-box input').val('');
                getUser();
            } else {
                $('.msg-box').removeClass('green');
                $('.msg-box').addClass('red').text(response.data.message);
            }
        }).catch(function (error) {
            // console.log(error);
        });

    }
    if (user === null) {
        return false;
    }
    if (auth.id != user.id && auth.role != 1) {
        window.location.replace('/admin')
    }
    console.log(user)
    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> {user.role == '1' ? 'Admin Profile' : false}{user.role == '0' ? 'User Management' : false}{user.role == '2' ? 'Author Management' : false}</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a href="javascript: void(0);"> Users </a>
                            </li>
                            <li className="breadcrumb-item active"> Edit </li>
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
                        <h4 className="card-title mb-4"> Edit Profile </h4>
                        <form onSubmit={UpdateUser} autoComplete="off">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-email-input" className="form-label">

                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            defaultValue={user.first_name}
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
                                            defaultValue={user.last_name}
                                            onChange={setVal}
                                            className="form-control"
                                            id="formrow-password-input"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                auth.role == 1 && auth.id != user.id ? <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">

                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your Email"
                                    />
                                </div> : false
                            }
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
                            {
                                auth.role == 1 && auth.id != user.id ? <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Role
                                    </label>
                                    <select className='form-control' onChange={setVal} name='role'>
                                        {
                                            roles?.map((role) => {
                                                return user.role == role.id ? <option selected value={role.id}>{role.label}</option> : <option value={role.id}>{role.label}</option>
                                            })
                                        }
                                    </select>
                                </div> : false
                            }

                            {/* <div className="row bg-light pt-3 mb-3">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            If you want to update password type new password here
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={setVal}
                                            className="form-control"
                                            id="formrow-inputCity"
                                            defaultValue=''
                                            placeholder="Enter Your Password"
                                        />
                                        <button class="btn btn-light eye-buttn" type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                    </div>
                                </div>
                            </div> */}
                            {
                                auth.role == 1 && auth.id != user.id ? <div className="row">
                                    <div className="col-lg-12">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Allow Privilege
                                        </label>
                                        <div className='privlges-flex'>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Contact_Inquiries') ? <input type='checkbox' value="Contact_Inquiries" defaultChecked name='privi' /> : <input type='checkbox' value="Contact_Inquiries" name='privi' />
                                                }
                                                Contact Inquiries
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Faqs_Management') ? <input type='checkbox' value="Faqs_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Faqs_Management" name='privi' />
                                                }
                                                Faqs Management
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Packages_Management') ? <input type='checkbox' value="Packages_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Packages_Management" name='privi' />
                                                }
                                                Packages Management
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Reviews_Management') ? <input type='checkbox' value="Reviews_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Reviews_Management" name='privi' />
                                                }
                                                Reviews Management
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Site_Management') ? <input type='checkbox' value="Site_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Site_Management" name='privi' />
                                                }
                                                Site Management
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Content_Management') ? <input type='checkbox' value="Content_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Content_Management" name='privi' />
                                                }
                                                Content Management
                                            </label>
                                            <label>
                                                {
                                                    user?.privileges?.split(',').includes('Newsletters_Management') ? <input type='checkbox' value="Newsletters_Management" defaultChecked name='privi' /> : <input type='checkbox' value="Newsletters_Management" name='privi' />
                                                }
                                                Newsletters Management
                                            </label>
                                        </div>
                                    </div>
                                </div>: false
                            }

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

export default EditUser