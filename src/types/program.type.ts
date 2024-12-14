export type Program = {
  id: number;
  code: string;
  title: string;
  type: string;
  description: string;
  sessionQuantity: number;
  price: number;
  isActive: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
