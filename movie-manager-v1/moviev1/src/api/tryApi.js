import axios from 'axios'
import { doGet, doDelete, doPut, doPost } from "./service/crud";
export async function getmovies() {
  // localhost:5173/api/film/0 => vite会将该地址代理到localhost:3000/film/0
  const  moviedata  = await doGet(`/mov`);
  return moviedata;
}

export async function getfilms() {
  // localhost:5173/api/film/0 => vite会将该地址代理到localhost:3000/film/0
  const  moviedata  = await doGet(`/film`);
  return moviedata;
}
export async function getdetail(id) {
  const detail = await doGet(`/mov/${id}`)
  return detail
}

