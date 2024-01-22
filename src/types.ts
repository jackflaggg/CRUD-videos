import {Request} from "express";

export const AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,

    INTERNAL_SERVER_ERROR_500 = 500,
}

export type VideoType = {
    id:	number,
    title:	string,
    author:	string,
    canBeDownloaded:	boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: typeof AvailableResolutions
};

export type RequestWithBody<B> = Request<unknown, unknown, B, unknown>;

export type Param = {
    id: number
};

// определяем пользовательский тип RequestWithParams<P>, который расширяет стандартный тип Request из библиотеки Express.
// Request<P, unknown, unknown, unknown> означает, что у RequestWithParams есть параметр типа P, который представляет дополнительные параметры маршрута.

// Затем определяется тип Param, который представляет объект с единственным свойством id/

export type CreateVideosType = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}

export type ErrorsMessageType = {
    field: string,
    message: string
}

export type ErrorsType = {
    errorsMessages: ErrorsMessageType[]
}

export const videoTest: VideoType[] = [{
    id: 9,
    title:	"test title",
    author:	"test author",
    canBeDownloaded: false,
    minAgeRestriction: 13,
    createdAt: "2001-02-23T08:04:04.709Z",
    publicationDate: "2002-02-23T08:04:04.709Z",
    availableResolutions: ["Р2080"]
}];