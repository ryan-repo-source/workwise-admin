import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'

const Edit_Review = () => {
    const { id } = useParams();
    const [review_sing, setreview_sing] = useState({});
    const auth = JSON.parse(localStorage.getItem('user_data'));
    useEffect(() => {
        if (!auth?.privileges?.split(',').includes('Reviews_Management') && auth.role != 1) {
            window.location.replace('/admin');
        }
    }, [])
    useEffect(() => {
        getFaq();
    }, [id]);
    const setVal = (e) => {
        setreview_sing((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const getFaq = async () => {
        await axios
            .get(`https://works.demo-customproject.com:4001/get-review-single/${id}`, {headers : {'Auth' : localStorage.getItem('accessToken')}})
            .then((res) => {
                setreview_sing(res.data[0]);
            });
    };
    const UpdateFaq = async (e) => {
        e.preventDefault();
        await axios
            .put(`https://works.demo-customproject.com:4001/edit-review-single/${id}`, review_sing, {headers : {'Auth' : localStorage.getItem('accessToken')}})
            .then((res) => {
                if (res.data.status == "200") {
                    $(".msg-box").removeClass("red");
                    $(".msg-box").addClass("green").text(res.data.message);
                    getFaq();
                } else {
                    $(".msg-box").removeClass("green");
                    $(".msg-box").addClass("red").text(res.data.message);
                }
            });
    };
    if (Object.keys(review_sing).length === 0) {
        return <div className="Loading"> Loading... </div>;
    } else {
        console.log(review_sing);
        return (
            <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18"> Edit Review </h4>
                        </div>
                    </div>
                </div>
                {/* end page title */}
                <div className="row justify-content-center faqs-form">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="msg-box"> </div>
                                <h4 className="card-title"> Edit Review </h4>
                                <form onSubmit={UpdateFaq}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="rate">
                                                    <input type="radio" checked={review_sing.rating == 5 ? true : false} onClick={setVal} id="star5" name="rating" defaultValue={5} />
                                                    <label htmlFor="star5" title="text">5 stars</label>
                                                    <input type="radio" checked={review_sing.rating == 4 ? true : false} onClick={setVal} id="star4" name="rating" defaultValue={4} />
                                                    <label htmlFor="star4" title="text">4 stars</label>
                                                    <input type="radio" checked={review_sing.rating == 3 ? true : false} onClick={setVal} id="star3" name="rating" defaultValue={3} />
                                                    <label htmlFor="star3" title="text">3 stars</label>
                                                    <input type="radio" checked={review_sing.rating == 2 ? true : false} onClick={setVal} id="star2" name="rating" defaultValue={2} />
                                                    <label htmlFor="star2" title="text">2 stars</label>
                                                    <input type="radio" checked={review_sing.rating == 1 ? true : false} onClick={setVal} id="star1" name="rating" defaultValue={1} />
                                                    <label htmlFor="star1" title="text">1 star</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mt-3">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="formrow-inputCity"
                                                    className="form-label"
                                                >
                                                    Comment
                                                </label>
                                                <textarea
                                                    name="comment"
                                                    onChange={setVal}
                                                    defaultValue={review_sing.comment}
                                                ></textarea>
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
        );
    }
};

export default Edit_Review;
