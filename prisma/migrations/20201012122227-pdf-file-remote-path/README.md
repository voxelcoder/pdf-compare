# Migration `20201012122227-pdf-file-remote-path`

This migration has been generated by Velican Akcakaya at 10/12/2020, 2:22:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."PdfFile" DROP COLUMN "remoteUri",
ADD COLUMN "remotePath" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201012121926-new-pdf-file-fields..20201012122227-pdf-file-remote-path
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
@@ -37,12 +37,12 @@
 model PdfFile {
   id String @id @default(cuid())
-  url       String
-  remoteUri String?
-  type      PdfFileType
-  state     PdfFileState @default(PROCESSING)
+  url        String
+  remotePath String?
+  type       PdfFileType
+  state      PdfFileState @default(PROCESSING)
   owner   User   @relation(fields: [ownerId], references: [id])
   ownerId String
```


