import { writable } from 'svelte/store';

const selectedMovie = writable();

export {
    selectedMovie
}