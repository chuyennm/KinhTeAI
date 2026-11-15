import type { Lesson, Module } from '../types';
import { m1 } from './modules/m1';
import { m2 } from './modules/m2';
import { m3 } from './modules/m3';
import { m4 } from './modules/m4';
import { m5 } from './modules/m5';
import { m6 } from './modules/m6';

export const modules: Module[] = [m1, m2, m3, m4, m5, m6];

export const allLessons: { lesson: Lesson; module: Module }[] = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ lesson, module })),
);

export function findLesson(id: string) {
  return allLessons.find((x) => x.lesson.id === id);
}

export function findModule(id: string) {
  return modules.find((m) => m.id === id);
}

/** The lesson after the given one, across module boundaries. */
export function nextLesson(id: string) {
  const i = allLessons.findIndex((x) => x.lesson.id === id);
  return i >= 0 ? allLessons[i + 1] : undefined;
}

export function findQuestion(id: string) {
  for (const { lesson, module } of allLessons) {
    const q = lesson.quiz.find((x) => x.id === id);
    if (q) return { question: q, lesson, module };
  }
  return undefined;
}

export const LESSON_TABS = ['core', 'examples', 'lab', 'quiz'] as const;
export type LessonTab = (typeof LESSON_TABS)[number];
