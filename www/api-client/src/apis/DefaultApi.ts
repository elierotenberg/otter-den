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
    InlineObject,
    InlineObjectFromJSON,
    InlineObjectToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
    InlineResponse2001,
    InlineResponse2001FromJSON,
    InlineResponse2001ToJSON,
    InlineResponse2002,
    InlineResponse2002FromJSON,
    InlineResponse2002ToJSON,
} from '../models';

export interface DenLightLightIdDeleteRequest {
    lightId: string;
}

export interface DenLightLightIdPostRequest {
    lightId: string;
    inlineObject?: InlineObject;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async denLightLightIdDeleteRaw(requestParameters: DenLightLightIdDeleteRequest): Promise<runtime.ApiResponse<InlineResponse2002>> {
        if (requestParameters.lightId === null || requestParameters.lightId === undefined) {
            throw new runtime.RequiredError('lightId','Required parameter requestParameters.lightId was null or undefined when calling denLightLightIdDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/den/light/{lightId}`.replace(`{${"lightId"}}`, encodeURIComponent(String(requestParameters.lightId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2002FromJSON(jsonValue));
    }

    /**
     */
    async denLightLightIdDelete(requestParameters: DenLightLightIdDeleteRequest): Promise<InlineResponse2002> {
        const response = await this.denLightLightIdDeleteRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async denLightLightIdPostRaw(requestParameters: DenLightLightIdPostRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.lightId === null || requestParameters.lightId === undefined) {
            throw new runtime.RequiredError('lightId','Required parameter requestParameters.lightId was null or undefined when calling denLightLightIdPost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/den/light/{lightId}`.replace(`{${"lightId"}}`, encodeURIComponent(String(requestParameters.lightId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObjectToJSON(requestParameters.inlineObject),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     */
    async denLightLightIdPost(requestParameters: DenLightLightIdPostRequest): Promise<InlineResponse2001> {
        const response = await this.denLightLightIdPostRaw(requestParameters);
        return await response.value();
    }

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
