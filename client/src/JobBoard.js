import React, { useEffect, useState } from 'react';
import { JobList } from './JobList';
import {fetchJobs} from "./requests";

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        fetchJobs().then((response => {
            if (response?.length) {
                setJobs(response);
            }
        }));
    }, [])

    return (
        <div>
            <h1 className="title">Job Board</h1>
            {jobs?.length ? <JobList jobs={jobs} /> : <h1>Loading...</h1>}
        </div>
    );
}

export default JobBoard;