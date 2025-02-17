/**
 * TFG API
 * Test description
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserProfileDetail } from './userProfileDetail';


export interface UserDetail { 
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    /**
     * Designates that this user has all permissions without explicitly assigning them.
     */
    isSuperuser?: boolean;
    /**
     * Designates whether the user can log into this admin site.
     */
    isStaff?: boolean;
    profile: UserProfileDetail;
}

