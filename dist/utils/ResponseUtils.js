"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseUtils {
    static send(res, status, message, data) {
        const splittedMessage = message.split(', ');
        return res.format({
            json: () => {
                res.status(status).json({
                    meta: {
                        status,
                        message
                    },
                    data,
                });
            },
            default: () => {
                res.status(406).send();
            }
        });
    }
    static created(res, data) {
        this.send(res, 201, 'Created', data);
    }
    static ok(res, data) {
        this.send(res, 200, 'Ok', data);
    }
    static unauthorized(res) {
        this.send(res, 401, 'Unauthenticated');
    }
    static unprocessable(res, message, errors) {
        this.send(res, 422, message, errors);
    }
}
exports.default = ResponseUtils;
