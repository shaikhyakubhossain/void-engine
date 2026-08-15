export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponseDto {
  user: AuthUserDto;
  token: string;
}