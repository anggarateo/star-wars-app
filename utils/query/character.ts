const allCharacters = () => `{
  allPeople {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    },
    totalCount,
    people {
      name,
      birthYear,
      gender,
      height,
      mass,
      filmConnection {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        },
        totalCount,
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
        created
        edited
        id
      },
      created,
      edited,
      id
    }
  }
}`

const character = (id: string) => `{
  person(id: "${id}") {
    name,
    birthYear,
    eyeColor,
    gender,
    hairColor,
    height,
    mass,
    skinColor,
    filmConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      },
      totalCount,
      title
      episodeID
      openingCrawl
      director
      producers
      releaseDate
      created
      edited
      id
    },
    created,
    edited,
    id
  }
}`

export default {
  allCharacters,
  character
}
