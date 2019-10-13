import './RepoList_closed.css';
import {cn} from '@bem-react/classname';

const cnRepoList = cn('RepoList');

const RepoListClosed = cnRepoList({closed: true});
export default RepoListClosed;