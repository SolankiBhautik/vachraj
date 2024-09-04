// src/lib/fetchData.ts

export async function fetchData(path) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${path}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  