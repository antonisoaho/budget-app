export const myBudgets = JSON.stringify([
  {
    creator: "6777bd74d07f6387e19f5498",
    year: "2023",
    name: "My Budget",
    creatorName: "Anton Isoaho",
    months: [
      {
        month: "January",
        expenses: [
          { category: "Food", amount: 200 },
          { category: "Transport", amount: 100 },
        ],
        incomes: [{ category: "Salary", amount: 3000 }],
        savings: [{ category: "Emergency Fund", amount: 500 }],
      },
      {
        month: "February",
        expenses: [
          { category: "Food", amount: 180 },
          { category: "Transport", amount: 120 },
        ],
        incomes: [{ category: "Salary", amount: 3100 }],
        savings: [{ category: "Emergency Fund", amount: 600 }],
      },
    ],
    contributors: ["contributor1@example.com", "contributor2@example.com"],
  },
  {
    creator: "6777bd74d07f6387e19f5498",
    year: "2024",
    name: "Min nya budget",
    creatorName: "Anton Isoaho",
    months: [
      {
        month: "January",
        expenses: [
          { category: "Food", amount: 220 },
          { category: "Transport", amount: 130 },
        ],
        incomes: [{ category: "Salary", amount: 3200 }],
        savings: [{ category: "Emergency Fund", amount: 700 }],
      },
      {
        month: "February",
        expenses: [
          { category: "Food", amount: 190 },
          { category: "Transport", amount: 140 },
        ],
        incomes: [{ category: "Salary", amount: 3300 }],
        savings: [{ category: "Emergency Fund", amount: 800 }],
      },
    ],
    contributors: ["contributor3@example.com", "contributor4@example.com"],
  },
]);
