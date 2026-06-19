import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const DownloadHook = (date: string, elementClass: string) => {
    const dateFormat = new Date(date).toLocaleDateString()
    const download = async () => {
        const element = document.querySelector<HTMLElement>(elementClass)
        if(!element) return
        
        const canvas = await html2canvas(element)
        const dataURL = canvas.toDataURL('image/png')
        downloadjs(dataURL, 'certificado.png', 'image/png')
    }

    return {dateFormat, download}
}

export default DownloadHook