import {cn} from '@bem-react/classname';
import './Viewer-LineNumber_file.css';

const cnViewer = cn('Viewer');
const ViewerLineNumberFile = cnViewer('LineNumber', {file: true});
export default ViewerLineNumberFile;