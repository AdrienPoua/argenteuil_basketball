'use client';
import { useEffect, useState } from 'react';
import matchService from '@/services/Match';

export default function ReservationPage() {
  const [emailContent, setEmailContent] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const fetchedMatches = await matchService.getMatchs();
      setMatches(fetchedMatches);
      setEmailContent(fetchedMatches.map(match => `Match: ${match.team.name} vs ${match.opponent}`).join('\n'));
    };
    fetchMatches();
  }, []);

  const sendEmail = async () => {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'argenteuilbasketball@hotmail.fr',
        subject: 'Match Reservations',
        text: emailContent,
      }),
    });
  };

  return (
    <div>
      <h1>Reservation Page</h1>
      <textarea value={emailContent} readOnly rows={10} cols={50} />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}
