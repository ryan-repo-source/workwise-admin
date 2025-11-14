import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer"

const AppContext = createContext();

const initailState = {
    jobs: null,
}


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initailState);
    const JOB_API = "https://works.demo-customproject.com:4001/get-all-jobs/"
    const getJobs = async () => {
        dispatch({ type: "IS_LOADING_JOB" })
        try {
            const res = await axios.get(JOB_API, { headers: { 'Auth': localStorage.getItem('accessToken') } });
            const jobs = await res.data;
            dispatch({ type: "JOBS", payload: jobs });
        } catch (error) {
            dispatch({ type: "IS_ERROR_CAT" })
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    return <AppContext.Provider value={{ ...state }} > {children} </AppContext.Provider>
};

const useProductContext = () => {
    return useContext(AppContext);
}
export { AppProvider, AppContext, useProductContext };