interface PageInfo {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string
}

interface Film {
  title: string,
  episodeID: number,
  openingCrawl: string,
  director: string,
  producers: string[],
  releaseDate: string,
  characterConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    characters: Character[]
  },
  created: string,
  edited: string,
  id: string
}

interface Character {
  name: string,
  birthYear: string,
  eyeColor: string,
  gender: string,
  hairColor: string,
  height: number,
  mass: number,
  skinColor: string,
  filmConnection: {
    pageInfo: PageInfo,
    totalCount: number,
    films: Film[]
  },
  created: string,
  edited: string,
  id: string
}

export type {
  Film,
  Character,
  PageInfo
}
