import connectDB from "@/libs/mongo/connectDB";

export default async function handler(req, res) {
    await connectDB();
    res.status(200).json({ name: 'John Doe' });
}
