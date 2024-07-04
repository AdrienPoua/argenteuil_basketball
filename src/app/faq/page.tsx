"use client";
import Layout from "@/layouts/main";
import { Box, Typography, Paper } from "@mui/material";
import { faq } from "@/services/dataProcessing";
import { FAQ } from "@/models";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState<FAQ[]>(faq);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery)
    const filtered = faq.filter((faq) =>
      faq.question.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredFAQ(filtered);
  }

  return (
    <Layout pageTitle="Vos questions">
      <Box className="flex flex-col gap-10 items-center w-full max-w-2xl mx-auto ">
        <SearchBar  value={searchQuery} onChange={handleSearch}/>
        {filteredFAQ.map((faq: FAQ ) => (
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
