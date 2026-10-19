
/*
    Name: Kyle H
    Date: October 18, 2026
    Assignment: Module 5 Applied Programming Activity
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

// Part 7: Validate Inputs
const validateInputs = (
  studentName,
  completedModules,
  studyDay
) => {
  const errors = [];

  if (studentName.trim() === "") {
    errors.push("<li>Please enter a name.</li>");
  }

  if (completedModules < 0 || completedModules > 10) {
    errors.push(
      "<li>Completed modules must be between 0 and 10.</li>"
    );
  } else if (!Number.isInteger(completedModules)) {
    errors.push(
      "<li>Completed modules must be a whole number between 0 and 10.</li>"
    );
  }

  if (studyDay === "") {
    errors.push("<li>Please select a study day.</li>");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(""));
  }
};

// Part 8: Generate Dashboard with Error Handling
const generateDashboard = () => {
  try {
    const studentName = studentNameInput.value.trim();
    const completedModules =
      completedModulesInput.value.trim() === ""
        ? NaN
        : Number(completedModulesInput.value);
    const studyDay = studyDayInput.value;

    // Validate all user inputs
    validateInputs(studentName, completedModules, studyDay);

    // Run unit tests
    runUnitTests();

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

    // Part 9: Console Logs
    console.log("Student Name:", studentName);
    console.log("Completed Modules:", completedModules);
    console.log("Study Day:", studyDay);
    console.log("Percent Complete:", percentComplete);
    console.log("Grade and Progress:", grade, progress);

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
  } catch (error) {
    output.innerHTML = `
      <div class="dashboard-card">
        <h2>Error</h2>
        <ul>${error.message}</ul>
      </div>
    `;

    output.style.backgroundColor = "#f8d7da";
  }
};

// Part 10: Display Dashboard Summary
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

// Part 11: Reset Dashboard
const resetDashboard = () => {
  // Log the existing input values before resetting
  console.log("Student Name before reset:", studentNameInput.value);
  console.log(
    "Completed Modules before reset:",
    completedModulesInput.value
  );
  console.log("Study Day before reset:", studyDayInput.value);

  studentNameInput.value = "";
  completedModulesInput.value = 0;
  studyDayInput.value = "";
  output.innerHTML = "";
  output.style.backgroundColor = "";
};

// Part 12: Unit Tests
const runUnitTests = () => {
  let passedTests = 0;
  let failedTests = 0;

  const test = (description, condition) => {
    console.assert(condition, `FAIL: ${description}`);

    if (condition) {
      passedTests++;
      console.log(`PASS: ${description}`);
    } else {
      failedTests++;
      console.error(`FAIL: ${description}`);
    }
  };

  console.log("----- Starting Unit Tests -----");

  // Five letter-grade tests
  test(
    "Grade A: 90% returns A",
    getCourseGrade(90) === "Course Grade: A"
  );

  test(
    "Grade B: 80% returns B",
    getCourseGrade(80) === "Course Grade: B"
  );

  test(
    "Grade C: 70% returns C",
    getCourseGrade(70) === "Course Grade: C"
  );

  test(
    "Grade D: 60% returns D",
    getCourseGrade(60) === "Course Grade: D"
  );

  test(
    "Grade F: 59% returns F",
    getCourseGrade(59) === "Course Grade: F"
  );

  // Five additional tests
  test(
    "Study hours: 2 modules equal 12 hours",
    calculateStudyHours(2, 6) === 12
  );

  test(
    "Percent complete: 5 of 10 modules equals 50%",
    calculatePercentComplete(5, 10) === 50
  );

  test(
    "Progress: 0% remaining means finished",
    getCourseProgress(0) === "Current Progress: Finished!"
  );

  test(
    "Study plan: Tuesday is a rest day",
    getStudyPlan("Tuesday") === "Rest day."
  );

  test(
    "Course contains 10 modules",
    courseModules.length === 10
  );

  console.log("----- Unit Test Results -----");
  console.log("Total tests:", passedTests + failedTests);
  console.log("Tests passed:", passedTests);
  console.log("Tests failed:", failedTests);
};

// Part 13: Button Event Listeners
generateButton.addEventListener("click", () => {
  generateDashboard();
});

resetButton.addEventListener("click", () => {
  resetDashboard();
});
