import { BranchData } from '@/store/types';
import {
    baseDirContent,
    repos,
    branchesOut,
    branches,
    filteredBranches,
    commitOut,
    commit,
    rootTreeOut,
    rootTree,
    sortedTree,
    unsortedTree,
    fileOut,
    sizeOut,
    file,
} from './testData';
import {
    filterBranches,
    filterRepos,
    formatBranches,
    formatCommitData,
    formatFile,
    formatTreeData,
    sortTree,
} from './jsonFormatter';

const branchesFilterMock = (name: string) => {
    if (name.startsWith('feature')) {
        return Promise.resolve(name);
    }
    return Promise.reject(new Error());
};

const reposFilterMock = (item: string) => Promise.resolve(!item.endsWith('File'));

describe('JSON format functions works correctly:', () => {
    it('filterRepos', async () => {
        expect(await filterRepos(baseDirContent, reposFilterMock)).toEqual(repos);
    });

    it('formatBranches', () => {
        expect(formatBranches(branchesOut)).toEqual(branches);
    });

    it('filterBranches', async () => {
        expect(await filterBranches(branches as BranchData[], branchesFilterMock)).toEqual(
            filteredBranches
        );
    });

    it('formatCommitData', () => {
        expect(formatCommitData(commitOut)).toEqual(commit);
    });

    it('formatTreeData', () => {
        expect(formatTreeData(rootTreeOut)).toEqual(rootTree);
    });

    it('sortTree', () => {
        expect(sortTree(unsortedTree)).toEqual(sortedTree);
    });

    it('formatFile', () => {
        expect(formatFile(fileOut, sizeOut, commitOut)).toEqual(file);
    });
});
