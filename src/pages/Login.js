import $ from 'jquery'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [log, setLog] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const setVal = (e) => {
        setLog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const Login = async (e) => {
        console.log(log)
        e.preventDefault();
        await axios.post('https://works.demo-customproject.com:4001/login-admin', log).then(function (response) {
            if (response.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(response.data.message);
                localStorage.setItem('user_data', JSON.stringify(response.data.data[0]));
                localStorage.setItem('accessToken', response.data.accessToken);
                console.log(response);
                setTimeout(function () {
                    navigate('/admin/');
                }, 1000)
            } else {
                console.log(response.data.status)
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(response.data.message);
            }
        })
    }
    return (<div className="account-pages my-5 pt-sm-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="card overflow-hidden">
                        <div className="bg-primary bg-soft">
                            <div className="row">
                                <div className="col-7">
                                    <div className="text-primary p-4">
                                        <h5 className="text-primary"> Welcome Back! </h5>
                                        <p> Sign in to continue to Admin </p>
                                    </div>
                                </div>
                                <div className="col-5 align-self-end">
                                    <img
                                        src="assets/images/profile-img.png"
                                        alt
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div className="p-2 mt-4">
                                <form onSubmit={Login}>
                                    <div className="form-horizontal">
                                        <div className="msg-box"> Lorem Ipsum </div>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">

                                                Username
                                            </label>
                                            <input
                                                type="email"
                                                onChange={setVal}
                                                name="email"
                                                className="form-control"
                                                id="username"
                                                placeholder="Enter username"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"> Password </label>
                                            <div className="input-group auth-pass-inputgroup">
                                                <input
                                                    type="password"
                                                    autoComplete="true"
                                                    onChange={setVal}
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    aria-label="Password"
                                                    aria-describedby="password-addon"
                                                />
                                                <button
                                                    className="btn btn-light "
                                                    type="button"
                                                    id="password-addon"
                                                >

                                                    <i className="mdi mdi-eye-outline" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="remember-check"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="remember-check"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="mt-3 d-grid">
                                            <button
                                                className="btn btn-primary waves-effect waves-light"
                                                type="submit"
                                            >

                                                Log In
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <div>
                            <p>
                                {/* ©Admin Panel <i className="mdi mdi-heart text-danger" /> by DEV-R */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login