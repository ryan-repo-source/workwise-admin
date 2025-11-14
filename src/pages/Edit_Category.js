import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

const Edit_Category = () => {

    const { id } = useParams();
    const [cate, setCate] = useState({});
    const [img, setImg] = useState("");

    const setVal = (e) => {
        setCate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleEditorChange = (e) => {
        setCate((prev) => ({ ...prev, [e.target.id]: e.target.getContent() }));
    }
    const handleFile = (e) => {
        setCate((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
    const setRadio = (e) => {
        if (e.target.checked === true) {
            setCate((prev) => ({ ...prev, is_active: '1' }));
        } else {
            setCate((prev) => ({ ...prev, is_active: '0' }));
        }
    }
    useEffect(() => {
        getCate();
    }, [id])

    const getCate = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/category/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(res => {
            setCate(res.data[0]);
            setImg(res.data[0].image)
        })
    }

    const Edit_Cat = async (e) => {
        e.preventDefault();
        if (cate.name != '' && cate.description != '' && cate.image != '') {
            console.log(cate)
            e.preventDefault();
            await axios.put(`https://works.demo-customproject.com:4001/edit-category/${id}`, cate, { headers: { "Content-Type": "multipart/form-data", 'Auth': localStorage.getItem('accessToken') } }).then(res => {
                if (res.data.status == '200') {
                    $('.msg-box').removeClass('red')
                    $('.msg-box').addClass('green').text(res.data.message);
                    getCate();
                } else {
                    $('.msg-box').removeClass('green')
                    $('.msg-box').addClass('red').text(res.data.message);
                }
            })
        } else {
            $('.msg-box').text('Some Fields Are Emptys')
            $('.msg-box').addClass('red')
        }
    }

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Edit Category </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <form onSubmit={Edit_Cat} id="Edit-cat">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="msg-box"> Lorem Ipsum </div>
                            <h4 className="card-title mb-4"> Edit Category </h4>
                            <div className="mb-3">
                                <label htmlFor="formrow-firstname-input" className="form-label">

                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={cate.name}
                                    onChange={setVal}
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    placeholder="Enter Your First Name"
                                />
                            </div>
                            {/* <div className="mb-3">
                                <Editor
                                    id="description"
                                    initialValue={cate.description}
                                    init={{
                                        plugins: "link image code",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | code",
                                    }}
                                    onChange={handleEditorChange}
                                />
                            </div> */}
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <img
                                        src={`https://works.demo-customproject.com/admin/backend/public/uploads/category/${img}`}
                                        className="w-60 file-img"
                                        alt="Image"
                                    />
                                    <label htmlFor="formrow-firstname-input" className="form-label">

                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        defaultValue={cate.image}
                                        onChange={handleFile}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Your First Name"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">

                                        {cate.is_active == 1 ? (
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
                            </div>
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

export default Edit_Category