import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Arrow from '../svg/ArrowRight.svg';
import File from '../svg/File.svg';
import Folder from '../svg/Folder.svg';
import Branch from '../svg/Branch.svg';
import State, { BranchData, ObjectData, columnTypes, ColumnData } from '../../store/types';
import { tableHeaderData } from '../data';
import './Table.scss';

interface Props {
    tableType: 'files' | 'branches';
    repo: string;
    branch: string;
    path: string[];
    files: ObjectData[];
    branches: BranchData[];
}

const mapStateToProps = (state: State) => ({
    repo: state.currentRepo,
    branch: state.currentBranch,
    path: state.currentPath,
    files: state.currentTableContent,
    branches: state.allBranches,
});

const Table = ({ tableType, repo, branch, path, ...restProps }: Props) => {
    const columns = tableType === 'files' ? columnTypes : columnTypes.slice(0, 2);
    const tableContent = restProps[tableType];

    return (
        <div className="Table">
            <div className={`Table-Row Table-Row_header Table-Row_type_${tableType}`}>
                {tableHeaderData[tableType].map((item, index) => (
                    <div className="Table-Cell" key={index}>
                        {item}
                    </div>
                ))}
            </div>
            {tableContent.map(({ name, type, ...rest }, i) => {
                const newPath = path ? path.concat(name) : [name];
                const linkUrl =
                    tableType === 'files'
                        ? `/${repo}/${type}/${branch}/${newPath.join('/')}`
                        : `/${repo}/tree/${name}`;

                return (
                    <div className={`Table-Row Table-Row_type_${tableType}`} key={i}>
                        {(columns as ColumnData[]).map((item, index) => (
                            <div className={`Table-Cell Table-Cell_content_${item}`} key={index}>
                                {item === 'name' ? (
                                    <Link href={linkUrl}>
                                        <span className="Table-Link">
                                            {type === 'tree' && <Folder className="Table-Icon" />}
                                            {type === 'blob' && <File className="Table-Icon" />}
                                            {type === 'branch' && <Branch className="Table-Icon" />}
                                            {name}
                                        </span>
                                    </Link>
                                ) : (
                                    rest[item]
                                )}
                            </div>
                        ))}
                        <Link href={linkUrl}>
                            <>
                                <Arrow className="Table-ArrowButton" />
                            </>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default connect(mapStateToProps)(Table);
