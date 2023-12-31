import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

interface City {
  name: string;
  image: string;
}

export default function Home() {

  const cities: City[] = [
    {
      name: "San Francisco",
      image: "/images/sanfrancisco.webp"
    },
    {
      name: "San Jose",
      image: "/images/sanjose.webp"
    },
    {
      name: "San Diego",
      image: "/images/sandiego.webp"
    },
    {
      name: "Los Angeles",
      image: "/images/losangeles.webp"
    },
    {
      name: "New York",
      image: "/images/newyork.webp"
    }


  ]


  return (
    <div className={styles.container}>
      <Head>
        <title>City Bites</title>
        <meta name="description" content="A list of top restaurants in your city" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Featured Cities
        </h1>

        <p className={styles.description}>
          Click a location to see top nearby restaurants!
        </p>

        <div className={styles.grid}>

          {cities.map((city) => (
            <Link
              href={{
                pathname: "/businesses",
                query: { city: city.name }
              }}
              key={city.name}>
              <div className={styles.card} style={{ backgroundImage: `url(${city.image})` }}>
                <div className={styles.cardContent}>
                  <h2>{city.name}</h2>
                </div>
              </div>
            </Link>
          ))}


        </div>
      </main>
    </div>
  )
}
