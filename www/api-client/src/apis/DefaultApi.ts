/* tslint:disable */
/* eslint-disable */
/**
 * fastify-swagger
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.7.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
} from '../models';

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async infoGetRaw(): Promise<runtime.ApiResponse<InlineResponse200>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     */
    async infoGet(): Promise<InlineResponse200> {
        const response = await this.infoGetRaw();
        return await response.value();
    }

}
