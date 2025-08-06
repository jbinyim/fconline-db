-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
