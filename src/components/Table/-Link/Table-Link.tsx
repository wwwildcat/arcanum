import React from 'react';
import Link from 'next/link';

interface Props {
    children: React.ReactChild;
    handleClick: () => void;
    url: string;
}

const TableLink = ({ children, handleClick, url }: Props): JSX.Element => (
    <Link href={url}>
        <div onClick={handleClick}>{children}</div>
    </Link>
);

export default TableLink;
