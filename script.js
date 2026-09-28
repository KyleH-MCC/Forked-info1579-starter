/*
    Name: Kyle H
    Date: September 28, 2026
    Assignment: Module 2 Applied Programming Activity
    Trimester: 1
    Instructor:
*/

"use strict";

// DO NOT MODIFY
const display = (label, value) =>
  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY

// ADD YOUR CODE BELOW

// Part 0: Arrays
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

let completedModules = ["Module 1", "Module 2"];

// Module 1 variables
const name = "Kyle H";
const totalModules = 10;
const isEnrolled = true;

// Welcome message
const welcomeMessage = `Welcome to the course, ${name}!`;

// Study calculations
const hoursPerModule = 6;
const totalStudyHours = totalModules * hoursPerModule;

const dailyStudyHours = totalStudyHours / 7;
const dailyStudyMinutes = dailyStudyHours * 60;

const adjustedDailyHours = totalStudyHours / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;

// Ask how many modules are completed
const completedModuleInput = prompt(
  "Enter the number of completed modules (1-10):"
);

const completedModuleCount = Number(completedModuleInput);

// Update completedModules
if (
  completedModuleCount >= 1 &&
  completedModuleCount <= 10
) {
  completedModules = [];

  for (let i = 0; i < completedModuleCount; i++) {
    completedModules.push(courseModules[i]);
  }
}

// Calculate progress
const percentComplete =
  (completedModules.length / totalModules) * 100;

const percentRemaining = 100 - percentComplete;

// Part 1: Current Progress
let courseProgress;

if (
  completedModuleCount >= 1 &&
  completedModuleCount <= 10
) {
  if (percentRemaining === 0) {
    courseProgress = "Current Progress: Finished!";
  } else if (
    percentRemaining >= 1 &&
    percentRemaining <= 24.99
  ) {
    courseProgress = "Current Progress: Almost Finished!";
  } else if (
    percentRemaining >= 25 &&
    percentRemaining <= 74.99
  ) {
    courseProgress = "Current Progress: Making Progress";
  } else if (
    percentRemaining >= 75 &&
    percentRemaining <= 100
  ) {
    courseProgress = "Current Progress: Just Getting Started";
  }
} else {
  courseProgress = "Invalid entry.";
}

// Part 2: Course Grade
let courseGrade;

if (
  completedModuleCount >= 1 &&
  completedModuleCount <= 10
) {
  if (percentComplete >= 90) {
    courseGrade = "Course Grade: A";
  } else if (
    percentComplete >= 80 &&
    percentComplete < 90
  ) {
    courseGrade = "Course Grade: B";
  } else if (
    percentComplete >= 70 &&
    percentComplete < 80
  ) {
    courseGrade = "Course Grade: C";
  } else if (
    percentComplete >= 60 &&
    percentComplete < 70
  ) {
    courseGrade = "Course Grade: D";
  } else {
    courseGrade = "Course Grade: F";
  }
} else {
  courseGrade = "Invalid entry.";
}

// Part 3: Weekly Study Plan
let studyDay;
let studyPlan;

if (percentRemaining === 0) {
  studyDay = "Complete";
} else {
  studyDay = prompt(
    "Enter your study day (Monday-Sunday):"
  );
}

switch (studyDay) {
  case "Monday":
    studyPlan = `Study for ${dailyStudyMinutes} minutes today.`;
    break;

  case "Tuesday":
    studyPlan = "Rest day.";
    break;

  case "Wednesday":
    studyPlan = `Lab day. Study for ${adjustedDailyMinutes} minutes today.`;
    break;

  case "Thursday":
    studyPlan = `Applied Programming Activity day. Study for ${adjustedDailyMinutes} minutes today.`;
    break;

  case "Friday":
    studyPlan = "Open study day.";
    break;

  case "Saturday":
    studyPlan = "Open study day.";
    break;

  case "Sunday":
    studyPlan = "Open study day.";
    break;

  case "Complete":
    studyPlan = "Course Completed!";
    break;

  default:
    studyPlan = "Invalid day.";
    break;
}

// DISPLAY RESULTS

display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);
display("Completed Modules", completedModules.length);

display("Daily Study Hours (7 days)", dailyStudyHours);
display("Daily Study Minutes (7 days)", dailyStudyMinutes);

display(
  "Daily Study Hours (with rest day)",
  adjustedDailyHours
);

display(
  "Daily Study Minutes (with rest day)",
  adjustedDailyMinutes
);

display("Percent Complete", `${percentComplete}%`);
display("Percent Remaining", `${percentRemaining}%`);

// Display these without adding another label
document.getElementById("output").innerHTML +=
  `${courseProgress}<br>`;

document.getElementById("output").innerHTML +=
  `${courseGrade}<br>`;

display("Study Day", studyDay);
display("Study Plan", studyPlan);
