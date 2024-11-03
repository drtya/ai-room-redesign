export interface IUser {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  credits: number;
}

export interface IAiGeneratedImage {
  id: number;
  roomType: string;
  designType: string;
  orgImage: string;
  aiImage: string;
  userEmail: string;
}
export interface createdImage {
  roomType: string;
  designType: string;
  image: Blob;
  userEmail: string;
  additionalReq: string;
}
