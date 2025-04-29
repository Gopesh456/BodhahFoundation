/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OPTIONS: () => (/* binding */ OPTIONS),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function POST(request) {\n    try {\n        const formData = await request.formData();\n        const title = formData.get(\"title\");\n        const year = formData.get(\"year\");\n        const file = formData.get(\"file\");\n        if (!title || !year || !file) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        // Validate file type\n        if (!file.name.endsWith(\".pdf\")) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Only PDF files are allowed\"\n            }, {\n                status: 400\n            });\n        }\n        // Create books directory if it doesn't exist\n        const booksDir = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), \"books\");\n        if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(booksDir)) {\n            await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.mkdir)(booksDir, {\n                recursive: true\n            });\n        }\n        // Create filename with title and year\n        const filename = `${title} (${year}).pdf`;\n        const filePath = path__WEBPACK_IMPORTED_MODULE_3___default().join(booksDir, filename);\n        // Convert file to buffer and save\n        const bytes = await file.arrayBuffer();\n        const buffer = Buffer.from(bytes);\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.writeFile)(filePath, buffer);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error uploading file:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to upload file\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function OPTIONS() {\n    return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(null, {\n        status: 200,\n        headers: {\n            \"Access-Control-Allow-Methods\": \"POST, OPTIONS\",\n            \"Access-Control-Allow-Headers\": \"Content-Type\"\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSTtBQUNmO0FBQ1I7QUFFaEIsZUFBZUssS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUQsUUFBUUMsUUFBUTtRQUN2QyxNQUFNQyxRQUFRRCxTQUFTRSxHQUFHLENBQUM7UUFDM0IsTUFBTUMsT0FBT0gsU0FBU0UsR0FBRyxDQUFDO1FBQzFCLE1BQU1FLE9BQU9KLFNBQVNFLEdBQUcsQ0FBQztRQUUxQixJQUFJLENBQUNELFNBQVMsQ0FBQ0UsUUFBUSxDQUFDQyxNQUFNO1lBQzVCLE9BQU9YLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBMEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQy9FO1FBRUEscUJBQXFCO1FBQ3JCLElBQUksQ0FBQ0gsS0FBS0ksSUFBSSxDQUFDQyxRQUFRLENBQUMsU0FBUztZQUMvQixPQUFPaEIscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUE2QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbEY7UUFFQSw2Q0FBNkM7UUFDN0MsTUFBTUcsV0FBV2IsZ0RBQVMsQ0FBQ2UsUUFBUUMsR0FBRyxJQUFJO1FBQzFDLElBQUksQ0FBQ2pCLDhDQUFVQSxDQUFDYyxXQUFXO1lBQ3pCLE1BQU1mLGtEQUFLQSxDQUFDZSxVQUFVO2dCQUFFSSxXQUFXO1lBQUs7UUFDMUM7UUFFQSxzQ0FBc0M7UUFDdEMsTUFBTUMsV0FBVyxHQUFHZCxNQUFNLEVBQUUsRUFBRUUsS0FBSyxLQUFLLENBQUM7UUFDekMsTUFBTWEsV0FBV25CLGdEQUFTLENBQUNhLFVBQVVLO1FBRXJDLGtDQUFrQztRQUNsQyxNQUFNRSxRQUFRLE1BQU1iLEtBQUtjLFdBQVc7UUFDcEMsTUFBTUMsU0FBU0MsT0FBT0MsSUFBSSxDQUFDSjtRQUUzQixNQUFNdkIsc0RBQVNBLENBQUNzQixVQUFVRztRQUUxQixPQUFPMUIscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFaUIsU0FBUztRQUFLO0lBQzNDLEVBQUUsT0FBT2hCLE9BQU87UUFDZGlCLFFBQVFqQixLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDN0U7QUFDRjtBQUVPLGVBQWVpQjtJQUNwQixPQUFPLElBQUkvQixxREFBWUEsQ0FBQyxNQUFNO1FBQzVCYyxRQUFRO1FBQ1JrQixTQUFTO1lBQ1AsZ0NBQWdDO1lBQ2hDLGdDQUFnQztRQUNsQztJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL2dvcGVzaC9Eb2N1bWVudHMvR2l0SHViL0JvZGhhaEZvdW5kYXRpb24vYXBwL2FwaS91cGxvYWQvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IHdyaXRlRmlsZSwgbWtkaXIgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIlxuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gXCJmc1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcXVlc3QuZm9ybURhdGEoKVxuICAgIGNvbnN0IHRpdGxlID0gZm9ybURhdGEuZ2V0KFwidGl0bGVcIikgYXMgc3RyaW5nXG4gICAgY29uc3QgeWVhciA9IGZvcm1EYXRhLmdldChcInllYXJcIikgYXMgc3RyaW5nXG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldChcImZpbGVcIikgYXMgRmlsZVxuXG4gICAgaWYgKCF0aXRsZSB8fCAheWVhciB8fCAhZmlsZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyByZXF1aXJlZCBmaWVsZHNcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgZmlsZSB0eXBlXG4gICAgaWYgKCFmaWxlLm5hbWUuZW5kc1dpdGgoXCIucGRmXCIpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJPbmx5IFBERiBmaWxlcyBhcmUgYWxsb3dlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYm9va3MgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBjb25zdCBib29rc0RpciA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImJvb2tzXCIpXG4gICAgaWYgKCFleGlzdHNTeW5jKGJvb2tzRGlyKSkge1xuICAgICAgYXdhaXQgbWtkaXIoYm9va3NEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGZpbGVuYW1lIHdpdGggdGl0bGUgYW5kIHllYXJcbiAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RpdGxlfSAoJHt5ZWFyfSkucGRmYFxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGJvb2tzRGlyLCBmaWxlbmFtZSlcblxuICAgIC8vIENvbnZlcnQgZmlsZSB0byBidWZmZXIgYW5kIHNhdmVcbiAgICBjb25zdCBieXRlcyA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKVxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ5dGVzKVxuXG4gICAgYXdhaXQgd3JpdGVGaWxlKGZpbGVQYXRoLCBidWZmZXIpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwbG9hZGluZyBmaWxlOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gdXBsb2FkIGZpbGVcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIE9QVElPTlMoKSB7XG4gIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKG51bGwsIHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJQT1NULCBPUFRJT05TXCIsXG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCJDb250ZW50LVR5cGVcIixcbiAgICB9LFxuICB9KVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIndyaXRlRmlsZSIsIm1rZGlyIiwiZXhpc3RzU3luYyIsInBhdGgiLCJQT1NUIiwicmVxdWVzdCIsImZvcm1EYXRhIiwidGl0bGUiLCJnZXQiLCJ5ZWFyIiwiZmlsZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm5hbWUiLCJlbmRzV2l0aCIsImJvb2tzRGlyIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJyZWN1cnNpdmUiLCJmaWxlbmFtZSIsImZpbGVQYXRoIiwiYnl0ZXMiLCJhcnJheUJ1ZmZlciIsImJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJzdWNjZXNzIiwiY29uc29sZSIsIk9QVElPTlMiLCJoZWFkZXJzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_gopesh_Documents_GitHub_BodhahFoundation_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"/home/gopesh/Documents/GitHub/BodhahFoundation/app/api/upload/route.ts\",\n    nextConfigOutput,\n    userland: _home_gopesh_Documents_GitHub_BodhahFoundation_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGZ29wZXNoJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGQm9kaGFoRm91bmRhdGlvbiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRmdvcGVzaCUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRkJvZGhhaEZvdW5kYXRpb24maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9nb3Blc2gvRG9jdW1lbnRzL0dpdEh1Yi9Cb2RoYWhGb3VuZGF0aW9uL2FwcC9hcGkvdXBsb2FkL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91cGxvYWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL2dvcGVzaC9Eb2N1bWVudHMvR2l0SHViL0JvZGhhaEZvdW5kYXRpb24vYXBwL2FwaS91cGxvYWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();