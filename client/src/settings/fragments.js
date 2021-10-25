import { gql } from "apollo-boost";

const jobDetailFragment = gql`
        fragment JobDetail on Job {
            id, title, description,
            company {
                id
                name
            }
        }
    `;

export {
    jobDetailFragment
}