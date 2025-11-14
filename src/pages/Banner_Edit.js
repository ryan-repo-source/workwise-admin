import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Banner_Edit = () => {
    const { id } = useParams();
    const [img, setImg] = useState("");
    const [banner, setBanner] = useState({
        heading: "",
        sub_title: "",
        description: "",
        image_path: "",
    });

    const setVal = (e) => {
        setBanner((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleFile = (e) => {
        setBanner((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
    const getPrevBanner = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-banner/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (res) {
            setBanner(res.data[0]);
            setImg(res.data[0].image_path);
        })
    }
    useEffect(() => {
        getPrevBanner()
    }, [id])
    
    const UpdateBanner = async (e) => {
        e.preventDefault();
        await axios.put(`https://works.demo-customproject.com:4001/save-banner/${id}`, {asd:'asd'}, { headers: { "Content-Type": "multipart/form-data",'Auth' : localStorage.getItem('accessToken') } }).then(function (res) {
            $('.msg-box').text('')
            if (res.data.status == '200') {
                $('.msg-box').removeClass('red')
                $('.msg-box').addClass('green').text(res.data.message);
                // getPrevBanner()
            } else {
                $('.msg-box').removeClass('green')
                if(res.data.sqlMessage) {
                    $('.msg-box').addClass('red').text(res.data.sqlMessage);
                } else {
                    $('.msg-box').addClass('red').text(res.data.message);
                }
            }
        })
    }

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Banner </h4>
                </div>
            </div>
        </div>

        {/* end page title */}
        <form onSubmit={UpdateBanner}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="msg-box"> </div>
                            <h4 className="card-title mb-4"> Banner Content </h4>
                            {banner.heading != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={banner.heading}
                                        name="heading"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter banner heading"
                                    />
                                </div>
                            ) : null}
                            {banner.sub_title != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Sub title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={banner.sub_title}
                                        name="sub_title"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter sub title"
                                    />
                                </div>
                            ) : null}
                            {banner.description != null ? (
                                <div className="mb-3">
                                    <textarea
                                        id="description"
                                        value={banner.description}
                                        name='description'
                                        onChange={setVal}
                                        className='form-control'
                                    />
                                </div>
                            ) : null}
                            <div>
                                <button type="submit" className="btn btn-primary w-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                        {/* end card body */}
                    </div>
                    {/* end card */}
                </div>

                <div className="col-lg-4">

                    {banner.image_path != null ? (
                        <div className="mb-3">
                            <img
                                src={`https://locahost/esquare-admin/server/public/uploads/banner/${img}`}
                                className="w-100 file-img"
                                alt="Image"
                                onerror="this.style.display = 'none'"
                            />
                            <label htmlFor="formrow-firstname-input" className="form-label">
                                Image
                            </label>
                            <input
                                type="file"
                                defaultValue={banner.image_path}
                                name="image_path"
                                onChange={handleFile}
                                className="form-control"
                                id="formrow-firstname-input"
                            />
                        </div>
                    ) : null}
                </div>
                {/* end col */}
            </div>
        </form>
    </div>
    )
}

export default Banner_Edit