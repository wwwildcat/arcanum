import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Link from 'next/link';
import State from '../../store/types';
import './BreadCrumbs.scss';

interface Props {
    repo: string;
    path: string[];
}

const mapStateToProps = (state: State) => ({
    repo: state.currentRepo,
    path: state.currentPath,
});

const BreadCrumbs = ({ repo, path }: Props) => (
    <ul className="BreadCrumbs">
        {[repo].concat(path).map((item, index) => {
            const isActive = index === [repo].concat(path).length - 1;
            const newPath = path.slice(0, index);
            const url = newPath.length ? `/${repo}/tree/master/${newPath.join('/')}` : `/${repo}`;

            return (
                <li
                    className={cn('BreadCrumbs-Item', isActive && 'BreadCrumbs-Item_active')}
                    key={index}
                >
                    {isActive ? (
                        item
                    ) : (
                        <>
                            <Link href={url}>
                                <span className="BreadCrumbs-Link">{item}</span>
                            </Link>
                            {` / `}
                        </>
                    )}
                </li>
            );
        })}
    </ul>
);

export default connect(mapStateToProps)(BreadCrumbs);
