import { z } from "zod";

const FAQSchema = z.object({
    question : z.string(),
    answer : z.string(),
});

export default FAQSchema;
