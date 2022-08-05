export interface LoginState {
  email: string,
  discordId: string
}

export interface UserProfile {
  id: number,
  username: string
}

export interface Token {
  token: string
}

export interface TodosInput {
  name: string,
  description: string
}

export interface ToDo {
  description: string,
  name: string,
  id: number,
  userId: number,
}
