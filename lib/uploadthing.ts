import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getSession } from "./auth"

const f = createUploadthing()

export const ourFileRouter = {
  // رفع الصور
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new Error("Unauthorized")
      return { userId: session.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // رفع الفيديوهات
  videoUploader: f({ video: { maxFileSize: "512MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await getSession()
      if (!session || session.role !== "ADMIN") throw new Error("Unauthorized")
      return { userId: session.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),

  // رفع المرفقات
  attachmentUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    text: { maxFileSize: "2MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new Error("Unauthorized")
      return { userId: session.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
