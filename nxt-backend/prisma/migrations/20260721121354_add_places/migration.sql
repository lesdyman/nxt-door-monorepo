-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "buildings" TEXT[],
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "boundary" JSONB NOT NULL,
    "mgmtPhone" TEXT,
    "securityPhone" TEXT,
    "elevatorEmergency" TEXT,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- SeedPlaces (backfill for existing User.placeId values before FK is enforced)
INSERT INTO "Place" ("id", "name", "address", "buildings", "latitude", "longitude", "boundary", "mgmtPhone", "securityPhone", "elevatorEmergency") VALUES
('welcome-home', 'Welcome Home', 'Stetsenko St, 75, Kyiv', ARRAY['75a','75b','75v','75g','75d','75e','75k','75m','75n'], 50.4948, 30.37,
  '[{"latitude":50.4963,"longitude":30.368},{"latitude":50.4963,"longitude":30.372},{"latitude":50.4933,"longitude":30.372},{"latitude":50.4933,"longitude":30.368}]'::jsonb,
  '+380 44 123 45 67', '+380 44 987 65 43', '+380 44 555 55 55'),
('test-place', 'Test Place', 'Warszawa, Człuchowska 2A', ARRAY['A','B','C','D','E','F','G'], 52.230986, 20.928940,
  '[{"latitude":52.23064648843576,"longitude":20.928817895568663},{"latitude":52.231918,"longitude":20.929047},{"latitude":52.230752,"longitude":20.929627},{"latitude":52.230627,"longitude":20.928270}]'::jsonb,
  NULL, NULL, NULL);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
