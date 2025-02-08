-- CreateTable
CREATE TABLE "Tree" (
    "id" SERIAL NOT NULL,
    "locationData" JSONB NOT NULL,
    "plantedBy" INTEGER NOT NULL,
    "species" TEXT,
    "plantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreeImage" (
    "id" SERIAL NOT NULL,
    "treeId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TreeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CaretakerTrees" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CaretakerTrees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_CaretakerTrees_B_index" ON "_CaretakerTrees"("B");

-- AddForeignKey
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_plantedBy_fkey" FOREIGN KEY ("plantedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeImage" ADD CONSTRAINT "TreeImage_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaretakerTrees" ADD CONSTRAINT "_CaretakerTrees_A_fkey" FOREIGN KEY ("A") REFERENCES "Tree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaretakerTrees" ADD CONSTRAINT "_CaretakerTrees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
