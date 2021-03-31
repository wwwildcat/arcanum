/* eslint-disable react/jsx-props-no-spreading */
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

interface TableProps {
    tableType: 'files' | 'branches';
}

interface IconProps {
    className: string;
    type: 'tree' | 'blob' | 'branch';
}

const Icon = ({ type, ...rest }: IconProps) => (
    <>
        {type === 'tree' && <Folder {...rest} />}
        {type === 'blob' && <File {...rest} />}
        {type === 'branch' && <Branch {...rest} />}
    </>
);

const Table = ({ tableType }: TableProps) => {
    const columns = tableType === 'files' ? columnTypes : columnTypes.slice(0, 2);
    const { repo, branch, path } = useSelector(getCurrentInfo);
    const treeData = useSelector(getTreeData);
    const branches = useSelector(getAllBranches);
    const tableContent = tableType === 'files' ? treeData : branches;

    return (
        <div className="Table" data-testid="table">
            <div className={`Table-Row Table-Row_header Table-Row_type_${tableType}`}>
                {tableHeaderData[tableType].map((item, index) => (
                    <div className="Table-Cell" key={index}>
                        {item}
                    </div>
                ))}
            </div>
            {tableContent.map(({ name, type, ...rest }, i: number) => {
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
                                    <Link href={linkUrl} passHref>
                                        <a className="Table-Link" href=" ">
                                            <Icon
                                                className="Table-Icon"
                                                data-testid={`table-icon-${type}`}
                                                type={type}
                                            />
                                            {name}
                                        </a>
                                    </Link>
                                ) : (
                                    rest[item]
                                )}
                            </div>
                        ))}
                        <Link href={linkUrl} passHref>
                            <a className="Table-ArrowButton" href=" ">
                                <Arrow height={20} width={20} />
                            </a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Table;
