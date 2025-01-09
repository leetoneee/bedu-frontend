// import axios from "@/libs/axiosInstance";
// import { UploadDocumentDto } from "@/types/document.type";

// export const uploadDocument = async (data: UploadDocumentDto, files: File[]) => {
//   try {
//     const res = await axios.post(`/documents/upload`, {data, files});
//     return res.data;
//   } catch (error) {
//     console.log('🚫 ~ uploadDocument ~ error:', error);
//     throw error;
//   }
// };


import axios from "@/libs/axiosInstance";
import { UploadDocumentDto } from "@/types/document.type";

export const uploadDocument = async (data: UploadDocumentDto, files: File[]) => {
  try {
    const formData = new FormData();

    // Append document data
    formData.append("documentType", data.documentType);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("lessonId", String(data.lessonId));

    // Append files
    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await axios.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log("🚫 ~ uploadDocument ~ error:", error);
    throw error;
  }
};

export const deleteDocument = async () => {
  
}