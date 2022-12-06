/*
| Developed by Starton
| Filename : api.config.ts
| Author : Calixte De Tourris (calixte@starton.io)
*/

import axios from 'axios'

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/
export const StartonApi = axios.create({
	baseURL: 'https://api.starton.io/v3',
	headers: {
		'x-api-key': process.env.STARTON_API_KEY,
	},
})
