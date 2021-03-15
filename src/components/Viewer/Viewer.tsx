import React from 'react';
import { connect } from 'react-redux';
import State from '../../store/types';
import './Viewer.scss';

interface Props {
    fileContent: string[];
}

const mapStateToProps = (state: State) => ({
    fileContent: state.fileContent,
});

const Viewer = ({ fileContent }: Props) => (
    <div className="Viewer">
        <div className="Viewer-Header" />
        <div className="Viewer-Content">
            {!!fileContent.length &&
                fileContent.map((line, index) => (
                    <pre key={index}>
                        <div className="Viewer-LineNumber">{index + 1}</div>
                        <span>{line}</span>
                    </pre>
                ))}
        </div>
    </div>
);

export default connect(mapStateToProps)(Viewer);
