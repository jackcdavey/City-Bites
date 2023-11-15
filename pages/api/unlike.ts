import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === 'DELETE') {
        try {
            const { businessId, userId } = request.body;
            await sql`
        DELETE FROM likes
        WHERE business_id = ${businessId} AND user_id = ${userId};
      `;
            return response.status(200).json({ message: 'Like removed successfully' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
}
