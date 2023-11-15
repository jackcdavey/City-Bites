import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === 'GET') {
        try {
            const userId = request.query.userId;
            if (!userId) {
                throw new Error("User ID is required");
            }

            const result = await sql`
                SELECT business_id FROM likes WHERE user_id = ${userId as string};
            `;
            const rows = result.rows as { business_id: string }[];
            const likedBusinessIds = rows.map(row => row.business_id);

            return response.status(200).json({ likedBusinessIds });
        } catch (error) {
            console.error("Error in get-likes route:", error);
            return response.status(500).json({ error: error.message });
        }
    } else {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
}
