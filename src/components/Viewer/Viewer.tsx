import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentInfo, getBlobData } from '@/store/selectors';
import File from '../svg/File.svg';
import './Viewer.scss';

const Viewer = () => {
    const { path } = useSelector(getCurrentInfo);
    const { content, size } = useSelector(getBlobData);

    return (
        <div className="Viewer">
            <div className="Viewer-Header">
                <File className="Viewer-Icon" />
                {path[path.length - 1]}
                <div className="Viewer-FileSize">{` (${size} bytes)`}</div>
            </div>
            <div className="Viewer-Content">
                {content.map((line, index) => (
                    <pre key={index}>
                        <div className="Viewer-LineNumber">{index + 1}</div>
                        <span>{line}</span>
                    </pre>
                ))}
            </div>
        </div>
    );
};

export default Viewer;
