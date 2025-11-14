import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CMS_Edit = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Content_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    const { id } = useParams();
    const [img, setImg] = useState("");
    const [cont, setCont] = useState({
        title: "",
        subtitle: "",
        description: "",
        description2: "",
        image_path: "",
        video_path: "",
        title1: "",
        text1: "",
        image1: "",
        title2: "",
        text2: "",
        image2: "",
        title3: "",
        text3: "",
        image3: "",
        title4: "",
        image4: "",
        text4: "",
        title5: "",
        image5: "",
        text5: "",
        title6: "",
        image6: "",
        text6: "",
        button1: "",
        button1link: "",
        button2: "",
        button2link: "",
        button3: "",
        button3link: "",
        button4: "",
        button4link: "",
        phone1: "",
        phone2: "",
    });
    const setVal = (e) => {
        setCont((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleEditorChange = (e) => {
        setCont((prev) => ({ ...prev, [e.target.id]: e.target.getContent() }));
    }
    const handleFile = (e) => {
        setCont((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
    const getPrevCont = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-cms-sec/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(function (res) {
            setCont(res.data[0]);
            setImg(res.data[0].image_path);
        })
    }
    useEffect(() => {
        getPrevCont()
    }, [id])
    
    const UpdateCont = async (e) => {
        console.log(cont)
        e.preventDefault();
        await axios.put(`https://works.demo-customproject.com:4001/put-cms-sec/${id}`, cont, { headers: { "Content-Type": "multipart/form-data",'Auth' : localStorage.getItem('accessToken') } }).then((res) => {
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

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> CMS </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <form onSubmit={UpdateCont}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="msg-box"> </div>
                            <h4 className="card-title mb-4"> Section Content </h4>
                            {cont.title != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.title}
                                        name="title"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.subtitle != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.subtitle}
                                        name="subtitle"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.title1 != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.title1}
                                        name="title1"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.text1 != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Short Description:
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.text1}
                                        name="text1"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.title2 != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.title2}
                                        name="title2"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.text2 != null ? (
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">

                                        Short Description:
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={cont.text2}
                                        name="text2"
                                        onChange={setVal}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                            ) : null}
                            {cont.description != null ? (
                                <div className="mb-3">
                                    <Editor
                                        id="description"
                                        initialValue={cont.description}
                                        init={{
                                            plugins: "link image code",
                                            toolbar:
                                                "undo redo | bold italic | alignleft aligncenter alignright | code",
                                        }}
                                        onChange={handleEditorChange}
                                    />
                                </div>
                            ) : null}
                            {cont.description2 != null ? (
                                <div className="mb-3">
                                    <Editor
                                        id="description2"
                                        initialValue={cont.description2}
                                        init={{
                                            plugins: "link image code",
                                            toolbar:
                                                "undo redo | bold italic | alignleft aligncenter alignright | code",
                                        }}
                                        onChange={handleEditorChange}
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

                    {cont.image_path != null ? (
                        <div className="mb-3">
                            <img
                                src={`https://works.demo-customproject.com/admin/backend/public/uploads/CMS/${img}`}
                                className="w-100 file-img"
                                alt="Image"
                            />
                            <label htmlFor="formrow-firstname-input" className="form-label">
                                Image
                            </label>
                            <input
                                type="file"
                                defaultValue={cont.image_path}
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

export default CMS_Edit