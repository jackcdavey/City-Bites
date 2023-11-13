export default async (req, res) => {
  const city = req.query.city;
  const id = req.query.id;
  const reviews = req.query.reviews;
  const apiKey = process.env.YELP_API_KEY; 

    
    if (!apiKey) {
  console.error('YELP_API_KEY is not defined in environment variables.');
  res.status(500).json({ message: 'Internal API key error' });
  return;
    }
    
  // Search for top restaurants in a city
  if (city) {
    try {
      const yelpResponse = await fetch(`https://api.yelp.com/v3/businesses/search?location=${city}&categories=restaurants&sort_by=rating&limit=10`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await yelpResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data from Yelp' });
    }
  }
  // Get details about a restaurant
  else if (id && !reviews) {
    try {
      const yelpResponse = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await yelpResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data from Yelp' });
    }

  } else if (reviews && id) {
     try {
      const yelpResponse = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await yelpResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews from Yelp' });
    }
  }
};
