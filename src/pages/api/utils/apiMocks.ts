import {
    baseDirContent,
    fileOut,
    sizeOut,
    commitOut,
    branchesOut,
    rootTreeOut,
    treeOut,
} from './testData';

export const fsMock = () => {
    return {
        readdir: jest.fn(() => Promise.resolve(baseDirContent)),
        stat: jest
            .fn()
            .mockResolvedValueOnce({
                isDirectory: jest.fn().mockReturnValue(false),
            })
            .mockResolvedValue({
                isDirectory: jest.fn().mockReturnValue(true),
            }),
    };
};
export const fsAccess = () => {
    return { access: jest.fn(() => Promise.resolve()) };
};
export const fsError = () => {
    return {
        access: jest.fn(() => Promise.reject(new Error('base path access error'))),
        readdir: jest.fn(() => Promise.reject(new Error('base path readdir error'))),
    };
};

export const gitWrapperBranches = () => {
    return jest
        .fn()
        .mockResolvedValueOnce(branchesOut)
        .mockResolvedValueOnce('feature1')
        .mockResolvedValueOnce('feature2')
        .mockRejectedValueOnce(new Error());
};

export const gitWrapperRootTree = () => {
    return jest.fn().mockResolvedValueOnce(rootTreeOut).mockResolvedValue(commitOut);
};

export const gitWrapperTree = () => {
    return jest.fn().mockResolvedValueOnce(treeOut).mockResolvedValueOnce(commitOut);
};

export const gitWrapperBlob = () => {
    return jest
        .fn()
        .mockResolvedValueOnce(fileOut)
        .mockResolvedValueOnce(sizeOut)
        .mockResolvedValueOnce(commitOut);
};

export const gitWrapperError = () => {
    return jest.fn().mockRejectedValue(new Error('git error'));
};
