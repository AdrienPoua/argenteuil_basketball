import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Member from '@/lib/mongo/models/Member';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const members = await Member.find({});
      res.status(200).json(members);
    } catch (error) {
      console.error('Erreur lors de la récupération des membres:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des membres' });
    }
  } else if (req.method === 'POST') {
    const members = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({ error: 'Le corps de la requête doit être un tableau de membres' });
    }

    try {
      const createdMembers = await Promise.all(members.map(async (member) => {
        try {
          const newMember = new Member(member);
          await newMember.save();
          return { success: true, member: newMember };
        } catch (error) {
          console.error('Erreur lors de la création du membre:', error);
          return { success: false, error: `Erreur lors de la création du membre: ${(error as Error).message}` };
        }
      }));
      res.status(201).json(createdMembers);
    } catch (error) {
      console.error('Erreur lors de la création des membres:', error);
      res.status(500).json({ error: 'Erreur lors de la création des membres' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
