import { Buffer } from 'buffer'
const apiKey = 'acc_00d1aaba08d15e4'
const apiSecret = 'c2aece9146409818da921bb4f1b21b22'

// https://api.imagga.com/v2/colors?image_url=https://i.ibb.co/txzJS1k/el-tesoro-c-smico.jpg

export const getColorImage = async (image) => {
  // const url = `https://api.imagga.com/v2/colors?image_url=${image}`
  try {
    const response = await fetch(`https://api.imagga.com/v2/colors?image_url=${image}`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
    })
    return response.json()
  } catch (error) {
    console.log(error.response, 'ERR')
  }
}
