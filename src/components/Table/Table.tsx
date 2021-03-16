import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Arrow from '../svg/ArrowRight.svg';
import File from '../svg/File.svg';
import Folder from '../svg/Folder.svg';
// import Branch from '../svg/Branch.svg';
import State, { ContentData, contentTypes, Content } from '../../store/types';
import { tableHeaderData } from '../data';
import './Table.scss';

interface Props {
    content: 'files' | 'branches';
    repo: string;
    path: string[];
    files: ContentData[];
}

const mapStateToProps = (state: State) => ({
    repo: state.currentRepo,
    path: state.currentPath,
    files: state.currentTableContent,
});

const Table = ({ content, repo, path, files }: Props) => {
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
                    const newPath = path ? path.concat(name) : [name];
                    const linkUrl = `/${repo}/${type}/master/${newPath.join('/')}`;

                    return (
                        <div className={`Table-Row Table-Row_type_${content}`} key={i}>
                            {(columns as Content[]).map((item, index) => (
                                <div
                                    className={`Table-Cell Table-Cell_content_${item}`}
                                    key={index}
                                >
                                    {item === 'name' ? (
                                        <Link href={linkUrl}>
                                            <span className="Table-Link">
                                                {type === 'tree' && (
                                                    <Folder className="Table-Icon" />
                                                )}
                                                {type === 'blob' && <File className="Table-Icon" />}
                                                {/* {type === 'branch' && (
                                                        <Branch className="Table-Icon" />
                                                    )} */}
                                                {name}
                                            </span>
                                        </Link>
                                    ) : (
                                        rest[item]
                                    )}
                                </div>
                            ))}
                            <Link href={linkUrl}>
                                <Arrow className="Table-ArrowButton" />
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default connect(mapStateToProps)(Table);
