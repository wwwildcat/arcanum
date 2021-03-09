import {cn} from '@bem-react/classname';
import './Table-Row_header.css';

const cnTable = cn('Table');

const TableRowHeader = cnTable('Row', {header: true});
export default TableRowHeader;