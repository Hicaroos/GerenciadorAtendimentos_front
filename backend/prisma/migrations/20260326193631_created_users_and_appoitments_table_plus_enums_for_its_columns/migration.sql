/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "disciplines" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "start_hours" DATETIME NOT NULL,
    "end_hours" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "appointments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
