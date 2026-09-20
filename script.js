/*
    Name: Kyle H
    Date: September 20, 2026
    Assignment: Module 1 Applied Programming Activity
    Trimester: 1
    Instructor: Lisa Thoendel
*/

"use strict";

// DO NOT MODIFY
const display = (label, value) =>
  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY

// ADD YOUR CODE BELOW

// Create variables for name, total modules, and enrollment
const name = "Kyle H";
const totalModules = 10;
const isEnrolled = true;

// Create a welcome message using a template literal
const welcomeMessage = `Welcome to the course, ${name}!`;

// Calculate total study hours
const hoursPerModule = 6;
const totalStudyHours = totalModules * hoursPerModule;

// Calculate daily study hours and minutes
const dailyStudyHours = totalStudyHours / 7;
const dailyStudyMinutes = dailyStudyHours * 60;

// Calculate daily study hours and minutes with one rest day
const adjustedDailyHours = totalStudyHours / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;

// Calculate course percent complete and remaining
const completedModules = 1;
const percentComplete = (completedModules / totalModules) * 100;
const percentRemaining = 100 - percentComplete;

// DISPLAY RESULTS

display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);
display("Daily Study Hours (7 days)", dailyStudyHours);
display("Daily Study Minutes (7 days)", dailyStudyMinutes);
display("Daily Study Hours (with rest day)", adjustedDailyHours);
display("Daily Study Minutes (with rest day)", adjustedDailyMinutes);

display("Percent Complete", `${percentComplete}%`);
display("Percent Remaining", `${percentRemaining}%`);