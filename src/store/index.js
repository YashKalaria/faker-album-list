import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		[albumsApi.reducerPath]: albumsApi.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(albumsApi.middleware)
			.concat(photosApi.middleware);
	},
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers.js";
export * from "./thunks/addUser.js";
export * from "./thunks/removeUser.js";
export {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} from "./apis/albumsApi";
export {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} from "./apis/photosApi";
