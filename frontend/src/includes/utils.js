import axios from 'axios';

export async function isLogged()
{
	return ((await axios.get('/il')).data);
}