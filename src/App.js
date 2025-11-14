import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Auth from './components/Auth';
import Footer from './components/Footer';
import Header from './components/Header';
import Scripts from './components/Scripts';
import Sidebar from './components/Sidebar';
import AddUser from './pages/AddUser';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';
import Favicon from './pages/Favicon';
import Login from './pages/Login';
import Logo from './pages/Logo';
import Users from './pages/Users';
import CMS from './pages/CMS';
import CMS_Edit from './pages/CMS_Edit';
import Site_Info from './pages/Site_Info';
import Banner from './pages/Banner';
import EditBanner from './pages/Banner_Edit';
import Inquiry from './pages/Inquiry';
import EditInq from './pages/EditInq';
import Newsletters from './pages/Newsletters';
import Add_Faqs from './pages/Add_Faqs';
import Faqs from './pages/Faqs';
import EditFaq from './pages/EditFaq';
import Coupon from './pages/Coupon';
import AddCoupon from './pages/AddCoupon';
import EditCoupon from './pages/EditCoupon';
import Add_Category from './pages/Add_Category';
import Categories from './pages/Categories';
import Edit_Category from './pages/Edit_Category';
import Colors_Management from './pages/Colors_Management';
import Reviews from './pages/Reviews';
import Edit_Review from './pages/Edit_Review';
import Sub_Categories from './pages/Sub_Categories';
import Add_Sub_Category from './pages/Add_Sub_Category';
import Edit_Sub_Category from './pages/Edit_Sub_Category';
import Add_packge from './pages/Add_packge';
import Package from './pages/Package';
import EditPackage from './pages/EditPackage';
import Email_Templates from './pages/Email_Templates';
import Email_Edit from './pages/Email_Edit';
import Job_Listing from './pages/Job_Listing';
import { useProductContext } from './context/productcontext';
import Add_Jobs from './pages/Add_Jobs';
import Edit_Jobs from './pages/Edit_Jobs';
import Order_Managment from './pages/Order_Managment';
import Order_Invoice from './pages/Order_Invoice';


function App() {
    const {jobs} = useProductContext();
    const [logo, setLogo] = useState("");
    const getLogo = async () => {
        await axios.get('https://works.demo-customproject.com:4001/getfav', {headers : {'Auth' : localStorage.getItem('accessToken')}}).then(res => {
            $('link[rel="icon"]').attr('href','https://works.demo-customproject.com/admin/backend/public/uploads/'+res.data[0].img_path);
            setLogo(res.data[0].img_path);
        })
    }
    useEffect(() => {
        getLogo();
    }, [])
    return (
        <>
            <BrowserRouter>
                {(() => {
                    if (localStorage.getItem('user_data') == null) {
                        return <Routes>
                            <Route path='/admin/login' element={<Login />} />
                            <Route path='*' element={<Auth />} />
                        </Routes>
                    }
                    else {
                        return jobs === null ? <div className='Loading prelodf'><img src={"https://works.demo-customproject.com/admin/backend/public/uploads/" + logo} alt='w' height={70} /></div> : <div id="layout-wrapper">
                            <Header />
                            <Sidebar />
                            <div className="main-content">
                                <div className="page-content">
                                    <Routes>
                                        <Route path='*' element={<Auth />} />
                                        <Route path='/admin/' element={<Dashboard />} />
                                        <Route path='/admin/banner' element={<Banner />} />
                                        <Route path='/admin/banner/:id/edit' element={<EditBanner />} />
                                        <Route path='/admin/contact-inq' element={<Inquiry />} />
                                        <Route path='/admin/view-inq/:id' element={<EditInq />} />
                                        <Route path='/admin/logo-management' element={<Logo />} />
                                        <Route path='/admin/favicon-management' element={<Favicon />} />
                                        <Route path='/admin/colors-management' element={<Colors_Management />} />
                                        <Route path='/admin/addUser' element={<AddUser />} />
                                        <Route path='/admin/users/:role' element={<Users />} />
                                        <Route path='/admin/edituser/:id' element={<EditUser />} />
                                        <Route path='/admin/cms/:slug' element={<CMS />} />
                                        <Route path='/admin/cms/:id/edit' element={<CMS_Edit />} />
                                        <Route path='/admin/site-info' element={<Site_Info />} />
                                        <Route path='/admin/newsletters' element={<Newsletters />} />
                                        <Route path='/admin/add-faqs' element={<Add_Faqs />} />
                                        <Route path='/admin/faqs' element={<Faqs />} />
                                        <Route path='/admin/editfaq/:id' element={<EditFaq />} />
                                        <Route path='/admin/coupon' element={<Coupon />} />
                                        <Route path='/admin/add-coupon' element={<AddCoupon />} />
                                        <Route path='/admin/edit-coupon/:id' element={<EditCoupon />} />
                                        <Route path='/admin/add-category' element={<Add_Category />} />
                                        <Route path='/admin/categories' element={<Categories />} />
                                        <Route path='/admin/edit-category/:id' element={<Edit_Category />} />
                                        <Route path='/admin/add-sub-category' element={<Add_Sub_Category />} />
                                        <Route path='/admin/sub-categories' element={<Sub_Categories />} />
                                        <Route path='/admin/edit-sub-category/:id' element={<Edit_Sub_Category />} />
                                        <Route path='/admin/reviews' element={<Reviews />} />
                                        <Route path='/admin/edit-review/:id' element={<Edit_Review />} />
                                        <Route path='/admin/add-packges' element={<Add_packge/>} />
                                        <Route path='/admin/packages' element={<Package/>} />
                                        <Route path='/admin/editpackage/:id' element={<EditPackage/>} />
                                        <Route path='/admin/email-templates' element={<Email_Templates/>} />
                                        <Route path='/admin/edit-email-templates/:id' element={<Email_Edit/>} />

                                        <Route path='/admin/all-jobs' element={<Job_Listing/>} />
                                        <Route path='/admin/add-jobs' element={<Add_Jobs/>} />
                                        <Route path='/admin/edit-jobs/:id' element={<Edit_Jobs/>} />

                                        <Route path='/admin/orders' element={<Order_Managment/>} />
                                        <Route path='/admin/view-order/:id' element={<Order_Invoice/>} />
                                        
                                    </Routes>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    }
                })()}
                <Scripts />
            </BrowserRouter>
        </>
    );
}

export default App;