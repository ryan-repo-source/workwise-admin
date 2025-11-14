import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios';

const Add_Sub_Category = () => {
    const [cate, setCate] = useState({
        name: '',
        parent_id: '',
        image: '',
        is_active: '1',
    });

    const [Pcate, getPCate] = useState(null);

    useEffect(() => {
        Getcategory();
    }, [])

    const Getcategory = async () => {
        await axios.get('https://works.demo-customproject.com:4001/categories').then((res) => {
            getPCate(res.data);
        })
    }

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
    
    const Add_Cat = async (e) => {
        e.preventDefault();
        console.log(cate)
        if (cate.name != '' && cate.image != '' && cate.parent_id != '') {
            e.preventDefault();
            await axios.post('https://works.demo-customproject.com:4001/add-sub-category', cate, { headers: { "Content-Type": "multipart/form-data",'Auth' : localStorage.getItem('accessToken') } }).then(res => {
                if (res.data.status == '200') {
                    $('.msg-box').removeClass('red')
                    $('.msg-box').addClass('green').text(res.data.message);
                    cate.name = ''
                    cate.image = ''
                    $('#add-cat input').val('');
                    $('#add-cat textarea').val('');
                } else {
                    $('.msg-box').removeClass('green')
                    $('.msg-box').addClass('red').text(res.data.message);
                }
            })
        } else {
            $('.msg-box').text('Some Fields Are Empty')
            $('.msg-box').addClass('red')
        }
    }

    return (<div className="container-fluid">

        {/* start page title */}
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Add Sub-Category </h4>
                </div>
            </div>
        </div>
        {/* end page title */}
        <form onSubmit={Add_Cat} id="add-cat">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="msg-box"> Lorem Ipsum </div>
                            <h4 className="card-title mb-4"> Add Sub-Category </h4>
                            <div className="mb-3">
                                <label htmlFor="formrow-firstname-input" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={setVal}
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">
                                        Select Parent Category
                                    </label>
                                    <select name='parent_id' className="form-control" onChange={setVal}>
                                        <option value=''>Select  Parent Category</option>
                                        {
                                            Pcate === null ? false : Pcate.map((nm, key)=>{
                                                return <option value={nm.id}>{nm.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formrow-firstname-input" className="form-label">

                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleFile}
                                        className="form-control"
                                        id="formrow-firstname-input"
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">
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

export default Add_Sub_Category