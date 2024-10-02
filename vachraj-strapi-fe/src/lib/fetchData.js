// src/lib/fetchData.ts
import axios from 'axios';

export async function fetchData(path) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`);

    if (response.statusText != 'OK') {
      throw new Error(`Failed to fetch data from ${process.env.NEXT_PUBLIC_BACKEND_URL}${path}: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
