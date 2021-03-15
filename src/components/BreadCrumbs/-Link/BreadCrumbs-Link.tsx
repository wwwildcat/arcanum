import React from 'react';
import Link from 'next/link';

interface Props {
    repo: string;
    path: string;
    index: number;
    value: string;
    handleClick: (value: string, repo: string, path: string) => void;
}

const BreadCrumbsLink = ({ repo, path, index, value, handleClick }: Props): JSX.Element => {
    const newPath = path ? path.split('/').slice(0, index).join('/') : '';
    const newUrl = newPath.length ? `/${repo}/tree/master/${newPath}` : `/${repo}`;

    return (
        <Link href={newUrl}>
            <span className="BreadCrumbs-Link" onClick={() => handleClick(value, repo, newPath)}>
                {`${value} / `}
            </span>
        </Link>
    );
};

export default BreadCrumbsLink;
