export interface barndsResponse {
  results: number
  metadata: Metadata
  data: barnd[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface barnd {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
