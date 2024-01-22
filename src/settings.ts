import express, {Request, Response} from "express";
import {videos, videosRouter} from "./routes/videos-router";
import {HTTP_STATUSES, VideoType} from "./types";

export const app = express();
export const RoutersPaths = {
    videos: '/videos',
    testingAllData: '/testing/all-data'
}

app.use(express.json());

// возвращает middleware функцию, для того чтоб body читался
// по умолчанию body - undefined
// все запросы, которые будут приходить, будут проходить через мидл, забирать body и парсить

app.use(RoutersPaths.videos, videosRouter);
app.delete('/testing/all-data', (req : Request, res : Response) => {
    //try {
    videos.length = 0;
   return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    //} catch (error) {
    //     console.error('Error video', error);
    //  res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
    // }
})

