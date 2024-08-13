"use client"
import { Box, Typography, TextField, Button } from '@mui/material'
import React, { ReactElement, useState, useCallback } from 'react'
import { useQuery, useQueryClient } from "react-query";
import { getClubs, createClub } from '@/lib/mongo/controllers/clubs'

export const useClubs = () => {
    const { data } = useQuery(['clubs'], async () => await getClubs());
}