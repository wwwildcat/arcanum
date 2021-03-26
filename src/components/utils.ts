import cn from 'classnames';

export const cnClosed = (className: string, isOpen: boolean) =>
    cn(className, !isOpen && `${className}_closed`);

export const cnActive = (className: string, isActive: boolean) =>
    cn(className, isActive && `${className}_active`);
