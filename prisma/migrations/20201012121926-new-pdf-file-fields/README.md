# Migration `20201012121926-new-pdf-file-fields`

This migration has been generated by Velican Akcakaya at 10/12/2020, 2:19:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."PdfFileType" AS ENUM ('FIRST', 'SECOND', 'FINAL')

CREATE TYPE "public"."PdfFileState" AS ENUM ('PROCESSING', 'DONE')

ALTER TABLE "public"."PdfFile" ADD COLUMN "remoteUri" text   ,
ADD COLUMN "type" "PdfFileType"  NOT NULL ,
ADD COLUMN "state" "PdfFileState"  NOT NULL DEFAULT E'PROCESSING'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201010154836-user-avatar-url..20201012121926-new-pdf-file-fields
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -23,12 +23,26 @@
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
+enum PdfFileType {
+  FIRST
+  SECOND
+  FINAL
+}
+
+enum PdfFileState {
+  PROCESSING
+  DONE
+}
+
 model PdfFile {
   id String @id @default(cuid())
-  url String
+  url       String
+  remoteUri String?
+  type      PdfFileType
+  state     PdfFileState @default(PROCESSING)
   owner   User   @relation(fields: [ownerId], references: [id])
   ownerId String
```


