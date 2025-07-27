/*
Exercise 1: Basic User DTO Interface (Easy)
Create an interface called User that represents a user in your application with the following properties:

id (number)
username (string)
email (string)
isActive (boolean)
profilePicture (optional string)

Then create a function displayUser that takes a User parameter and returns a formatted string with the user's information.
*/
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  profilePicture?: string;
}

export function displayUser(user: User) {
  if (user.profilePicture) {
    return `User details:\nID:${user.id}\nName:${user.username}\nEmail:${user.email}\nStatus:${user.isActive}\nProfileURL:${user.profilePicture}`;
  }
  return `User details:\nID:${user.id}\nName:${user.username}\nEmail:${user.email}\nStatus:${user.isActive}\n`;
}

/*
Exercise 2: Create and Update DTOs (Medium)
You're building a blog API. Create the following interfaces:

CreatePostDto with:

title (string)
content (string)
tags (optional array of strings)
authorId (number)

UpdatePostDto with:

All properties from CreatePostDto but optional
Should NOT include authorId (posts can't change authors)

PostResponse that extends CreatePostDto and adds:

id (readonly number)
createdAt (readonly Date)
updatedAt (readonly Date)
viewCount (number, default 0)

*/
interface CreatePostDto {
  title: string;
  content: string;
  tags?: string[];
  authorId: number;
}

interface UpdatePostDto {
  title?: string;
  content?: string;
  tags?: string[];
}

interface PostResponse extends CreatePostDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  viewCount: number;
}
