import { Chip } from '@nextui-org/react';
import { ReactNode, useCallback } from 'react';

export const renderChip = useCallback((content: string): ReactNode => {
  switch (content) {
    case 'Published':
      return (
        <Chip className="capitalize" color={'success'} size="sm" variant="flat">
          {content}
        </Chip>
      );
    case 'Unpublished':
      return (
        <Chip className="capitalize" color={'default'} size="sm" variant="flat">
          {content}
        </Chip>
      );
    default:
      <span>{content}</span>;
  }
}, []);
