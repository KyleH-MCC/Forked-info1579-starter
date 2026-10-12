/*
    Name: Kyle H
    Date: October 12, 2026
    Assignment: Module 4 Applied Programming Activity
    Trimester: 1
    Instructor:
*/

"use strict";

// Part 0: Course Modules
const courseModules = [
  "Module 1",
  "Module 2",
  "Module 3",
  "Module 4",
  "Module 5",
  "Module 6",
  "Module 7",
  "Module 8",
  "Module 9",
  "Module 10",
];

// Part 1: Get DOM Elements
const studentNameInput = document.getElementById("studentName");
const completedModulesInput =
  document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const output = document.getElementById("output");

// Study Calculations
const hoursPerModule = 6;

const calculateStudyHours = (modules, hoursPerModule = 6) =>
  modules * hoursPerModule;

const calculatePercentComplete = (completed, total) =>
  (completed / total) * 100;

// Part 2: Get Course Progress
const getCourseProgress = (percentRemaining) => {
  if (percentRemaining === 0) {
    return "Current Progress: Finished!";
  } else if (percentRemaining <= 24.99) {
    return "Current Progress: Almost Finished!";
  } else if (percentRemaining <= 74.99) {
    return "Current Progress: Making Progress";
  } else {
    return "Current Progress: Just Getting Started";
  }
};

// Part 3: Get Course Grade
const getCourseGrade = (percentComplete) => {
  if (percentComplete >= 90) {
    return "Course Grade: A";
  } else if (percentComplete >= 80) {
    return "Course Grade: B";
  } else if (percentComplete >= 70) {
    return "Course Grade: C";
  } else if (percentComplete >= 60) {
    return "Course Grade: D";
  } else {
    return "Course Grade: F";
  }
};

// Part 4: Get Study Plan
const getStudyPlan = (studyDay) => {
  const totalStudyHours = calculateStudyHours(
    courseModules.length,
    hoursPerModule
  );

  const dailyStudyMinutes = (totalStudyHours / 7) * 60;
  const adjustedDailyMinutes = (totalStudyHours / 6) * 60;

  let studyPlan;

  switch (studyDay) {
    case "Monday":
      studyPlan = `Study for ${dailyStudyMinutes.toFixed(0)} minutes today.`;
      break;

    case "Tuesday":
      studyPlan = "Rest day.";
      break;

    case "Wednesday":
      studyPlan = `Lab day. Study for ${adjustedDailyMinutes.toFixed(0)} minutes today.`;
      break;

    case "Thursday":
      studyPlan = `Applied Programming Activity day. Study for ${adjustedDailyMinutes.toFixed(0)} minutes today.`;
      break;

    case "Friday":
    case "Saturday":
    case "Sunday":
      studyPlan = "Open study day.";
      break;

    case "Complete":
      studyPlan = "Course Completed!";
      break;

    default:
      studyPlan = "No study day selected.";
      break;
  }

  return studyPlan;
};

// Part 5: Display Modules
const displayModules = (modules) => {
  const list = document.createElement("ul");

  for (let i = 0; i < modules.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = modules[i];
    list.appendChild(listItem);
  }

  return list;
};

// Display Remaining Modules
const displayRemainingModules = (completedModules) => {
  const remainingModules = courseModules.slice(completedModules);
  const remainingModulesList =
    document.getElementById("remainingModulesList");

  remainingModulesList.appendChild(
    displayModules(remainingModules)
  );
};

// Part 6: Apply Dashboard Color
const applyDashboardColor = (percentComplete) => {
  if (percentComplete >= 75) {
    output.style.backgroundColor = "#d4edda";
  } else if (percentComplete >= 25) {
    output.style.backgroundColor = "#fff3cd";
  } else {
    output.style.backgroundColor = "#f8d7da";
  }
};

