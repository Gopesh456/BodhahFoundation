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
exports.id = "app/api/view/[id]/route";
exports.ids = ["app/api/view/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/view/[id]/route.ts":
/*!************************************!*\
  !*** ./app/api/view/[id]/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(request, { params }) {\n    try {\n        // Ensure params is properly handled\n        const { id } = params;\n        const filename = Buffer.from(id, \"base64\").toString();\n        const booksDir = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), \"books\");\n        const filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(booksDir, filename);\n        // Check if file exists\n        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(filePath)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Book not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Read the file\n        const fileBuffer = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(filePath);\n        // Return the PDF file\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(fileBuffer, {\n            headers: {\n                \"Content-Type\": \"application/pdf\",\n                \"Content-Disposition\": `inline; filename=\"${filename}\"`\n            }\n        });\n    } catch (error) {\n        console.error(\"Error viewing book:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to view book\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZpZXcvW2lkXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEM7QUFDdkI7QUFDSTtBQUVoQixlQUFlRyxJQUFJQyxPQUFnQixFQUFFLEVBQUVDLE1BQU0sRUFBOEI7SUFDaEYsSUFBSTtRQUNGLG9DQUFvQztRQUNwQyxNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHRDtRQUNmLE1BQU1FLFdBQVdDLE9BQU9DLElBQUksQ0FBQ0gsSUFBSSxVQUFVSSxRQUFRO1FBRW5ELE1BQU1DLFdBQVdULGdEQUFTLENBQUNXLFFBQVFDLEdBQUcsSUFBSTtRQUMxQyxNQUFNQyxXQUFXYixnREFBUyxDQUFDUyxVQUFVSjtRQUVyQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDTixvREFBYSxDQUFDYyxXQUFXO1lBQzVCLE9BQU9mLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RTtRQUVBLGdCQUFnQjtRQUNoQixNQUFNQyxhQUFhbkIsc0RBQWUsQ0FBQ2M7UUFFbkMsc0JBQXNCO1FBQ3RCLE9BQU8sSUFBSWYscURBQVlBLENBQUNvQixZQUFZO1lBQ2xDRSxTQUFTO2dCQUNQLGdCQUFnQjtnQkFDaEIsdUJBQXVCLENBQUMsa0JBQWtCLEVBQUVmLFNBQVMsQ0FBQyxDQUFDO1lBQ3pEO1FBQ0Y7SUFDRixFQUFFLE9BQU9XLE9BQU87UUFDZEssUUFBUUwsS0FBSyxDQUFDLHVCQUF1QkE7UUFDckMsT0FBT2xCLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBc0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDM0U7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvZ29wZXNoL0RvY3VtZW50cy9HaXRIdWIvQm9kaGFoRm91bmRhdGlvbi9hcHAvYXBpL3ZpZXcvW2lkXS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IGZzIGZyb20gXCJmc1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcbiAgdHJ5IHtcbiAgICAvLyBFbnN1cmUgcGFyYW1zIGlzIHByb3Blcmx5IGhhbmRsZWRcbiAgICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgICBjb25zdCBmaWxlbmFtZSA9IEJ1ZmZlci5mcm9tKGlkLCBcImJhc2U2NFwiKS50b1N0cmluZygpXG5cbiAgICBjb25zdCBib29rc0RpciA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcImJvb2tzXCIpXG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYm9va3NEaXIsIGZpbGVuYW1lKVxuXG4gICAgLy8gQ2hlY2sgaWYgZmlsZSBleGlzdHNcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJCb29rIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSlcbiAgICB9XG5cbiAgICAvLyBSZWFkIHRoZSBmaWxlXG4gICAgY29uc3QgZmlsZUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aClcblxuICAgIC8vIFJldHVybiB0aGUgUERGIGZpbGVcbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZShmaWxlQnVmZmVyLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vcGRmXCIsXG4gICAgICAgIFwiQ29udGVudC1EaXNwb3NpdGlvblwiOiBgaW5saW5lOyBmaWxlbmFtZT1cIiR7ZmlsZW5hbWV9XCJgLFxuICAgICAgfSxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB2aWV3aW5nIGJvb2s6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byB2aWV3IGJvb2tcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJmcyIsInBhdGgiLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwiaWQiLCJmaWxlbmFtZSIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsImJvb2tzRGlyIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJmaWxlUGF0aCIsImV4aXN0c1N5bmMiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJmaWxlQnVmZmVyIiwicmVhZEZpbGVTeW5jIiwiaGVhZGVycyIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/view/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fview%2F%5Bid%5D%2Froute&page=%2Fapi%2Fview%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fview%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fview%2F%5Bid%5D%2Froute&page=%2Fapi%2Fview%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fview%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_gopesh_Documents_GitHub_BodhahFoundation_app_api_view_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/view/[id]/route.ts */ \"(rsc)/./app/api/view/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/view/[id]/route\",\n        pathname: \"/api/view/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/view/[id]/route\"\n    },\n    resolvedPagePath: \"/home/gopesh/Documents/GitHub/BodhahFoundation/app/api/view/[id]/route.ts\",\n    nextConfigOutput,\n    userland: _home_gopesh_Documents_GitHub_BodhahFoundation_app_api_view_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ2aWV3JTJGJTVCaWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnZpZXclMkYlNUJpZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnZpZXclMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGZ29wZXNoJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGQm9kaGFoRm91bmRhdGlvbiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRmdvcGVzaCUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRkJvZGhhaEZvdW5kYXRpb24maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9nb3Blc2gvRG9jdW1lbnRzL0dpdEh1Yi9Cb2RoYWhGb3VuZGF0aW9uL2FwcC9hcGkvdmlldy9baWRdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS92aWV3L1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS92aWV3L1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3ZpZXcvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL2dvcGVzaC9Eb2N1bWVudHMvR2l0SHViL0JvZGhhaEZvdW5kYXRpb24vYXBwL2FwaS92aWV3L1tpZF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fview%2F%5Bid%5D%2Froute&page=%2Fapi%2Fview%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fview%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fview%2F%5Bid%5D%2Froute&page=%2Fapi%2Fview%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fview%2F%5Bid%5D%2Froute.ts&appDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fgopesh%2FDocuments%2FGitHub%2FBodhahFoundation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();