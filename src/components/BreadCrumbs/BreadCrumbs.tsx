import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getCurrentInfo } from '@/store/selectors';
import { cnActive } from '../utils';
import './BreadCrumbs.scss';

const BreadCrumbs = () => {
    const { repo, branch, path } = useSelector(getCurrentInfo);

    return (
        <ul className="BreadCrumbs">
            {[repo].concat(path).map((item, index) => {
                const isActive = index === [repo].concat(path).length - 1;
                const newPath = path.slice(0, index);
                const url = newPath.length
                    ? `/${repo}/tree/${branch}/${newPath.join('/')}`
                    : `/${repo}/tree/${branch}`;

                return (
                    <li className={cnActive('BreadCrumbs-Item', isActive)} key={index}>
                        {isActive ? (
                            item
                        ) : (
                            <>
                                <Link href={url} passHref>
                                    <a className="BreadCrumbs-Link" href=" ">
                                        {item}
                                    </a>
                                </Link>
                                {` / `}
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default BreadCrumbs;
