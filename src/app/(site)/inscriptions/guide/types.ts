export type Step = {
  component: () => JSX.Element;
  label: string;
  value: string;
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string[];
};
