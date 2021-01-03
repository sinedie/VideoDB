import { writable } from 'svelte/store';

const movies = writable([]);

export {
    movies
}