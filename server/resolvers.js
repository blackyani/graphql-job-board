const db = require('./db')

const Query = {
    jobs: () => db.jobs.list(),
    job: (root, args) => db.jobs.get(args.id),
    company: (root, args) => db.companies.get(args.id),
}

const Mutation = {
    createJob: (root, {input}, {user}) => {
        console.log(input);
        if (!user) {
            throw new Error('Auth please')
        }
        const id = db.jobs.create({...input, companyId: user.companyId});
        return db.jobs.get(id);
    }
}

const Company = {
    jobs: (company) => db.jobs.list().filter((job) => job.companyId === company.id)
}

const Job = {
    company: ({companyId}) => db.companies.get(companyId)
}

module.exports = { Query, Job, Company, Mutation };