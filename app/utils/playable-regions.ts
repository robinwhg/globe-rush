export const playableRegions = [
  {
    slug: 'world',
    title: 'World',
    description: 'A full run with flags from every region around the globe.',
    img: '/img/world.svg',
    color: 'blue',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of the World',
      countries,
    }],
  },
  {
    slug: 'africa',
    title: 'Africa',
    description: 'Bold palettes and several flags that are easy to mix-up.',
    img: '/img/africa.svg',
    color: 'yellow',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of Africa',
      countries: countries.filter(country => country.region === 'Africa'),
    }],
  },
  {
    slug: 'americas',
    title: 'Americas',
    description: 'North, Central, South America and the Caribbean.',
    img: '/img/americas.svg',
    color: 'green',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of the Americas',
      countries: countries.filter(country => country.region === 'Americas'),
    }],
  },
  {
    slug: 'asia',
    title: 'Asia',
    description: 'Wide stylistic range, from simple tricolors to ornate emblems.',
    img: '/img/asia.svg',
    color: 'orange',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of Asia',
      countries: countries.filter(country => country.region === 'Asia'),
    }],
  },
  {
    slug: 'europe',
    title: 'Europe',
    description: 'Many closely related patterns that reward careful comparison.',
    img: '/img/europe.svg',
    color: 'red',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of Europe',
      countries: countries.filter(country => country.region === 'Europe'),
    }],
  },
  {
    slug: 'oceania',
    title: 'Oceania',
    description: 'Australia, New Zealand, Melanesia, Micronesia, and Polynesia.',
    img: '/img/oceania.svg',
    color: 'pink',
    games: [{
      slug: 'all-countries-territories',
      title: 'All countries and territories of Oceania',
      countries: countries.filter(country => country.region === 'Oceania'),
    }],
  },
] as const
