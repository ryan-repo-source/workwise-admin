import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';

function Add_packge() {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Packages_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    const [faq, setfaq] = useState({
        is_active: "1",
        credit: "",
    });

    const setVal = (e) => {
        setfaq((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const setRadio = (e) => {
        if (e.target.checked === true) {
            setfaq((prev) => ({ ...prev, is_active: '1' }));
        } else {
            setfaq((prev) => ({ ...prev, is_active: '0' }));
        }
    }
    const setUnlmtd = (e) => {
        if (e.target.checked === true) {
            setfaq((prev) => ({ ...prev, credit: '~' }));
        } else {
            setfaq((prev) => ({ ...prev, credit: '' }));
        }
    }
    

    const addFaqs = async (e) => {
        e.preventDefault();
        await axios.post('https://works.demo-customproject.com:4001/add-pricing', faq, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                setfaq({
                    is_active: "1",
                })
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
        console.log(faq)
    }

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Add Packges </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <div className="row justify-content-center faqs-form">
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-body packge_wrpp">
                        <div className="msg-box"> </div>
                        <h4 className="card-title mb-4"> Add Packges </h4>
                        <form onSubmit={addFaqs}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Title
                                        </label>
                                        <input name='title' onChange={setVal} />
                                        {/* <textarea name="question" onChange={setVal}></textarea> */}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Price
                                        </label>
                                        <input name='price' type='number' onChange={setVal} />
                                        {/* <textarea name="question" onChange={setVal}></textarea> */}
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Number of Jobs Posting
                                        </label>
                                        {faq.credit === '~' ? false : <input name='credit' type='number' onChange={setVal} />}

                                        <div
                                            className="form-check form-switch form-switch-lg mt-2"
                                            dir="ltr"
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="SwitchCheckSizelg"
                                                onClick={setUnlmtd}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="SwitchCheckSizelg"
                                            >Unlimited Number of Jobs Posting</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Button Text
                                        </label>
                                        <input name='buttonText' onChange={setVal} />
                                        {/* <textarea name="question" onChange={setVal}></textarea> */}
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-5">
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
                                        <label
                                            className="form-check-label"
                                            htmlFor="SwitchCheckSizelg"
                                        >

                                            Publish
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-2"></div>
                                <div className="col-lg-6 new-inpt">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Duration
                                        </label>
                                        <select name='duration' onChange={setVal}>
                                            <option value="0">Per Week</option>
                                            <option value="1">Per Month</option>
                                            <option value="2">Per Year</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary w-md">

                                    Add
                                </button>
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

export default Add_packge
