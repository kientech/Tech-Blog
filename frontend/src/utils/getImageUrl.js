import { api } from "./api";
export const getImageUrl = (avatar) => {
  if (avatar.startsWith("http")) {
    return avatar;
  } else if (avatar.startsWith("/upload")) {
    return `${api}api/v1${avatar}`;
  }
  return "";
};
