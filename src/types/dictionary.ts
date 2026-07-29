import type en from "@/dictionaries/en.json";

/**
 * The shape of a translation file, derived from the English dictionary so the
 * two JSON files can never drift apart unnoticed.
 */
export type Dictionary = typeof en;
