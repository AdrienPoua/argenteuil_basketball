"use client";
import Layout from "@/layouts/main";
import { Box, Typography, Paper } from "@mui/material";
import { faq } from "@/services/dataProcessing";
import { FAQ } from "@/models";
import Dropdown from "@/components/Dropdown";

export default function FAQPage() {
  return (
    <Layout pageTitle="Vos questions">
      <Box className="flex flex-col gap-10 items-center w-full max-w-2xl mx-auto ">
        {faq.map((faq: FAQ ) => (
          <Dropdown
            key={faq.id}
            animation={true}
            header={
              <Typography
                variant="body2"
                className="flex text-lg">
                {faq.question}
              </Typography>
            }
            items={
              <Box className="flex flex-col">
                <Paper className="p-3">
                  <Typography
                    variant="body2"
                    className="flex text-lg">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Box>
            }
          />
        ))}
      </Box>
    </Layout>
  );
}
