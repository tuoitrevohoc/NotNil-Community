
/// user class
export interface User {
  id?: string
  fullName?: string
  profilePicture?: string
  facebookId?: string
  experience?: number,
  createAt?: Date
}

export interface Reply {
  id?: string
  content?: string
  creator?: User
  likes?: User[]
  createAt?: Date
}

export interface Solution extends Reply {
  code?: string
  result?: any
  reward?: number
}

export interface Definition {
  type?: number,
  name?: string,
  description?: string,
}

export interface FunctionDefinition {
  name?: string,
  input: Definition[]
  output: Definition
}

export interface Test {
  test: string
  expected: string
}

/// item for posts
export interface Challenge {
  id?: string
  title?: string
  content?: string
  document?: string
  code?: string
  testCode?: string
  likes?: User[]
  creator?: User
  replies?: Reply[]
  definition?: FunctionDefinition
  tests?: Test[]
  hiddenTests?: Test[]
  createAt?: Date
}

// a path
export interface Path {
  id?: string
  title?: string
  intro?: string
  challenges: Challenge[]
  users: User[]
  likes?: User[]
  creator?: User
}