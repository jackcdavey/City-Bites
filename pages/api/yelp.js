export default async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.YELP_API_KEY; 

    
    if (!apiKey) {
  console.error('YELP_API_KEY is not defined in environment variables.');
  res.status(500).json({ message: 'Internal API key error' });
  return;
    }
    

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
};