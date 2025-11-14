import { useLocation, useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Header = () => {
    const [logo, setLogo] = useState("");
    const getLogo = async () => {
        await axios.get('https://works.demo-customproject.com:4001/getlogo', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(res => {
            setLogo(res.data[0].img_path);
        })
    }

    useEffect(() => {
        getLogo();
    }, [])


    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    if (pathname === '/') return false;
    const Logout = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('accessToken');
        setTimeout(function () {
            navigate('/admin/login');
        }, 1000);
    }

    return (<header id="page-topbar">
        <div className="navbar-header">
            <div className="d-flex">

                {/* LOGO */}
                <div className="navbar-brand-box">
                    <Link to="/admin" className="logo logo-dark">
                        <span className="logo-lg">
                            <img src={"https://works.demo-customproject.com/admin/backend/public/uploads/" + logo} alt height={70} />
                        </span>
                    </Link>
                </div>
                <button
                    type="button"
                    className="btn btn-sm px-3 font-size-16 header-item waves-effect"
                    id="vertical-menu-btn"
                >
                    <i className="fa fa-fw fa-bars" />
                </button>
            </div>
            <div className="d-flex">
                <div className="dropdown d-none d-lg-inline-block ms-1">
                    <button
                        type="button"
                        className="btn header-item noti-icon waves-effect"
                        data-bs-toggle="fullscreen"
                    >
                        <i className="bx bx-fullscreen" />
                    </button>
                </div>
                <div className="dropdown d-inline-block">
                    <button
                        type="button"
                        className="btn header-item waves-effect"
                        id="page-header-user-dropdown"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            className="rounded-circle header-profile-user"
                            src="assets/images/users/user.png"
                            alt="Header Avatar"
                        />
                        <span className="d-none d-xl-inline-block ms-1" key="t-henry">

                            {JSON.parse(localStorage.getItem("user_data")).first_name}
                        </span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">

                        {/* item*/}
                        {/* <a className="dropdown-item" href="index.html#"><i className="bx bx-user font-size-16 align-middle me-1" /> <span key="t-profile">Profile</span></a> */}
                        {/* <div className="dropdown-divider" /> */}
                        <a className="dropdown-item text-danger" onClick={Logout}>

                            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                            <span key="t-logout"> Logout </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>


    )
}

export default Header