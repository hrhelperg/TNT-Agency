/**
 * The provenance vocabulary for the German rulesets.
 *
 * IT LIVES ON THE DATA SIDE ON PURPOSE
 * ────────────────────────────────────
 * §47 forbids a source registry from importing any engine, because a registry
 * that depends on the code it is meant to be independent evidence FOR has
 * stopped being evidence. That holds for a type-only import too — not because a
 * type can misbehave, but because "no imports" is a rule anyone can check and
 * "no imports that matter" is an argument.
 *
 * So the vocabulary sits with the data and the engine reads it from here. The
 * dependency points engine → registry, which is the direction that was always
 * true in substance.
 */

export type RuleStatus =
  | 'confirmed-official'
  | 'derived-from-official'
  | 'configurable-default'
  | 'unresolved';

/**
 * A value that knows where it came from.
 *
 * There is deliberately no bare `number` anywhere in the ruleset: a field typed
 * as a number is a field somebody can fill in without saying where it came from,
 * which is how a wrong rate survives review looking exactly like a right one.
 */
export interface Ruled<T> {
  readonly value: T;
  readonly sourceId: string;
  readonly legalBasis: string;
  readonly status: RuleStatus;
  readonly note?: string;
}

