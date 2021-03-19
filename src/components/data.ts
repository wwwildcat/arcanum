export const tabsData = [
    {
        name: 'FILES',
        url: (repo: string, branch?: string, path?: string[]) =>
            branch ? `/${repo}/tree/${branch}/${path.join('/')}` : `/${repo}`,
    },
    {
        name: 'BRANCHES',
        url: (repo: string) => `/${repo}/branches`,
    },
    {
        name: 'HISTORY',
        url: (repo: string, branch?: string, path?: string[]) =>
            `/${repo}/commits/${branch}/${path.join('/')}`,
    },
    {
        name: 'DETAILS',
        url: (repo: string, branch?: string, path?: string[]) =>
            `/${repo}/blob/${branch}/${path.join('/')}`,
    },
];

export const tableHeaderData = {
    files: ['Name', 'Last commit', 'Commit message', 'Commiter', 'Updated'],
    branches: ['Name', 'Commit hash'],
};
