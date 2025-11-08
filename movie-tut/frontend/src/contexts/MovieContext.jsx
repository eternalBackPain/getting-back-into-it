import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
    return useContext(MovieContext);
}

export function MovieProvider ({children}) {
    return <MovieContext.Provider>
        {children}
    </MovieContext.Provider>
}