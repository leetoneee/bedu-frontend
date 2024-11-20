export type SSProgram = {
  id: number;
  code: string;
  title: string;
  description: string;
  sessionQuantity: number;
  price: number;
  isPublish: boolean;
};

export const statusColorMap: Record<
  'Published' | 'Unpublished',
  'success' | 'default'
> = {
  Published: 'success',
  Unpublished: 'default'
};
