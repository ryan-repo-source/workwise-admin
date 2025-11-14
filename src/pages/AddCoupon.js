import React, { useState } from 'react'
import axios from 'axios';
import $ from 'jquery';

const AddCoupon = () => {
    const [data, setdata] = useState({
        code: "",
        discount: "",
        is_active: "1",
    });

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
    const AddCoupon = async (e) => {
        e.preventDefault();
        await axios.post('https://works.demo-customproject.com:4001/add-coupon', data, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                data.code = "";
                data.discount = "";
                $('.col-sm-9 input').val('');
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
    }
    console.log(data)
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
                        <form onSubmit={AddCoupon}>
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
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="SwitchCheckSizelg"
                                        onClick={setRadio}
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="SwitchCheckSizelg">

                                        Publish
                                    </label>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-sm-9">
                                    <div>
                                        <button type="submit" className="btn btn-primary w-md">

                                            Add Coupon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* end card body */}
                </div>
            </div>
            {/* end col */}
        </div>
    </div>


    )
}

export default AddCoupon