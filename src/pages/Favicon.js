import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'

const Favicon = () => {
    const [image, setImage] = useState([]);
    const [logo, setLogo] = useState("");

    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Site_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])

    const handleInput = (e) => {
        setImage(e.target.files[0]);
    }

    const getLogo = async () => {
        await axios.get('https://works.demo-customproject.com:4001/getfav', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(res => {
            setLogo(res.data[0].img_path);
        })
    }

    useEffect(() => {
        getLogo();
    }, [])
    
    const ChangeLogo = async () => {
        const formdata = new FormData();
        formdata.append('Logo', image);
        await axios.put('https://works.demo-customproject.com:4001/changefav', formdata, {
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

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Favicon Management </h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">

                                <a href="javascript: void(0);"> Favicon </a>
                            </li>
                            <li className="breadcrumb-item active"> Change Favicon </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="logo-view fav-ico">
                    <img src={"https://works.demo-customproject.com/admin/backend/public/uploads/" + logo} />
                </div>
                <div className="msg-box"> Lorem Ipsum </div>
                <div>
                    <label htmlFor="formFileLg" className="form-label">

                        Change Logo
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
        </div>
    </div>
  
    )
}

export default Favicon