const allCharacters: any = () => `{
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
      created,
      edited,
      id
    }
  }
}`

const character: any = (id: string) => `{
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
      films {
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
        created
        edited
        id
      }
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
