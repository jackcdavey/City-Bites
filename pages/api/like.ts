import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === 'POST') {
        try {
            const { businessId, userId } = request.body;
            const result = await sql`
        INSERT INTO likes (business_id, user_id)
        VALUES (${businessId}, ${userId});
      `;
            return response.status(200).json({ message: 'Like added successfully', result });
        } catch (error) {
            return response.status(500).json({ error: error.message || 'Error adding like' });
        }
    } else {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
}
