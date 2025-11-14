import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'

const EditFaq = () => {
    const { id } = useParams();
    const [faq, setfaq] = useState({})
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Faqs_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    useEffect(() => {
        getFaq();
    }, [id])
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
    const getFaq = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-faq/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            setfaq(res.data[0]);
        })
    }
    const UpdateFaq = async (e) => {
        e.preventDefault();
        await axios.put(`https://works.demo-customproject.com:4001/edit-faq/${id}`, faq, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                getFaq();
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
    }
    if (Object.keys(faq).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
                console.log(faq)
        return ( <div className="container-fluid">

                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Edit Faqs </h4>
                        </div>
                    </div>
                </div>
                {/* end page title */}
                <div className="row justify-content-center faqs-form">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="msg-box"> </div>
                                <h4 className="card-title mb-4"> Edit Faqs </h4>
                                <form onSubmit={UpdateFaq}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-inputCity" className="form-label">

                                                    Question
                                                </label>
                                                <textarea
                                                    name="question"
                                                    onChange={setVal}
                                                    defaultValue={faq.question}
                                                >

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="formrow-inputCity" className="form-label">

                                                    Answer
                                                </label>
                                                <textarea
                                                    name="answer"
                                                    onChange={setVal}
                                                    defaultValue={faq.answer}
                                                >

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div
                                                className="form-check form-switch form-switch-lg mb-3"
                                                dir="ltr"
                                            >

                                                {faq.is_active == 1 ? (
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
                                            Update
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
}

            export default EditFaq