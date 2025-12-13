// src/utils/csvValidation.js

/**
 * Validate uploaded CSV data for sales forecasting
 * @param {Array<Object>} rows - Parsed CSV rows
 * @returns {Object} validation result
 */
export function validateCSV(rows) {
  const errors = [];

  // 1️⃣ Check empty file
  if (!rows || rows.length === 0) {
    return {
      isValid: false,
      errors: ["CSV file is empty or invalid."],
    };
  }

  const requiredColumns = ["date", "sales"];

  const columns = Object.keys(rows[0]).map((c) => c.toLowerCase());

  // 2️⃣ Required columns check
  requiredColumns.forEach((col) => {
    if (!columns.includes(col)) {
      errors.push(`Missing required column: "${col}"`);
    }
  });

  // Stop further checks if required columns missing
  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  // 3️⃣ Validate rows
  rows.forEach((row, index) => {
    const rowNumber = index + 2; // account for header row

    // Date validation
    const dateValue = row.date;
    const parsedDate = new Date(dateValue);
    if (!dateValue || isNaN(parsedDate.getTime())) {
      errors.push(`Invalid date at row ${rowNumber}`);
    }

    // Sales validation
    const salesValue = row.sales;
    if (salesValue === "" || salesValue === null || isNaN(Number(salesValue))) {
      errors.push(`Invalid sales value at row ${rowNumber}`);
    }
  });

  // 4️⃣ Final result
  return {
    isValid: errors.length === 0,
    errors,
  };
}
