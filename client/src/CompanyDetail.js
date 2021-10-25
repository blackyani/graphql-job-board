import React, { useState, useEffect } from 'react';
import {fetchCompany} from "./requests";
import { Link } from 'react-router-dom';

const CompanyDetail = (props) => {
  const [company, setData] = useState(null);
  useEffect(() => {
    const {companyId} = props.match.params;
    fetchCompany(companyId).then(response => {
      setData(response)
    });
  }, []);

  const jobsList = company?.jobs?.length && company.jobs.map((job) => (<p><Link to={`/jobs/${job.id}`} key={job.id} tag="p">{job.title}</Link></p>))

    return (
        <div>
          {
            company ? <><h1 className="title">{company.name}</h1>
              <div className="box">{company.description}</div>
              {jobsList}
            </> : null
          }
        </div>
    );
};

export default CompanyDetail;