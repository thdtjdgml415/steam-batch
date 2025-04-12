-- CreateTable
CREATE TABLE "SteamApp" (
    "steamAppId" INTEGER NOT NULL,
    "type" TEXT,
    "name" TEXT,
    "requiredAge" INTEGER,
    "isFree" BOOLEAN,
    "detailedDescription" TEXT,
    "aboutTheGame" TEXT,
    "shortDescription" TEXT,
    "supportedLanguages" TEXT,
    "headerImageUrl" TEXT,
    "websiteUrl" TEXT,
    "releaseDate" TIMESTAMP(3),
    "comingSoon" BOOLEAN,
    "background" TEXT,
    "capsuleImageUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SteamApp_pkey" PRIMARY KEY ("steamAppId")
);

-- CreateTable
CREATE TABLE "PriceOverview" (
    "appId" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "initial" DOUBLE PRECISION NOT NULL,
    "final" DOUBLE PRECISION NOT NULL,
    "discountPercent" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceOverview_pkey" PRIMARY KEY ("appId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SteamApp_steamAppId_key" ON "SteamApp"("steamAppId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceOverview_appId_key" ON "PriceOverview"("appId");
