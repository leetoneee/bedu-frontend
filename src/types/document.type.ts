export type CreateDocumentDto = {
  documentType: string;
  code: string;
  title: string;
  content: string;
  attachFile: string;
  lessonId: number;
  questionId: number[];
}

export type UploadDocumentDto = {
  documentType: string;
  title: string;
  content: string;
  lessonId: number;
}