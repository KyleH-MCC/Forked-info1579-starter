/*
    Name: Kyle H
    Date: October 5, 2026
    Assignment: Module 3 Applied Programming Activity
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

const completedModules = ["Module 1", "Module 2", "Module 3"];

// Module 1 variables
const name = "Kyle H";
const totalModules = 10;
const isEnrolled = true;

// Welcome message
const welcomeMessage = `Welcome to the course, ${name}!`;

// Study calculations
const hoursPerModule = 6;

const calculateStudyHours = (modules, hoursPerModule = 6) =>
  modules * hoursPerModule;

const totalStudyHours = calculateStudyHours(courseModules.length);

const dailyStudyHours = totalStudyHours / 7;
const dailyStudyMinutes = dailyStudyHours * 60;

const adjustedDailyHours = totalStudyHours / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;

// Calculate progress
const calculatePercentComplete = (completed, total) =>
  (completed / total) * 100;

const percentComplete = calculatePercentComplete(
  completedModules.length,
  courseModules.length
);

const percentRemaining = 100 - percentComplete;

// Part 1: Current Progress
const getCourseProgress = (percentRemaining) => {
  if (percentRemaining === 0) {
    return "Current Progress: Finished!";
  } else if (
    percentRemaining >= 1 &&
    percentRemaining <= 24.99
  ) {
    return "Current Progress: Almost Finished!";
  } else if (
    percentRemaining >= 25 &&
    percentRemaining <= 74.99
  ) {
    return "Current Progress: Making Progress";
  } else if (
    percentRemaining >= 75 &&
    percentRemaining <= 100
  ) {
    return "Current Progress: Just Getting Started";
  }

  return "Invalid entry.";
};

// Part 2: Course Grade
const getCourseGrade = (percentComplete) => {
  if (percentComplete >= 90) {
    return "Course Grade: A";
  } else if (
    percentComplete >= 80 &&
    percentComplete < 90
  ) {
    return "Course Grade: B";
  } else if (
    percentComplete >= 70 &&
    percentComplete < 80
  ) {
    return "Course Grade: C";
  } else if (
    percentComplete >= 60 &&
    percentComplete < 70
  ) {
    return "Course Grade: D";
  }

  return "Course Grade: F";
};

// Part 3: Weekly Study Plan
let studyDay;

if (percentRemaining === 0) {
  studyDay = "Complete";
} else {
  studyDay = prompt(
    "Enter your study day (Monday-Sunday):"
  );
}

const getStudyPlan = (studyDay) => {
  let studyPlan;

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

  return studyPlan;
};

// Part 4: Display all course modules
const displayModules = (modules) => {
  for (let i = 0; i < modules.length; i++) {
    display(`Module ${i + 1}`, modules[i]);
  }
};

// Part 5: Display completed modules
const displayCompletedModules = (...modules) => {
  return modules.join(", ");
};

const completedModulesList = displayCompletedModules(
  ...completedModules
);

// Part 6: Get study plan
const studyPlan = getStudyPlan(studyDay);

// DISPLAY RESULTS

display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);
display("Completed Modules", completedModules.length);

display("Total Study Hours", totalStudyHours);

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

display(
  "Course Progress",
  getCourseProgress(percentRemaining)
);

display(
  "Course Grade",
  getCourseGrade(percentComplete)
);

displayModules(courseModules);

display("Completed Modules List", completedModulesList);

display("Study Day", studyDay);
display("Study Plan", studyPlan);
