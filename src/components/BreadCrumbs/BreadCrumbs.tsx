import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import BreadCrumbsLink from './-Link/BreadCrumbs-Link';
import State from '../../store/types';
import { setView } from '../../store/actions';
import { fetchDirContent } from '../../store/thunks';
import './BreadCrumbs.scss';

interface Props {
    currentRepo: string;
    currentPath: string;
    handleBreadCrumbsClick: (value: string, repo: string, path: string) => void;
}

const mapStateToProps = (state: State) => ({
    currentRepo: state.currentRepo,
    currentPath: state.currentPath,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    handleBreadCrumbsClick: (value: string, repo: string, path: string) => {
        dispatch(setView(value));
        dispatch(fetchDirContent(repo, path));
    },
});

const BreadCrumbs = ({ currentRepo, currentPath, handleBreadCrumbsClick }: Props) => {
    const BreadCrumbsItems = currentPath
        ? [currentRepo].concat(currentPath.split('/'))
        : [currentRepo];

    return (
        <ul className="BreadCrumbs">
            {BreadCrumbsItems.map((item, index) => (
                <li className="BreadCrumbs-Item" key={index}>
                    {index === BreadCrumbsItems.length - 1 ? (
                        item
                    ) : (
                        <BreadCrumbsLink
                            handleClick={handleBreadCrumbsClick}
                            index={index}
                            path={currentPath}
                            repo={currentRepo}
                            value={item}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs);
