import express, {Request, Response} from "express";
import {videosRouter} from "./routes/videos-router";

export const app = express();
export const RoutersPaths = {
    videos: '/videos',
    testingAllData: '/videos/testing/all-data'
}

app.use(express.json());

// возвращает middleware функцию, для того чтоб body читался
// по умолчанию body - undefined
// все запросы, которые будут приходить, будут проходить через мидл, забирать body и парсить

app.use(RoutersPaths.videos, videosRouter);

