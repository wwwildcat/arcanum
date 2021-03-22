import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getCurrentInfo, getAllBranches, getTreeData } from '@/store/selectors';
import { columnTypes, ColumnData } from '@/store/types';
import Arrow from '../svg/ArrowRight.svg';
import File from '../svg/File.svg';
import Folder from '../svg/Folder.svg';
import Branch from '../svg/Branch.svg';
import { tableHeaderData } from '../data';
import './Table.scss';

interface Props {
    tableType: 'files' | 'branches';
}

const Table = ({ tableType }: Props) => {
    const columns = tableType === 'files' ? columnTypes : columnTypes.slice(0, 2);
    const { repo, branch, path } = useSelector(getCurrentInfo);
    const treeData = useSelector(getTreeData);
    const branches = useSelector(getAllBranches);
    const tableContent = tableType === 'files' ? treeData : branches;

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

export default Table;
