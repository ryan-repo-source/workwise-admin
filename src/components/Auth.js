const Auth = () => {
    if(localStorage.getItem('user_data') == null){
        window.location.replace('/admin/login');
        console.log('asd')
    }else{
        window.location.replace('/admin/');
        console.log('asd2');
    }
}

export default Auth