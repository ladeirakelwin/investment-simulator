// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Simulation } from '../../shared/types';

type Data = {
	simulations: Simulation[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let response = await fetch('http://localhost:3000/simulacoes');
	const simulations: Simulation[] = await response.json();
	res.status(200).json({ simulations });
}
