export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string; // stringified arguments to pass to the function
  expected: string; // stringified expected result
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
  testCases: TestCase[];
}

export const practiceProblems: PracticeProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    starterCode: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" }
    ]
  },
  {
    id: "fizz-buzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    description: "Write a function that takes an integer `n` and returns an array of string representations of numbers from 1 to `n`.\n\nBut for multiples of three, it should output 'Fizz' instead of the number, and for multiples of five, it should output 'Buzz'. For numbers which are multiples of both three and five, it should output 'FizzBuzz'.",
    starterCode: "function fizzBuzz(n) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "3", expected: "['1','2','Fizz']" },
      { input: "5", expected: "['1','2','Fizz','4','Buzz']" }
    ]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    starterCode: "function reverseString(s) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "['h','e','l','l','o']", expected: "['o','l','l','e','h']" },
      { input: "['H','a','n','n','a','h']", expected: "['h','a','n','n','a','H']" }
    ]
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    starterCode: "function lengthOfLongestSubstring(s) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "'abcabcbb'", expected: "3" },
      { input: "'bbbbb'", expected: "1" },
      { input: "'pwwkew'", expected: "3" }
    ]
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    starterCode: "function maxArea(height) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[1,1]", expected: "1" }
    ]
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    starterCode: "function merge(intervals) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]" },
      { input: "[[1,4],[4,5]]", expected: "[[1,5]]" }
    ]
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    starterCode: "function trap(height) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "[4,2,0,3,2,5]", expected: "9" }
    ]
  },
  {
    id: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    description: "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return the number of distinct solutions to the n-queens puzzle.",
    starterCode: "function totalNQueens(n) {\n  // Write your code here\n  \n}",
    testCases: [
      { input: "4", expected: "2" },
      { input: "1", expected: "1" }
    ]
  }
];
