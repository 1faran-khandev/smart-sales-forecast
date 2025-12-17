/**
 * Validate uploaded CSV data for sales forecasting
 * @param {Array<Object>} rows - Parsed CSV rows
 * @returns {Object} validation result
 */
export function validateCSV(rows) {
  const errors = [];

  // Check empty or invalid file
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      isValid: false,
      errors: ["CSV file is empty or invalid."],
    };
  }

  const requiredColumns = ["date", "sales"];
  const columns = Object.keys(rows[0]).map((c) => c.toLowerCase());

  // Check for missing required columns
  requiredColumns.forEach((col) => {
    if (!columns.includes(col)) {
      errors.push(`Missing required column: "${col}"`);
    }
  });

  // Stop further checks if required columns are missing
  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate each row
  rows.forEach((row, index) => {
    const rowNumber = index + 2; // account for header row

    // --- Date validation ---
    const dateValue = row.date;
    const parsedDate = new Date(dateValue);
    if (!dateValue || isNaN(parsedDate.getTime())) {
      errors.push(`Invalid date at row ${rowNumber}: "${dateValue}"`);
    }

    // --- Sales validation ---
    const salesValue = row.sales;
    if (salesValue === "" || salesValue === null || isNaN(Number(salesValue))) {
      errors.push(`Invalid sales value at row ${rowNumber}: "${salesValue}"`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
