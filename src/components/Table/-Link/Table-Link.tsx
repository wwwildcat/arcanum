import React from 'react';
import Link from 'next/link';
import File from '../../svg/File.svg';
import Folder from '../../svg/Folder.svg';
import Branch from '../../svg/Branch.svg';
import { TableType } from '../../../store/types';

interface Props {
    value: string;
    type: TableType;
    repo: string;
    path: string;
    handleClick: (type: TableType, value: string, repo: string, nextPath: string) => void;
}

const TableLink = ({ value, type, handleClick, repo, path }: Props): JSX.Element => {
    const nextPath = path ? `${path}/${value}` : value;

    return (
        <Link href={`/${repo}/${type}/master/${nextPath}`}>
            <div onClick={() => handleClick(type, value, repo, nextPath)}>
                {type === 'tree' && <Folder className="Table-Icon" />}
                {type === 'blob' && <File className="Table-Icon" />}
                {type === 'branch' && <Branch className="Table-Icon" />}
                {value}
            </div>
        </Link>
    );
};

export default TableLink;
