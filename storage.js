// Shared storage helpers for the whole website.
// Every page uses these two functions instead of calling
// localStorage and JSON.parse / JSON.stringify on its own.
// That keeps the storage code in one place and easy to explain.

// Read a value from localStorage.
// key: the storage key, e.g. "weddingUsers".
// fallback: what to return when nothing is saved yet, or the saved
// text is not valid JSON (for example [] for a list, null for one item).
function loadData(key, fallback) {
  var saved = localStorage.getItem(key);
  if (!saved) {
    return fallback;
  }
  try {
    var data = JSON.parse(saved);
    if (data === null || data === undefined) {
      return fallback;
    }
    return data;
  } catch (e) {
    // The saved text is broken, so ignore it instead of crashing the page.
    return fallback;
  }
}

// Save a value in localStorage as a JSON string.
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Remove one saved value from localStorage.
function clearData(key) {
  localStorage.removeItem(key);
}
