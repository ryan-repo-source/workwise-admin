import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Colors_Management = () => {

    const [colors, SetColor] = useState(null);
    useEffect(() => {
        GetColors();
    }, []);

    const setVal = (e) => {
        SetColor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const GetColors = () => {
        axios.get(`https://works.demo-customproject.com:4001/get-colors/`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            let datat = {};
            res.data.map((clr) => {
                datat = {...datat, [clr.name] : clr.code}
            })
            SetColor(datat);
        })
    }

    const ChangeColor = (e) => {
        e.preventDefault();
        axios.post(`https://works.demo-customproject.com:4001/change-colors/`, colors, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
            GetColors();
        })
    }

    
    if (colors !== null) {
        return (
            <div className="container-fluid">
                <div className="msg-box"> Lorem Ipsum </div>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Colors Management </h4>
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/admin/"> Home </Link>
                                    </li>
                                    <li className="breadcrumb-item active"> Change Colors </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4"> Theme Colors </h4>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Primary Color</label>
                                                <input type="color" onChange={setVal} name="primary" defaultValue={colors.primary} className="form-control p-0" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Secondary Color</label>
                                                <input type="color" onChange={setVal} name="secondary" defaultValue={colors.secondary} className="form-control p-0" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4"> Button Colors </h4>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Button Back Color</label>
                                                <input type="color" onChange={setVal} name="btn_back" defaultValue={colors.btn_back} className="form-control p-0" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Button Text Color</label>
                                                <input type="color" onChange={setVal} name="btn_text" defaultValue={colors.btn_text} className="form-control p-0" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4"> Page Background Colors </h4>
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-email-input" className="form-label">Background Color</label>
                                                <input type="color" onChange={setVal} name="background" defaultValue={colors.background} className="form-control p-0" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={ChangeColor} className="btn btn-primary w-md">Change</button>
                </div>
            </div>
        )
    }
}

export default Colors_Management