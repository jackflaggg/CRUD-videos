import {Request, Response, Router} from "express";
import {app} from "../settings";
import {
    AvailableResolutions,
    CreateVideosType,
    ErrorsType,
    HTTP_STATUSES,
    Param,
    RequestWithBody,
    VideoType
} from "../types";

export const videosRouter = Router({});

export let videos: VideoType[] = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-01-11T10:59:51.544Z",
        "publicationDate": "2024-01-11T10:59:51.544Z",
        "availableResolutions": [
            "P144"
        ]
    }
];

// После videos : VideoType[], чтобы указать тип данных переменной videos.
// В данном случае, VideoType[] означает массив объектов, каждый из которых соответствует типу VideoType.
// Таким образом, переменная videos - это массив объектов видео, где каждый объект соответствует типу VideoType.


videosRouter.get('/', (req : Request, res : Response) => {
    res.status(HTTP_STATUSES.OK_200)
    res.send(videos);
});

videosRouter.get('/:id', (req: Request<Param>, res: Response) => {
    const id = +req.params.id;
    const video = videos.find(v => v.id === id)

    if (!video) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.status(HTTP_STATUSES.OK_200)
    res.send(video);
});

videosRouter.post('/', (req : RequestWithBody<CreateVideosType>, res : Response) => {
    const errors: ErrorsType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body;

    if (!title || typeof (title) !== "string" || !title.trim() ||title.trim().length > 40){
        errors.errorsMessages.push({message: 'Incorrect title', field: 'title'})
    }

    if (!author || typeof (author) !== "string" || !author.trim() || author.trim().length > 20){
        errors.errorsMessages.push({message: 'Incorrect author', field: 'author'})
    }

    if (Array.isArray(availableResolutions)) {
        for (const r of availableResolutions) {
            if (!availableResolutions.includes(r)) {
                errors.errorsMessages.push({ message: 'Incorrect availableResolutions!', field: 'availableResolutions' });
                break; // Прерывает выполнение цикла
            }
        }
    } else {
        availableResolutions = [];
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    const createdAt = new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideo: VideoType = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    videos.push(newVideo);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .send(newVideo);
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    let errors: ErrorsType = { errorsMessages: [] };
    let title = req.body.title;
    let author = req.body.author;
    let canBeDownloaded = req.body.canBeDownloaded;
    let minAgeRestriction = req.body.minAgeRestriction;
    let createdAt = req.body.createdAt;
    let publicationDate = req.body.publicationDate;
    let availableResolutions = req.body.availableResolutions;

    if (Object.entries(req.body).length === 0){
        //проверка на пустоту req
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    if (!title || typeof (title) !== "string" || !title.trim() || title.length > 40){
        errors.errorsMessages.push({message: 'Incorrect title', field: 'title'});
    }

    if (!author || typeof (author) !== "string" || !author.trim() || author.length > 20){
        errors.errorsMessages.push({message: 'Incorrect author', field: 'author'});
    }

    if (!canBeDownloaded || typeof (canBeDownloaded) !== "boolean"){
        errors.errorsMessages.push({message: 'Incorrect canBeDownloaded', field: 'canBeDownloaded'});
    }

    if (minAgeRestriction !== null && (typeof (minAgeRestriction) !== "number" || minAgeRestriction < 1 || minAgeRestriction > 18)){
        errors.errorsMessages.push({message: 'Incorrect minAgeRestriction', field: 'minAgeRestriction'});
    }

    const validateDate = (dateString: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        return regex.test(dateString);
    };

    if (!publicationDate || !(validateDate(publicationDate))){
        errors.errorsMessages.push({message: 'Incorrect publicationDate', field: 'publicationDate'});
    }

    if (Array.isArray(availableResolutions)) {
        for (const r of availableResolutions) {
            if (!availableResolutions.includes(r)) {
                errors.errorsMessages.push({ message: 'Incorrect availableResolutions!', field: 'availableResolutions' });
                break; // Прерывает выполнение цикла
            }
        }
    } else {
        availableResolutions = [];
    }

    if (errors.errorsMessages.length){
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .send(errors);
        return;
    }

    let id = +req.params.id;
    let video = videos.find((v) => v.id === id);
    if (video){
        video.title = title;
        video.author = author;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
        video.availableResolutions = availableResolutions;

        res
            .status(HTTP_STATUSES.NO_CONTENT_204)
            .send(video)
    } else {
        res
            .sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }


});

videosRouter.delete('/testing/all-data', (req : Request, res : Response) => {
    //try {
        videos = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    //} catch (error) {
   //     console.error('Error video', error);
      //  res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
   // }
});

videosRouter.delete('/:id', (req : Request, res : Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id){
            videos.splice(i, 1);
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
            return
        }
    }

    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
});