import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'

const Logo = () => {

    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Site_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])


    const [image, setImage] = useState([]);
    const [logo, setLogo] = useState("");

    const [image2, setImage2] = useState([]);
    const [logo2, setLogo2] = useState("");


    const handleInput = (e) => {
        setImage(e.target.files[0]);
    }
    const handleInput2 = (e) => {
        setImage2(e.target.files[0]);
    }

    const getLogo = async () => {
        await axios.get('https://works.demo-customproject.com:4001/getlogo', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(res => {
            setLogo(res.data[0].img_path);
        })
    }

    const getLogo2 = async () => {
        await axios.get('https://works.demo-customproject.com:4001/getlogo2', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(res => {
            setLogo2(res.data[0].img_path);
        })
    }

    useEffect(() => {
        getLogo();
        getLogo2();
    }, [])
    
    const ChangeLogo = async () => {
        const formdata = new FormData();
        formdata.append('Logo', image);
        await axios.put('https://works.demo-customproject.com:4001/changelogo', formdata, {
            headers: { "Content-Type": "multipart/form-data",'Auth' : localStorage.getItem('accessToken') }
        }).then(res => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                getLogo();
            } else {
                $('.msg-box').removeClass('green')
                $('.msg-box').addClass('red').text(res.data.message);
            }
        })
    }

    const ChangeLogo2 = async () => {
        const formdata = new FormData();
        formdata.append('Logo2', image2);
        await axios.put('https://works.demo-customproject.com:4001/changelogo2', formdata, {
            headers: { "Content-Type": "multipart/form-data", 'Auth' : localStorage.getItem('accessToken') }
        }).then(res => {
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                getLogo();
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
                    <h4 className="mb-sm-0 font-size-18"> Logo Management </h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">

                                <a href="javascript: void(0);"> Logo </a>
                            </li>
                            <li className="breadcrumb-item active"> Change Logo </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-7">

                <div className="msg-box"> Lorem Ipsum </div>
            </div>
        </div>
        <div className="row justify-content-evenly">
            <div className="col-md-5">
                <div className="logo-view">
                    <img src={"https://works.demo-customproject.com/admin/backend/public/uploads/" + logo} />
                </div>
                <div>
                    <label htmlFor="formFileLg" className="form-label">

                        Header Logo
                    </label>
                    <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        onChange={handleInput}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => {
                        ChangeLogo();
                    }}
                    className="btn mt-4 btn-primary btn-lg waves-effect waves-light"
                >

                    Update Logo
                </button>
            </div>
            <div className="col-md-5">
                <div className="logo-view">
                    <img src={"https://works.demo-customproject.com/admin/backend/public/uploads/" + logo2} />
                </div>
                <div>
                    <label htmlFor="formFileLg" className="form-label">

                        Footer Logo
                    </label>
                    <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        onChange={handleInput2}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => {
                        ChangeLogo2();
                    }}
                    className="btn mt-4 btn-primary btn-lg waves-effect waves-light"
                >
                    Update Logo
                </button>
            </div>
        </div>
    </div>
  
    )
}

export default Logo