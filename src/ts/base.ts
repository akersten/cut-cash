/**
 * Created by akersten on 4/30/17.
 */

/***********************************************************************************************************************
 * The base script to include on every page for the application (framework imports, global declarations, polyfills,
 * etc.)
 **********************************************************************************************************************/

// Stupid polyfill for object.assign - hope browsers implement ES6 soon...
declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}