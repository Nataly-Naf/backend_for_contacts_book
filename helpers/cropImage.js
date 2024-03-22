import Jimp from "jimp";
  
async function croppedImg(path) {
    const image = await Jimp.read(path);
    const croppedImg = image.resize(250, 250).greyscale();
    const rewriteImg = croppedImg.writeAsync(path);
    return rewriteImg;
}
export default croppedImg;