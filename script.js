/*
    Name: Kyle H
    Date: November 1, 2026
    Assignment: Module 7 Applied Programming Activity
    Trimester: 1
    Instructor: Lisa Thoendel
*/

"use strict";

// Part 0: Course Modules
const courseModules = [
  { moduleName: "Module 1", hoursRequired: 6, topic: "JavaScript fundamentals" },
  { moduleName: "Module 2", hoursRequired: 6, topic: "Conditionals, arrays" },
  { moduleName: "Module 3", hoursRequired: 8, topic: "Functions, scope, loops" },
  { moduleName: "Module 4", hoursRequired: 5, topic: "DOM" },
  { moduleName: "Module 5", hoursRequired: 5, topic: "Debugging, error handling" },
  { moduleName: "Module 6", hoursRequired: 6, topic: "APIs" },
  { moduleName: "Module 7", hoursRequired: 7, topic: "Objects, iterators" },
  { moduleName: "Module 8", hoursRequired: 6, topic: "Modular JS, code organization, final project planning" },
  { moduleName: "Module 9", hoursRequired: 7, topic: "Modern tools, final project development" },
  { moduleName: "Module 10", hoursRequired: 10, topic: "Final project, deployment" }
];

// Part 1: Get DOM Elements
const studentNameInput = document.getElementById("studentName");
const completedModulesInput =
  document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const output = document.getElementById("output");

// Module 6: Joke and Quote DOM Elements
const jokeContainer = document.getElementById("jokeContainer");
const quoteContainer = document.getElementById("quoteContainer");

// Part 2: Study Calculations
const hoursPerModule = 6;

const calculateStudyHours = (modules, hoursPerModule = 6) =>
  modules * hoursPerModule;

const calculatePercentComplete = (completed, total) =>
  (completed / total) * 100;

// Part 3: Get Course Progress
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

// Part 4: Get Course Grade
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

// Part 5: Get Study Plan
const getStudyPlan = (studyDay) => {
  const totalStudyHours = courseModules.reduce(
    (total, module) => total + module.hoursRequired,
    0
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

// Part 6: Display Modules
const displayModules = (modules) => {
  const list = document.createElement("ul");

  for (let i = 0; i < modules.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = modules[i].moduleName;
    list.appendChild(listItem);
  }

  return list;
};

// Display Remaining Modules
const displayRemainingModules = (remainingModules) => {
  document.getElementById("remainingModulesList").appendChild(
    displayModules(remainingModules)
  );
};

// Part 7: Apply Dashboard Color
const applyDashboardColor = (percentComplete) => {
  if (percentComplete >= 75) {
    output.style.backgroundColor = "#d4edda";
  } else if (percentComplete >= 25) {
    output.style.backgroundColor = "#fff3cd";
  } else {
    output.style.backgroundColor = "#f8d7da";
  }
};

// Part 8: Validate Inputs
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

// Part 9: Generate Dashboard with Error Handling
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

    // Calculate remaining modules
    const remainingModules = courseModules.filter(
      (module, index) => index >= completedModules
    );

    // Use map() to create a list of module names
    const moduleNames = courseModules.map(
      (module) => module.moduleName
    );

    // Use reduce() to calculate remaining study hours
    const remainingHours = remainingModules.reduce(
      (total, module) => total + module.hoursRequired,
      0
    );

    // Calculate total study hours
    const totalStudyHours = courseModules.reduce(
      (total, module) => total + module.hoursRequired,
      0
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

    // Display console information
    console.log("Student Name:", studentName);
    console.log("Completed Modules:", completedModules);
    console.log("Study Day:", studyDay);
    console.log("Percent Complete:", percentComplete);
    console.log("Grade and Progress:", grade, progress);

    // Module 7: Display array iterator results
    console.log("Module Names:", moduleNames);
    console.log("Remaining Modules:", remainingModules);
    console.log("Remaining Study Hours:", remainingHours);

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
      adjustedDailyMinutes,
      remainingHours,
      remainingModules
    );

    // Display remaining modules and change the color
    displayRemainingModules(remainingModules);
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
  adjustedDailyMinutes,
  remainingHours,
  remainingModules
) => {
  output.innerHTML = `
    <div class="dashboard-card">
      <h2>My Study Dashboard</h2>

      <p><strong>Name:</strong> ${studentName}</p>
      <p><strong>Total Modules:</strong> ${courseModules.length}</p>
      <p><strong>Completed Modules:</strong> ${completedModules}</p>
      <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>
      <p><strong>Remaining Study Hours:</strong> ${remainingHours}</p>

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

// Part 13: Get and Display a Random Joke
const getJoke = async () => {
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );

  if (!response.ok) {
    throw new Error("Unable to fetch joke.");
  }

  const data = await response.json();

  return data;
};

const displayJoke = async () => {
  try {
    jokeContainer.textContent = "Loading joke...";

    const joke = await getJoke();

    jokeContainer.innerHTML = `
      <p>${joke.setup}</p>
      <p>${joke.punchline}</p>
    `;
  } catch (error) {
    jokeContainer.textContent = "Unable to load joke.";
    console.error("Error loading joke:", error);
  }
};

// Part 14: Get and Display a Random Quote
const getQuote = async () => {
  const response = await fetch(
    "https://dummyjson.com/quotes/random"
  );

  if (!response.ok) {
    throw new Error("Unable to fetch quote.");
  }

  const data = await response.json();

  return data;
};

const displayQuote = async () => {
  try {
    quoteContainer.textContent = "Loading quote...";

    const quote = await getQuote();

    quoteContainer.innerHTML = `
      <p>"${quote.quote}"</p>
      <p><strong>— ${quote.author}</strong></p>
    `;
  } catch (error) {
    quoteContainer.textContent = "Unable to load quote.";
    console.error("Error loading quote:", error);
  }
};

// Part 15: Button Event Listeners
generateButton.addEventListener("click", () => {
  generateDashboard();
});

resetButton.addEventListener("click", () => {
  resetDashboard();
});

// Part 16: Load Joke and Quote When the Page Opens
displayJoke();
displayQuote();
