import React from 'react';
import { connect } from 'react-redux';
import State, { FileData } from '@/store/types';
import File from '../svg/File.svg';
import './Viewer.scss';

interface Props {
    currentFile: FileData;
    fileName: string;
}

const mapStateToProps = (state: State) => ({
    fileName: state.currentView,
    currentFile: state.currentFile,
});

const Viewer = ({ currentFile: { content, size }, fileName }: Props) => (
    <div className="Viewer">
        <div className="Viewer-Header">
            <File className="Viewer-Icon" />
            {fileName}
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

export default connect(mapStateToProps)(Viewer);
