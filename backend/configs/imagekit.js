import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY
})

export default imagekit

//r1ksn8ch6