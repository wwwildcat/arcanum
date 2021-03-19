import { ObjectData } from '../../../store/types';

export const formatTreeData = (out: string) => {
    const strings = out.split(/\n./);
    const data = strings.map((str) => ({
        name: str.split(/\s/)[3],
        type: str.split(/\s/)[1],
    }));

    return data;
};

export const formatCommitData = (out: string) => ({
    hash: out.split(/\n/)[0],
    message: out.split(/\n/)[1],
    commiter: out.split(/\n/)[2],
    date: out.split(/\n/)[3],
    absDate: out.split(/\n/)[4],
});

export const sortObjects = (arr: ObjectData[]) =>
    arr.sort((a, b) => {
        if (a.type === 'blob' && b.type === 'tree') {
            return 1;
        }
        if (a.type === 'tree' && b.type === 'blob') {
            return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        }
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        }
        return 0;
    });

export const formatBranches = (out: string) => {
    const branches = out.split(/\n/);
    branches.pop();

    return branches.map((branch) => ({
        type: 'branch',
        name: branch.split(/\s+/)[0],
        hash: branch.split(/\s+/)[1],
        date: branch.split(/\s+/).slice(2).join(' '),
    }));
};

export const formatFile = (fileOut: string, sizeOut: string, commitOut: string) => {
    const fileLines = fileOut.split(/\n/);

    if (fileLines.length > 1) {
        fileLines.pop(); // remove the last empty string
    }

    return {
        content: fileLines,
        size: sizeOut,
        ...formatCommitData(commitOut),
    };
};
