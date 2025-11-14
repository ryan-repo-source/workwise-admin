import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';

const Add_Faqs = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Faqs_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])

    const [faq, setfaq] = useState({
        question: "",
        answer: "",
        is_active: "1",
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

    const addFaqs = async (e) => {
        e.preventDefault();
        await axios.post('https://works.demo-customproject.com:4001/add-faqs', faq, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                faq.question = "";
                faq.answer = "";
                $('.faqs-form textarea').val('');
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
                    <h4 className="mb-sm-0 font-size-18"> Add Faqs </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <div className="row justify-content-center faqs-form">
            <div className="col-xl-6">
                <div className="card">
                    <div className="card-body">
                        <div className="msg-box"> </div>
                        <h4 className="card-title mb-4"> Add Faqs </h4>
                        <form onSubmit={addFaqs}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">
                                            Question
                                        </label>
                                        <textarea name="question" onChange={setVal}></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label htmlFor="formrow-inputCity" className="form-label">

                                            Answer
                                        </label>
                                        <textarea name="answer" onChange={setVal}>

                                        </textarea>
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
                                        <label
                                            className="form-check-label"
                                            htmlFor="SwitchCheckSizelg"
                                        >

                                            Publish
                                        </label>
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

export default Add_Faqs