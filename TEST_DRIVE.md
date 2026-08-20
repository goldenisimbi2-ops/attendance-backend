# Attendify QA & Testing Guide

Please follow this testing guide to verify the recent stabilization fixes and ensure the system is working from end-to-end before merging.

### 1. Test the Teacher Flow
*   **Log in as a Teacher** (Use a test teacher account).
*   **View Classes:** Click on **"Classes"** in the sidebar. Verify that you can click **"View Students"** and see a real roster of students for that class (instead of it being empty).
*   **Mark Attendance:** Click **"Mark Attendance"**. Verify that the list of students loaded on the screen are the *actual* students enrolled in that class (no more placeholder names).
*   **Save & Check History:** Save the attendance, then go to **"Attendance History"**. Verify that the table now shows the correct Subject Name, Class Name, and the real Student Names (no more generic "Student" or "Subject" labels).

### 2. Test the Admin Flow
*   **Log in as the Admin**.
*   **Check the Dashboard:** Open the main Dashboard. Verify that the top metric cards (Total Users, Students, Teachers, Classes) are pulling the real numbers from the database.
*   **Check the Charts:** Look at the "Attendance Rate" percentage and the "Attendance overview" (Present/Absent/Late). Ensure they show actual numbers from the database, not just `0`.
*   **Check Recent Sessions:** Look at the "Recent attendance sessions" list at the bottom. Verify that it shows the real sessions you (or other teachers) just created, complete with the correct class name and open/closed status.
*   **Test Quick Actions:** Click the "Quick Action" buttons (Add Student, Create Class, etc.) to verify they now correctly navigate to the right pages.

### 3. Test the Head Teacher Flow
*   **Log in as a Head Teacher** (Use a test head teacher account).
*   **Check the Dashboard:** Verify that the dashboard metrics (Total Students, Teachers, Classes, Sessions) are successfully loading the real numbers (instead of showing `—` or `0`).
*   **Check Monitoring:** Go to **"Attendance Monitoring"**. Verify that you can see the school-wide list of attendance records, and specifically check the "Teacher" column to ensure it shows the actual teacher's name who took the attendance (instead of just saying "Teacher").
*   **Check Rosters:** Go to the **"Students"** and **"Teachers"** tabs in the sidebar. Verify that the lists are successfully loading the full rosters (they were previously blocked by security permissions).

---

**Setup Instructions for Testing:**
Make sure you have pulled the latest branch, run `npm install` in both the `attendance-frontend` and `attendance-backend` directories, and started both servers using `npm run dev` before beginning your review.
