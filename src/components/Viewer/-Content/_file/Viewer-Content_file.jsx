import {cn} from '@bem-react/classname';
import './Viewer-Content_file.css';

const cnViewer = cn('Viewer');
const ViewerContentFile = cnViewer('Content', {file: true});
export default ViewerContentFile;