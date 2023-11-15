import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const result =
            await sql`
            CREATE TABLE likes (
                id SERIAL PRIMARY KEY,
                business_id VARCHAR(255) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            `;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error });
    }
}