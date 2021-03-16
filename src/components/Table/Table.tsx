import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import TableLink from './-Link/Table-Link';
import Arrow from '../svg/ArrowRight.svg';
import File from '../svg/File.svg';
import Folder from '../svg/Folder.svg';
// import Branch from '../svg/Branch.svg';
import { setView, setPath } from '../../store/actions';
import { fetchDirContent, fetchFileContent } from '../../store/thunks';
import State, { FilesData, contentTypes, Content, TableType } from '../../store/types';
import { tableHeaderData } from '../data';
import './Table.scss';

interface Props {
    content: 'files' | 'branches';
    repo: string;
    path: string;
    files: FilesData[];
    handleLinkClick: (type: TableType, value: string, repo: string, newPath: string) => void;
}

const mapStateToProps = (state: State) => ({
    repo: state.currentRepo,
    path: state.currentPath,
    files: state.currentFiles,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
    handleLinkClick: (type: TableType, value: string, repo: string, newPath: string) => {
        dispatch(setView(value));
        dispatch(setPath(newPath));

        if (type === 'tree') {
            dispatch(fetchDirContent(repo, newPath));
        }
        if (type === 'blob') {
            dispatch(fetchFileContent(repo, newPath));
        }
    },
});

const Table = ({ content, repo, path, files, handleLinkClick }: Props) => {
    const columns = content === 'files' ? contentTypes : contentTypes.slice(0, 2);

    return (
        <div className="Table">
            <div className={`Table-Row Table-Row_header Table-Row_type_${content}`}>
                {tableHeaderData[content].map((item, index) => (
                    <div className="Table-Cell" key={index}>
                        {item}
                    </div>
                ))}
            </div>
            {files &&
                files.map(({ name, type, ...rest }, i) => {
                    const newPath = path ? `${path}/${name}` : name;
                    const linkUrl = `/${repo}/${type}/master/${newPath}`;
                    const handleClick = () => handleLinkClick(type, name, repo, path);

                    return (
                        <div className={`Table-Row Table-Row_type_${content}`} key={i}>
                            {(columns as Content[]).map((item, index) => (
                                <div
                                    className={`Table-Cell Table-Cell_content_${item}`}
                                    key={index}
                                >
                                    {item === 'name' ? (
                                        <TableLink handleClick={handleClick} url={linkUrl}>
                                            <>
                                                {type === 'tree' && (
                                                    <Folder className="Table-Icon" />
                                                )}
                                                {type === 'blob' && <File className="Table-Icon" />}
                                                {/* {type === 'branch' && (
                                                        <Branch className="Table-Icon" />
                                                    )} */}
                                                {name}
                                            </>
                                        </TableLink>
                                    ) : (
                                        rest[item]
                                    )}
                                </div>
                            ))}
                            <TableLink handleClick={handleClick} url={linkUrl}>
                                <Arrow className="Table-ArrowButton" />
                            </TableLink>
                        </div>
                    );
                })}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
