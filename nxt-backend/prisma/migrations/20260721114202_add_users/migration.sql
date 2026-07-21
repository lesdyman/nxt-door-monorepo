-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "dealsCount" INTEGER NOT NULL DEFAULT 0,
    "placeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- SeedUsers (backfill for existing Listing.userId values before FK is enforced)
INSERT INTO "User" ("id", "name", "avatar", "onboarded", "rating", "reviewsCount", "dealsCount", "placeId", "createdAt", "updatedAt") VALUES
(1001, 'Olena Kovalenko', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', true, 4.9, 18, 23, 'welcome-home', '2025-03-10T10:00:00Z', '2026-06-13T11:00:00Z'),
(1002, 'Mykhailo Petrenko', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', true, 4.7, 35, 41, 'welcome-home', '2025-01-20T09:00:00Z', '2026-06-14T12:00:00Z'),
(1003, 'Andrii Bondarenko', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', true, 4.8, 14, 17, 'welcome-home', '2025-05-05T08:00:00Z', '2026-06-16T09:00:00Z'),
(1004, 'Nataliia Shevchenko', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', true, 5.0, 7, 8, 'welcome-home', '2025-09-15T11:00:00Z', '2026-06-15T08:00:00Z'),
(1005, 'Dmytro Moroz', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200', true, 4.6, 9, 12, 'welcome-home', '2025-07-22T14:00:00Z', '2026-06-15T14:00:00Z'),
(1006, 'Iryna Hrytsenko', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', true, 4.5, 2, 3, 'welcome-home', '2026-02-01T08:00:00Z', '2026-06-16T10:00:00Z');

-- Keep the autoincrement sequence past the seeded ids so future signups don't collide
SELECT setval(pg_get_serial_sequence('"User"', 'id'), 1006);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
