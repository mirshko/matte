export const SITE_ID = "OFXTGXJF";

export const GOALS = {
  PhotoMatted: "Y1VU2I3B",
};

/**
 * Enqueues a command to dispatch to fathom when the library is loaded.
 *
 * @param command - A set of arguments to dispatch to fathom later.
 */
const enqueue = (command) => {
  window.__fathomClientQueue = window.__fathomClientQueue || [];
  window.__fathomClientQueue.push(command);
};

/**
 * Tracks a goal.
 *
 * @param code - The goal ID.
 * @param cents - The value in cents.
 */
export const trackGoal = (code, cents = 0) => {
  if (window.fathom) {
    window.fathom.trackGoal(code, cents);
  } else {
    enqueue({ type: "trackGoal", code, cents });
  }
};
