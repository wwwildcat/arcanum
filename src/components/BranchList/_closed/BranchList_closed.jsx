import {cn} from '@bem-react/classname';
import './BranchList_closed.css';

const cnBranchList = cn('BranchList');

const BranchListClosed = cnBranchList({closed: true});
export default BranchListClosed;