export const baseDirContent = ['testFile', 'testRepo', 'testRepo1', 'testRepo2'];

export const repos = ['testRepo', 'testRepo1', 'testRepo2'];

export const branchesOut = `feature1        4f5ed81337fbcf612d9a03928cc34bdaa331b335        3 hours ago
feature2  3e9c33331a95fedf83c2f76707b27ee43fb36eac        7 days ago
main   e808710615e7090ebc51091982c9f48dfef2861f        1 min ago
`;

export const branches = [
    {
        type: 'branch',
        name: 'feature1',
        hash: '4f5ed81337fbcf612d9a03928cc34bdaa331b335',
        date: '3 hours ago',
    },
    {
        type: 'branch',
        name: 'feature2',
        hash: '3e9c33331a95fedf83c2f76707b27ee43fb36eac',
        date: '7 days ago',
    },
    {
        type: 'branch',
        name: 'main',
        hash: 'e808710615e7090ebc51091982c9f48dfef2861f',
        date: '1 min ago',
    },
];

export const filteredBranches = [
    {
        type: 'branch',
        name: 'feature1',
        hash: '4f5ed81337fbcf612d9a03928cc34bdaa331b335',
        date: '3 hours ago',
    },
    {
        type: 'branch',
        name: 'feature2',
        hash: '3e9c33331a95fedf83c2f76707b27ee43fb36eac',
        date: '7 days ago',
    },
];

export const commitOut = `d53d0b
fix lib
mrc
2 days ago
20 Oct 2020, 12:24`;

export const commit = {
    hash: 'd53d0b',
    message: 'fix lib',
    commiter: 'mrc',
    date: '2 days ago',
    absDate: '20 Oct 2020, 12:24',
};

export const rootTreeOut = `040000 tree d53d0b78f59e5ae29f50114c6cf88b78a2154738    lib        
100644 blob a8ce35f0a003632100bc51a6daedb1c4b5b88a16    README.md`;

export const treeOut = `100644 blob d53d0b78f59e5ae29f50114c6cf88b78a2154738    index.js`;

export const rootTree = [
    { name: 'lib', type: 'tree' },
    { name: 'README.md', type: 'blob' },
];

export const fullRootTree = [
    {
        type: 'tree',
        name: 'lib',
        ...commit,
    },
    {
        type: 'blob',
        name: 'README.md',
        ...commit,
    },
];

export const fullTree = [
    {
        name: 'index.js',
        type: 'blob',
        ...commit,
    },
];

export const unsortedTree = [
    { name: 'README.md', type: 'blob' },
    { name: 'bin', type: 'tree' },
    { name: 'index.js', type: 'blob' },
    { name: 'lib', type: 'tree' },
];

export const sortedTree = [
    { name: 'bin', type: 'tree' },
    { name: 'lib', type: 'tree' },
    { name: 'index.js', type: 'blob' },
    { name: 'README.md', type: 'blob' },
];

export const fileOut = `#!/usr/bin/env node

console.log("Hello World!");
`;

export const sizeOut = '47';

export const file = {
    content: ['#!/usr/bin/env node', '', 'console.log("Hello World!");'],
    size: '47',
    hash: 'd53d0b',
    message: 'fix lib',
    commiter: 'mrc',
    date: '2 days ago',
    absDate: '20 Oct 2020, 12:24',
};
