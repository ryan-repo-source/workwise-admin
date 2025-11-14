import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

const EditCoupon = () => {
    const [data, setdata] = useState({});
    const { id } = useParams();
    useEffect(() => {
        GetCoupon();
    }, [id])
    const setVal = (e) => {
        setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const setRadio = (e) => {
        if (e.target.checked === true) {
            setdata((prev) => ({ ...prev, is_active: '1' }));
        } else {
            setdata((prev) => ({ ...prev, is_active: '0' }));
        }
    }

    const GetCoupon = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-coupon/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            setdata(res.data[0]);
        })
    }

    const UpdateCoupon = async (e) => {
        e.preventDefault();
        console.log(data)
        await axios.put(`https://works.demo-customproject.com:4001/edit-coupon/${id}`, data, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
    }
    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Add Coupon </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <div className="row justify-content-center faqs-form">
            <div className="col-xl-6">
                <div className="card">
                    <div className="card-body">
                        <div className="msg-box"> </div>
                        <form onSubmit={UpdateCoupon}>
                            <div className="row mb-4">
                                <label
                                    htmlFor="horizontal-firstname-input"
                                    className="col-sm-3 col-form-label"
                                >

                                    Coupon Code
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        name="code"
                                        defaultValue={data.code}
                                        onChange={setVal}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label
                                    htmlFor="horizontal-email-input"
                                    className="col-sm-3 col-form-label"
                                >

                                    Discount
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        name="discount"
                                        defaultValue={data.discount}
                                        onChange={setVal}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div
                                    className="form-check form-switch form-switch-lg mb-3"
                                    dir="ltr"
                                >

                                    {data.is_active == 1 ? (
                                        <input
                                            className="form-check-input"
                                            onClick={setRadio}
                                            type="checkbox"
                                            id="SwitchCheckSizelg"
                                            defaultChecked
                                        />
                                    ) : (
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            onClick={setRadio}
                                            id="SwitchCheckSizelg"
                                        />
                                    )}
                                    <label className="form-check-label" htmlFor="SwitchCheckSizelg">

                                        Publish
                                    </label>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-sm-9">
                                    <div>
                                        <button type="submit" className="btn btn-primary w-md">

                                            Update Coupon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    )
}

export default EditCoupon