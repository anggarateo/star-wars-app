const allFilms: any = () => `{
  allFilms {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
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
  }
}`

const film: any = (id: string) => `{
  film(id: "${id}") {
    title,
    episodeID,
    openingCrawl,
    director,
    producers,
    releaseDate,
    characterConnection {
      pageInfo {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor
      },
      totalCount,
      characters {
        name,
        birthYear,
        height,
        mass,
        id
      }
    },
    created,
    edited,
    id
  }
}`

export default {
  allFilms,
  film
}
