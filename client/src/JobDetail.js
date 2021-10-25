import React, { useState, useEffect } from 'react';
import {fetchJob} from "./requests";
import { Link } from 'react-router-dom';

const JobDetail = (props) => {
    const [job, setData] = useState(null);
    useEffect(() => {
        const {jobId} = props.match.params;
        fetchJob(jobId).then(response => {
            setData(response)
        })
    }, [])

    return (
      <div>
          {
              job ? <><h1 className="title">{job.title}</h1>
                  <h2 className="subtitle">
                      <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
                  </h2>
                  <div className="box">{job.description}</div></> : <h1>Loading...</h1>
          }

      </div>
    );
}

export default JobDetail;
