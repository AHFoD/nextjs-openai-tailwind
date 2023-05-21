import {useEffect, useState} from 'react';
import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const apiKey = process.env.GOOGLE_PLACES_KEY;

// interface Restaurant {
//   id: string;
//   name: string;
//   address: string;
// }

export default async function getNearbyRestaurantsLatLong(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {address} = req.body;
  console.log('sini masuk tak', address);

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    const response = await axios.get(url);

    // if (response.data.status === 'OK' && response.data.results.length > 0) {
    const {lat, lng} = response.data.results[0].geometry.location;
    let newCoordinates = [lat, lng];
    //   return {latitude: lat, longitude: lng};
    // }

    return res.status(200).json({
      data: {
        ...newCoordinates,
        // text: restaurants.text.replace(/^\n+/, ''),
      },
    });
  } catch (error) {
    console.error('Error geocoding address:', error);
  }
}
