// where you import your packages
const mpvAPI = require('node-mpv');
// where you want to initialise the API
const mpv = new mpvAPI();

async function openMpv(file_path, volume=70) {
    try{
        await mpv.start()
        await mpv.load(file_path);
        await mpv.volume(volume);
    }
    catch (error) {
        console.log(error);
    }
}


export {
    mpv,
    openMpv
}