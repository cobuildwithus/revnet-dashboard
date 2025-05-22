export function deriveStartFrom(
  baseRulesetStart: bigint,
  baseRulesetDuration: bigint,
  mustStartAtOrAfter: bigint
): bigint {
  // A subsequent ruleset to one with a duration of 0 should start as soon as possible.
  if (baseRulesetDuration === 0n) return mustStartAtOrAfter;

  // The time when the ruleset immediately after the specified ruleset starts.
  const nextImmediateStart = baseRulesetStart + baseRulesetDuration;

  // If the next immediate start is now or in the future, return it.
  if (nextImmediateStart >= mustStartAtOrAfter) {
    return nextImmediateStart;
  }

  // The amount of seconds since the `mustStartAtOrAfter` time which results in a start time that might satisfy
  // the specified limits.
  const timeFromImmediateStartMultiple =
    (mustStartAtOrAfter - nextImmediateStart) % baseRulesetDuration;

  // A reference to the first possible start timestamp.
  let start = mustStartAtOrAfter - timeFromImmediateStartMultiple;

  // Add increments of duration as necessary to satisfy the threshold.
  while (mustStartAtOrAfter > start) {
    start += baseRulesetDuration;
  }

  return start;
}
