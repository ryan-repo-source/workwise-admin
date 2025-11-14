import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from 'primereact/editor';
import { omit } from 'lodash'
import $ from 'jquery'
import axios from 'axios'

const Edit_Jobs = () => {
    const { id } = useParams();
    const auth_data = JSON.parse(localStorage.getItem('user_data'));
    const [errors, setErrors] = useState({});
    const [discription, setEditor] = useState(null);
    const validate = (name, value) => {
        switch (name) {
            case 'title':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        title: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "title");
                    setErrors(newObj);
                }
                break;
            case 'type':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        type: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "type");
                    setErrors(newObj);
                }
                break;
            case 'category':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        category: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "category");
                    setErrors(newObj);
                }
                break;
            case 'location':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        location: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "location");
                    setErrors(newObj);
                }
                break;
            case 'deadline':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        deadline: 'Field cannot be empty'
                    })
                } else if (value > 99) {
                    setErrors({
                        ...errors,
                        deadline: 'Deadline connot be more than 99 days'
                    })
                } else {
                    let newObj = omit(errors, "deadline");
                    setErrors(newObj);
                }
                break;
            case 'salary_min':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        salary_min: 'Field cannot be empty'
                    })
                } else if (parseInt(value) > parseInt(data.salary_max)) {
                    setErrors({
                        ...errors,
                        salary_min: 'Min salary ammount cannot be greater than Max ammount'
                    })
                } else {
                    let newObj = omit(errors, "salary_min");
                    setErrors(newObj);
                }
                break;
            case 'salary_max':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        salary_max: 'Field cannot be empty'
                    })
                } else if (parseInt(value) < parseInt(data.salary_min)) {
                    setErrors({
                        ...errors,
                        salary_max: 'Max salary ammount cannot be less than Min ammount'
                    })
                } else {
                    let newObj = omit(errors, "salary_max");
                    setErrors(newObj);
                }
                break;
            case 'skills':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        skills: 'Field cannot be emptysssss'
                    })
                } else {
                    let newObj = omit(errors, "skills");
                    setErrors(newObj);
                }
                break;
            case 'short_discription':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        short_discription: 'Field cannot be empty'
                    })
                } else if (value.length > 250) {
                    setErrors({
                        ...errors,
                        short_discription: 'Length Should be below 250'
                    })
                } else {
                    let newObj = omit(errors, "short_discription");
                    setErrors(newObj);
                }
                break;
            case 'discription':
                if (value == null || value == '') {
                    setErrors({
                        ...errors,
                        discription: 'Field cannot be empty'
                    })
                } else {
                    let newObj = omit(errors, "discription");
                    setErrors(newObj);
                }
                break;

            default:
                break;
        }
    }
    let err = {};
    const validate2 = (name, value) => {
        if (name == 'title')
            if (value == null || value == '') {
                err = {
                    ...err,
                    title: 'Field cannot be empty'
                }
            } else {
                delete errors.title
            }
        if (name == 'type')
            if (value == null || value == '') {
                err = {
                    ...err,
                    type: 'Field cannot be empty'
                }
            } else {
                delete errors.type
            }
        if (name == 'category')
            if (value == null || value == '') {
                err = {
                    ...err,
                    category: 'Field cannot be empty'
                }
            } else {
                delete errors.category
            }
        if (name == 'location')
            if (value == null || value == '') {
                err = {
                    ...err,
                    location: 'Field cannot be empty'
                }
            } else {
                delete errors.location
            }
        if (name == 'deadline')
            if (value == null || value == '') {
                err = {
                    ...err,
                    deadline: 'Field cannot be empty'
                }
            } else if (value > 99) {
                err = {
                    ...err,
                    deadline: 'Deadline cannot be more than 99 days'
                }
            } else {
                delete errors.deadline
            }
        if (name == 'salary_min')
            if (value == null || value == '') {
                err = {
                    ...err,
                    salary_min: 'Field cannot be empty'
                }
            } else if (parseInt(value) > parseInt(data.salary_max)) {
                err = {
                    ...err,
                    salary_min: 'Min salary ammount cannot be greater than Max ammount'
                }
            } else {
                delete errors.salary_min
            }
        if (name == 'salary_max')
            if (value == null || value == '') {
                err = {
                    ...err,
                    salary_max: 'Field cannot be empty'
                }
            } else if (parseInt(value) < parseInt(data.salary_min)) {
                err = {
                    ...err,
                    salary_max: 'Max salary ammount cannot be less than Min ammount'
                }
            } else {
                delete errors.salary_max
            }
        if (name == 'skills') {
            if (value == null || value == '') {
                err = {
                    ...err,
                    skills: 'Field cannot be emptyaaaa'
                }
            } else {
                delete errors.skills
            }
        }
        if (name == 'short_discription')
            if (value == null || value == '') {
                err = {
                    ...err,
                    short_discription: 'Field cannot be empty'
                }
            } else if (value.length > 250) {
                err = {
                    ...err,
                    short_discription: 'Length Should be below 250'
                }
            } else {
                delete errors.short_discription
            }
        if (name == 'discription') {
            if (value == null || value == '') {
                err = {
                    ...err,
                    discription: 'Field cannot be empty'
                }
            } else {
                delete errors.discription
            }
        }
        setErrors(err);
    }
    const [data, setData] = useState(null);

    // API
    const getData = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/get-single-jobs-comp/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            setData(res.data[0]);
            setEditor(res.data[0].discription)
        })
    }
    useEffect(() => {
        getData();
    }, [id])
    // API


    const setVal = (e) => {
        e.persist();
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        validate(e.target.name, e.target.value);
    }


    const UpdatePost = (e) => {
        e.preventDefault();
        e.target.classList.add('loadin');
        let post_data = data;
        let skillss = null;
        $('.keywords-list>.keyword').each(function () {
            let val = $(this).find('.keyword-text').text();
            skillss === null ? skillss = val : skillss = `${skillss},${val}`;
        })
        post_data = { ...post_data, "skills": skillss, "user_id": auth_data.id, "discription": discription };
        console.log(post_data, skillss);

        Object.keys(post_data).map((item) => {
            validate2(item, post_data[item]);
        })

        if (Object.keys(errors).length === 0 && Object.keys(err).length === 0) {
            axios.post(`https://works.demo-customproject.com:4001/edit-job`, { ...post_data }, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
                if (res.data.status == '200') {
                    $('.msg-box').removeClass('red')
                    $('.msg-box').addClass('green').text(res.data.message);
                    e.target.classList.remove('loadin');
                } else {
                    e.target.classList.remove('loadin');
                    $('.msg-box').removeClass('green')
                    $('.msg-box').addClass('red').text(res.data.message);
                }
            })
        } else {
            e.target.classList.remove('loadin');
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Job Management </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">

                                    <a href="/admin"> Admin </a>
                                </li>
                                <li className="breadcrumb-item active"> Add New Job </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={UpdatePost}>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="msg-box"> </div>
                                {data === null && discription === null ? <div className='Loading'></div> : <div className="row">
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Job Title</h5>
                                            <input type="text" name='title' defaultValue={data.title} onChange={setVal} className="form-control" />
                                            {errors.title && <div className='errorr'>{errors.title}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Job Type</h5>
                                            <select name='type' onClick={setVal} className="selectpicker form-control" data-size={7} title="Select Job Type">
                                                <option hidden disabled selected>{data.type}</option>
                                                <option value='Full Time'>Full Time</option>
                                                <option value='Freelance'>Freelance</option>
                                                <option value='Part Time'>Part Time</option>
                                                <option value='Internship'>Internship</option>
                                                <option value='Temporary'>Temporary</option>
                                            </select>
                                            {errors.type && <div className='errorr'>{errors.type}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Industry</h5>
                                            <select name='category' onChange={setVal} className="selectpicker form-control" data-size={7} title="Select Industry">
                                                <option hidden disabled selected>{data.category}</option>
                                                <option value="Accounting and Finance">Accounting and Finance</option>
                                                <option value="Clerical &amp; Data Entry">Clerical &amp; Data Entry</option>
                                                <option value="Counseling">Counseling</option>
                                                <option value="Court Administration">Court Administration</option>
                                                <option value="Human Resources">Human Resources</option>
                                                <option value="Investigative">Investigative</option>
                                                <option value="IT and Computers">IT and Computers</option>
                                                <option value="Law Enforcement">Law Enforcement</option>
                                                <option value="Management">Management</option>
                                                <option value="Miscellaneous">Miscellaneous</option>
                                                <option value="Public Relations">Public Relations</option>
                                            </select>
                                            {errors.category && <div className='errorr'>{errors.category}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Location</h5>
                                            <div className="input-with-icon">
                                                <div id="autocomplete-container">
                                                    <input id="autocomplete-input" name='location' defaultValue={data.location} onChange={setVal} className="form-control" type="text" placeholder="Type Address" />
                                                </div>
                                                <i className="icon-material-outline-location-on" />
                                            </div>
                                            {errors.location && <div className='errorr'>{errors.location}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Salary</h5>
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <div className="input-with-icon">
                                                        <input className="form-control" onChange={setVal} defaultValue={data.salary_min} name='salary_min' type="number" placeholder="Min" />
                                                        <i className="currency">USD</i>
                                                    </div>
                                                    {errors.salary_min && <div className='errorr'>{errors.salary_min}</div>}
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="input-with-icon">
                                                        <input className="form-control" onChange={setVal} defaultValue={data.salary_max} name='salary_max' type="number" placeholder="Max" />
                                                        <i className="currency">USD</i>
                                                    </div>
                                                    {errors.salary_max && <div className='errorr'>{errors.salary_max}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>Skills </h5>
                                            <div className="keywords-container">
                                                <div className="keyword-input-container">
                                                    <input type="text" className="keyword-input form-control" placeholder="e.g. Java, Python" />
                                                    <button type='button' className="keyword-input-button ripple-effect"><i class='bx bx-plus'></i></button>
                                                </div>
                                                {errors.skills && <div className='errorr'>{errors.skills}</div>}
                                                <div className="keywords-list">
                                                    {
                                                        data.skills.split(',').map((skil) => {
                                                            return <span class="keyword">
                                                                <span class="keyword-remove bx"></span>
                                                                <span class="keyword-text">{skil}</span>
                                                            </span>
                                                        })
                                                    }
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className='submit-field'>
                                            <h5>Redirect to another Job application post <span>(Optional)</span></h5>
                                            <input className='form-control' type='text' onChange={setVal} defaultValue={data.redirect_url} name='redirect_url' />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="submit-field">
                                            <h5>Short Description</h5>
                                            <textarea cols={30} rows={2} onChange={setVal} name='short_discription' defaultValue={data.short_discription} className="form-control" />
                                            {errors.short_discription && <div className='errorr'>{errors.short_discription}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="submit-field">
                                            <h5>Job Description</h5>
                                            <Editor value={discription} onTextChange={(e) => setEditor(e.htmlValue)} name='discription' style={{ height: '320px' }} />
                                            {errors.discription && <div className='errorr'>{errors.discription}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary w-md">
                                            Submit
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit_Jobs