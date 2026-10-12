export const COURSES = [
  "Starter",
  "Main Course",
  "Dessert",
  "Drinks",
] as const;

export type Course = (typeof COURSES)[number];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};