// Part 7: Generate Dashboard
const generateDashboard = () => {
  const studentName = studentNameInput.value.trim();
  const completedModules = Number(completedModulesInput.value);
  const studyDay = studyDayInput.value;

  // Check the user's information
  if (studentName === "") {
    alert("Please enter your name.");
    return;
  }

  if (
    completedModulesInput.value === "" ||
    !Number.isInteger(completedModules) ||
    completedModules < 0 ||
    completedModules > courseModules.length
  ) {
    alert("Enter a whole number of completed modules from 0 to 10.");
    return;
  }

  if (studyDay === "") {
    alert("Please select a study day.");
    return;
  }

  // Calculate study information
  const totalStudyHours = calculateStudyHours(
    courseModules.length,
    hoursPerModule
  );

  const percentComplete = calculatePercentComplete(
    completedModules,
    courseModules.length
  );

  const percentRemaining = 100 - percentComplete;

  const dailyStudyHours = totalStudyHours / 7;
  const dailyStudyMinutes = dailyStudyHours * 60;

  const adjustedDailyHours = totalStudyHours / 6;
  const adjustedDailyMinutes = adjustedDailyHours * 60;

  // Get grade, progress, and study plan
  const grade = getCourseGrade(percentComplete);
  const progress = getCourseProgress(percentRemaining);

  let studyPlan;

  if (completedModules === courseModules.length) {
    studyPlan = getStudyPlan("Complete");
  } else {
    studyPlan = getStudyPlan(studyDay);
  }

  // Display the dashboard
  displayDashboard(
    studentName,
    completedModules,
    totalStudyHours,
    percentComplete,
    percentRemaining,
    grade,
    progress,
    studyDay,
    studyPlan,
    dailyStudyHours,
    dailyStudyMinutes,
    adjustedDailyHours,
    adjustedDailyMinutes
  );

  // Display remaining modules and change the color
  displayRemainingModules(completedModules);
  applyDashboardColor(percentComplete);
};

// Part 8: Display Dashboard Summary
const displayDashboard = (
  studentName,
  completedModules,
  totalStudyHours,
  percentComplete,
  percentRemaining,
  grade,
  progress,
  studyDay,
  studyPlan,
  dailyStudyHours,
  dailyStudyMinutes,
  adjustedDailyHours,
  adjustedDailyMinutes
) => {
  output.innerHTML = `
    <div class="dashboard-card">
      <h2>My Study Dashboard</h2>

      <p><strong>Name:</strong> ${studentName}</p>
      <p><strong>Total Modules:</strong> ${courseModules.length}</p>
      <p><strong>Completed Modules:</strong> ${completedModules}</p>
      <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>

      <p><strong>Daily Study Hours (7 days):</strong> ${dailyStudyHours.toFixed(2)}</p>
      <p><strong>Daily Study Minutes (7 days):</strong> ${dailyStudyMinutes.toFixed(0)}</p>

      <p><strong>Daily Study Hours (with rest day):</strong> ${adjustedDailyHours.toFixed(2)}</p>
      <p><strong>Daily Study Minutes (with rest day):</strong> ${adjustedDailyMinutes.toFixed(0)}</p>

      <p><strong>Percent Complete:</strong> ${percentComplete.toFixed(0)}%</p>
      <p><strong>Percent Remaining:</strong> ${percentRemaining.toFixed(0)}%</p>
      <p><strong>Current Grade:</strong> ${grade}</p>
      <p><strong>Progress Status:</strong> ${progress}</p>
      <p><strong>Study Day:</strong> ${studyDay}</p>
      <p><strong>Today's Plan:</strong> ${studyPlan}</p>

      <p><strong>Remaining Modules:</strong></p>
      <div id="remainingModulesList"></div>
    </div>
  `;
};

// Part 9: Reset Dashboard
const resetDashboard = () => {
  studentNameInput.value = "";
  completedModulesInput.value = 0;
  studyDayInput.value = "";
  output.innerHTML = "";
  output.style.backgroundColor = "";
};

// Part 10: Button Event Listeners
generateButton.addEventListener("click", () => {
  generateDashboard();
});

resetButton.addEventListener("click", () => {
  resetDashboard();
});