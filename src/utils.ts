export const convertUrl = (url: string) => {
    if(url.includes('.ipfs.thirdwebstorage.com')){
        let newUrl = url.replace('.ipfs.thirdwebstorage.com', '')
        newUrl = newUrl.replace('https://', '')
        return 'https://ipfs.io/ipfs/' + newUrl;
    } 
    if(url.includes('https://ipfs-2.thirdwebcdn.com/ipfs/')){
        const newUrl = url.replace('https://ipfs-2.thirdwebcdn.com/ipfs/', 'https://ipfs.io/ipfs/')
        return newUrl;
    }
    return url;
};