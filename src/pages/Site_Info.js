import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios';

const CMS_Edit = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Site_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    const [cont, setCont] = useState([]);
    // const [setdata, setData] = useState({});
    const setVal = (e) => {
        cont.map((el) => {
            if (el.type === e.target.name) {
                el.value = e.target.value;
            }
        })
    }
    const getPrevCont = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/site-info`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (res) {
            setCont(res.data);
        })
    }
    useEffect(() => {
        getPrevCont()
    }, [])

    const UpdateCont = async (e) => {
        e.preventDefault();
        for (let i = 0; i < cont.length; i++) {
            await axios.put(`https://works.demo-customproject.com:4001/update-site-info/${cont[i].id}`, cont[i], {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
                if (res.data.status == '200') {
                    $('.msg-box').removeClass('red')
                    $('.msg-box').addClass('green').text(res.data.message);
                    getPrevCont()
                } else {
                    $('.msg-box').removeClass('green')
                    $('.msg-box').addClass('red').text(res.data.message);
                }
            })
        }
        $(window).scrollTop(0);
    }
    if (Object.keys(cont).length === 0) {
        return <div className='Loading' > Loading... </div>
    } else {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> CMS </h4>
                    </div>
                </div>
            </div>
            <form onSubmit={UpdateCont}>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4"> Site Info </h4>
                                <div className="msg-box"> Lorem Ipsum </div>
                                {cont.map((elem) => {
                                    return (
                                        <div className="row mb-4">
                                            <label
                                                htmlFor="horizontal-firstname-input"
                                                className="col-sm-3 col-form-label"
                                            >

                                                {elem.type}
                                            </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name={elem.type}
                                                    className="form-control"
                                                    onChange={setVal}
                                                    id="horizontal-firstname-input"
                                                    defaultValue={elem.value}
                                                    placeholder="Enter Your "
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                <div>
                                    <button type="submit" className="btn btn-primary w-md">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

export default CMS_Edit