import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const Sidebar = () => {
    const [geturl, setGeturl] = useState("");
    const [cms, setCms] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        getUrl();
        getCms();
    }, [])
    useEffect(() => {
        $('#vertical-menu-btn').unbind().click(function () {
            $('.vertical-menu').toggle();
        })
    })
    const pathname = useLocation().pathname;
    useEffect(() => {
        if ($(window).width() < 768) {
            $('.vertical-menu').hide();
        }
    }, [pathname])
    if (pathname == '/') return false;
    const getUrl = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-site-url', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (res) {
            setGeturl(res.data[0].value);
        })
    }
    const getCms = async () => {
        await axios.get('https://works.demo-customproject.com:4001/get-cms', { headers: { 'Auth': localStorage.getItem('accessToken') } }).then(function (res) {
            setCms(res.data);
        })
    }

    const uniqueElements = [...new Set(cms)];

    const count = uniqueElements.map(element => [
        element,
        cms.filter(el => el.page_name === element.page_name).length,
    ]);

    var result = count.reduce((unique, o) => {
        if (!unique.some(obj => obj[0].page_name === o[0].page_name)) {
            unique.push(o);
        }
        return unique;
    }, []);

    if (auth === null) {
        return null
    }

    // [ [ 'one', 3 ], [ 'two', 2 ], [ 'three', 1 ] ]
    // console.log(count);
    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title" key="t-menu">Menu</li>
                        <li><Link to="/admin" key="t-default"><i className="bx bx-home-circle" />
                            <span key="t-dashboards">Dashboards</span></Link></li>
                        {
                            auth?.privileges?.split(',').includes('Contact_Inquiries') || auth?.role == 1 ? <li><Link to="/admin/contact-inq" key="t-default"><i className="bx bxs-contact" />
                                <span key="t-dashboards">Contact Inquiries</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Faqs_Management') || auth?.role == 1 ? <li><Link to="/admin/faqs" key="t-default"><i className="bx bx-question-mark" />
                                <span key="t-dashboards">Faqs Management</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Packages_Management') || auth?.role == 1 ? <li><Link to="/admin/packages" key="t-default"><i className="mdi mdi-handshake-outline" />
                                <span key="t-dashboards">Packages Management</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Reviews_Management') || auth?.role == 1 ? <li><Link to="/admin/reviews" key="t-default"><i className="bx bxs-user" />
                                <span key="t-dashboards">Reviews Management</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Email_Templates') || auth?.role == 1 ? <li><Link to="/admin/email-templates" key="t-default"><i className="bx bxs-envelope" />

                                <span key="t-dashboards">Email Templates</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Job_Management') || auth?.role == 1 ? <li><Link to="/admin/all-jobs" key="t-default"><i class='bx bx-file'></i>

                                <span key="t-dashboards">Job Management</span></Link></li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Order_Management') || auth?.role == 1 ? <li><Link to="/admin/orders" key="t-default"><i class='bx bx-file'></i>

                                <span key="t-dashboards">Order Management</span></Link></li> : false
                        }
                        {/* <li>
                            <a className="has-arrow waves-effect">
                                <i className="bx bx-grid-alt" />
                                <span key="t-dashboards">Category Management</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/admin/categories" key="t-default">Parent Category</Link></li>
                                <li><Link to="/admin/sub-categories" key="t-saas">Child Category</Link></li>
                            </ul>
                        </li> */}
                        {/* <li className="menu-title" key="t-apps">Site</li> */}
                        {/* <li><a target="_blank" href={geturl} key="t-default"><i className="bx bx-globe" />
                            <span key="t-dashboards">Visit Website</span></a></li> */}
                        {
                            auth?.privileges?.split(',').includes('Site_Management') || auth?.role == 1 ? <li>
                                <a className="has-arrow waves-effect">
                                    <i className="bx bx-sitemap" />
                                    <span key="t-dashboards">Site Management</span>
                                </a>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/admin/logo-management" key="t-default">Logo Management</Link></li>
                                    <li><Link to="/admin/favicon-management" key="t-saas">Favicon Management</Link></li>
                                    {/* <li><Link to="/admin/colors-management" key="t-saas">Colors Management</Link></li> */}
                                    <li><Link to="/admin/site-info" key="t-saas">Site Info</Link></li>
                                </ul>
                            </li> : false
                        }
                        {
                            auth?.privileges?.split(',').includes('Content_Management') || auth?.role == 1 ? <li>
                                <a className="has-arrow waves-effect">
                                    <i className="bx bxs-book-content" />
                                    <span key="t-dashboards">Content Management</span>
                                </a>
                                <ul className="sub-menu" aria-expanded="false">
                                    {
                                        result.map((item, key) => {
                                            return <li key={key}><Link to={`/admin/cms/${item[0].page_slug}`} key="t-default">{item[0].page_name}<span className="badge rounded-pill bg-primary float-end">{item[1]}</span></Link></li>
                                        })
                                    }
                                </ul>
                            </li> : false
                        }
                        {/* <li className="menu-title" key="t-apps">Users</li> */}
                        {
                            auth.role == 1 && <li>
                                <a className="has-arrow waves-effect">
                                    <i className="bx bxs-user-detail" />
                                    <span key="t-dashboards">User Management</span>
                                </a>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/admin/addUser" key="t-saas">Add User</Link></li>
                                    <li><Link to="/admin/users/1" key="t-default">Admins</Link></li>
                                    <li><Link to="/admin/users/4" key="t-default">Sub Admins</Link></li>
                                    <li><Link to="/admin/users/2" key="t-default">Employer</Link></li>
                                    <li><Link to="/admin/users/0" key="t-default">Candidate</Link></li>
                                </ul>
                            </li>
                        }
                        {
                            auth?.privileges?.split(',').includes('Newsletters_Management') || auth?.role == 1 ? <li><Link to="/admin/newsletters" key="t-default"><i className="bx bxs-envelope" />
                                <span key="t-newsletters">Newsletters</span></Link></li> : false
                        }
                        {/* <li><Link to="/admin/coupon" key="t-default"><i className="bx bxs-discount" />
                            <span key="t-dashboards">Coupon</span></Link></li> */}
                        <li><Link to={`/admin/edituser/${auth.id}`} key="t-default"><i className="bx bxs-user" />
                            <span key="t-dashboards">Edit Profile</span></Link></li>

                    </ul>
                </div>
                {/* Sidebar */}
            </div>
        </div>

    )
}

export default Sidebar