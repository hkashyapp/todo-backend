import { randomUUID } from 'crypto';

const success = (message, results, statusCode, responseObj, code) => {
    return responseObj.status(statusCode).json({
        data: results,
        error: false,
        message,
        code,
    });
};

const successAuth = (message, accessToken, refreshToken, results, statusCode, responseObj, code) => {
    return responseObj.status(statusCode).json({
        data: results,
        _token: accessToken,
        _refreshToken: refreshToken,
        error: false,
        message,
        code,
    });
};

const error = (message, statusCode, responseObj, err = {}) => {
    if (Object.keys(err).length > 0) {
        console.error(`[Error] ${message}:`, err);
    }

    return responseObj.status(statusCode).json({
        error: true,
        message,
        code: 0,
    });
};

const exception = (message, statusCode, responseObj, errorData) => {
    message = message || errorData.message;
    const uniqueId = randomUUID();

    console.error(`[Exception ID: ${uniqueId}] ${responseObj.req.originalUrl}:`, errorData);

    return responseObj.status(statusCode).json({
        error: true,
        message,
        details: `Please contact support team.\n Error-Refernce-Id: ${uniqueId}`,
        code: 0,
    });
};

export { success, successAuth, error, exception };