import React from 'react'

const Dashboard = () => {
    const auth = JSON.parse(localStorage.getItem('user_data'));
    return (<>
        <div className="container-fluid">

            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18"> Dashboard </h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">

                                    <a href="javascript: void(0);"> Dashboards </a>
                                </li>
                                <li className="breadcrumb-item active"> Dashboard </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {/* end page title */}
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <div className="card overflow-hidden">
                        <div className="bg-primary bg-soft">
                            <div className="row">
                                <div className="col-7">
                                    <div className="text-primary p-3">
                                        <h5 className="text-primary"> Welcome Back! </h5>
                                        <p className="font-size-22">

                                            <b> {auth.first_name + " " + auth.last_name} </b>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-5 align-self-end">
                                    <img
                                        src="assets/images/profile-img.png"
                                        alt
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
      
    )
}

export default Dashboard