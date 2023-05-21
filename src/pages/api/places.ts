import {useEffect, useState} from 'react';
import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const apiKey = process.env.GOOGLE_PLACES_KEY;

// interface Restaurant {
//   id: string;
//   name: string;
//   address: string;
// }

export default async function getNearbyRestaurants(
  req: NextApiRequest,
  res: NextApiResponse,
  //   apiKey = process.env.GOOGLE_PLACES_KEY,
  //   latitude: number,
  //   longitude: number,
) {
  const {latitude, longitude} = req.body;
  console.log('sini masuk tak', latitude, longitude);

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=restaurant&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    const restaurants = response.data.results.map((result: any) => ({
      id: result.place_id,
      name: result.name,
      address: result.vicinity,
    }));
    //   return restaurants;
    return res.status(200).json({
      data: {
        ...restaurants,
        // text: restaurants.text.replace(/^\n+/, ''),
      },
    });
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
  }
}
