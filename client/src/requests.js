import { gql } from "apollo-boost";
import {jobDetailFragment} from './settings/fragments';
import apolloClient from "./settings/apollo-client";

const jobsQuery = gql`{
    jobs {
        ...JobDetail
    },
}
${jobDetailFragment}`;

const jobQuery = gql`
    query JobQuery ($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

const companyQuery =  gql`query CompanyQuery($id: ID!) {
    company (id: $id) {
        id, name, description, jobs {id, title}
    }
}`;

const createJobMutation = gql`mutation CreateJob ($input: CreateJobInput) {
    job: createJob(input: $input) {
        ...JobDetail
    }
} ${jobDetailFragment}`;

const fetchJobs = async () => {
    try {
        const {data: {jobs}} = await apolloClient.query({query: jobsQuery, fetchPolicy: 'no-cache'})
        return jobs;
    } catch (err) {
        console.error(err);
    }
}

const fetchJob = async (id) => {
    try {
        const {data} = await apolloClient.query({query: jobQuery, variables: {id}})
        return data.job;
    } catch (err) {
        console.error(err);
    }
}

const fetchCompany = async (id) => {
    try {
        const {data} = await apolloClient.query({query: companyQuery, variables: {id}})
        return data.company;
    } catch (err) {
        console.error(err);
    }
}

const postJob = async (input) => {
    const {job} = await apolloClient.mutate({
        mutation: createJobMutation,
        variables: {input},
        update: (cashe, mutationResult) => {
            cashe.writeQuery({query: jobQuery, variables: {id: mutationResult.id}, data: mutationResult})
        }
    });
    return job;
}

export {fetchJobs, fetchJob, fetchCompany, postJob}